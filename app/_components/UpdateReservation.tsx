import UpdateReservationForm from "@/app/_components/UpdateReservationForm";
import { getBooking, getCabin } from "@/app/_lib/data-service";

type UpdateReservationPropType = {
  id: string;
};

const UpdateReservation = async ({ id }: UpdateReservationPropType) => {
  const {
    id: bookingId,
    cabinId,
    observations,
    numGuests,
  } = await getBooking(id);
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <UpdateReservationForm
      bookingId={bookingId}
      maxCapacity={maxCapacity}
      observations={observations}
      numGuests={numGuests}
    />
  );
};

export default UpdateReservation;
