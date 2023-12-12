import { Metadata } from "next";
import VerifyPage from "./verify";
import { auth } from "@/auth";
export const metadata: Metadata = {
  title: 'Verify Account',
};

export default async function Page() {
  const session = await auth();
  return (
    <VerifyPage user_id={session?.user?.id} />
  );
}