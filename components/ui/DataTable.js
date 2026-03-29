import Link from "next/link";

function renderCell(column, row) {
  if (column.render) {
    return column.render(row);
  }

  return row[column.key];
}

export function DataTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="border-b border-white/8 px-3 py-3 text-left text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr
              key={
                row.id ??
                row.key ??
                row.caseId ??
                row.orderId ??
                row.shopId ??
                row.districtId ??
                index
              }
              className="align-top"
            >
              {columns.map((column, columnIndex) => {
                const cell = renderCell(column, row);
                const href =
                  typeof column.href === "function" ? column.href(row) : null;

                return (
                  <td
                    key={`${column.key}-${columnIndex}`}
                    className="border-b border-white/6 px-3 py-3 text-[var(--text-primary)]"
                  >
                    {href
                      ? <Link
                          className="transition hover:text-white"
                          href={href}
                        >
                          {cell}
                        </Link>
                      : cell}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
