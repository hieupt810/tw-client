import AppFooter from '@/components/app-footer';
import MaxWidthContainer from '@/components/max-width-container';
import { Card } from '@/components/ui/card';

import ProfileCard from './components/profile';

export default function AccountPage() {
  return (
    <div>
      <MaxWidthContainer className='grid grid-cols-4'>
        <div className='py-6'>Left</div>
        <Card className='col-span-3'>
          <ProfileCard />
        </Card>
      </MaxWidthContainer>
      <AppFooter />
    </div>
  );
}
