'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { Loader2, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import FormCheckbox from '@/components/form-checkbox';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { AuthService } from '@/services/auth';
import { IError } from '@/types/IError';
import { ISignUpSchema, signUpSchema } from '@/types/ISignUpSchema';
import { IValidationError } from '@/types/IValidationError';

import AuthLayout from '../auth-layout';

const SignUpPage = () => {
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

  const onSubmit = async (values: ISignUpSchema) => {
    try {
      await AuthService.signUp(values);
      toast.success('Signed up successfully.');
      router.push('/sign-in');
    } catch (error) {
      if (error instanceof HTTPError) {
        const response = await error.response.json<IValidationError | IError>();
        if (
          error.response.status === 400 &&
          typeof response.error === 'object'
        ) {
          Object.entries(response.error).forEach(([field, messages]) => {
            form.setError(
              field as keyof ISignUpSchema,
              {
                type: 'value',
                message: messages.join(', '),
              },
              { shouldFocus: true },
            );
          });
          return;
        } else if (typeof response.error === 'string') {
          toast.error(response.error);
          return;
        }
      }
      toast.error('An unexpected error occurred. Please try again later.');
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <AuthLayout image='/sign-up.jpg'>
      <div className='mx-auto w-full max-w-md'>
        <div className='flex items-center justify-center'>
          <div className='border-muted rounded-lg border p-2'>
            <UserRoundPlus size={40} />
          </div>
        </div>
        <h1 className='mt-4 text-center text-3xl font-bold'>Sign up</h1>
        <p className='text-muted-foreground mt-1.5 text-center'>
          Explore personalized travel recommendations.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onKeyDown={handleOnKeyDown}
            className='mt-8 flex flex-col gap-2.5'
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
};

export default SignUpPage;
