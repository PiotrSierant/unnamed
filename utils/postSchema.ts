import * as yup from 'yup';

export const postSchema = yup
  .object({
    title: yup.string().required('Tytuł jest wymagany'),
    content: yup.string().required('Treść jest wymagana'),
    slug: yup.string().required('Slug jest wymagany'),
  })
  .required();

export interface PostSchema extends yup.InferType<typeof postSchema> {}
