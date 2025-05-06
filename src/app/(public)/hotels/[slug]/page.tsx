'use client';

import { Heart, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

import CustomBreadcrumb from '@/components/custom-breadcrumb';
import MaxWidthContainer from '@/components/max-width-container';
import Rating from '@/components/rating';
import { Button } from '@/components/ui/button';
import { createChartData } from '@/lib/utils';
import { IHotel } from '@/types/IHotel';

import RatingChart from './components/rating-chart';
import ThumbnailsCarousel from './components/thumbnails-carousel';

const MOCK_DATA: IHotel = {
  name: 'Mercure Danang French Village Bana Hills',
  address: {
    street: 'An Son Hoa Son Commune, Hoa Phu',
    city: {
      name: 'Da Nang',
      postalCode: '550000',
    },
  },
  description:
    'Mercure Bana Hills French Village located on top Ba Na Hills of Da Nang city with breathtaking sightseeing places and natural wonders. You can get an exclusive exploration to world famous place "Golden Bridge" by the earliest cable car operation from hotel every morning. Surrounded by the complex of entertainment, 4 seasons swimming pool, restaurants, bars and spirit destinations, it has been called “Elysium” at 1.489m higher than sea level.',
  longitude: 1.1,
  latitude: 2.2,
  rating: 4.4,
  rating_histogram: [108, 83, 136, 355, 100],
  phone: '',
  photos: [],
};

const MapComponent = dynamic(() => import('@/components/map-component'), {
  ssr: false,
});

const PlaceDetailsPage = () => {
  const address =
    MOCK_DATA.address.street +
    ', ' +
    MOCK_DATA.address.city.name +
    ' ' +
    MOCK_DATA.address.city.postalCode +
    ' Vietnam';
  const chartData = createChartData(MOCK_DATA.rating_histogram);
  const totalRatings = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.number, 0);
  }, [chartData]);

  return (
    <>
      <CustomBreadcrumb
        links={[
          { label: 'Hotels', href: '/hotels' },
          {
            label: MOCK_DATA.name,
            href: '/hotels',
          },
        ]}
      />

      <MaxWidthContainer className='flex flex-col gap-0.5 border-b'>
        <div className='flex flex-row items-center justify-between'>
          <h1 className='text-2xl leading-tight font-bold tracking-tighter sm:text-3xl md:text-4xl lg:leading-[1.1]'>
            {MOCK_DATA.name}
          </h1>
          <Button variant='outline'>
            <Heart />
            Save
          </Button>
        </div>
        <div className='text-muted-foreground inline-flex items-center gap-2'>
          <Rating rating={MOCK_DATA.rating} />
          <p>({totalRatings.toLocaleString()})</p>
        </div>
        <div className='inline-flex items-center gap-1 text-base leading-relaxed'>
          <MapPin size={16} />
          <span>{address}</span>
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer className='grid grid-cols-2 border-b p-0 md:grid-cols-3'>
        <div className='col-span-2'>
          <ThumbnailsCarousel className='border-grid border-b px-6 py-4' />

          <div className='grid grid-cols-1 lg:grid-cols-3'>
            <RatingChart data={chartData} total={totalRatings} />
            <div className='border-grid border-l px-6 py-4 md:col-span-2'>
              <h4 className='text-xl leading-relaxed font-bold tracking-tight md:text-2xl md:leading-loose'>
                About
              </h4>
              <p className='text-justify leading-relaxed'>
                {MOCK_DATA.description}
              </p>
            </div>
          </div>
        </div>

        <div className='border-grid col-span-2 border-t border-l px-6 py-4 md:col-span-1 md:border-t-0'>
          <h4 className='text-xl leading-relaxed font-bold tracking-tight md:text-2xl md:leading-loose'>
            Amenties
          </h4>
        </div>
      </MaxWidthContainer>

      <MaxWidthContainer className='border-b'>
        <h4 className='text-xl leading-relaxed font-bold tracking-tight md:text-2xl md:leading-loose'>
          Map
        </h4>
        <MapComponent />
      </MaxWidthContainer>

      <MaxWidthContainer>
        <h4 className='text-xl leading-relaxed font-bold tracking-tight md:text-2xl md:leading-loose'>
          Reviews
        </h4>
      </MaxWidthContainer>
    </>
  );
};

export default PlaceDetailsPage;
