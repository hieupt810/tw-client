'use client';

import Link from 'next/link';

import { Loader2 } from 'lucide-react';

import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import useSignInHook from './helpers/hook';

export default function SignInPage() {
  const { form, onSubmit, handleOnKeyDown } = useSignInHook();

  return (
    <div className='w-full max-w-md'>
      <h1 className='text-center text-4xl/relaxed font-bold'>Sign in</h1>
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
