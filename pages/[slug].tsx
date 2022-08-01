import { AppShell, Text, Container, Header, Space, Title } from '@mantine/core';
import { Post as PostPrisma } from '@prisma/client';
import type { GetServerSidePropsContext, NextPage } from 'next';
import { Post } from '../components/post/Post';

import { prisma } from '../lib/prisma';

export const getServerSideProps = async ({ params }: GetServerSidePropsContext<{ slug: string }>) => {
  console.log({ params });

  if (!params?.slug) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  console.log(params);
  const post = await prisma.post.findFirst({ where: { slug: params.slug } });

  console.log({ post });
  if (!post) {
    return {
      redirect: {
        destination: '/',
      },
    };
  }

  return { props: { post: JSON.parse(JSON.stringify(post)) as PostPrisma } };
};

interface Props {
  post: PostPrisma;
}

const Home: NextPage<Props> = ({ post }) => {
  return (
    <>
      <Title order={2}>{post.title}</Title>
      <Space h="xl" />
      <Text style={{ whiteSpace: 'break-spaces' }}>{post.content}</Text>
    </>
  );
};

export default Home;
