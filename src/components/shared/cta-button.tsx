import { Button } from '@/ui/button';
import { cn } from '@/lib/utils';

interface CtaButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'default' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function CtaButton({
  children,
  onClick,
  className,
  variant = 'primary',
  size = 'default',
  type = 'button',
  disabled = false,
}: CtaButtonProps) {
  const variantClasses = {
    primary: 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500',
    secondary: 'bg-transparent hover:bg-orange-50 text-orange-500 border-orange-500',
  };

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      size={size}
      className={cn(
        'rounded-md font-semibold transition-all duration-200',
        'shadow-md hover:shadow-lg',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </Button>
  );
}
