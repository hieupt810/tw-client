export default function AppFooter() {
  return (
    <footer className='border-grid flex h-14 items-center justify-center border-t'>
      <p className='text-muted-foreground text-center text-base text-balance'>
        &copy; {new Date().getFullYear()} TripWise. All rights reserved.
      </p>
    </footer>
  );
}
