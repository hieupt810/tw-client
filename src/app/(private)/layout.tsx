import AppNavbar from '@/components/app-navbar';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNavbar />
      <div className='grow'>{children}</div>
    </>
  );
}
