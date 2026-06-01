"use client";

import { usePathname, useSearchParams } from "next/navigation";
import ButtonFilter from "./ButtonFilter";
import { useRouter } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const filter = searchParams.get("capacity") ?? "all";
  const router = useRouter();

  const handleFilter = (filter: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-8 flex border border-primary-800">
      <ButtonFilter
        filter={filter}
        filterValue="all"
        handleFilter={handleFilter}
      >
        All cabins
      </ButtonFilter>
      <ButtonFilter
        filter={filter}
        filterValue="small"
        handleFilter={handleFilter}
      >
        1&mdash;3 guests
      </ButtonFilter>
      <ButtonFilter
        filter={filter}
        filterValue="medium"
        handleFilter={handleFilter}
      >
        4&mdash;6 guests
      </ButtonFilter>
      <ButtonFilter
        filter={filter}
        filterValue="large"
        handleFilter={handleFilter}
      >
        8&mdash;12 guests
      </ButtonFilter>
    </div>
  );
};

export default Filter;
