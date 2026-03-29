import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function SearchBar({ districts, onChange, onSelectDistrict, value }) {
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const normalized = value.trim().toLowerCase();
  const filteredDistricts = districts.filter((district) => {
    if (!normalized) {
      return true;
    }

    return district.name.toLowerCase().includes(normalized);
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <label className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-[rgba(9,16,11,0.84)] px-4 py-3">
        <Search className="h-4 w-4 text-[var(--text-muted)]" />
        <input
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-[var(--text-muted)]"
          onChange={(event) => {
            onChange(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search district"
          type="text"
          value={value}
        />
      </label>

      {isOpen
        ? <div className="absolute right-0 top-[calc(100%+0.5rem)] z-[1200] w-full overflow-hidden rounded-2xl border border-white/10 bg-[rgba(9,16,11,0.96)] shadow-2xl backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]">
                Districts
              </p>
              <p className="mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {filteredDistricts.length} shown
              </p>
            </div>

            <div className="max-h-72 overflow-y-auto py-2">
              {filteredDistricts.map((district) => (
                <button
                  key={district.id}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-white transition hover:bg-white/6"
                  onMouseDown={(event) => {
                    event.preventDefault();
                    onSelectDistrict(district);
                    setIsOpen(false);
                  }}
                  type="button"
                >
                  <span>{district.name}</span>
                  <span className="mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                    Select
                  </span>
                </button>
              ))}

              {filteredDistricts.length === 0
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
