import { HTTPError } from 'ky';
import { create } from 'zustand';

import { IError } from '@/types/IError';
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
  phone: '',
  photos: [],
};

type State = {
  error: string;
  hotel: IHotel | null;
  isLoadingHotel: boolean;
};

type Action = {
  resetAction: () => void;
  getHotelAction: (id: string) => Promise<void>;
};

export const useHotelStore = create<State & Action>((set) => ({
  error: '',
  hotel: null,
  isLoadingHotel: true,

  resetAction: () =>
    set((state) => ({
      ...state,
      error: '',
      hotel: null,
      isLoadingHotel: false,
    })),

  getHotelAction: async (id) => {
    console.log('getHotel', id);
    try {
      set((state) => ({
        ...state,
        isLoadingHotel: true,
      }));

      await new Promise((resolve) => setTimeout(resolve, 1000));
      set((state) => ({ ...state, hotel: MOCK_DATA }));
    } catch (err) {
      if (err instanceof HTTPError) {
        const resp = await err.response.json<IError>();
        set((state) => ({ ...state, error: resp.error }));
        return;
      }
      set((state) => ({
        ...state,
        error: 'Something went wrong',
      }));
    } finally {
      set((state) => ({ ...state, isLoadingHotel: false }));
    }
  },
}));
