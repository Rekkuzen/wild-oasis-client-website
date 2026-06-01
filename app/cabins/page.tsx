import { Suspense } from "react";
import { MetadataType } from "../_types/MetadataType";
import CabinList from "./CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";

export const metadata: MetadataType = {
  title: "Cabins",
  description: "Lorem ipsum dolor",
};

type CabinsPropType = {
  searchParams: Record<string, string>;
};

const Cabins = async ({ searchParams }: CabinsPropType) => {
  const params = await searchParams;
  const filter = params?.capacity ?? "all";

  return (
    <div>
      <h1 className="mb-5 text-4xl font-medium text-accent-400">
        Our Luxury Cabins
      </h1>
      <p className="mb-10 text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&lsquo;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>
      <div className="flex justify-end">
        <Filter />
      </div>
      <Suspense
        fallback={
          <div className="flex flex-col items-center">
            <Spinner />
            <p>Loading cabins...</p>
          </div>
        }
        key={filter}
      >
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
};

export default Cabins;
