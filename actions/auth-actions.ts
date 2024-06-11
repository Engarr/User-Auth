'use server';

import { hashUserPassword } from '@/lib/hash';
import { createUser } from '@/lib/user';

async function signup(formData: FormData) {
  const email = formData.get('email').toString();
  const password = formData.get('password').toString();

  const hashedPassword = hashUserPassword(password);

  createUser(email, hashedPassword);
}
