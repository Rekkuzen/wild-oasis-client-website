"use client";

import { useReservationContext } from "../_context/reservationContext/useReservationContext";
import { CabinType } from "../_types/CabinType";
import Image from "next/image";
import LoginMessage from "./LoginMessage";
import { Session } from "next-auth";
import { differenceInDays } from "date-fns";
import { createBooking } from "../actions/actions";

type ReservationFormPropType = {
  cabin: CabinType;
  session: Session | null;
};

const formatDate = (date: Date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

export type BookingDataType = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  numNights: number;
  cabinPrice: number;
  totalPrice: number;
  cabinId: number;
};

function ReservationForm({ cabin, session }: ReservationFormPropType) {
  const { range, resetRange } = useReservationContext();
  const { regularPrice, discount, id } = cabin;
  const startDate = range?.from;
  const endDate = range?.to;
  const numNights = differenceInDays(endDate ?? "", startDate ?? "");
  const cabinPrice = numNights * (regularPrice - discount);
  const { maxCapacity } = cabin ?? {};

  const bookingData: BookingDataType = {
    startDate,
    endDate,
    numNights,
    cabinPrice: regularPrice,
    totalPrice: cabinPrice,
    cabinId: id,
  };

  const createBookingData = createBooking.bind(null, bookingData);

  if (!session?.user?.name || !session?.user?.image) return <LoginMessage />;

  return (
    <div className="scale-[1.01]">
      <div className="flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <Image
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={session?.user?.image ?? ""}
            alt={session?.user?.name ?? ""}
            height={35}
            width={35}
          />
          <p>{session?.user?.name}</p>
        </div>
      </div>

      <form
        className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg"
        action={async (formData) => {
          await createBookingData(formData);
          resetRange();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: Number(maxCapacity) }, (_, i) => i + 1).map(
              (x) => (
                <option value={x} key={x}>
                  {x} {x === 1 ? "guest" : "guests"}
                </option>
              ),
            )}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <p className="text-base text-primary-300">
            {range?.from && range?.to ? (
              <>
                <span className="font-bold">You selected: </span>
                {`${formatDate(range.from)} to ${formatDate(range.to)}`}
              </>
            ) : (
              "Start by selecting dates"
            )}
          </p>

          <button className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
