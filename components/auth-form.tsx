'use client';

import Link from 'next/link';
import { authFormSchemaType, authFormSchema } from '@/lib/auth-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './form-input';
import { z } from 'zod';

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authFormSchemaType>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof authFormSchema>) =>
    console.log(values);

  return (
    <form id='auth-form' onSubmit={handleSubmit(onSubmit)}>
      <div>
        <img src='/images/auth-icon.jpg' alt='A lock icon' />
      </div>

      <FormInput
        id='email'
        type='email'
        label='Email'
        name='email'
        register={register}
        error={errors.email}
      />
      <FormInput
        id='password'
        type='password'
        label='Password'
        name='password'
        register={register}
        error={errors.password}
      />

      <p>
        <button type='submit'>Create Account</button>
      </p>
      <p>
        <Link href='/'>Login with existing account.</Link>
      </p>
    </form>
  );
}
