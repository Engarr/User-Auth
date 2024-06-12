'use server';

import { createAuthSession } from '@/lib/auth';
import { authFormSchemaType } from '@/lib/auth-schema';
import { hashUserPassword } from '@/lib/hash';
import { createUser } from '@/lib/user';
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
