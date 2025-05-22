'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import Loading from '@/components/loading';
import SectionTitle from '@/components/section-title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TripService } from '@/services/trip';
import { ITrip } from '@/types/ITrip';

export default function TripPage() {
  const [trips, setTrips] = useState<ITrip[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    try {
      const data = await TripService.getTrip();
      setTrips(data);
    } catch {
      setTrips([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  if (loading) return <Loading />;
  return (
    <div className='px-10'>
      <SectionTitle text='Your Trips' />
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {trips.length === 0 ? (
          <span className='text-muted-foreground col-span-full text-center'>
            No trips found.
          </span>
        ) : (
          trips.map((trip) => (
            <Card
              key={trip.id}
              className='cursor-pointer transition-shadow hover:shadow-lg'
              onClick={() => router.push(`/trip/${trip.id}`)}
            >
              <CardHeader>
                <CardTitle>{trip.name}</CardTitle>
              </CardHeader>
              <CardContent className='text-muted-foreground flex flex-col gap-2 text-sm'>
                <span>Places: {trip.placeCount}</span>
                <span>
                  Last updated: {new Date(trip.updatedAt).toLocaleDateString()}
                </span>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
