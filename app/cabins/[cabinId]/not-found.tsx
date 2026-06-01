"use client";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-full space-y-5">
      <h1 className="text-3xl font-semibold">
       This Cabin could not be found :(
      </h1>
      <Link
        href="/cabins"
        className="inline-block bg-accent-500 px-6 py-3 text-lg text-primary-800"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;
