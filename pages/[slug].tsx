import { AppShell, Text, Container, Header, Space, Title, Button, Group } from '@mantine/core';
import { Post as PostPrisma } from '@prisma/client';
import type { GetServerSidePropsContext, NextPage } from 'next';
import Link from 'next/link';
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
      <Group align="center" position="apart">
        <Title order={2}>{post.title}</Title>
        <Link href={`edit-post/${post.slug}`} passHref>
          <Button component="a">Edytuj Wpis</Button>
        </Link>
      </Group>
      <Space h="xl" />
      <Text style={{ whiteSpace: 'break-spaces' }}>{post.content}</Text>
    </>
  );
};

export default Home;
