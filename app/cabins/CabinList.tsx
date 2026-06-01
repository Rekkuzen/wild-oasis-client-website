import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";
import { unstable_noStore } from "next/cache";

type CabinListPropType = {
  filter: string;
};


const CabinList = async ({ filter }: CabinListPropType) => {
  unstable_noStore();
  const cabins = await getCabins({ filter });
  if (!cabins.length) return null;

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
};

export default CabinList;
