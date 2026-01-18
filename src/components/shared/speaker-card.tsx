import { Card } from '@/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SpeakerCardProps {
  name: string;
  title: string;
  company: string;
  bio: string;
  imageUrl: string;
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

export function SpeakerCard({
  name,
  title,
  company,
  bio,
  imageUrl,
  className,
  layout = 'vertical',
}: SpeakerCardProps) {
  if (layout === 'horizontal') {
    return (
      <Card className={cn(
        'bg-transparent border border-transparent shadow-none overflow-hidden transition-all duration-500 ease-out group',
        'hover:bg-white/10 hover:backdrop-blur-md hover:border-white/20 hover:scale-[1.02] hover:shadow-2xl',
        className
      )}>
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start p-4 rounded-xl text-center md:text-left">
          {/* Image */}
          <div className="flex-shrink-0">
             <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg bg-gray-800 transition-transform duration-500 group-hover:scale-105 group-hover:border-orange-500/50">
               <Image 
                 src={imageUrl} 
                 alt={name}
                 fill
                 className="object-cover"
               />
             </div>
          </div>
          
          {/* Content */}
          <div className="space-y-3 flex-1 pt-2 w-full">
             <div>
               <h3 className="text-2xl font-bold text-orange-500">{name}</h3>
               <p className="text-sm font-bold text-white uppercase tracking-wide">{title}</p>
               <p className="text-sm text-cyan-400">{company}</p>
             </div>
             <p className="text-base text-gray-300 leading-relaxed font-light">
               {bio}
             </p>
          </div>
        </div>
      </Card>
    );
  }

  // Fallback for vertical layout if used elsewhere
  return (
    <Card className={cn(
      'bg-blue-800/40 backdrop-blur-sm border-blue-700/50 p-8 text-white hover:bg-blue-800/60 transition-all',
      className
    )}>
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Speaker Image */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600 shadow-xl">
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        </div>

        {/* Speaker Info */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white">{name}</h3>
          <p className="text-base text-blue-200 font-medium">{title}</p>
          <p className="text-sm text-blue-300">{company}</p>
        </div>

        {/* Bio */}
        <p className="text-sm text-blue-100 leading-relaxed">
          {bio}
        </p>
      </div>
    </Card>
  );
}
