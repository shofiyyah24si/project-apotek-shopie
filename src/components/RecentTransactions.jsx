import transactionsData from "../data/transactions.json";

const statusColor = {
  Selesai: "bg-green-100 text-green-700",
  Diproses: "bg-blue-100 text-blue-700",
  Dibatalkan: "bg-red-100 text-red-700",
};

export default function RecentTransactions() {
  const recent = transactionsData.slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 mt-2">
      <h2 className="text-lg font-semibold mb-4">Transaksi Terbaru</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="pb-3">ID</th>
              <th className="pb-3">Pasien</th>
              <th className="pb-3">Obat</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recent.map((trx) => (
              <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 font-medium text-gray-700">{trx.id}</td>
                <td className="py-3 text-gray-600">{trx.patientName}</td>
                <td className="py-3 text-gray-600">{trx.medicine}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[trx.status]}`}>
                    {trx.status}
                  </span>
                </td>
                <td className="py-3 font-medium text-gray-700">Rp {trx.total.toLocaleString("id-ID")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
