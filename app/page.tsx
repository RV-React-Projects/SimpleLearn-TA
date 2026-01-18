import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { IntroTextSection } from '@/components/landing/intro-text-section';
import { OverviewSection } from '@/components/landing/overview-section';
// KeyQuestions removed as it is replaced by Overview grid in the better design
import { SpeakersSection } from '@/components/landing/speakers-section';
import { AdditionalExpertsBanner } from '@/components/landing/additional-experts-banner';
import { StrategySection } from '@/components/landing/strategy-section';
import { AgendaSection } from '@/components/landing/agenda-section';
import { RsvpFormSection } from '@/components/landing/rsvp-form-section';

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <IntroTextSection />
        <OverviewSection />
        <SpeakersSection />
        <AdditionalExpertsBanner />
        <StrategySection />
        <AgendaSection />
        <RsvpFormSection />
      </main>
      <Footer />
    </>
  );
}
