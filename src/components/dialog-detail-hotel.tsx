import {
  Check,
  DollarSign,
  Eye,
  Globe,
  Home,
  Mail,
  MapPin,
  Phone,
  Star,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import { useHotelStore } from '@/stores/hotel-store';

import SkeletonDetailHotel from './skeleton/skeleton-detail-hotel';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Separator } from './ui/separator';

export function DialogDetailHotel(props: { id: string }) {
  const { id } = props;
  const [open, setOpen] = useState(false);
  const { hotel, fetchHotel } = useStore(useHotelStore, (state) => state);
  useEffect(() => {
    fetchHotel(id);
  }, [open, id, fetchHotel]);
  const keyFeatures = [
    'Pool',
    'Free Wifi',
    'Breakfast included',
    'Spa',
    'Restaurant',
    'Room service',
    'Beachfront',
    'Air conditioning',
    'Airport transportation',
  ].filter((feature) => hotel.item?.features.includes(feature));
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <Eye className='h-3 w-3 md:h-4 md:w-4' />
          <span className='hidden sm:inline'>Detail</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='h-[800px] min-w-4xl overflow-y-auto'>
        {hotel.isLoading ? (
          <SkeletonDetailHotel />
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2 text-2xl font-bold'>
                {hotel.item?.name}
                <div className='ml-2 flex items-center'>
                  {hotel.item?.hotel_class}
                  <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className='md:col-span-2'>
              <div className='relative mb-4 h-64 w-full overflow-hidden rounded-lg'>
                <img
                  src={hotel.item?.image || '/placeholder.svg'}
                  alt={hotel.item?.name}
                  className='object-cover'
                />
              </div>

              <div className='space-y-4'>
                <Card>
                  <CardHeader className='mb-1 text-lg font-semibold'>
                    Hotel Information
                  </CardHeader>
                  <CardContent className='grid grid-cols-2'>
                    <div className='flex flex-col gap-y-5'>
                      <div className='flex items-start gap-3'>
                        <MapPin className='mt-0.5 h-5 w-5 text-gray-500' />
                        <div className='flex flex-row'>
                          <p className=''>
                            {hotel.item?.street} - {hotel.item?.city.name}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-3'>
                        <Phone className='h-5 w-5 text-gray-500' />
                        <p
                          className={
                            hotel.item?.phone ? '' : 'text-gray-400 italic'
                          }
                        >
                          {hotel.item?.phone || 'Unknow'}
                        </p>
                      </div>
                      <div className='flex items-center gap-3'>
                        <Mail className='h-5 w-5 text-gray-500' />
                        <p>{hotel.item?.email}</p>
                      </div>
                    </div>

                    <div className='flex flex-col gap-y-5'>
                      <div className='flex items-center gap-3'>
                        <Globe className='h-5 w-5 text-gray-500' />
                        {hotel.item?.website ? (
                          <p>{hotel.item.website}</p>
                        ) : (
                          <span className='text-gray-400 italic'>Unknown</span>
                        )}
                      </div>
                      <div className='flex items-center gap-3'>
                        <DollarSign className='h-5 w-5 text-gray-500' />
                        <p>Price range: {hotel.item?.price_range}</p>
                      </div>

                      <div className='flex items-center gap-3'>
                        <Home className='h-5 w-5 text-gray-500' />
                        <p>{hotel.item?.number_of_rooms} rooms</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Separator />
                <Card>
                  <CardHeader className='mb-1 text-lg font-semibold'>
                    Description
                  </CardHeader>
                  <CardContent>
                    <p className='line-clamp-4 text-gray-700'>
                      {hotel.item?.description}
                    </p>
                  </CardContent>
                </Card>
                <Separator className='my-4' />
                <Card>
                  <CardHeader className='mb-1 text-lg font-semibold'>
                    Key Features
                  </CardHeader>
                  <CardContent className='flex flex-wrap gap-2'>
                    {keyFeatures.map((feature) => (
                      <Badge
                        key={feature}
                        variant='outline'
                        className='flex items-center gap-1'
                      >
                        <Check className='h-3 w-3' /> {feature}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              </div>
              <Separator className='my-4' />

              <Card>
                <CardHeader className='mb-1 text-lg font-semibold'>
                  Review Summary
                </CardHeader>
                <CardContent>
                  <p className='text-gray-700'>
                    {hotel.item?.ai_reviews_summary}
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
