import { auth } from "@/app/_auth/auth";
import Spinner from "@/app/_components/Spinner";
import UpdateReservation from "@/app/_components/UpdateReservation";

import { redirect } from "next/navigation";
import { Suspense } from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();

  if (!session) redirect("/login");
  const { id } = await params;

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Edit Reservation #{id}
      </h2>

      <Suspense
        fallback={
          <div className="flex flex-col items-center">
            <Spinner />
            <p>Loading Reservation Form...</p>
          </div>
        }
      >
        <UpdateReservation id={id} />
      </Suspense>
    </div>
  );
};

export default Page;
