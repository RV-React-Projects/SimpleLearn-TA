import { SectionContainer } from '@/components/shared/section-container';

export function StrategySection() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/chess-image.png)' }}
        />
        {/* Strong white/gray overlay to make text readable over the image */}
        <div className="absolute inset-0 bg-white/90"></div>
      </div>

      <SectionContainer className="relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Content */}
          <div className="space-y-8 flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-orange-500 leading-tight">
              Go behind the curtain with real examples and high-scale insights
            </h2>
            
            <p className="text-2xl font-bold text-gray-900">
              You&apos;ll walk away with:
            </p>

            <div className="space-y-6">
              {[
                "A clear view of the massive shifts in workforce capabilities required for the next 12-24 months.",
                "Insight into how global market leaders are thinking about the ‘Build vs Buy’ decisions when hiring talent and upskilling internally.",
                "Specific steps regarding governance, privacy, and tooling implementation.",
                "Access to a candid discussion filled with ideas, debates, tears, and opportunities regarding the future of work.",
                "Actionable insights you can bring straight into your next board meeting."
              ].map((text, idx) => (
                <div key={idx} className="flex gap-4 group">
                  <div className="w-1 bg-orange-400 flex-shrink-0 mt-1 mb-1 rounded-full h-8"></div>
                  <p className="text-gray-800 leading-relaxed font-medium text-lg">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
