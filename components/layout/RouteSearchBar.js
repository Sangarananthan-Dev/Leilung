"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { DEPARTMENTS, DISTRICT_LIST } from "@/lib/leilung-data";
import { districtPath } from "@/lib/leilung-paths";

function inferDepartment(pathname) {
  const segment = pathname.split("/").filter(Boolean)[0];
  return DEPARTMENTS[segment] ? segment : null;
}

export function RouteSearchBar() {
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef(null);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const activeDept = inferDepartment(pathname);
  const normalized = value.trim().toLowerCase();
  const districts = useMemo(() => {
    if (!normalized) {
      return DISTRICT_LIST;
    }

    return DISTRICT_LIST.filter((district) => {
      return district.name.toLowerCase().includes(normalized);
    });
  }, [normalized]);

  useEffect(() => {
    function handleOutside(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, []);

  function pushDistrict(dept, districtId) {
    router.push(districtPath(dept, districtId));
    setValue("");
    setIsOpen(false);
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <label className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-[rgba(8,14,9,0.9)] px-4 py-3 shadow-[0_12px_24px_rgba(0,0,0,0.2)]">
        <Search className="h-4 w-4 text-[var(--text-muted)]" />
        <input
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[var(--text-muted)]"
          onChange={(event) => {
            setValue(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={
            activeDept
              ? `Jump to ${DEPARTMENTS[activeDept].label} district`
              : "Choose district and department"
          }
          type="text"
          value={value}
        />
      </label>

      {isOpen
        ? <div className="absolute right-0 top-[calc(100%+0.5rem)] z-[1500] w-full overflow-hidden rounded-2xl border border-white/10 bg-[rgba(9,16,11,0.97)] shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.24em] text-[var(--text-muted)]">
                District Search
              </p>
              <p className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {districts.length} shown
              </p>
            </div>

            <div className="max-h-80 overflow-y-auto py-2">
              {districts.map((district) => (
                <div
                  key={district.id}
                  className="border-b border-white/6 px-4 py-3 last:border-b-0"
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="text-sm text-white">{district.name}</span>
                    <span className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {district.headquarter}
                    </span>
                  </div>

                  {activeDept
                    ? <button
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-[var(--text-primary)] transition hover:bg-white/8"
                        onMouseDown={(event) => {
                          event.preventDefault();
                          pushDistrict(activeDept, district.id);
                        }}
                        type="button"
                      >
                        Open {DEPARTMENTS[activeDept].label}
                      </button>
                    : <div className="grid grid-cols-2 gap-2">
                        {Object.values(DEPARTMENTS).map((dept) => (
                          <button
                            key={dept.key}
                            className="rounded-xl border px-3 py-2 text-left text-xs font-semibold uppercase tracking-[0.18em] transition shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                            onMouseDown={(event) => {
                              event.preventDefault();
                              pushDistrict(dept.key, district.id);
                            }}
                            style={{
                              borderColor: dept.accent,
                              backgroundColor: dept.accent,
                              color:
                                dept.key === "food" ? "#1f2937" : "#ffffff",
                            }}
                            type="button"
                          >
                            {dept.label}
                          </button>
                        ))}
                      </div>}
                </div>
              ))}

              {districts.length === 0
                ? <div className="px-4 py-6 text-sm text-[var(--text-muted)]">
                    No districts match this filter.
                  </div>
                : null}
            </div>
          </div>
        : null}
    </div>
  );
}
