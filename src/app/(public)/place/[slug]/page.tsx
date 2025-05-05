'use client';

import Autoplay from 'embla-carousel-autoplay';
import { Heart, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useMemo } from 'react';
import { Label, Pie, PieChart } from 'recharts';

import CustomBreadcrumb from '@/components/custom-breadcrumb';
import MaxWidthContainer from '@/components/max-width-container';
import Rating from '@/components/rating';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { CHART_CONFIG } from '@/constants/chart-config';
import { createChartData } from '@/lib/utils';
import { IHotel } from '@/types/IHotel';

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
  rating_histogram: [108, 83, 136, 355, 1508],
};

const MapComponent = dynamic(() => import('@/components/map-component'), {
  ssr: false,
});

export default function PlaceDetailsPage() {
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
          { label: 'Home', href: '/' },
          { label: 'Hotels', href: '/hotels' },
          {
            label: MOCK_DATA.name,
            href: '/hotels',
          },
        ]}
      />
      <MaxWidthContainer className='flex flex-col gap-0.5 border-b py-6'>
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
      <MaxWidthContainer className='grid grid-cols-3 border-b'>
        {/* Carousel */}
        <div className='border-grid col-span-2 border-r p-6 pl-0'>
          <Carousel
            plugins={[Autoplay({ delay: 8000 })]}
            opts={{ align: 'start' }}
            className='mx-auto h-full w-[calc(100%-6rem)]'
          >
            <CarouselContent>
              {Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem key={index}>
                  <div className='p-1'>
                    <AspectRatio ratio={4 / 3}>
                      <Image
                        fill
                        alt='Placeholder'
                        src='https://placehold.co/4000x3000/png'
                        className='overflow-hidden rounded-md object-cover object-center'
                      />
                    </AspectRatio>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
        </div>

        {/* Chart */}
        <div className='col-span-1 p-6 pr-0'>
          <div className='inline-flex w-full items-center justify-center'>
            <span className='text-lg font-semibold tracking-tight'>
              Pie Chart - Traveler Rating
            </span>
          </div>
          <div>
            <ChartContainer
              config={CHART_CONFIG}
              className='m-auto aspect-square'
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey='number'
                  nameKey='rating'
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor='middle'
                            dominantBaseline='middle'
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className='fill-foreground text-3xl font-bold'
                            >
                              {totalRatings.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className='fill-muted-foreground'
                            >
                              Ratings
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>
        </div>
      </MaxWidthContainer>
      <MaxWidthContainer className='grid grid-cols-3 border-b'>
        <div className='border-grid col-span-2 border-r p-6 pl-0'>About</div>
        <div className='p-6 pr-0'>Amenties</div>
      </MaxWidthContainer>
      <MaxWidthContainer className='border-b py-6'>
        <h3>Map</h3>
        <MapComponent />
      </MaxWidthContainer>
      <MaxWidthContainer className='py-6'>Reviews</MaxWidthContainer>
    </>
  );
}
