import {
  Award,
  Calendar,
  Car,
  Cigarette,
  Clock,
  CreditCard,
  Eye,
  Mail,
  MapPin,
  Phone,
  Star,
  Users,
  Utensils,
  Wifi,
  Wine,
} from 'lucide-react';
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
import { useRestaurantStore } from '@/stores/restaurant-store';
import { IRestaurant } from '@/types/IRestaurant';

import SkeletonDetailRestaurant from './skeleton/skeleton-detail-restaurant';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Hours = NonNullable<IRestaurant['hours']>;
export function RestaurantDetailDialog(props: { id: string }) {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [open, setOpen] = useState(false);
  const { id } = props;
  const { restaurant, fetchRestaurant } = useStore(
    useRestaurantStore,
    (state) => state,
  );
  const totalReviews = restaurant.item?.rating_histogram.reduce(
    (sum, count) => sum + count,
    0,
  );
  const getFeatureIcon = (feature: string) => {
    switch (feature.toLowerCase()) {
      case 'free wifi':
        return <Wifi className='h-4 w-4' />;
      case 'accepts credit cards':
        return <CreditCard className='h-4 w-4' />;
      case 'takeout':
        return <Car className='h-4 w-4' />;
      case 'seating':
        return <Users className='h-4 w-4' />;
      case 'serves alcohol':
        return <Wine className='h-4 w-4' />;
      case 'non-smoking restaurants':
        return <Cigarette className='h-4 w-4' />;
      case 'reservations':
        return <Calendar className='h-4 w-4' />;
      default:
        return <Utensils className='h-4 w-4' />;
    }
  };

  const formatHours = (hours: Hours) => {
    const days: (keyof Omit<Hours, 'timezone'>)[] = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return days.map((day, index) => ({
      day: dayNames[index],
      hours: hours[day] ? `${hours[day].open} - ${hours[day].close}` : 'Closed',
    }));
  };
  const formattedHours = restaurant.item?.hours
    ? formatHours(restaurant.item.hours)
    : [];
  useEffect(() => {
    fetchRestaurant(id);
    if (open) {
      fetchRestaurant(id);
    }
  }, [open, id, fetchRestaurant]);

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
          {restaurant.isLoading ? (
            <SkeletonDetailRestaurant />
          ) : (
            <div className='p-6'>
              <DialogHeader className='space-y-4'>
                <div className='relative'>
                  <img
                    src={restaurant.item?.image || '/placeholder.svg'}
                    alt={restaurant.item?.name}
                    className='h-64 w-full rounded-lg object-cover'
                  />
                </div>

                <div className='space-y-2'>
                  <DialogTitle className='text-2xl font-bold'>
                    {restaurant.item?.name}
                  </DialogTitle>
                  <div className='flex flex-wrap items-center gap-4'>
                    <div className='flex items-center gap-1'>
                      <Star className='h-5 w-5 fill-yellow-400 text-yellow-400' />
                      <span className='font-semibold'>
                        {restaurant.item?.rating}
                      </span>
                      <span className='text-muted-foreground'>
                        ({totalReviews} reviews)
                      </span>
                    </div>
                    <div className='flex gap-1'>
                      {restaurant.item?.price_levels.map((level, index) => (
                        <Badge key={index} variant='outline'>
                          {level}
                        </Badge>
                      ))}
                    </div>
                    {restaurant.item?.traveler_choice_award && (
                      <Badge className='bg-green-100 text-green-800'>
                        <Award className='mr-1 h-3 w-3' />
                        Traveler&apos;s Choice
                      </Badge>
                    )}
                  </div>
                </div>
              </DialogHeader>

              <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
                {/* Contact & Location */}
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <MapPin className='h-5 w-5' />
                      Contact & Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3'>
                    <div className='flex items-start gap-2'>
                      <MapPin className='text-muted-foreground mt-1 h-4 w-4' />
                      <div>
                        <p className='text-sm'>{restaurant.item?.street}</p>
                        <p className='text-muted-foreground text-sm'>
                          {restaurant.item?.city.name},{' '}
                          {restaurant.item?.city.postal_code}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Phone className='text-muted-foreground h-4 w-4' />
                      <span className='text-sm'>{restaurant.item?.phone}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Mail className='text-muted-foreground h-4 w-4' />
                      <span className='text-sm'>{restaurant.item?.email}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Operating Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                      <Clock className='h-5 w-5' />
                      Operating Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-2'>
                      {formattedHours.map((item, index) => (
                        <div
                          key={index}
                          className='flex justify-between text-sm'
                        >
                          <span className='font-medium'>{item.day}</span>
                          <span className='text-muted-foreground'>
                            {item.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Cuisines & Meal Types */}
              <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2'>
                <Card>
                  <CardHeader>
                    <CardTitle>Cuisines & Dishes</CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div>
                      <h4 className='mb-2 font-medium'>Cuisines</h4>
                      <div className='flex flex-wrap gap-2'>
                        {restaurant.item?.cuisines.map((cuisine, index) => (
                          <Badge key={index} variant='secondary'>
                            {cuisine}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className='mb-2 font-medium'>Signature Dishes</h4>
                      <div className='flex flex-wrap gap-2'>
                        {restaurant.item?.dishes.map((dish, index) => (
                          <Badge key={index} variant='outline'>
                            {dish}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className='mb-2 font-medium'>Meal Types</h4>
                      <div className='flex flex-wrap gap-2'>
                        {restaurant.item?.meal_types.map((meal, index) => (
                          <Badge key={index} variant='secondary'>
                            {meal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dietary Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='flex flex-wrap gap-2'>
                      {restaurant.item?.dietary_restrictions.map(
                        (restriction, index) => (
                          <Badge
                            key={index}
                            variant='outline'
                            className='border-green-200 bg-green-50 text-green-700'
                          >
                            {restriction}
                          </Badge>
                        ),
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Features */}
              <Card className='mt-6'>
                <CardHeader>
                  <CardTitle>Features & Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-2 gap-3 md:grid-cols-3'>
                    {restaurant.item?.features.map((feature, index) => (
                      <div
                        key={index}
                        className='flex items-center gap-2 text-sm'
                      >
                        {getFeatureIcon(feature)}
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
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
                        restaurant.item?.photos[selectedPhoto] ||
                        '/placeholder.svg'
                      }
                      alt={`Restaurant photo ${selectedPhoto + 1}`}
                      className='h-64 w-full rounded-lg object-cover'
                    />
                    <div className='grid grid-cols-6 gap-2'>
                      {restaurant.item?.photos
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

              {/* Rating Breakdown */}
              <Card className='mt-6'>
                <CardHeader>
                  <CardTitle>Rating Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-2'>
                    {restaurant.item?.rating_histogram.map((count, index) => {
                      const stars = 1 + index;
                      const safeTotalReviews = totalReviews || 0;
                      const percentage =
                        safeTotalReviews > 0
                          ? (count / safeTotalReviews) * 100
                          : 0;
                      return (
                        <div key={index} className='flex items-center gap-3'>
                          <div className='flex w-12 items-center gap-1'>
                            <span className='text-sm'>{stars}</span>
                            <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                          </div>
                          <div className='h-2 flex-1 rounded-full bg-gray-200'>
                            <div
                              className='h-2 rounded-full bg-yellow-400 transition-all'
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className='text-muted-foreground w-12 text-right text-sm'>
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
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
