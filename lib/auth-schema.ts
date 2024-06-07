import * as z from 'zod';

export const authFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, { message: 'Must be 5 or more characters long' }),
});

export type authFormSchemaType = z.infer<typeof authFormSchema>;
