import { AppShell, Center, Container, Header, Title } from '@mantine/core';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
      <AppShell
          padding="lg"
          header={
            <Header height={60} p="xs">
              <Title order={1}>Twój blog</Title>
            </Header>
          }
          styles={(theme) => ({
            main: { height: '100%' },
          })}
      >
        <Container>
          <Center> Tu będą posty </Center>
        </Container>
      </AppShell>
  );
};

export default Home;