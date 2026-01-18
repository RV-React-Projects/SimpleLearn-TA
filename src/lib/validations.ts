import { z } from 'zod';

export const rsvpFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid business email address'),
  company: z.string().min(2, 'Company name is required'),
  jobTitle: z.string().min(2, 'Job title is required'),
  country: z.string().min(1, 'Please select a country'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to receive communications',
  }),
});

export type RsvpFormData = z.infer<typeof rsvpFormSchema>;
