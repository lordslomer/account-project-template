import SideNav from "../UI/sidenav";
import VerifyPage from "../UI/verify";
import { getUserByID } from "../lib/action";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserByID({ id: true, isVerified: true });
  const verified = !!user?.isVerified;
  return (
    <div className="flex h-screen w-full flex-col md:flex-row md:overflow-hidden">
      <SideNav />
      <main className="flex grow flex-col items-center px-4 md:py-12">
        {verified ? children : <VerifyPage user_id={user?.id} />}
      </main>
    </div>
  );
}
