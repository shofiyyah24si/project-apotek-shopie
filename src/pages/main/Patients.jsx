import PageHeader from "../../components/PageHeader";
import patientsData from "../../data/patients.json";

export default function Patients() {
  return (
    <div>
      <PageHeader title="Data Pasien" breadcrumb={["Dashboard", "Data Pasien"]} />

      <div className="mx-4 bg-white rounded-2xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100">
            <tr>
              {["ID", "Nama", "Email", "No. HP", "Tgl Lahir", "Alamat"].map((h) => (
                <th key={h} className="px-5 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {patientsData.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-3.5 font-medium text-gray-500 text-xs">{p.id}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {p.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-800">{p.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-gray-500">{p.email}</td>
                <td className="px-5 py-3.5 text-gray-600">{p.phone}</td>
                <td className="px-5 py-3.5 text-gray-400 text-xs">{p.dob}</td>
                <td className="px-5 py-3.5 text-gray-400 text-xs max-w-xs truncate">{p.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
