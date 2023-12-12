import { auth } from "@/auth";
import SideNav from "../UI/sidenav";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64 max-md:fixed max-md:bottom-0 max-md:left-0">
        <SideNav verified={!!(session?.user as any).isVerified} />
      </div>
      <main className="flex-grow md:overflow-y-auto p-4 md:p-8 lg:p-12">
        {children}
      </main>
    </div >
  );
}
