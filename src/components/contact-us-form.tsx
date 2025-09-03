'use client';

import { useState } from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const contactOptions = [
  {
    value: 'email',
    label: 'Email',
  },
  {
    value: 'telegram',
    label: 'Telegram',
  },
  {
    value: 'phone',
    label: 'Телефон',
  },
  {
    value: 'whatsapp',
    label: 'WhatsApp',
  },
  {
    value: 'other',
    label: 'Другое',
  },
] as const;

const contactPlaceholders: Record<string, string> = {
  email: 'Введите ваш email',
  telegram: 'Введите Telegram (@вашusername)',
  phone: 'Введите номер телефона',
  whatsapp: 'Введите WhatsApp (+1234567890)',
  other: 'Введите ваши контактные данные',
};

const schema = z.object({
  name: z.string().min(1, 'Имя обязательно'),
  contactType: z.string().min(1, 'Тип контакта обязателен'),
  contact: z.string().min(1, 'Контактная информация обязательна'),
  message: z.string().min(1, 'Сообщение обязательно'),
  //   privacyPolicyAccepted: z.boolean().refine(val => val === true, {
  //     message: 'Необходимо принять Политику конфиденциальности',
  //   }),
});

type ContactFormValues = z.infer<typeof schema>;

export default function ContactUsForm({ onClose }: { onClose?: () => void }) {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      contact: '',
      contactType: '',
      message: '',
      //   privacyPolicyAccepted: false,
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      setIsPending(true);

      // Имитируем отправку сообщения
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Contact form submitted:', values);

      toast.success('Мы получили ваше сообщение!');
      form.reset();
      onClose?.();
    } catch {
      toast.error('Не удалось отправить сообщение. Попробуйте еще раз.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>ИМЯ</FormLabel>
              <FormControl>
                <Input placeholder='Ваше имя' {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex flex-col md:flex-row gap-4 dark:md:gap-0'>
          <FormField
            control={form.control}
            name='contactType'
            render={({ field }) => (
              <FormItem className='w-full md:w-1/2'>
                <FormLabel>ТИП КОНТАКТА</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger className='md:rounded-r-none dark:md:border-r-0'>
                      <SelectValue placeholder='Выберите тип' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {contactOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='contact'
            render={({ field }) => (
              <FormItem className='w-full md:w-1/2 dark:md:border-l-0'>
                <FormLabel>КОНТАКТНАЯ ИНФОРМАЦИЯ</FormLabel>
                <FormControl>
                  <Input
                    className=' md:rounded-l-none'
                    placeholder={
                      contactPlaceholders[form.watch('contactType')] ||
                      'Введите контакт'
                    }
                    {...field}
                    disabled={isPending || !form.watch('contactType')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='message'
          render={({ field }) => (
            <FormItem>
              <FormLabel>СООБЩЕНИЕ</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Ваше сообщение'
                  className={cn('h-28')}
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name='privacyPolicyAccepted'
          render={({ field }) => {
            return (
              <FormItem className='flex items-center gap-2 space-y-0'>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className='text-sm font-normal'>
                  Я принимаю{' '}
                  <button
                    type='button'
                    className='text-primary underline hover:no-underline'
                    onClick={() => {
                      // TODO: Открыть модалку с политикой конфиденциальности
                      console.log('Open privacy policy');
                    }}
                  >
                    Политику конфиденциальности
                  </button>
                </FormLabel>
                <FormMessage />
              </FormItem>
            );
          }}
        /> */}

        <div className='flex justify-end'>
          <Button
            type='submit'
            className='rounded-xl px-4 py-2 font-medium'
            disabled={isPending}
          >
            {isPending ? 'Отправляем...' : 'Отправить сообщение'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
