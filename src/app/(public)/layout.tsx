import AppFooter from '@/components/app-footer';
import AppNavbar from '@/components/app-navbar';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppNavbar />
      <div className='flex grow flex-col'>{children}</div>
      <AppFooter />
    </>
  );
}
