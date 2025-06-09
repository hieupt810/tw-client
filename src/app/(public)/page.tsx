'use client';

import { useCallback, useEffect } from 'react';
import { useStore } from 'zustand';

import HeroSection from '@/components/hero-section';
import PlaceCarousel from '@/components/place-carousel';
import Search from '@/components/search';
import { useHotelStore } from '@/stores/hotel-store';
import { useRecommendationStore } from '@/stores/recommendation-store';
import { useRestaurantStore } from '@/stores/restaurant-store';
import { useThingToDoStore } from '@/stores/thing-to-do-store';

export default function HomePage() {
  const {
    hotels,
    reset: resetHotels,
    fetchHotels,
  } = useStore(useHotelStore, (state) => state);
  const {
    restaurants,
    reset: resetRestaurants,
    fetchRestaurants,
  } = useStore(useRestaurantStore, (state) => state);
  const {
    thingsToDo,
    reset: resetThingsToDo,
    fetchThingsToDo,
  } = useStore(useThingToDoStore, (state) => state);

  const {
    recommendations,
    fetchRecommendations,
    reset: resetRecommendation,
  } = useStore(useRecommendationStore, (state) => state);

  const fetchAll = useCallback(async () => {
    await Promise.all([
      fetchHotels(1, 10),
      fetchRestaurants(1, 10),
      fetchThingsToDo(1, 10),
      fetchRecommendations(1, 10),
    ]);
    return () => {
      resetHotels();
      resetRestaurants();
      resetThingsToDo();
      resetRecommendation();
    };
  }, [
    fetchHotels,
    fetchRestaurants,
    fetchThingsToDo,
    fetchRecommendations,
    resetHotels,
    resetRestaurants,
    resetThingsToDo,
    resetRecommendation,
  ]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <>
      <Search />
      <HeroSection
        image='/home.jpg'
        title='Explore Your Journey Awaits'
        description='Tailored to your preferences and designed to make every step of your adventure seamless and memorable.'
      />
      <div className='my-10 flex flex-col gap-10'>
        <PlaceCarousel
          autoplay
          items={recommendations.items}
          title='Top destinations for your next vacation'
          description='Discover the most popular places with the highest rankings'
        />
        <PlaceCarousel items={hotels.items} title='Stay at top hotels' />
        <PlaceCarousel
          items={restaurants.items}
          title='Experience at top restaurants'
        />
        <PlaceCarousel
          items={thingsToDo.items}
          title='Enjoy the things people love to do'
        />
      </div>
      <HeroSection title='Da Nang, Vietnam' image='/home-2.jpeg' />
    </>
  );
}
