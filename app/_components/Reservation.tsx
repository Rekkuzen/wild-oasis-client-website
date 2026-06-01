import { auth } from "../_auth/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { CabinType } from "../_types/CabinType";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

type ReservationPropType = {
  cabin: CabinType;
};

const Reservation = async ({ cabin }: ReservationPropType) => {
  const bookedDates = await getBookedDatesByCabinId(String(cabin.id));
  const settings = await getSettings();
  const session = await auth();

  return (
    <div className="grid min-h-[400px] grid-cols-2 border border-primary-800">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      <ReservationForm cabin={cabin} session={session} />
    </div>
  );
};

export default Reservation;
