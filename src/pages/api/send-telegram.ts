// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';

// ===== Config (через ENV) =====
// TELEGRAM_BOT_TOKEN=<token>
// TELEGRAM_CHAT_ID=<id>
// ALLOWED_ORIGIN=https://your-site.example   (опц. для CORS)
// TURNSTILE_SECRET_KEY=<key>                 (опц. для перевірки CF Turnstile)

interface ContactFormData {
  name: string;
  contactType: 'email' | 'telegram' | 'phone' | 'whatsapp' | 'other';
  contact: string;
  message: string;
  catName?: string;
  // honeypot:
  website?: string;
  // Turnstile token (можете передавати у body):
  cfTurnstileToken?: string;
}

type Json = Record<string, unknown>;

// ===== Helpers =====
function json(res: NextApiResponse, status: number, data: Json = {}) {
  res.status(status).json(data);
}

function clamp(s: string, max: number) {
  s = (s ?? '').trim();
  return s.length > max ? s.slice(0, max - 1) + '…' : s;
}

// Екранування для Telegram MarkdownV2
function escapeMdV2(s: string) {
  return s.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, m => '\\' + m);
}

// Примітивний in-memory rate-limit (на інстанс)
// Для продакшну краще Redis/Upstash
const bucket = new Map<string, { count: number; reset: number }>();
function rateLimit(ip: string, limit = 5, windowMs = 60_000) {
  const now = Date.now();
  const cur = bucket.get(ip) ?? { count: 0, reset: now + windowMs };
  if (now > cur.reset) {
    cur.count = 0;
    cur.reset = now + windowMs;
  }
  cur.count += 1;
  bucket.set(ip, cur);
  return { ok: cur.count <= limit, remaining: Math.max(0, limit - cur.count) };
}

// Убираем сложную функцию с таймаутами - используем простой fetch

// Опційна перевірка Cloudflare Turnstile
async function verifyTurnstile(token: string, remoteIp: string | undefined) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // якщо не налаштовано — пропускаємо перевірку

  if (!token) return false;

  const form = new URLSearchParams();
  form.set('secret', secret);
  form.set('response', token);
  if (remoteIp) form.set('remoteip', remoteIp);

  const resp = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    },
  );

  if (!resp.ok) return false;
  const data = (await resp.json()) as { success?: boolean };
  return !!data.success;
}

// ===== Handler =====
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Ніколи не кешувати відповіді форми
  res.setHeader('Cache-Control', 'no-store');

  // CORS/Origin
  const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '';
  const origin = req.headers.origin || '';
  res.setHeader('Vary', 'Origin');
  if (ALLOWED_ORIGIN) {
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, cf-turnstile-response',
    );
    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }
    if (origin && origin !== ALLOWED_ORIGIN) {
      return json(res, 403, { error: 'Forbidden origin' });
    }
  }

  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  try {
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Убираем лишнее логирование для продакшена

    if (!telegramToken || !chatId) {
      console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID'); // не логимо самі значення
      return json(res, 500, { error: 'Internal server error' });
    }

    const data = (req.body || {}) as ContactFormData;

    // Honeypot (приховане поле "website" — якщо не пусте, це бот)
    if (typeof data.website === 'string' && data.website.trim() !== '') {
      return res.status(204).end(); // тихо ігноруємо
    }

    // Rate-limit
    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      '0.0.0.0';
    const rl = rateLimit(ip, 5, 60_000); // 5 запитів/хв для однієї IP
    if (!rl.ok) {
      return json(res, 429, { error: 'Too many requests' });
    }

    // Опційно: Turnstile (приймаємо з body або з заголовка)
    // const turnstileToken =
    //   data.cfTurnstileToken ||
    //   (req.headers['cf-turnstile-response'] as string | undefined);
    // const turnstileOk = await verifyTurnstile(turnstileToken || '', ip);
    // if (!turnstileOk) {
    //   return json(res, 400, { error: 'Captcha verification failed' });
    // }

    // Валідація полів
    const allowedTypes = new Set([
      'email',
      'telegram',
      'phone',
      'whatsapp',
      'other',
    ]);

    let { name, contactType, contact, message, catName } = data;

    if (!name || !contactType || !contact || !message) {
      return json(res, 400, { error: 'Required fields are missing' });
    }
    if (!allowedTypes.has(contactType)) {
      return json(res, 400, { error: 'Invalid contactType' });
    }

    // Ліміти довжини
    name = clamp(name, 120);
    contact = clamp(contact, 256);
    message = clamp(message, 3000);
    catName = catName ? clamp(catName, 120) : undefined;

    // Escape для MarkdownV2
    const nameSafe = escapeMdV2(name);
    const contactSafe = escapeMdV2(contact);
    const msgSafe = escapeMdV2(message);
    const catSafe = catName ? escapeMdV2(catName) : '';

    // Лейбли контактів
    const contactTypeLabels: Record<string, string> = {
      email: '📧 Email',
      telegram: '📱 Telegram',
      phone: '📞 Phone',
      whatsapp: '💬 WhatsApp',
      other: '📝 Other',
    };

    // Локалізований час (Київ)
    const sentAt = new Intl.DateTimeFormat('ru-RU', {
      timeZone: 'Europe/Moscow',
      dateStyle: 'short',
      timeStyle: 'medium',
    }).format(new Date());

    // Формуємо повідомлення з MarkdownV2
    const telegramMessage =
      `*🐱 Новое сообщение с сайта Заводские кошки*\n\n` +
      `*👤 Name:* ${nameSafe}\n` +
      `${contactTypeLabels[contactType] || '📞 Contact'}: ${contactSafe}\n` +
      (catSafe ? `*🐾 Cat:* ${catSafe}\n` : '') +
      `\n*💬 Message:*\n${msgSafe}\n` +
      `\n_Sent: ${escapeMdV2(sentAt)}_`;

    // Надсилаємо у Telegram
    const tgUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
    const body = {
      chat_id: chatId,
      text: telegramMessage,
      parse_mode: 'MarkdownV2',
      disable_web_page_preview: true,
    };

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!telegramResponse.ok) {
      // зчитаємо текст помилки, але не віддаємо сирі дані клієнту
      const errText = await telegramResponse.text();
      console.error('Telegram API error:', errText.slice(0, 500));
      return json(res, 502, { error: 'Error sending message' });
    }

    return json(res, 200, {
      success: true,
      message: 'Сообщение успешно отправлено!',
    });
  } catch (e) {
    console.error('Contact API error:', e);
    return json(res, 500, { error: 'Internal server error' });
  }
}
