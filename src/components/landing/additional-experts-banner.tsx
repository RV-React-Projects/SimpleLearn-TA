import { SectionContainer } from '@/components/shared/section-container';

export function AdditionalExpertsBanner() {
  return (
    <section className="bg-blue-500 py-12">
      <SectionContainer>
        <div className="border border-white/20 bg-white/10 rounded-xl p-8 backdrop-blur-sm relative overflow-hidden">
          {/* Decorative Grid Background */}
          <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '20px 20px'}}></div>
          
          <div className="relative z-10">
            <h3 className="text-2xl text-cyan-300 font-bold mb-4">
              Additional Expert Perspectives
            </h3>
            <p className="text-white text-lg leading-relaxed max-w-4xl">
              Invited experts have lined up to add specialized context to conversations around fluid diversity and how hiring highly skilled large organizations are tackling DEI with necessary nuance within AI.
            </p>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
