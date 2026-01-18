import { SectionContainer } from '@/components/shared/section-container';
import { Clock, Shield, Users, BarChart3, Radio, Briefcase } from 'lucide-react';

const exploreItems = [
  {
    icon: Clock,
    title: 'Skills Decay',
    description: 'Why skills are expiring faster than ever before',
  },
  {
    icon: Users,
    title: 'Manager Bandwidth',
    description: 'Leading effectively amidst AI agents',
  },
  {
    icon: Briefcase,
    title: 'Jobless vs Jobful Future',
    description: 'How job descriptions and roles are shifting',
  },
  {
    icon: Shield,
    title: 'Frontline Capability',
    description: 'Operational excellence vs systems fluency',
  },
  {
    icon: Radio,
    title: 'Cross-domain Capabilities',
    description: 'Building curiosity and collaborative problem solving',
  },
  {
    icon: BarChart3,
    title: 'Measuring Organization',
    description: 'Success with sheer output count',
  },
];

export function OverviewSection() {
  return (
    <section className="bg-gray-50 py-16">
      <SectionContainer>
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-orange-500 font-bold text-xl uppercase tracking-wide">
              What We&apos;ll Explore
            </h2>
            <p className="text-gray-900 font-bold text-2xl md:text-3xl">
              Key critical discussion points for this Roundtable
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exploreItems.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-default group">
                <div className="flex-shrink-0">
                  <item.icon className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
