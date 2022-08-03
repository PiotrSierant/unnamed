import { Alert, AppShell, Button, Center, Container, Header, Space, Title } from '@mantine/core';
import { Post as PostPrisma } from '@prisma/client';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { TextInput } from '../components/form/TextInput';
import { TextareaInput } from '../components/form/TextareaInput';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { PostSchema, postSchema } from '../utils/postSchema';

const NewPost: NextPage = () => {
  const router = useRouter();
  const [error, setError] = useState<null | string>(null);
  const { control, handleSubmit } = useForm<PostSchema>({
    resolver: yupResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
      slug: '',
    },
  });

  const onSubmit = async (data: PostSchema) => {
    setError(null);
    const response = await fetch('/api/new-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log(response);
    if (response.status === 200) {
      return router.push('/');
    }

    const content = await response.json();
    setError(content.error);
  };

  return (
    <>
      {error && (
        <Alert title="Błąd!" color="red" withCloseButton onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput control={control} name="title" label="Tytuł" />
        <TextareaInput control={control} name="content" autosize minRows={10} maxRows={20} label="Treść" />
        <TextInput control={control} name="slug" label="Slug" />
        <Space h="xl" />
        <Button type="submit"> Dodaj wpis</Button>
      </form>
    </>
  );
};

export default NewPost;
