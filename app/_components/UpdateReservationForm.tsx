"use client";

import { updateBooking } from "@/app/actions/actions";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";
import SpinnerMini from "./SpinnerMini";

export type UpdateReservationInitialStateType = {
  success: boolean;
  error?: {
    numGuests?: string;
    observations?: string;
    formError?: string;
  };
};

const initialState: UpdateReservationInitialStateType = {
  success: false,
  error: {},
};

type UpdateReservationFormPropType = {
  bookingId: number;
  maxCapacity: number;
  observations: string;
  numGuests: number;
};

const UpdateReservationForm = ({
  bookingId,
  maxCapacity,
  observations,
  numGuests,
}: UpdateReservationFormPropType) => {
  const [state, formAction, pending] = useActionState(
    updateBooking,
    initialState,
  );

  // useEffect(() => {
  //   if (state.success) {
  //     toast.success("Reservation is now updated!");
  //   }
  //   if (state.error?.formError) {
  //     toast.error(state.error.formError);
  //   }
  // }, [state]);

  return (
    <form
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
      action={formAction}
    >
      <div className="space-y-2">
        <label htmlFor="numGuests">How many guests?</label>
        <select
          name="numGuests"
          id="numGuests"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          defaultValue={numGuests}
          key={numGuests}
          disabled={pending}
        >
          <option value="" key="">
            Select number of guests...
          </option>
          {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
            <option value={x} key={x}>
              {x} {x === 1 ? "guest" : "guests"}
            </option>
          ))}
        </select>
        {state.error?.numGuests && (
          <small className="inline-block text-red-500">
            {state.error.numGuests}
          </small>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="observations">
          Anything we should know about your stay?
        </label>
        <textarea
          name="observations"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          defaultValue={observations}
          disabled={pending}
        />
        {state.error?.observations && (
          <small className="inline-block text-red-500">
            {state.error.observations}
          </small>
        )}
      </div>
      <input type="hidden" defaultValue={bookingId} name="bookingId" />
      <div className="flex items-center justify-end gap-6">
        <button
          className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          disabled={pending}
        >
          {pending ? (
            <span className="flex items-center gap-3">
              <SpinnerMini />
              Updating...
            </span>
          ) : (
            "Update Reservation"
          )}
        </button>
      </div>
    </form>
  );
};

export default UpdateReservationForm;
