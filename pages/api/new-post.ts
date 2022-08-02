import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        ...body,
        createAt: new Date(),
      },
    });
    return res.status(200).json({ post });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res.status(400).json({ error: 'Taki slug już istnieje' });
      }
    }
  }
  return res.status(400).json({ error: 'Spróbuj ponownie' });
}
