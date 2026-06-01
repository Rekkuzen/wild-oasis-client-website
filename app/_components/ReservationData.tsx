import { redirect } from "next/navigation";
import { auth } from "../_auth/auth";
import { getBookings } from "../_lib/data-service";
import Link from "next/link";
import ReservationsList from "./ReservationsList";

const ReservationData = async () => {
  // CHANGE
  const session = await auth();
  const guestID = session?.user?.guestId;

  if (!guestID) redirect("/login");

  const bookings = await getBookings(guestID);

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="text-accent-500 underline" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationsList bookings={bookings} />
      )}
    </div>
  );
};

export default ReservationData;
