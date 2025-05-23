import { cn } from '@/lib/utils';

import ImageWithFallback from './image-with-fallback';
import { AspectRatio } from './ui/aspect-ratio';

type Props = {
  title: string;
  image: string;
  ratio?: number;
  description?: string;
  object?: 'center' | 'top' | 'bottom';
  className?: React.HTMLAttributes<HTMLElement>['className'];
};

export default function HeroSection({
  title,
  image,
  className,
  description,
  ratio = 16 / 6,
  object = 'center',
}: Props) {
  return (
    <section className={cn('relative hidden md:block', className)}>
      <div className='absolute bottom-0 left-0 z-10 flex flex-col gap-1.5 p-10 text-white'>
        <span className='text-2xl font-bold tracking-tight capitalize md:text-3xl lg:text-4xl'>
          {title}
        </span>
        {description && (
          <span className='max-w-md text-sm font-light md:max-w-xl md:text-base lg:max-w-2xl lg:text-lg'>
            {description}
          </span>
        )}
      </div>
      <div className='relative w-full'>
        <AspectRatio ratio={ratio}>
          <ImageWithFallback
            fill
            priority
            alt='Hero banner'
            src={image}
            className={cn(
              'z-0 w-full object-cover',
              object === 'top' && 'object-top',
              object === 'center' && 'object-center',
              object === 'bottom' && 'object-bottom',
            )}
          />
        </AspectRatio>
        <div className='absolute top-0 right-0 left-0 h-full bg-gradient-to-b from-white/20 to-black/90' />
      </div>
    </section>
  );
}
