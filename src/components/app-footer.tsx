import AppLogo from './app-logo';
import MaxWidthContainer from './max-width-container';

export default function AppFooter() {
  return (
    <footer className='bg-neutral-100'>
      <MaxWidthContainer className='flex flex-col items-center justify-center gap-1'>
        <AppLogo />
        <p className='text-xs tracking-wide text-neutral-700 md:text-sm'>
          &copy; {new Date().getFullYear()} TripWise. All rights reserved.
        </p>
      </MaxWidthContainer>
    </footer>
  );
}
