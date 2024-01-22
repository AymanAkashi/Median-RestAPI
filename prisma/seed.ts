import { PrismaClient } from '@prisma/client';
import { asyncScheduler } from 'rxjs';

const prisma = new PrismaClient();

async function main() {
  const Post1 = await prisma.article.upsert({
    where: { title: 'prisma Adds Support For MongoDb' },
    update: {},
    create: {
      title: 'prisma Adds Support For MongoDb',
      body: 'prisma Adds Support For MongoDb',
      description: 'this is the fisrt article for testing the prisma',
      published: false,
    },
  });

  const Post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {},
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
    },
  });

  console.log({ Post1, Post2 });

  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
