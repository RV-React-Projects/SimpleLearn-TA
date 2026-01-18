import { SectionContainer } from '@/components/shared/section-container';

export function IntroTextSection() {
  return (
    <section className="bg-white py-16">
      <SectionContainer className="max-w-4xl mx-auto text-center space-y-12">
        <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
          With accelerating changes across every operational layer, the nature of hiring, leadership models, are shifting and shrinking. A skills-first mindset is what sets apart resilient teams of people and AI-powered agents.
        </p>

        <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
          For now, the most advanced companies are asking the same question:
        </p>

        <div className="py-2">
          <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight max-w-3xl mx-auto">
            What capitalism will never work without the &apos;power of people&apos;
          </h2>
        </div>

        <p className="text-lg text-gray-600 italic">
          Find out why workforce genius CHROs, CLOs, and everyone workforce leader for a candid table-level discussion on what is coming next.
        </p>
      </SectionContainer>
    </section>
  );
}
