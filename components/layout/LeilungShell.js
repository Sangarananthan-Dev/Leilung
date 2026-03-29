import { DepartmentNav } from "@/components/layout/DepartmentNav";
import { RouteSearchBar } from "@/components/layout/RouteSearchBar";
import { LeilungLogo } from "@/components/shared/LeilungLogo";

export function LeilungShell({ activeDept = null, children, subtitle, title }) {
  return (
    <main className="min-h-screen text-[var(--text-primary)]">
      <header className="border-b border-emerald-950/45 bg-[linear-gradient(180deg,#102313,#0c1a0e)] text-white shadow-[0_10px_24px_rgba(0,0,0,0.24)]">
        <div className="mx-auto max-w-[1800px] px-4 py-4 lg:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <LeilungLogo />
              <div className="min-w-0">
                <p className="text-xl font-bold tracking-[0.02em] text-white lg:text-3xl">
                  {title}
                </p>
                <p className="mt-1 text-sm leading-6 text-emerald-50/72">
                  {subtitle}
                </p>
              </div>
            </div>

            <div className="flex w-full justify-end xl:max-w-md">
              <RouteSearchBar />
            </div>
          </div>
        </div>

        <DepartmentNav activeDept={activeDept} />
      </header>

      <div className="mx-auto max-w-[1800px] px-4 py-6 lg:px-6">{children}</div>
    </main>
  );
}
