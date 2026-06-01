export type BookingType = {
  id: number;
  guestId: number;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  status?: string;
  created_at: string;
  cabins: { name: string; image: string };
  cabinId?: string;
};
