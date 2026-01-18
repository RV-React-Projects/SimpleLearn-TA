import { SectionContainer } from '@/components/shared/section-container';

const agendaItems = [
  {
    title: 'Welcome & Opening',
    description: 'The Skills That Matter Next. Overview of why we are here and the state of skills in the economy.',
    color: 'bg-cyan-400',
  },
  {
    title: 'Keynote',
    description: 'Why Enterprise Leaders Are Betting on the Hybrid. Discussion: Human + AI skills for Growth. Agility vs scale and how places of agents are reshaping every workforce with new layers of abstraction.',
    color: 'bg-cyan-400',
  },
  {
    title: 'Lunch & General Conversation',
    description: 'Values / Q&A / Networking. Open table talk on talent retention and healthy direct capability building at scale.',
    color: 'bg-cyan-400',
  },
];

export function AgendaSection() {
  return (
    <section className="bg-cyan-50/80 py-20 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      
      <SectionContainer className="relative z-10">
        <div className="space-y-10">
          <h2 className="text-3xl md:text-4xl font-bold text-black border-b-4 border-cyan-400 inline-block pb-2">
            Event Agenda
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agendaItems.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-xl shadow-md border-t-8 border-cyan-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-cyan-100 text-cyan-800 text-xs font-bold uppercase tracking-wider rounded-full group-hover:bg-cyan-200 transition-colors">
                    Session {idx + 1}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-cyan-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
