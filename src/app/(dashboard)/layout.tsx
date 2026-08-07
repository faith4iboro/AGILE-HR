import { DashboardSidebar } from "@/components/layout/dashboard/sidebar";
import { MobileSidebar } from "@/components/layout/dashboard/mobile-sidebar";
import { DashboardTopbar } from "@/components/layout/dashboard/topbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex min-h-svh">
      <DashboardSidebar />
      <MobileSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar />
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto w-full max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
