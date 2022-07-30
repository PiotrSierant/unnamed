import { Container, Title, Text, Group, Stack, Button } from '@mantine/core';
import Link from 'next/link';

interface PostProps {
  title: string;
  content: string;
  date: Date;
  slug: string;
}

export const Post = ({ title, content, date, slug }: PostProps) => {
  return (
    <Link href={'/' + slug}>
      <a style={{ textDecoration: 'none', color: 'unset' }}>
        <Container fluid style={{ border: '1px solid', borderRadius: '4px', padding: '24px' }}>
          <Stack>
            <Group align="center" position="apart">
              <Title order={2}>{title}</Title>
              <Title order={4}>{new Date(date).toLocaleDateString('pl')}</Title>
            </Group>
            <Text lineClamp={3}>{content}</Text>
          </Stack>
        </Container>
      </a>
    </Link>
  );
};
