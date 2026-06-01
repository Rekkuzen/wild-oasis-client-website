import { auth } from "../_auth/auth";
import { MetadataType } from "../_types/MetadataType";

export const metadata: MetadataType = {
  title: "Account",
  description: "Lorem ipsum dolor",
};

const Account = async () => {
  const session = await auth();

  const firstName = (session?.user?.name ?? "").split(" ")[0];
  return <h1>Welcome, {firstName}!</h1>;
};

export default Account;
