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
          src='/banner.png'
          width={1280}
          quality={100}
          height={600}
          className='max-h-[37.5rem] w-full object-cover object-bottom'
        />
        <div className='absolute top-16 right-0 left-0 z-20 flex flex-col items-center gap-1 text-center md:top-20 lg:top-28 lg:gap-1.5 xl:top-32'>
          <h1 className='text-2xl leading-tight font-bold tracking-tighter md:text-3xl lg:text-4xl'>
            {title}
          </h1>
          <p className='text-muted-foreground hidden max-w-lg sm:block md:max-w-2xl lg:text-lg'>
            {description}
          </p>
        </div>
      </MaxWidthContainer>
    </section>
  );
}
