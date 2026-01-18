import { SectionContainer } from '@/components/shared/section-container';
import { SpeakerCard } from '@/components/shared/speaker-card';

const speakers = [
  {
    id: 1,
    name: 'Rob Lauber',
    title: 'Former Chief Learning Officer',
    company: "McDonald's / Yum! Brands",
    bio: "Rob Lauber is a global HR executive who excels in building best-in-class HR ground operations. With a progressively successful track record spanning three decades, including roles at McDonald's, Yum! Brands, and Cingular Wireless, he excels in leading learning and development teams to drive culture and outcomes. Currently, he consults with numerous organizations on HR and L&D specifically for the AI age.",
    imageUrl: '/speakers/rob-lauber.jpg',
  },
  {
    id: 2,
    name: 'Krishna Kumar',
    title: 'Founder & CEO',
    company: 'Simplilearn',
    bio: "Krishna Kumar is the Founder and CEO of Simplilearn. Actively driving the company's navigating workforce transformation directly for strategic clients. At the center of EdTech, he and his team interact with thousands of enterprises and millions of learners globally, focusing purely on skill growth and career. Through deep engagement with interactive sessions and education partners, he sees what moves the skill needle in building productive capability for the AI era, often with a unique lens on the 'people' aspect of change management.",
    imageUrl: '/speakers/krishna-kumar.png',
  },
  {
    id: 3,
    name: 'Sanjoy Milne',
    title: 'VP, North America Enterprise Sales',
    company: 'Simplilearn',
    bio: "Sanjoy Milne is a seasoned business growth leader with over 25 years of experience helping customers highly target and strengthen core technology operations. An expert in memberships, CIOs throughout the decades with specialized needs in product guides, he leads key global initiatives. Based in Dallas, Texas, he serves as VP, North America Enterpise Sales for Simplilearn.",
    imageUrl: '/speakers/sanjoy-milne.jpg',
  },
];

export function SpeakersSection() {
  return (
    <section className="bg-[#1E40AF] py-20">
      <SectionContainer>
        <div className="space-y-12">
          {/* Section Title */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
              Featured Speakers
            </h2>
          </div>

          {/* Speakers List - Single Column Stacking for detail view */}
          <div className="grid grid-cols-1 gap-8">
            {speakers.map((speaker) => (
              <SpeakerCard
                key={speaker.id}
                name={speaker.name}
                title={speaker.title}
                company={speaker.company}
                bio={speaker.bio}
                imageUrl={speaker.imageUrl}
                layout="horizontal"
              />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
