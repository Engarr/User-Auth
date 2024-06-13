'use server';

import { createAuthSession, destroySession } from '@/lib/auth';
import { authFormSchemaType } from '@/lib/auth-schema';
import { hashUserPassword, verifyPassword } from '@/lib/hash';
import { createUser, getuserByEmail } from '@/lib/user';
import { redirect } from 'next/navigation';

export async function signup(values: authFormSchemaType) {
  const { email, password } = values;

  const hashedPassword = hashUserPassword(password);
  try {
    const userId = createUser(email, hashedPassword);
    await createAuthSession(userId);
    redirect('/training');
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return {
        errors: {
          email: 'It seems like account for the chosen email already exists. ',
        },
      };
    }
    throw error;
  }
}

export async function login(values: authFormSchemaType) {
  const { email, password } = values;
  const existingUser = getuserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: 'Could not authenticate user, please check your credentials',
      },
    };
  }
  const isValidPassword = verifyPassword(existingUser.password, password);
  if (!isValidPassword) {
    return {
      errors: {
        email: 'Could not authenticate user, please check your credentials',
      },
    };
  }

  await createAuthSession(existingUser.id);
  redirect('/training');
}

export async function logout() {
  await destroySession();
  redirect('/');
}
