import { AppProps } from 'next/app';
import Head from 'next/head';
import { AppShell, Button, Container, Group, Header, MantineProvider, Title, UnstyledButton } from '@mantine/core';
import Link from 'next/link';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Medium clone</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
        }}
      >
        <AppShell
          padding="lg"
          header={
            <Header height={60} p="xs">
              <Group align="center" position="apart">
                <Link href="/" passHref>
                  <UnstyledButton component="a">
                    <Title order={1}>Twój blog</Title>
                  </UnstyledButton>
                </Link>
                <Link href="new-post" passHref>
                  <Button component="a">Dodaj Wpis</Button>
                </Link>
              </Group>
            </Header>
          }
          styles={(theme) => ({
            main: { height: '100%' },
          })}
        >
          <Container size="lg">
            <Component {...pageProps} />
          </Container>
        </AppShell>
      </MantineProvider>
    </>
  );
}
