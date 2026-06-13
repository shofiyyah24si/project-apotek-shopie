import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import { LuPill, LuFactory } from "react-icons/lu";
import { HiOutlineHome } from "react-icons/hi2";
import medicinesData from "../../data/medicines.json";

const categoryColor = {
  "Analgesik":     "bg-[#eef1fe] text-[#5570F1]",
  "Antibiotik":    "bg-red-100 text-red-600",
  "Antasida":      "bg-yellow-100 text-yellow-700",
  "Antihistamin":  "bg-purple-100 text-purple-600",
  "Antidiabetik":  "bg-[#dde4fd] text-[#5570F1]",
  "Antihipertensi":"bg-pink-100 text-pink-600",
  "Vitamin":       "bg-green-100 text-[#519C66]",
  "Bronkodilator": "bg-orange-100 text-orange-600",
};

function InfoCard({ label, value, extra, valueClass, icon, className = "" }) {
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
      {extra}
    </div>
  );
}

export default function MedicineDetail() {
  const { id } = useParams();
  const [imgError, setImgError] = useState(false);
  const medicine = medicinesData.find((m) => m.id === id);

  // useEffect: update judul tab browser sesuai nama obat yang dibuka
  // dependency [medicine] → dijalankan ulang setiap kali obat yang ditampilkan berubah
  useEffect(() => {
    if (medicine) {
      document.title = `${medicine.name} — Apotek ShopiCare`;
    } else {
      document.title = "Detail Obat — Apotek ShopiCare";
    }
    return () => {
      document.title = "Apotek ShopiCare";
    };
  }, [medicine]);

  if (!medicine) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <LuPill className="text-5xl mb-3 text-gray-300" />
        <p className="text-lg font-medium" style={{ fontFamily: "Poppins, sans-serif" }}>
          Obat tidak ditemukan
        </p>
        <Link to="/medicines"
          className="mt-4 text-[#5570F1] hover:underline text-sm flex items-center gap-1"
          style={{ fontFamily: "Inter, sans-serif" }}>
          <FaArrowLeft className="text-xs" /> Kembali ke Data Obat
        </Link>
      </div>
    );
  }

  const isLowStock = medicine.stock > 0 && medicine.stock < 50;
  const isOutOfStock = medicine.stock === 0;

  return (
    <div>
      {/* Title + breadcrumb */}
      <div className="px-4 pb-4">
        <h1 className="text-2xl font-bold text-[#1C1D22]"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          Detail Obat
        </h1>
        <div className="flex items-center gap-1.5 mt-1 text-sm">
          <HiOutlineHome className="text-base text-gray-400" />
          <span className="text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>/</span>
          <Link to="/medicines"
            className="text-gray-400 hover:text-[#5570F1]"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Data Obat
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#5570F1] font-medium"
            style={{ fontFamily: "Inter, sans-serif" }}>
            {medicine.name}
          </span>
        </div>
      </div>

      <div className="mx-4 space-y-4">
        {/* Back */}
        <Link to="/medicines"
          className="inline-flex items-center gap-2 text-sm text-[#5570F1] hover:text-[#4460e0] font-medium"
          style={{ fontFamily: "Inter, sans-serif" }}>
          <FaArrowLeft className="text-xs" /> Kembali ke Data Obat
        </Link>

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Gambar */}
            <div className="w-full sm:w-48 h-48 rounded-2xl overflow-hidden bg-[#eef1fe] flex-shrink-0 flex items-center justify-center">
              {medicine.image && !imgError ? (
                <img src={medicine.image} alt={medicine.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)} />
              ) : (
                <LuPill className="text-[#5570F1] text-5xl" />
              )}
            </div>

            {/* Info utama */}
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-xl font-bold text-[#1C1D22]"
                    style={{ fontFamily: "Poppins, sans-serif" }}>
                    {medicine.name}
                  </h2>
                  <p className="text-sm text-gray-400 mt-0.5"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    {medicine.id} &bull; {medicine.brand}
                  </p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${categoryColor[medicine.category] || "bg-gray-100 text-gray-600"}`}
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {medicine.category}
                </span>
              </div>
              <p className="mt-4 text-gray-500 text-sm leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}>
                {medicine.description}
              </p>

              {/* Stock status badge */}
              {isOutOfStock && (
                <div className="mt-3 inline-flex items-center gap-1.5 bg-red-50 text-[#CC5F5F] text-xs font-semibold px-3 py-1.5 rounded-full">
                  <FaExclamationTriangle className="text-xs" /> Stok Habis
                </div>
              )}
              {isLowStock && (
                <div className="mt-3 inline-flex items-center gap-1.5 bg-orange-50 text-orange-500 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <FaExclamationTriangle className="text-xs" /> Stok Rendah
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard label="Harga Satuan"
            value={`Rp ${medicine.price.toLocaleString("id-ID")}`} />
          <InfoCard label="Stok Tersedia"
            value={isOutOfStock ? "Habis" : `${medicine.stock} unit`}
            valueClass={
              isOutOfStock ? "text-[#CC5F5F] font-bold text-base" :
              isLowStock   ? "text-orange-500 font-bold text-base" :
                             "text-[#519C66] font-bold text-base"
            } />
          <InfoCard label="Tanggal Kadaluarsa" value={medicine.expiry} />
          <InfoCard label="Dosis Penggunaan"   value={medicine.dosage} />
          <InfoCard label="Efek Samping"       value={medicine.sideEffects} />
          <InfoCard label="Produsen"            value={medicine.manufacturer}
            icon={<LuFactory className="text-[#5570F1]" />} />
        </div>
      </div>
    </div>
  );
}