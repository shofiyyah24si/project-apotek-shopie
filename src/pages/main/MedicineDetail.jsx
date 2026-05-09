import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaPills, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import { MdFactory } from "react-icons/md";
import medicinesData from "../../data/medicines.json";
import PageHeader from "../../components/PageHeader";

const categoryColor = {
  "Analgesik": "bg-orange-100 text-orange-700",
  "Antibiotik": "bg-red-100 text-red-700",
  "Antasida": "bg-yellow-100 text-yellow-700",
  "Antihistamin": "bg-purple-100 text-purple-700",
  "Antidiabetik": "bg-blue-100 text-blue-700",
  "Antihipertensi": "bg-pink-100 text-pink-700",
  "Vitamin": "bg-green-100 text-green-700",
  "Bronkodilator": "bg-teal-100 text-teal-700",
};

export default function MedicineDetail() {
  const { id } = useParams();
  const [imgError, setImgError] = useState(false);
  const medicine = medicinesData.find((m) => m.id === id);

  if (!medicine) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <FaPills className="text-5xl mb-3 text-gray-300" />
        <p className="text-lg font-medium">Obat tidak ditemukan</p>
        <Link to="/medicines" className="mt-4 text-teal-600 hover:underline text-sm flex items-center gap-1">
          <FaArrowLeft /> Kembali ke Data Obat
        </Link>
      </div>
    );
  }

  const isLowStock = medicine.stock < 50;

  return (
    <div>
      <PageHeader title="Detail Obat" breadcrumb={["Dashboard", "Data Obat", medicine.name]} />

      <div className="mx-4 space-y-4">
        {/* Back button */}
        <Link to="/medicines" className="inline-flex items-center gap-2 text-sm text-teal-600 hover:text-teal-700 font-medium">
          <FaArrowLeft className="text-xs" /> Kembali ke Data Obat
        </Link>

        {/* Main card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Gambar obat */}
            <div className="w-full sm:w-48 h-48 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
              {medicine.image && !imgError ? (
                <img
                  src={medicine.image}
                  alt={medicine.name}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <FaPills className="text-gray-300 text-5xl" />
              )}
            </div>

            {/* Info utama */}
            <div className="flex-1">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{medicine.name}</h2>
                  <p className="text-sm text-gray-400 mt-0.5">{medicine.id} &bull; {medicine.brand}</p>
                </div>
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${categoryColor[medicine.category] || "bg-gray-100 text-gray-600"}`}>
                  {medicine.category}
                </span>
              </div>
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">{medicine.description}</p>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <InfoCard label="Harga Satuan" value={`Rp ${medicine.price.toLocaleString("id-ID")}`} />
          <InfoCard
            label="Stok Tersedia"
            value={`${medicine.stock} unit`}
            extra={isLowStock && (
              <span className="flex items-center gap-1 text-xs text-red-500 mt-1">
                <FaExclamationTriangle /> Stok rendah
              </span>
            )}
            valueClass={isLowStock ? "text-red-500 font-bold" : "text-gray-800 font-bold"}
          />
          <InfoCard label="Tanggal Kadaluarsa" value={medicine.expiry} />
          <InfoCard label="Dosis Penggunaan" value={medicine.dosage} />
          <InfoCard label="Efek Samping" value={medicine.sideEffects} />
          <InfoCard label="Produsen" value={medicine.manufacturer} icon={<MdFactory className="text-teal-500" />} />
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value, extra, valueClass, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
        {icon} {label}
      </p>
      <p className={`text-sm ${valueClass || "text-gray-700 font-medium"}`}>{value}</p>
      {extra}
    </div>
  );
}
