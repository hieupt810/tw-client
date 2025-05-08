import Link from 'next/link';

import MaxWidthContainer from './max-width-container';
import { Button } from './ui/button';

type Props = {
  title: string;
  buttonHref: string;
  description: string;
  buttonText?: string;
};

export default function HeroSection({
  title,
  buttonHref,
  description,
  buttonText = 'Get Started',
}: Props) {
  return (
    <section className='border-grid border-b'>
      <MaxWidthContainer className='flex flex-col items-start gap-2 pt-12 pb-8 md:pt-14 md:pb-10 lg:pt-16 lg:pb-12'>
        <h1 className='text-2xl leading-tight font-bold tracking-tighter sm:text-3xl md:text-4xl'>
          {title}
        </h1>
        <p className='text-muted-foreground max-w-2xl text-base sm:text-lg'>
          {description}
        </p>
        <Link href={buttonHref} passHref>
          <Button size='sm'>{buttonText}</Button>
        </Link>
      </MaxWidthContainer>
    </section>
  );
}
