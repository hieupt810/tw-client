import Image from 'next/image';

import MaxWidthContainer from './max-width-container';

type Props = {
  title: string;
  description: string;
};

export default function HeroSection({ title, description }: Props) {
  return (
    <section className='border-grid border-b'>
      <MaxWidthContainer className='relative p-0'>
        <Image
          priority
          alt='Banner'
          width={4000}
          height={1620}
          src='/vietnam.jpg'
          className='mt-24 h-full w-full object-cover object-top'
        />
        <div className='absolute top-6 right-0 left-0 z-20 flex flex-col items-center gap-1 text-center sm:top-8 md:top-10 lg:top-14 xl:top-16'>
          <h1 className='text-2xl font-bold tracking-tighter md:text-3xl lg:text-4xl'>
            {title}
          </h1>
          <p className='text-muted-foreground max-w-sm text-sm sm:block sm:max-w-md md:max-w-lg md:text-base lg:max-w-2xl'>
            {description}
          </p>
        </div>
      </MaxWidthContainer>
    </section>
  );
}
