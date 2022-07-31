import z from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Voer een naam in.'),
  email: z.string().email('Voer een gelding e-mailadres in.'),
  password: z.string().min(1, 'Voer een gelding wachtwoord in.'),
});

export const loginSchema = z.object({
  email: z.string().email('Voer een gelding e-mailadres in.'),
  password: z.string().min(1, 'Voer een gelding wachtwoord in.'),
});
