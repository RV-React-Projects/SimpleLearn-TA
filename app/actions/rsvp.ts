'use server';

import { airtableClient } from '@/lib/airtable';
import { rsvpFormSchema } from '@/lib/validations';

export async function submitRsvp(formData: FormData) {
  try {
    // Parse form data
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      company: formData.get('company'),
      jobTitle: formData.get('jobTitle'),
      country: formData.get('country'),
      phone: formData.get('phone'),
      consent: formData.get('consent') === 'true',
    };

    // Validate with Zod
    const validatedData = rsvpFormSchema.parse(data);
    
    console.log('📝 Submitting to Airtable Base:', process.env.AIRTABLE_BASE_ID);
    console.log('📝 Table:', process.env.AIRTABLE_TABLE_NAME);
    console.log('📝 Data:', validatedData);

    // Submit to Airtable
    const response = await airtableClient.create([
      {
        fields: {
          'First Name': validatedData.firstName,
          'Last Name': validatedData.lastName,
          'Email': validatedData.email,
          'Company': validatedData.company,
          'Job Title': validatedData.jobTitle,
          'Country': validatedData.country,
          'Phone': validatedData.phone,
          'Consent': validatedData.consent,
        },
      },
    ]);

    console.log('✅ Airtable Success:', response[0].id);

    return { success: true, message: 'Registration successful!' };
  } catch (error) {
    console.error('❌ RSVP submission error:', error);
    return { success: false, message: 'Registration failed. Please try again.' };
  }
}
