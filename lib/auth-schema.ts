import * as z from 'zod';

export const authFormSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .trim()
    .min(8, { message: 'Must be 8 or more characters long' }),
    });
    
   
export type authFormSchemaType = z.infer<typeof authFormSchema>;
