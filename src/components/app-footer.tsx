import MaxWidthContainer from './max-width-container';

export default function AppFooter() {
  return (
    <footer className='border-grid h-[3.75rem] border-t'>
      <MaxWidthContainer className='p-4'>
        <p className='text-muted-foreground text-sm leading-loose text-balance'>
          &copy; {new Date().getFullYear()} TripWise. All rights reserved.
        </p>
      </MaxWidthContainer>
    </footer>
  );
}
