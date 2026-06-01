import { createContext, Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";

type ReservationContextType = {
  range: DateRange | undefined;
  setRange: Dispatch<SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
};

export const ReservationContext = createContext<ReservationContextType | null>(
  null,
);
