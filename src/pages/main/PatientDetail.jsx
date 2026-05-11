import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaPhone, FaEnvelope } from "react-icons/fa";
import { LuUsers, LuMapPin, LuCalendar, LuDroplets, LuCircleAlert, LuClipboard } from "react-icons/lu";
import { HiOutlineHome } from "react-icons/hi2";
import patientsData from "../../data/patients.json";

function InfoCard({ label, value, icon, valueClass, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-5 ${className}`}>
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
        style={{ fontFamily: "Inter, sans-serif" }}>
        {icon} {label}
      </p>
      <p className={`text-sm ${valueClass || "text-[#1C1D22] font-medium"}`}
        style={{ fontFamily: "Inter, sans-serif" }}>
        {value}
      </p>
    </div>
  );
}

export default function PatientDetail() {
  const { id } = useParams();
  const patient = patientsData.find((p) => p.id === id);

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <LuUsers className="text-5xl mb-3 text-gray-300" />
        <p className="text-lg font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
          Pasien tidak ditemukan
        </p>
        <Link to="/patients"
          className="mt-4 text-[#5570F1] hover:underline text-sm flex items-center gap-1"
          style={{ fontFamily: "Inter, sans-serif" }}>
          <FaArrowLeft className="text-xs" /> Kembali ke Data Pasien
        </Link>
      </div>
    );
  }

  const age = new Date().getFullYear() - new Date(patient.dob).getFullYear();
  const hasAllergy = patient.allergies !== "Tidak ada";

  return (
    <div>
      {/* Title + breadcrumb */}
      <div className="px-4 pb-4">
        <h1 className="text-2xl font-bold text-[#1C1D22]"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          Detail Pasien
        </h1>
        <div className="flex items-center gap-1.5 mt-1 text-sm">
          <HiOutlineHome className="text-base text-gray-400" />
          <span className="text-gray-400">/</span>
          <Link to="/patients"
            className="text-gray-400 hover:text-[#5570F1]"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Data Pasien
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#5570F1] font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}>
            {patient.name}
          </span>
        </div>
      </div>

      <div className="mx-4 space-y-4">
        {/* Back */}
        <Link to="/patients"
          className="inline-flex items-center gap-2 text-sm text-[#5570F1] hover:text-[#4460e0] font-medium"
          style={{ fontFamily: "Inter, sans-serif" }}>
          <FaArrowLeft className="text-xs" /> Kembali ke Data Pasien
        </Link>

        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-2xl bg-[#eef1fe] text-[#5570F1] flex items-center justify-center text-2xl font-bold flex-shrink-0"
              style={{ fontFamily: "Poppins, sans-serif" }}>
              {patient.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#1C1D22]"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                {patient.name}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5"
                style={{ fontFamily: "Inter, sans-serif" }}>
                {patient.id} &bull; {patient.gender} &bull; {age} tahun
              </p>
              <div className="flex items-center gap-4 mt-2 flex-wrap">
                <span className="flex items-center gap-1.5 text-xs text-gray-500"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  <FaEnvelope className="text-[#5570F1]" /> {patient.email}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-gray-500"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  <FaPhone className="text-[#5570F1]" /> {patient.phone}
                </span>
              </div>
            </div>

            {/* Status badge */}
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-[#eef1fe] text-[#5570F1] text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ fontFamily: "Inter, sans-serif" }}>
              ● Aktif
            </span>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard label="Tanggal Lahir" value={patient.dob}
            icon={<LuCalendar className="text-[#5570F1]" />} />

          <InfoCard label="Golongan Darah" value={patient.bloodType}
            icon={<LuDroplets className="text-[#CC5F5F]" />}
            valueClass="text-[#CC5F5F] font-bold text-lg" />

          <InfoCard label="Alergi" value={patient.allergies}
            icon={<LuCircleAlert className={hasAllergy ? "text-orange-500" : "text-gray-400"} />}
            valueClass={hasAllergy ? "text-orange-600 font-semibold" : "text-[#1C1D22] font-medium"} />

          <InfoCard label="Alamat" value={patient.address}
            icon={<LuMapPin className="text-[#5570F1]" />}
            className="sm:col-span-2" />

          <InfoCard label="Kunjungan Terakhir" value={patient.lastVisit}
            icon={<LuCalendar className="text-[#519C66]" />}
            valueClass="text-[#519C66] font-semibold" />
        </div>

        {/* Catatan medis */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"
            style={{ fontFamily: "Inter, sans-serif" }}>
            <LuClipboard className="text-[#5570F1]" /> Catatan Medis
          </p>
          <p className="text-sm text-[#1C1D22] leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}>
            {patient.notes}
          </p>
        </div>
      </div>
    </div>
  );
}