'use client';

import { useRouter } from 'next/navigation';

import api from '@/api';
import { AuthRoutes } from '@/constants/routes';
import IMessage from '@/types/IMessage';
import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ISignUpSchema, ISignUpSchemaErrors, signUpSchema } from './schema';

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
      acceptTerms: false,
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
        // Handle validation errors
        const response = await error.response.json<ISignUpSchemaErrors>();
        if (response.status === 400 && response.data) {
          Object.entries(response.data).forEach(([field, messages]) => {
            form.setError(
              field as keyof ISignUpSchema,
              {
                type: 'value',
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
