'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CtaButton } from '@/components/shared/cta-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem, FormMessage
} from '@/ui/form';
import { Input } from '@/ui/input';
import { Checkbox } from '@/ui/checkbox';
import { rsvpFormSchema, type RsvpFormData } from '@/lib/validations';
import { submitRsvp } from '@/app/actions/rsvp';
import { Loader2 } from 'lucide-react';

export function RsvpFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<RsvpFormData>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      jobTitle: '',
      country: '',
      phone: '',
      consent: false,
    },
  });

  // Listen for prefill from Hero
  useEffect(() => {
    const handlePrefill = (e: CustomEvent<string>) => {
       form.setValue('email', e.detail);
       // Optional: Focus next field
       form.setFocus('firstName');
    };
    window.addEventListener('prefill-email', handlePrefill as EventListener);
    return () => window.removeEventListener('prefill-email', handlePrefill as EventListener);
  }, [form]);

  async function onSubmit(data: RsvpFormData) {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      const result = await submitRsvp(formData);
      if (result.success) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="rsvp-form-section" className="relative w-full py-20 min-h-[600px] flex items-center">
      {/* Background Image Area */}
      <div className="absolute inset-0">
         <div 
           className="absolute inset-0 bg-cover bg-center"
           style={{ backgroundImage: 'url(/images/footer-image.png)' }}
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
           
           {/* Space Limited Text - Left Side */}
           <div className="lg:w-1/3 text-white space-y-6 pt-10">
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-widest leading-none text-orange-500">
                Space<br/>Limited
              </h2>
              <p className="text-xl md:text-2xl opacity-90 font-light">
                Reserve your seat for this exclusive roundtable today.
              </p>
           </div>
           
           {/* Glassy Form - Right Side (Restored Full Fields) */}
           <div className="flex-1 w-full bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-xl shadow-2xl">
             {submitStatus === 'success' ? (
               <div className="text-center py-20 animate-fade-in">
                 <div className="text-6xl mb-4">✅</div>
                 <h3 className="text-3xl font-bold text-white mb-2">You&apos;re on the list!</h3>
                 <p className="text-gray-300">We&apos;ve sent a confirmation to your email.</p>
               </div>
             ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    
                    {/* Top Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField control={form.control} name="firstName" render={({ field }) => (
                          <FormItem><FormControl><Input placeholder="First Name" className="bg-white/80 focus:bg-white text-black border-0 h-12" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="lastName" render={({ field }) => (
                          <FormItem><FormControl><Input placeholder="Last Name" className="bg-white/80 focus:bg-white text-black border-0 h-12" {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormControl><Input placeholder="Business Email" className="bg-white/80 focus:bg-white text-black border-0 h-12" {...field} /></FormControl><FormMessage /></FormItem>
                       )} />
                       <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem><FormControl><Input placeholder="Phone Number" className="bg-white/80 focus:bg-white text-black border-0 h-12" {...field} /></FormControl><FormMessage /></FormItem>
                       )} />
                    </div>

                    {/* Company & Job */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                       <FormField control={form.control} name="company" render={({ field }) => (
                          <FormItem><FormControl><Input placeholder="Company Name" className="bg-white/80 focus:bg-white text-black border-0 h-12" {...field} /></FormControl><FormMessage /></FormItem>
                       )} />
                       <FormField control={form.control} name="jobTitle" render={({ field }) => (
                          <FormItem><FormControl><Input placeholder="Job Title" className="bg-white/80 focus:bg-white text-black border-0 h-12" {...field} /></FormControl><FormMessage /></FormItem>
                       )} />
                    </div>
                    
                    {/* Country */}
                    <FormField control={form.control} name="country" render={({ field }) => (
                        <FormItem><FormControl><Input placeholder="Country" className="bg-white/80 focus:bg-white text-black border-0 h-12" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />

                    {/* Consent */}
                     <FormField
                        control={form.control}
                        name="consent"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-white/10 p-4 bg-black/20">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="border-white/50 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 text-white"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <p className="text-sm text-gray-300 font-light">
                                I agree to receive communications from Simplilearn about this event and other relevant updates.
                              </p>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                     
                     <div className="pt-2">
                       <CtaButton type="submit" disabled={isSubmitting} className="w-full text-lg h-14 shadow-xl">
                          {isSubmitting ? <Loader2 className="animate-spin w-6 h-6" /> : 'Complete Registration'}
                       </CtaButton>
                     </div>
                  </form>
                </Form>
             )}
           </div>
        </div>
      </div>
    </section>
  );
}
