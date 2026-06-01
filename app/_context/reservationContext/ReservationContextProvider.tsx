"use client";

import { useEffect, useState } from "react";
import { ReservationContext } from "./ReservationContext";
import { DateRange } from "react-day-picker";
import { usePathname } from "next/navigation";

type ReservationContextProviderPropType = {
  children: React.ReactNode;
};

export const ReservationContextProvider = ({
  children,
}: ReservationContextProviderPropType) => {
  const [range, setRange] = useState<DateRange | undefined>();
  const pathname = usePathname();

  const resetRange = () => setRange(undefined);

  useEffect(() => {
    setRange(undefined);
  }, [pathname]);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
};
