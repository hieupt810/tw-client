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
          height={1760}
          src='/vietnam.jpg'
          className='mx-auto mt-24 h-full w-full max-w-[70rem] object-cover object-top sm:mt-28 lg:mt-36'
        />
        <div className='absolute top-12 right-0 left-0 z-20 flex flex-col items-center gap-1 text-center md:top-12 lg:top-16'>
          <h1 className='text-2xl leading-tight font-bold tracking-tighter md:text-3xl lg:text-4xl'>
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
