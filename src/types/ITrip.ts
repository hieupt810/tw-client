export interface ITrip {
  created_at: string;
  id: string;
  is_optimized: boolean;
  name: string;
  numberHotel: number;
  numberRestaurant: number;
  numberThingtodo: number;
  place_count: number;
  updated_at: string;
  status: boolean; // true for upcoming, false for done
  status_text: 'Upcoming' | 'Done';
}
