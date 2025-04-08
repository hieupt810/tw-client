'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import api from '@/api';
import { ACCESS_TOKEN_KEY } from '@/constants';
import { AuthRoutes } from '@/constants/routes';
import { ITokenPair } from '@/types/ITokenPair';

import { ISignInSchema, ISignInSchemaErrors, signInSchema } from './schema';

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
        // Handle validation errors
        const response = await error.response.json<ISignInSchemaErrors>();
        if (response.status === 400 && response.data) {
          Object.entries(response.data).forEach(([field, messages]) => {
            form.setError(
              field as keyof ISignInSchema,
              {
                type: 'server',
                message: messages.join(', '),
              },
              { shouldFocus: true },
            );
          });
        } else {
          // Handle other errors
          toast.error(response.message);
        }
      } else {
        // Handle unexpected errors
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
