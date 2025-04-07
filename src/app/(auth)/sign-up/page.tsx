'use client';

import Link from 'next/link';

import { Loader2 } from 'lucide-react';

import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

import useSignUpHook from './helpers/hook';

export default function SignUpPage() {
  const { form, onSubmit, handleOnKeyDown } = useSignUpHook();

  return (
    <div className='w-full max-w-md'>
      <h1 className='text-center text-4xl/relaxed font-bold'>Sign up</h1>
      <p className='text-muted-foreground mt-1 text-center'>
        Explore personalized travel recommendations.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onKeyDown={handleOnKeyDown}
          className='mt-10 flex flex-col gap-4'
        >
          <FormInput
            form={form}
            name='name'
            label='Full name'
            placeholder='Enter your full name'
          />
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
          <FormInput
            form={form}
            name='confirmPassword'
            label='Confirm password'
            type='password'
            placeholder='Re-enter your password'
          />
          <Button
            type='submit'
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
            className='mt-4'
          >
            {form.formState.isSubmitting && (
              <Loader2 className='animate-spin' />
            )}
            Sign up
          </Button>
        </form>
      </Form>
      <p className='text-muted-foreground mt-8 text-center text-sm'>
        Already have an account?{' '}
        <Link href='/sign-in' passHref>
          <Button variant='link' className='!h-auto !p-0'>
            Click to sign in
          </Button>
        </Link>
      </p>
    </div>
  );
}
