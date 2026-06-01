"use server";

import { auth, signIn } from "@/app/_auth/auth";
import { signOut } from "@/app/_auth/auth";
import { FormStateType } from "../account/profile/UpdateProfileForm";
import supabase from "../_lib/supabase-service";
import { revalidatePath } from "next/cache";
import { UpdateReservationInitialStateType } from "../_components/UpdateReservationForm";
import { redirect } from "next/navigation";
import { BookingDataType } from "../_components/ReservationForm";

export const signInAction = async () => {
  await signIn("google", {
    redirectTo: "/account",
  });
};

export const signOutAction = async () => {
  await signOut({ redirectTo: "/" });
};

export const updateProfile = async (
  prevState: FormStateType,
  formData: FormData,
) => {
  const session = await auth();
  const rawNationality = formData.get("nationality") as string;
  const nationalID = formData.get("nationalID") as string;
  const errors: FormStateType["errors"] = {};

  if (!session) throw new Error("You should logged in first.");

  if (!rawNationality) errors.nationality = "Nationality is required.";
  if (!nationalID) errors.nationalID = "National ID is required.";

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  const [nationality, countryFlag] = rawNationality.split("%");

  const { error } = await supabase
    .from("guests")
    .update({ nationalID, nationality, countryFlag })
    .eq("id", session?.user?.guestId);

  if (error)
    return {
      success: false,
      errors: {
        submit: error.message,
      },
    };

  revalidatePath("/account/profile");

  return {
    success: true,
    errors: {},
  };
};

export const deleteReservation = async (bookingId: number) => {
  const session = await auth();
  const guestID = session?.user?.guestId;
  if (!session) throw new Error("You must logged first.");

  const { data, error: bookingIdError } = await supabase
    .from("bookings")
    .select("id")
    .eq("guestId", guestID);

  if (bookingIdError)
    throw new Error("There is a problem in fetching bookings.");

  const bookingIds = data.map((booking) => booking.id);
  if (!bookingIds.includes(bookingId))
    throw new Error("You are not authorized to do this action.");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("There is a problem in deleting this booking.");

  revalidatePath("/account/reservations");
};

export const updateBooking = async (
  prevState: UpdateReservationInitialStateType,
  formData: FormData,
) => {
  const session = await auth();
  if (!session) throw new Error("You are not authorized to do this action.");
  const error: UpdateReservationInitialStateType["error"] = {};
  const bookingId = Number(formData.get("bookingId"));
  const numGuests = Number(formData.get("numGuests"));
  const observations = formData.get("observations");

  if (!numGuests) {
    error.numGuests = "Number of guests field is required.";
  }
  if (!observations) {
    error.observations = "Observations field is required.";
  }

  if (Object.keys(error).length > 0) {
    return {
      success: false,
      error,
    };
  }

  const { data: bookingsData, error: bookingsDataError } = await supabase
    .from("bookings")
    .select("id")
    .eq("guestId", session.user.guestId);
  const bookingIds = bookingsData?.map((booking) => booking.id);

  if (bookingsDataError)
    throw new Error("There is an error in fetching the data");

  if (!bookingIds?.includes(bookingId))
    throw new Error("You are not authorized to do this action.");

  const updatedFields = { numGuests, observations };

  const { error: bookingError } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId);

  if (bookingError) {
    console.error(bookingError.message);
    throw new Error(bookingError.message);
  }

  revalidatePath("/account/reservations");
  redirect("/account/reservations");
};

export const createBooking = async (
  bookingData: BookingDataType,
  formData: FormData,
) => {
  const session = await auth();
  if (!session) throw new Error("You are not authorized to do this action.");

  const newBooking = {
    ...bookingData,
    guestId: session?.user?.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations"),
    extrasPrice: 0,
    status: "unconfirmed",
    isPaid: false,
    hasBreakfast: false,
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error(error.message);

  revalidatePath(`/cabin/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
};
