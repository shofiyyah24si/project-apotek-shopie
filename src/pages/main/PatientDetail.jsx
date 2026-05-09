import { useParams, Link } from "react-router-dom";
import { FaUserInjured, FaArrowLeft, FaPhone, FaEnvelope, FaTint, FaAllergies } from "react-icons/fa";
import { MdLocationOn, MdCalendarToday, MdNotes } from "react-icons/md";
import patientsData from "../../data/patients.json";
import PageHeader from "../../components/PageHeader";

export default function PatientDetail() {
  const { id } = useParams();
  const patient = patientsData.find((p) => p.id === id);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <FaUserInjured className="text-5xl mb-3 text-gray-300" />
        <p className="text-lg font-medium">Pasien tidak ditemukan</p>
        <Link to="/patients" className="mt-4 text-teal-600 hover:underline text-sm flex items-center gap-1">
          <FaArrowLeft /> Kembali ke Data Pasien
        </Link>
      </div>
    );
  }

  // Hitung umur dari tanggal lahir
  const age = new Date().getFullYear() - new Date(patient.dob).getFullYear();

  return (
    <div>
      <PageHeader title="Detail Pasien" breadcrumb={["Dashboard", "Data Pasien", patient.name]} />

      <div className="mx-4 space-y-4">
        {/* Back button */}
        <Link to="/patients" className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium">
          <FaArrowLeft className="text-xs" /> Kembali ke Data Pasien
        </Link>

        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center text-2xl font-bold flex-shrink-0">
              {patient.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{patient.name}</h2>
              <p className="text-sm text-gray-400 mt-0.5">{patient.id} &bull; {patient.gender} &bull; {age} tahun</p>
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <FaEnvelope className="text-teal-400" /> {patient.email}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <FaPhone className="text-teal-400" /> {patient.phone}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard
            label="Tanggal Lahir"
            value={patient.dob}
            icon={<MdCalendarToday className="text-teal-500" />}
          />
          <InfoCard
            label="Golongan Darah"
            value={patient.bloodType}
            icon={<FaTint className="text-red-400" />}
            valueClass="text-red-500 font-bold text-lg"
          />
          <InfoCard
            label="Alergi"
            value={patient.allergies}
            icon={<FaAllergies className="text-orange-400" />}
            valueClass={patient.allergies !== "Tidak ada" ? "text-orange-600 font-semibold" : "text-gray-600 font-medium"}
          />
          <InfoCard
            label="Alamat"
            value={patient.address}
            icon={<MdLocationOn className="text-teal-500" />}
            className="sm:col-span-2"
          />
          <InfoCard
            label="Kunjungan Terakhir"
            value={patient.lastVisit}
            icon={<MdCalendarToday className="text-teal-500" />}
          />
        </div>

        {/* Catatan */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <MdNotes className="text-teal-500" /> Catatan Medis
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{patient.notes}</p>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value, icon, valueClass, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-5 ${className}`}>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
        {icon} {label}
      </p>
      <p className={`text-sm ${valueClass || "text-gray-700 font-medium"}`}>{value}</p>
    </div>
  );
}
