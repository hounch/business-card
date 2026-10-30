import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Очищаем базу перед заполнением
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.profile.deleteMany();

  // Создаем профиль и привязываем к нему всё остальное
  await prisma.profile.create({
    data: {
      name: 'Евгения',
      description: 'Backend-разработчик на Node.js и NestJS',
      githubUrl: 'https://github.com/hounch',
      
      skills: {
        create: [
          { name: 'JavaScript' },
          { name: 'TypeScript' },
          { name: 'React' },
          { name: 'TailwindCSS' },
          { name: 'Node.js' },
          { name: 'NestJS' },
          { name: 'Prisma' },
          { name: 'GraphQL' },
          { name: 'Docker' },
        ],
      },
      
      experience: {
        create: [
          {
            company: 'Акаито Тех',
            position: 'Frontend Developer',
            startDate: new Date('2025-03-22'),
            endDate: null,
            achievements: [
              'Сборка приложения в контейнере Docker',
              'Интернационализация через маршрутизацию',
              'Внедрение админ-панели (Decap CMS)',
              'Сборка мобильного Android-приложения через Capacitor;',
              'Интеграция внешних сервисов: Яндекс.Метрика, форма обратной связи через Yandex Forms, виджет постов и видео VK'
            ],
          },
        ],
      },
      
      projects: {
        create: [
          {
            name: 'Лэндинг для студии йоги «Йога Хом»',
            url: 'https://v0-portfolio-phi-ashy.vercel.app/evgeniya-li',
          },
          {
            name: 'Портал Туристско-информационного центра Краснодара',
            url: 'https://tourism.krd.ru/',
          },
          {
            name: 'ИС поддержки участников СВО',
            url: 'https://xn--80aaad4bc5ans8b.xn--p1ai/',
          },
        ],
      },
    },
  });

  console.log('🎉 База данных успешно заполнена!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });