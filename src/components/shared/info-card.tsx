import { Card } from '@/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}

export function InfoCard({
  icon: Icon,
  label,
  value,
  className,
}: InfoCardProps) {
  return (
    <Card className={cn('bg-white/10 backdrop-blur-sm border-white/20 p-4 text-white', className)}>
      <div className="flex flex-col items-center text-center space-y-2">
        {/* Icon */}
        <Icon className="w-8 h-8 text-orange-400" />

        {/* Label */}
        <p className="text-xs text-gray-300 uppercase tracking-wide">{label}</p>

        {/* Value */}
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </Card>
  );
}
