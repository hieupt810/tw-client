'use client';

import { useRouter } from 'next/navigation';

import api from '@/api';
import { ACCESS_TOKEN_KEY } from '@/constants';
import { AuthRoutes } from '@/constants/routes';
import IErrorResponse from '@/types/IErrorResponse';
import { ITokenPair } from '@/types/ITokenPair';
import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ISignInSchema, signInSchema } from './schema';

export default function useSignInHook() {
  const router = useRouter();

  const form = useForm<ISignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: ISignInSchema) {
    try {
      const response = await api
        .post(AuthRoutes.SIGN_IN, { json: values })
        .json<ITokenPair>();
      if (response.status === 200) {
        // Save the access token and refresh token to local storage
        const { access_token, refresh_token } = response.data;
        localStorage.setItem(ACCESS_TOKEN_KEY, access_token);
        localStorage.setItem('refresh_token', refresh_token);

        // Redirect to the home page
        toast.success(response.message);
        router.push('/');
      }
    } catch (error) {
      if (error instanceof HTTPError) {
        const response = await error.response.json<IErrorResponse>();
        if (response.status === 400 && response.data) {
          Object.keys(response.data).forEach((key) => {
            form.setError(key as keyof z.infer<typeof signInSchema>, {
              message: response.data[key][0],
            });
          });
        } else {
          toast.error(response.message);
        }
      } else {
        toast.error('An error occurred. Please try again later.');
        console.log('~ Error on sign in:', error);
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
