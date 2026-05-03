import PageHeader from "../../components/PageHeader";
import patientsData from "../../data/patients.json";

export default function Patients() {
  return (
    <div>
      <PageHeader title="Data Pasien" breadcrumb={["Dashboard", "Data Pasien"]} />

      <div className="mx-4 bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {["ID", "Nama", "Email", "No. HP", "Tgl Lahir", "Alamat"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {patientsData.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-700">{p.id}</td>
                <td className="px-4 py-3 text-gray-800 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-gray-600">{p.email}</td>
                <td className="px-4 py-3 text-gray-600">{p.phone}</td>
                <td className="px-4 py-3 text-gray-500">{p.dob}</td>
                <td className="px-4 py-3 text-gray-500">{p.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
