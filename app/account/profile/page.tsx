import { MetadataType } from "@/app/_types/MetadataType";
import UpdateProfileForm from "./UpdateProfileForm";
import SelectCountry from "./SelectCountry";
import { auth } from "@/app/_auth/auth";
import { getGuest } from "@/app/_lib/data-service";
import { redirect } from "next/navigation";
import { GuestType } from "@/app/_types/GuestType";

export const metadata: MetadataType = {
  title: "Profile",
  description: "Lorem ipsum dolor",
};

const Page = async () => {
  const session = await auth();
  const email = session?.user.email;

  if (!email) {
    redirect("/login");
  }

  const user: GuestType = await getGuest(email);

  const { nationality } = user;

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-accent-400">
        Update your guest profile
      </h2>

      <p className="mb-8 text-lg text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm user={user}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          defaultCountry={nationality ?? ""}
        />
      </UpdateProfileForm>
    </div>
  );
};

export default Page;
