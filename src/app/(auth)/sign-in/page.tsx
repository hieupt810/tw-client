'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { Loader2, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Constant } from '@/constants';
import { AuthService } from '@/services/auth';
import { IValidationError } from '@/types/IError';
import { ISignInSchema, signInSchema } from '@/types/ISignInSchema';

import AuthLayout from '../auth-layout';

export default function SignInPage() {
  const router = useRouter();

  const form = useForm<ISignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: ISignInSchema) {
    try {
      const data = await AuthService.signIn(values);

      // Store the tokens in local storage
      localStorage.setItem(
        Constant.LOCAL_STORAGE_KEY.ACCESS_TOKEN_KEY,
        data.access_token,
      );
      localStorage.setItem(
        Constant.LOCAL_STORAGE_KEY.REFRESH_TOKEN_KEY,
        data.refresh_token,
      );

      // Toast success message
      toast.success('Success');

      // Redirect to the home page
      router.push('/');
    } catch (error) {
      if (error instanceof HTTPError) {
        const data = await error.response.json<IValidationError>();

        // Handle validation errors
        if (error.response.status === 400 && typeof data.error === 'object') {
          Object.entries(data.error).forEach(([field, messages]) => {
            form.setError(
              field as keyof ISignInSchema,
              {
                type: 'value',
                message: messages.join(', '),
              },
              { shouldFocus: true },
            );
          });
          return;
        } else if (
          error.response.status === 400 &&
          typeof data.error === 'string'
        ) {
          toast.error(data.error);
          return;
        }
      }
      toast.error('Something went wrong');
    }
  }

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  }

  return (
    <AuthLayout image='/sign-in.jpg'>
      <div className='mx-auto w-full max-w-md'>
        <div className='flex items-center justify-center'>
          <div className='border-muted rounded-md border p-2'>
            <LogIn size={28} />
          </div>
        </div>
        <h1 className='mt-4 text-center text-3xl font-bold'>Sign in</h1>
        <p className='text-muted-foreground mt-1.5 text-center'>
          Welcome back! Please sign in to your account.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={handleOnKeyDown}
            className='mt-8 flex flex-col gap-2.5'
          >
            <FormInput
              form={form}
              name='email'
              label='Email'
              placeholder='Enter your email address'
            />
            <FormInput
              form={form}
              name='password'
              label='Password'
              type='password'
              placeholder='Enter your password'
            />
            <Link href='/forgot-password' passHref className='ml-auto'>
              <Button variant='link' className='mt-4 !h-auto !p-0'>
                Forgot password?
              </Button>
            </Link>
            <Button
              type='submit'
              disabled={form.formState.isSubmitting}
              aria-disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className='animate-spin' />
              )}
              Sign in
            </Button>
          </form>
        </Form>
        <p className='text-muted-foreground mt-8 text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link href='/sign-up' passHref>
            <Button variant='link' className='!h-auto !p-0'>
              Click to sign up
            </Button>
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
