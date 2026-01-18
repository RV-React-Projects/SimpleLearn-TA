import { Card } from '@/ui/card';
import { cn } from '@/lib/utils';

interface AgendaCardProps {
  title: string;
  description: string;
  time?: string;
  className?: string;
}

export function AgendaCard({
  title,
  description,
  time,
  className,
}: AgendaCardProps) {
  return (
    <Card className={cn(
      'bg-gradient-to-br from-cyan-400 to-cyan-500 border-0 p-8 shadow-lg hover:shadow-xl transition-shadow',
      className
    )}>
      <div className="space-y-4">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>

        {/* Description */}
        <p className="text-base text-gray-800 leading-relaxed">
          {description}
        </p>

        {/* Time (if provided) */}
        {time && (
          <div className="pt-2 border-t border-gray-900/10">
            <p className="text-sm font-bold text-gray-900">
              Duration: {time}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
