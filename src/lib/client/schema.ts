import z from 'zod';

const passwordRequirement = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

export const registerSchema = z.object({
  name: z.string().min(1, 'Voer een naam in.'),
  email: z.string().email('Voer een gelding e-mailadres in.'),
  password: z
    .string()
    .min(1, 'Voer een gelding wachtwoord in.')
    .regex(
      passwordRequirement,
      'Wachtwoord moet minstens 8 karakters lang zijn en minstens één hoofdletter, één kleine letter, één cijfer en één speciale karakter bevatten.'
    ),
});

export const loginSchema = z.object({
  email: z.string().email('Voer een gelding e-mailadres in.'),
  password: z.string().min(1, 'Voer een gelding wachtwoord in.'),
});
