export default function AppFooter() {
  return (
    <footer className='border-grid bg-background flex h-12 items-center justify-center border-t'>
      <p className='text-muted-foreground text-center text-sm'>
        &copy; {new Date().getFullYear()} TripWise. All rights reserved.
      </p>
    </footer>
  );
}
