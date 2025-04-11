'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Regex } from '@/constants/regex';
import { postSignIn } from '@/services/auth';

const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field is required.' })
    .email('Invalid email address.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(32, 'Password must be at most 32 characters long.')
    .regex(Regex.PASSWORD, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
});

type ISignInSchema = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const router = useRouter();
  const form = useForm<ISignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: ISignInSchema) {
    const response = await postSignIn(values);
    if (response) {
      router.push('/');
    }
  }

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  }

  return (
    <div className='w-full max-w-md'>
      <div className='flex items-center justify-center'>
        <div className='border-muted rounded-lg border p-2'>
          <LogIn size={36} />
        </div>
      </div>
      <h1 className='mt-4 text-center text-4xl/relaxed font-bold'>Sign in</h1>
      <p className='text-muted-foreground mt-1 text-center'>
        Welcome back! Please sign in to your account.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyDown={handleOnKeyDown}
          className='mt-8 flex flex-col gap-3'
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
  );
}
