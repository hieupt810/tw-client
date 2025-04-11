'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import FormCheckbox from '@/components/form-checkbox';
import FormInput from '@/components/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Regex } from '@/constants/regex';
import { postSignUp } from '@/services/auth';

const signUpSchema = z
  .object({
    name: z.string().min(1, { message: 'This field is required.' }),
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
    confirmPassword: z.string().min(1, { message: 'This field is required.' }),
    acceptTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

type ISignUpSchema = z.infer<typeof signUpSchema>;

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
    const request = await postSignUp(values);
    if (request) {
      router.push('/sign-in');
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
          <UserRoundPlus size={40} />
        </div>
      </div>
      <h1 className='mt-4 text-center text-4xl/relaxed font-bold'>Sign up</h1>
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
  );
}
