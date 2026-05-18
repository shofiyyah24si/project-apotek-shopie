export default function AppTable({ headers = [], children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b border-gray-100">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {children}
        </tbody>
      </table>
    </div>
  );
}
