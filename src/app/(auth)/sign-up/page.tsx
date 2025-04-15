'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import FormCheckbox from '@/components/form-checkbox';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { postSignUp } from '@/services/auth';
import { ISignUpSchema, signUpSchema } from '@/types/ISignUpSchema';

import AuthLayout from '../auth-layout';

export default function SignUpPage() {
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
    const response = await postSignUp(values);
    if (!response) {
      toast.error('Something went wrong. Please try again later.');
      return;
    }
    if (response.data === 200) {
      toast.success(response.message);
      router.push('/sign-in');
    } else {
      toast.error(response.message);
    }
  }

  function handleOnKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  }

  return (
    <AuthLayout image='/sign-up.jpg'>
      <div className='w-full max-w-md'>
        <div className='flex items-center justify-center'>
          <div className='border-muted rounded-lg border p-2'>
            <UserRoundPlus size={40} />
          </div>
        </div>
        <h1 className='mt-1 text-center text-4xl/relaxed font-bold'>Sign up</h1>
        <p className='text-muted-foreground mt-1 text-center'>
          Explore personalized travel recommendations.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={handleOnKeyDown}
            className='mt-8 flex flex-col gap-3'
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
            <FormCheckbox
              form={form}
              name='acceptTerms'
              label='I accept all terms & conditions'
              required
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
    </AuthLayout>
  );
}
