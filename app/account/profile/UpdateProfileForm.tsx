"use client";

import SpinnerMini from "@/app/_components/SpinnerMini";
import { GuestType } from "@/app/_types/GuestType";
import { updateProfile } from "@/app/actions/actions";
import Image from "next/image";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export type FormStateType = {
  success: boolean;
  errors: {
    nationality?: string;
    nationalID?: string;
    submit?: string;
  };
};

const initialState: FormStateType = {
  success: false,
  errors: {},
};

const UpdateProfileForm = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: GuestType;
}) => {
  const [state, formAction, pending] = useActionState(
    updateProfile,
    initialState,
  );
  const { fullName, emailAddress, nationalID, countryFlag } = user;
  const nationality = "Philippines";

  useEffect(() => {
    if (state.success) {
      toast.success("Profile updated!");
    }

    if (state.errors?.submit) {
      toast.error(state.errors.submit);
    }
  }, [state]);

  return (
    <form
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg"
      action={formAction}
    >
      {state.success && <p>Profile is now updating succesfully</p>}
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName ?? ""}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          name="fullName"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          value={emailAddress ?? ""}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          name="emailAddress"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {countryFlag && (
            <Image
              src={countryFlag ?? ""}
              alt="Country flag"
              width={64}
              height={64}
              className="h-5 rounded-sm"
            />
          )}
        </div>
        {children}
        {state.errors?.nationality && (
          <small className="mt-5 text-red-600">
            {state.errors?.nationality}
          </small>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          defaultValue={nationalID ?? ""}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
        />
        {state.errors?.nationalID && (
          <small className="mt-5 text-red-600">
            {state.errors?.nationalID}
          </small>
        )}
      </div>

      <div className="flex items-center justify-end gap-6">
        <button
          className="flex items-center gap-5 bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
          disabled={pending}
        >
          {pending ? (
            <>
              <SpinnerMini /> Updating
            </>
          ) : (
            "Update"
          )}
        </button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
