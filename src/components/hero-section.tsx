import Image from 'next/image';

type Props = {
  title: string;
  description: string;
};

export default function HeroSection({ title, description }: Props) {
  return (
    <section className='border-grid flex flex-col gap-1 border-b md:pt-2 lg:gap-1.5 lg:pt-4 xl:pt-6'>
      <span className='text-center text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl'>
        {title}
      </span>
      <span className='text-muted-foreground mx-auto max-w-sm text-center text-sm font-light md:max-w-lg md:text-base lg:max-w-2xl lg:text-lg'>
        {description}
      </span>
      <Image
        priority
        alt='Banner'
        width={4000}
        height={1620}
        src='/vietnam.jpg'
        className='mx-auto w-full max-w-4xl'
      />
    </section>
  );
}
