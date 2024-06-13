'use client';

import Link from 'next/link';
import { authFormSchemaType, authFormSchema } from '@/lib/auth-schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from './form-input';
import { login, signup } from '@/actions/auth-actions';
import { ValidFieldNames } from '@/lib/types';

export default function AuthForm({ mode }: { mode: string }) {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
    setError,
  } = useForm<authFormSchemaType>({
    resolver: mode === 'login' ? undefined : zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: authFormSchemaType) => {
    const result =
      mode === 'login' ? await login(values) : await signup(values);

    if (result?.errors) {
      setError('email', {
        type: 'manual',
        message: result.errors.email,
      });
    }
  };
  const resetErrors = () => {
    Object.keys(errors).forEach((fieldName) => {
      setError(fieldName as ValidFieldNames, {
        type: 'manual',
        message: '',
      });
    });
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
          {isSubmitting
            ? 'Submitting'
            : mode === 'login'
            ? 'Login'
            : 'Create Account'}
        </button>
      </p>
      <p onClick={resetErrors}>
        {mode === 'login' ? (
          <Link href='/?mode=signup'>Create an account.</Link>
        ) : (
          <Link href='/?mode=login'>Login with existing account.</Link>
        )}
      </p>
    </form>
  );
}
