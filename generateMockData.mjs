import { PrismaClient } from '@prisma/client';

import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const mockedData = [...new Array(10).fill(0)].map(() => ({
  id: faker.datatype.uuid(),
  title: faker.lorem.sentence(5),
  slug: faker.lorem.slug(),
  content: faker.lorem.paragraphs(10),
  createdAt: faker.date.between('2022-06-01T00:00:00.000Z', '2022-06-30T00:00:00.000Z'),
}));

const result = await prisma.post.createMany({
  data: mockedData,
});

console.log(result);