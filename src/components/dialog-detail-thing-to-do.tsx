import { Eye, Globe, MapPin, Phone, Star } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useThingToDoStore } from '@/stores/thing-to-do-store';

import SkeletonDetailRestaurant from './skeleton/skeleton-detail-restaurant';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const MarkerMap = dynamic(() => import('@/components/marker-map'), {
  ssr: false,
});

export function ThingToDoDetailDialog(props: { id: string }) {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [open, setOpen] = useState(false);
  const { id } = props;
  const { fetchThingToDo, thingToDo } = useStore(
    useThingToDoStore,
    (state) => state,
  );
  const totalReviews = thingToDo.item?.rating_histogram.reduce(
    (sum, count) => sum + count,
    0,
  );
  useEffect(() => {
    fetchThingToDo(id);
    if (open) {
      fetchThingToDo(id);
    }
  }, [open, id, fetchThingToDo]);

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <Eye className='h-3 w-3 md:h-4 md:w-4' />
            <span className='hidden sm:inline'>Detail</span>
          </Button>
        </DialogTrigger>
        <DialogContent className='h-[800px] min-w-4xl overflow-y-auto'>
          {thingToDo.isLoading ? (
            <SkeletonDetailRestaurant />
          ) : (
            <div className='p-6'>
              <DialogHeader className='space-y-4'>
                <div className='relative'>
                  <img
                    src={thingToDo.item?.image || '/placeholder.svg'}
                    alt={thingToDo.item?.name}
                    className='h-64 w-full rounded-lg object-cover'
                  />
                </div>
              </DialogHeader>
              <div className='mt-6'>
                {' '}
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <div className='space-y-2'>
                        <DialogTitle className='text-2xl font-bold'>
                          {thingToDo.item?.name}
                        </DialogTitle>
                        <div className='flex flex-wrap items-center gap-4'>
                          <div className='flex items-center gap-1'>
                            <Star className='h-5 w-5 fill-yellow-400 text-yellow-400' />
                            <span className='font-semibold'>
                              {thingToDo.item?.rating}
                            </span>
                            <span className='text-muted-foreground'>
                              ({totalReviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='flex items-start gap-2'>
                      <MapPin className='mt-0.5 h-5 w-5 text-gray-500' />
                      <div>
                        <p className='font-medium'>{thingToDo.item?.street}</p>
                        <p className='text-sm text-gray-600'>
                          {thingToDo.item?.city.name},{' '}
                          {thingToDo.item?.city.postal_code}
                        </p>
                      </div>
                    </div>

                    {thingToDo.item?.phone && (
                      <div className='flex items-center gap-2'>
                        <Phone className='h-5 w-5 text-gray-500' />
                        <a
                          href={`tel:${thingToDo.item?.phone}`}
                          className='text-blue-600 hover:underline'
                        >
                          {thingToDo.item?.phone}
                        </a>
                      </div>
                    )}

                    {thingToDo.item?.website && (
                      <div className='flex items-center gap-2'>
                        <Globe className='h-5 w-5 text-gray-500' />
                        <a
                          href={thingToDo.item?.website}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='truncate text-blue-600 hover:underline'
                        >
                          {thingToDo.item?.website}
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              <Card className='mt-6'>
                <CardHeader>
                  <CardTitle>Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='leading-relaxed text-gray-700'>
                    {thingToDo.item?.description || 'Unknown'}
                  </p>
                </CardContent>
              </Card>
              {/* Photo Gallery */}
              <Card className='mt-6'>
                <CardHeader>
                  <CardTitle>Photo Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <img
                      src={
                        thingToDo.item?.photos[selectedPhoto] ||
                        '/placeholder.svg'
                      }
                      alt={`Restaurant photo ${selectedPhoto + 1}`}
                      className='h-64 w-full rounded-lg object-cover'
                    />
                    <div className='grid grid-cols-6 gap-2'>
                      {thingToDo.item?.photos
                        .slice(0, 6)
                        .map((photo, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedPhoto(index)}
                            className={`relative aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                              selectedPhoto === index
                                ? 'border-primary'
                                : 'border-transparent'
                            }`}
                          >
                            <img
                              src={photo || '/placeholder.svg'}
                              alt={`Thumbnail ${index + 1}`}
                              className='h-full w-full object-cover'
                            />
                          </button>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className='mt-6'>
                <CardHeader>
                  <CardTitle>Map</CardTitle>
                </CardHeader>
                <CardContent>
                  {thingToDo.item ? (
                    <MarkerMap zoom={16} items={[thingToDo.item]} />
                  ) : (
                    <p>No map data available</p>
                  )}
                </CardContent>
              </Card>
            </div>
            // </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
