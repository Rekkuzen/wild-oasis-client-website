"use client";

import { useOptimistic } from "react";
import { BookingType } from "../_types/BookingType";
import ReservationCard from "./ReservertionCard";
import { deleteReservation } from "../actions/actions";

type ReservationsListPropType = {
  bookings: BookingType[];
};

const ReservationsList = ({ bookings }: ReservationsListPropType) => {
  const [optimisticBookings, deleteOptimisticBooking] = useOptimistic(
    bookings,
    (currBookings, bookingId) =>
      currBookings.filter((booking) => booking.id !== bookingId),
  );

  const handleDeleteBookings = async (bookingId: number) => {
    const confirmation = confirm("Are you sure you want to delete this data?");
    if (!confirmation) return;
    deleteOptimisticBooking(bookingId);
    await deleteReservation(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings?.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDeleteBookings}
        />
      ))}
    </ul>
  );
};

export default ReservationsList;
