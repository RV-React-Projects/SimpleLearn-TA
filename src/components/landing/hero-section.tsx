'use client';

import { SectionContainer } from '@/components/shared/section-container';
import { Badge } from '@/ui/badge';
import { MapPin, Calendar } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#000814] overflow-hidden pt-20 pb-16">
      {/* Background with real image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/hero-background.jpg)',
          }}
        />
        {/* Gradients/Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20 mix-blend-overlay" />
      </div>

      <SectionContainer className="relative z-10 w-full">
        <div className="max-w-3xl space-y-8">
          {/* Top Badges */}
          <div className="flex items-center gap-3 animate-fade-in">
            <Badge className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-3 py-1 rounded-sm border-0">
              Invite Only
            </Badge>
            <span className="text-cyan-400 font-medium tracking-wide text-sm uppercase">
              Live Virtual Roundtable
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-orange-500 leading-[1.1]">
              The Skills That Matter Next:
            </h1>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1]">
              Preparing Your Workforce<br />
              & Leaders for the AI Era
            </h1>
          </div>

          {/* Date & Location */}
          <div className="flex flex-col gap-4 text-white/90 text-lg font-medium py-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-cyan-400" />
              <span>February 20, 2025</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span>Chamberlain&apos;s Steak & Fish House, Dallas</span>
            </div>
          </div>

          {/* Email Capture for RSVP */}
          <div className="max-w-md bg-white/10 backdrop-blur-sm p-2 rounded-lg border border-white/20 mt-8">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const email = (e.currentTarget.elements.namedItem('hero-email') as HTMLInputElement).value;
                if (email) {
                  // Dispatch event for footer form
                  window.dispatchEvent(new CustomEvent('prefill-email', { detail: email }));
                  document.getElementById('rsvp-form-section')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex gap-2"
            >
              <input 
                type="email" 
                name="hero-email"
                placeholder="Enter your business email" 
                className="flex-1 bg-white/90 text-black px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-gray-500"
                required
              />
              <button 
                type="submit" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-md transition-all whitespace-nowrap"
              >
                RSVP Now
              </button>
            </form>
          </div>

        </div>
      </SectionContainer>
    </section>
  );
}
