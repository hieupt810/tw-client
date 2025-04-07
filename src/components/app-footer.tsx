import AppLogo from './app-logo';
import MaxWidthContainer from './max-width-container';

export default function AppFooter() {
  return (
    <footer className='bg-muted mt-10 p-10'>
      <MaxWidthContainer className='flex flex-col items-center justify-center gap-1'>
        <AppLogo />
        <p className='text-muted-foreground text-sm md:text-base'>
          &copy; {new Date().getFullYear()} TripWise. All rights reserved.
        </p>
      </MaxWidthContainer>
    </footer>
  );
}
