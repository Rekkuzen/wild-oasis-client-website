import { redirect } from "next/navigation";
import SignInButton from "../_components/SignInButton";
import { MetadataType } from "../_types/MetadataType";
import { auth } from "../_auth/auth";

export const metadata: MetadataType = {
  title: "Login",
  description: "Lorem ipsum dolor",
};

export default async function Page() {
  const session = await auth();

  if (session) {
    redirect("/account");
  }

  return (
    <div className="mt-10 flex flex-col items-center gap-10">
      <h2 className="text-3xl font-semibold">
        Sign in to access your guest area
      </h2>
      <SignInButton />
    </div>
  );
}
