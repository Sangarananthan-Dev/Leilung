const TAB_META = [
  { id: "food", label: "Food & PDS", accent: "#f59e0b" },
  { id: "land", label: "Land Revenue", accent: "#22c55e" },
  { id: "ipr", label: "Information & PR", accent: "#60a5fa" },
  { id: "printing", label: "Printing", accent: "#a78bfa" },
];

export function DeptTabs({ activeDept, className = "", onChange }) {
  return (
    <div
      className={`grid grid-cols-2 gap-1 border-b border-white/8 px-1 ${className}`.trim()}
    >
      {TAB_META.map((tab) => {
        const isActive = tab.id === activeDept;

        return (
          <button
            key={tab.id}
            className={`relative rounded-xl px-4 py-3 text-left transition duration-200 ${
              isActive
                ? "bg-white/6 text-white"
                : "text-[var(--text-muted)] hover:bg-white/4 hover:text-white"
            }`}
            onClick={() => onChange(tab.id)}
            type="button"
          >
            <span
              className="mb-2 block h-1.5 w-12 rounded-full"
              style={{ backgroundColor: tab.accent }}
            />
            <span className="text-sm font-medium">{tab.label}</span>
            {isActive
              ? <span
                  className="absolute inset-x-3 bottom-0 h-[3px] rounded-full"
                  style={{ backgroundColor: tab.accent }}
                />
              : null}
          </button>
        );
      })}
    </div>
  );
}
