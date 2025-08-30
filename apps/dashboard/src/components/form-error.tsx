import { cn } from '@heroui/theme';

export const FormError = ({
  error,
  className,
  ...props
}: { error: string | undefined } & React.ComponentProps<'div'>) => {
  if (!error) return null;

  return (
    <div
      className={cn('text-tiny text-center text-red-500', className)}
      role="alert"
      {...props}
    >
      Something went wrong. Please try again.
    </div>
  );
};
