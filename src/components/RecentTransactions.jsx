import transactionsData from "../data/transactions.json";

const statusColor = {
  Selesai: "bg-green-100 text-green-700",
  Diproses: "bg-blue-100 text-blue-700",
  Dibatalkan: "bg-red-100 text-red-700",
};

export default function RecentTransactions() {
  const recent = transactionsData.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-800">Transaksi Terbaru</h2>
        <a href="/transactions" className="text-xs text-teal-600 hover:underline font-medium">Lihat semua →</a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b border-gray-100">
              <th className="pb-3 text-xs font-semibold text-gray-400 uppercase">ID</th>
              <th className="pb-3 text-xs font-semibold text-gray-400 uppercase">Pasien</th>
              <th className="pb-3 text-xs font-semibold text-gray-400 uppercase">Obat</th>
              <th className="pb-3 text-xs font-semibold text-gray-400 uppercase">Status</th>
              <th className="pb-3 text-xs font-semibold text-gray-400 uppercase">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {recent.map((trx) => (
              <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 font-medium text-gray-700">{trx.id}</td>
                <td className="py-3 text-gray-600">{trx.patientName}</td>
                <td className="py-3 text-gray-500 text-xs">{trx.medicine}</td>
                <td className="py-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor[trx.status]}`}>
                    {trx.status}
                  </span>
                </td>
                <td className="py-3 font-semibold text-gray-700">Rp {trx.total.toLocaleString("id-ID")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
