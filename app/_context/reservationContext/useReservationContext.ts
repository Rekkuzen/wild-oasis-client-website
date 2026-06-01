import { useContext } from "react";
import { ReservationContext } from "./ReservationContext";

export const useReservationContext = () => {
  const context = useContext(ReservationContext);
  if (!context)
    throw new Error(
      "Reservation Context Hook is used outside of it's provider.",
    );
  return context;
};
