import { Sidebar } from "./_components/Sidebar";
import { BottomNav } from "./_components/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar className="hidden md:flex" />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <BottomNav className="md:hidden" />
    </div>
  );
}
