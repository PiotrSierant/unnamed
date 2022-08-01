import { AppShell, Button, Center, Container, Header, Space, Title } from '@mantine/core';
import { Post as PostPrisma } from '@prisma/client';
import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInput } from '../components/form/TextInput';
import { TextareaInput } from '../components/form/TextareaInput';

const schema = yup
  .object({
    title: yup.string().required('Tytuł jest wymagany'),
    content: yup.string().required('Treść jest wymagana'),
    slug: yup.string().required('Slug jest wymagany'),
  })
  .required();

interface PostForm extends yup.InferType<typeof schema> {}

const NewPost: NextPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: PostForm) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput control={control} name="title" label="Tytuł" />
      <TextareaInput control={control} name="content" autosize minRows={10} maxRows={20} label="Treść" />
      <TextInput control={control} name="slug" label="Slug" />
      <Space h="xl" />
      <Button type="submit"> Dodaj wpis</Button>
    </form>
  );
};

export default NewPost;
