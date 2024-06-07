import { FieldError, UseFormRegister } from 'react-hook-form';

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Session {
  id: string;
  expires_at: number;
  user_id: number;
}

export interface Training {
  id: number;
  title: string;
  image: string;
  description: string;
}
export type FormData = {
  password?: string;
  email?: string;
};

export type ValidFieldNames = 'email' | 'password';

export type FormInputProps = {
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  name: ValidFieldNames;
  id: string;
  type: string;
  label: string;
};
