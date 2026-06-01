import { MetadataType } from "@/app/_types/MetadataType";
import ReservationData from "@/app/_components/ReservationData";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";

export const metadata: MetadataType = {
  title: "Reservations",
  description: "Lorem ipsum dolor",
};

const Page = async () => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center">
          <Spinner />
          <p>Loading Reservations...</p>
        </div>
      }
    >
      <ReservationData />
    </Suspense>
  );
};

export default Page;
