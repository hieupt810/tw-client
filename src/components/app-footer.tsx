const AppFooter = () => (
  <footer className='border-grid flex h-14 items-center justify-center border-t'>
    <p className='text-muted-foreground text-center text-sm text-balance'>
      &copy; {new Date().getFullYear()} TripWise. All rights reserved.
    </p>
  </footer>
);

export default AppFooter;
