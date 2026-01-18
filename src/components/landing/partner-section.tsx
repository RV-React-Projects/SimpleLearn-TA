import { SectionContainer } from '@/components/shared/section-container';

export function PartnerSection() {
  return (
    <section className="bg-white py-12">
      <SectionContainer>
        <div className="flex flex-col items-center space-y-6">
          {/* Label */}
          <p className="text-sm uppercase tracking-wider text-gray-600 font-semibold">
            ASSOCIATE PARTNER
          </p>

          {/* Partner Logos - Placeholder */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {/* Add actual partner logos here */}
            <div className="text-gray-400 text-sm italic">
              Partner logos will be added here
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
