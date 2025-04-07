'use client';

import { useRouter } from 'next/navigation';

import api from '@/api';
import { AuthRoutes } from '@/constants/routes';
import IErrorResponse from '@/types/IErrorResponse';
import IMessage from '@/types/IMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ISignUpSchema, signUpSchema } from './schema';

export default function useSignUpHook() {
  const router = useRouter();

  const form = useForm<ISignUpSchema>({
    resolver: zodResolver(signUpSchema),
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: ISignUpSchema) {
    try {
      const { name, email, password } = values;
      const response = await api
        .post(AuthRoutes.SIGN_UP, {
          json: { name, email, password },
        })
        .json<IMessage>();
      if (response.status === 200) {
        toast.success(response.message);
        router.push('/sign-in');
      }
    } catch (error) {
      if (error instanceof HTTPError) {
        const response = await error.response.json<IErrorResponse>();
        if (error.response.status === 400) {
          Object.keys(response.data).forEach((key) => {
            form.setError(key as keyof z.infer<typeof signUpSchema>, {
              message: response.data[key][0],
            });
          });
        } else {
          toast.error(response.message);
        }
      } else {
        toast.error('An error occurred. Please try again later.');
        console.log('~ Error on sign up:', error);
      }
    }
  }

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  }

  return { form, onSubmit, handleOnKeyDown };
}
