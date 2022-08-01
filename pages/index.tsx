import { AppShell, Center, Container, Header, Space, Title } from '@mantine/core';
import { Post as PostPrisma } from '@prisma/client';
import type { NextPage } from 'next';
import { Post } from '../components/post/Post';

import { prisma } from '../lib/prisma';

export const getServerSideProps = async () => {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });
  return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
};

type Props = {
  posts: PostPrisma[];
};

const Home: NextPage<Props> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <>
          <Post title={post.title} date={post.createdAt} content={post.content} key={post.id} slug={post.slug} />
          <Space h="md" />
        </>
      ))}
    </>
  );
};

export default Home;
