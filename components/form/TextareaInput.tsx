import { Space, Textarea, TextareaProps } from '@mantine/core';
import { Controller, FieldValues, useController, UseControllerProps } from 'react-hook-form';

interface InputFieldProps<T extends FieldValues>
  extends Omit<TextareaProps, 'name' | 'defaultValue'>,
    Pick<UseControllerProps<T>, 'name' | 'control' | 'defaultValue'> {}

export const TextareaInput = <T extends FieldValues>({ control, defaultValue, name, ...props }: InputFieldProps<T>) => {
  const {
    fieldState: { error },
  } = useController({ name, control });

  return (
    <>
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        render={({ field }) => <Textarea {...props} {...field} error={error?.message} />}
      />
      <Space h="md" />
    </>
  );
};
