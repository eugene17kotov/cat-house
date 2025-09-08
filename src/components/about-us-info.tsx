export default function AboutUsInfo() {
  return (
    <div className='w-full max-h-[75vh] overflow-y-auto'>
      {/* Mission Statement */}
      <div className='mb-8'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>Наша миссия</h3>
        <div className='space-y-2 text-gray-600 leading-relaxed'>
          <p>
            Мы стремимся дарить кошкам завода не выживание в руинах, а заботу,
            дом и любящую семью. Первый завод, где кошки нашли спасение
            благодаря команде неравнодушных волонтёров.
          </p>
          <p>
            Автор проекта — Наталья Цветова, опытный волонтёр и хозяйка приюта,
            созданного на территории завода. В приюте живут кошки, когда-то
            обитавшие на заводе.
          </p>
          <p>
            Волонтёры «Котодома» ежедневно заботится более чем о 70 кошках:
            кормит, лечит, находит новые семьи. Помещение для кошек
            предоставлено компанией ФСК, застройщиком завода.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className='mb-8'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          История проекта
        </h3>
        <div className='space-y-2'>
          {/* 1 */}
          <div className='bg-blue-50 rounded-xl p-4'>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
              <span className='font-medium text-blue-900'>2021</span>
            </div>
            <p className='text-blue-800 ml-6'>
              Начат отлов кошек на заводе ЖБИ на ул. Шеногина и заводе ДСК на
              ул. Беговой
            </p>
          </div>

          {/* 2 */}
          <div className='bg-blue-50 rounded-xl p-4'>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
              <span className='font-medium text-blue-900'>2024</span>
            </div>
            <p className='text-blue-800 ml-6'>
              Завод ДСК на ул. Беговой снесен, часть оставшихся кошек оттуда
              перевезены на территорию завода ЖБИ на ул. Шеногина
            </p>
          </div>

          {/* 3 */}
          <div className='bg-amber-50 border border-amber-200 rounded-xl p-4'>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-3 h-3 bg-blue-500 rounded-full'></div>
              <span className='font-medium text-blue-900'>2025</span>
            </div>
            <p className='text-amber-800 ml-6'>
              Завод ЖБИ на ул. Шеногина снесен,{' '}
              <strong>
                планируется к сносу помещение на территории промзоны, где сейчас
                обитают кошки.{' '}
              </strong>
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className='mb-8'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Наши достижения
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='bg-gray-50 rounded-xl p-6 text-center'>
            <div className='text-3xl font-bold text-gray-900 mb-2'>198</div>
            <div className='text-sm text-gray-600'>Кошек всего отловлено</div>
          </div>
          <div className='bg-gray-50 rounded-xl p-6 text-center'>
            <div className='text-3xl font-bold text-gray-900 mb-2'>128</div>
            <div className='text-sm text-gray-600'>
              Пристроено в добрые руки
            </div>
          </div>
          <div className='bg-gray-50 rounded-xl p-6 text-center'>
            <div className='text-3xl font-bold text-gray-900 mb-2'>70+</div>
            <div className='text-sm text-gray-600'>Кошек под опекой сейчас</div>
          </div>
        </div>
      </div>

      {/* Current Situation */}
      <div className='mb-8'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>
          Текущая ситуация
        </h3>
        <div className='space-y-4 text-gray-600 leading-relaxed'>
          <p>
            Мы обитаем в помещении на территории промзоны, где можно временно
            содержать кошек. Снос промзон занимает много времени, за этот период
            команда отлавливает и пристраивает животных.
          </p>
          <div className='bg-amber-50 border border-amber-200 rounded-xl p-4'>
            <p className='text-amber-800'>
              <strong>Важно:</strong> В данный момент остро стоит вопрос
              пристройства кошек, так как завод собираются сносить уже в
              ближайшее время.
            </p>
          </div>
        </div>
      </div>

      {/* How to Help */}
      <div className='mb-6'>
        <h3 className='text-lg font-medium text-gray-900 mb-4'>Как помочь</h3>
        <div className='bg-blue-50 rounded-xl p-6'>
          <p className='text-blue-800 leading-relaxed mb-4'>
            Продолжается сбор средств на аренду нового помещения, переезд и
            содержание тех кошек, что не успеем раздать в столь сжатые сроки.
          </p>
          <div className='text-blue-800'>
            <strong>Также всегда рады помощи в следующем:</strong>
            <ul className='list-disc list-inside mt-2 space-y-1'>
              <li>Корма для кошек</li>
              <li>Переноски</li>
              <li>Пеленки</li>
              <li>Наполнитель</li>
              <li>Свободные руки для помощи в уходе и социализации кошек</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
