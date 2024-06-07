import React from 'react';
import { FormInputProps } from '@/lib/types';

const FormInput: React.FC<FormInputProps> = ({
  type,
  label,
  id,
  name,
  register,
  error,
}) => {
  return (
    <p>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={id}
        {...register(name)}
      />
      {error && <span>{error.message}</span>}
    </p>
  );
};

export default FormInput;
