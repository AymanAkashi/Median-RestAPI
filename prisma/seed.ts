import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  // create two dummy users

  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: {
      password: passwordSabin,
    },
    create: {
      email: 'sabin@adams.com',
      name: 'Sabin Adams',
      password: passwordSabin,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: {
      password: passwordAlex,
    },
    create: {
      email: 'alex@ruheni.com',
      name: 'Alex Ruheni',
      password: passwordAlex,
    },
  });

  // create two dummy articles
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: { authorId: user1.id },
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
      authorId: user1.id,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {
      authorId: user2.id,
    },
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pellentesque finibus interdum. Pellentesque a sem sed felis rutrum rutrum. Cras sit amet ligula nunc. Pellentesque nibh ante, mattis et commodo in, volutpat sit amet leo. Sed laoreet, orci ut pretium malesuada, augue nisl malesuada est, eu porta nunc elit id ligula. Praesent et scelerisque nulla, at gravida odio. Nulla et orci leo. Phasellus elementum mauris sit amet pellentesque tincidunt. Sed commodo lobortis neque, et egestas neque consequat non. Nulla sit amet elementum libero, id viverra urna. Fusce luctus tincidunt congue. Proin nec consequat tellus. Vivamus gravida turpis a arcu viverra, vel faucibus massa congue. Quisque vel feugiat augue, quis vehicula nisl Nam vestibulum odio nec vestibulum hendrerit. Duis mattis justo vitae turpis ullamcorper tempus. Nullam pretium, sapien ac fermentum aliquam, nisl magna blandit nisi, in suscipit lorem nisi vitae dui. Quisque elementum felis a massa luctus, ac sollicitudin dui volutpat. Suspendisse potenti. Sed id porttitor massa. Maecenas id maximus urna, sit amet consequat urna. Pellentesque non pellentesque elit, vitae consequat ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur magna ligula, tincidunt id dolor ultricies, molestie eleifend felis. Sed erat arcu, eleifend interdum auctor et, aliquam eget lacus. Curabitur mattis ac dolor in commodo. Nulla facilisi. Nullam at nibh elit. Cras nec elit sodales, mattis mi sit amet, ullamcorper neque Etiam egestas mi id augue vulputate, sed malesuada elit vehicula. Nunc vitae diam et turpis laoreet semper vel vel lacus. Curabitur ultricies sagittis orci, non sagittis lectus ultrices at. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus sapien dui, sollicitudin non nisi ac, varius feugiat elit. Aenean cursus et sapien at interdum. Sed sed posuere magna, sit amet interdum erat. Duis fermentum, sem nec aliquam condimentum, tellus tellus maximus purus, non hendrerit ligula neque non lacus. Pellentesque sed lacus metus. Mauris facilisis maximus odio, quis pharetra sapien hendrerit mattis. Nullam imperdiet ligula venenatis dignissim aliquet Quisque at orci elit. Nulla tristique purus nec ligula sodales, quis suscipit libero lacinia. Sed quis nibh lobortis, ultrices ex nec, egestas quam. Donec pellentesque tincidunt facilisis. Pellentesque posuere maximus faucibus. Donec pretium ante massa, sed posuere nunc fermentum vitae. Cras sed risus sed tellus tincidunt feugiat nec ac augue. Aliquam eget urna non arcu suscipit lacinia. Nulla fermentum elit elit, tristique cursus diam pharetra non. Sed vel venenatis sem, pellentesque pellentesque nibh. Integer sit amet vulputate ligula. Sed ac tincidunt leo. Phasellus sit amet tempus mauris. Praesent vehicula vulputate urna cursus sollicitudin Praesent cursus lacus vel dolor porttitor, at dignissim dui semper. Quisque ut libero sem. Praesent suscipit augue ac egestas fermentum. Aliquam ac nunc erat. Vivamus in nulla eu diam vehicula tincidunt. Proin ut arcu tellus. Praesent ultrices consectetur consequat. Nam posuere tincidunt placerat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla auctor egestas tincidunt. Vestibulum quis turpis quam.',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
      authorId: user2.id,
    },
  });

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
