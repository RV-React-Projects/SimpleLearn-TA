import { SectionContainer } from '@/components/shared/section-container';
import { Card } from '@/ui/card';

const questions = [
  {
    id: 1,
    question: 'What capabilities will never work without the "power of people"?',
  },
  {
    id: 2,
    question: 'What kind of talent scarcity do we need to prepare for in the AI era?',
  },
  {
    id: 3,
    question: 'How can we build AI-ready teams at scale across our organization?',
  },
];

export function KeyQuestions() {
  return (
    <section className="bg-gray-50 py-20">
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {questions.map((item) => (
            <Card 
              key={item.id} 
              className="p-8 border-gray-200 bg-white hover:shadow-xl transition-all hover:border-orange-300"
            >
              <p className="text-lg md:text-xl font-bold text-gray-900 leading-relaxed">
                {item.question}
              </p>
            </Card>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
