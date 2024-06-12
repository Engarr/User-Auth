'use client';

import Link from 'next/link';
import { authFormSchemaType, authFormSchema } from '@/lib/auth-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './form-input';
import { z } from 'zod';
import { signup } from '@/actions/auth-actions';

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<authFormSchemaType>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: authFormSchemaType) => {
    const result = await signup(values);
    if (result?.errors) {
      setError('email', {
        type: 'manual',
        message: result.errors.email,
      });
    }
  };

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
        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting' : 'Create Account'}
        </button>
      </p>
      <p>
        <Link href='/'>Login with existing account.</Link>
      </p>
    </form>
  );
}
