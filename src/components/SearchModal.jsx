import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { LuPill, LuUsers, LuClipboardList } from "react-icons/lu";
import medicines   from "../data/medicines.json";
import patients    from "../data/patients.json";
import transactions from "../data/transactions.json";

// Bangun index pencarian dari data nyata
const searchIndex = [
  ...medicines.map(m => ({
    label: m.name,
    sub:   `${m.category} · Stok: ${m.stock} · Rp ${m.price.toLocaleString("id-ID")}`,
    icon:  "pill",
    to:    `/medicines/${m.id}`,
  })),
  ...patients.map(p => ({
    label: p.name,
    sub:   `${p.phone} · ${p.address}`,
    icon:  "user",
    to:    `/patients/${p.id}`,
  })),
  ...transactions.map(t => ({
    label: `${t.id} — ${t.patientName}`,
    sub:   `${t.medicine} · Rp ${t.total.toLocaleString("id-ID")} · ${t.status}`,
    icon:  "trx",
    to:    `/transactions`,
  })),
];

function ResultIcon({ type }) {
  const cls = "text-[#5570F1] flex-shrink-0";
  if (type === "pill") return <LuPill className={cls} />;
  if (type === "user") return <LuUsers className={cls} />;
  return <LuClipboardList className={cls} />;
}

export default function SearchModal({ onClose }) {
  const [query, setQuery]   = useState("");
  const navigate            = useNavigate();

  const results = query.trim().length > 0
    ? searchIndex.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.sub.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : [];

  const handleSelect = (to) => {
    navigate(to);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center pt-24 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="relative border-b border-gray-100">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
          <input
            autoFocus
            type="text"
            placeholder="Cari obat, pasien, transaksi..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 outline-none text-sm text-[#1C1D22]"
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {results.length > 0 && (
            <ul className="py-2">
              {results.map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleSelect(item.to)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#eef1fe] transition text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#eef1fe] flex items-center justify-center flex-shrink-0">
                      <ResultIcon type={item.icon} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#1C1D22] truncate"
                        style={{ fontFamily: "Inter, sans-serif" }}>
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-400 truncate"
                        style={{ fontFamily: "Inter, sans-serif" }}>
                        {item.sub}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {query.trim() && results.length === 0 && (
            <p className="py-8 text-sm text-gray-400 text-center"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Tidak ada hasil untuk "<strong>{query}</strong>"
            </p>
          )}

          {!query.trim() && (
            <div className="py-6 text-center">
              <p className="text-xs text-gray-400 mb-3"
                style={{ fontFamily: "Inter, sans-serif" }}>
                Cari dari data berikut:
              </p>
              <div className="flex justify-center gap-4">
                {[
                  { icon: "pill", label: `${medicines.length} Obat` },
                  { icon: "user", label: `${patients.length} Pasien` },
                  { icon: "trx",  label: `${transactions.length} Transaksi` },
                ].map(c => (
                  <div key={c.label} className="flex items-center gap-1.5 text-xs text-gray-500"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    <ResultIcon type={c.icon} />
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t border-gray-100 px-4 py-2 flex items-center gap-3">
          <span className="text-[10px] text-gray-300"
            style={{ fontFamily: "Inter, sans-serif" }}>
            ESC untuk tutup
          </span>
        </div>
      </div>
    </div>
  );
}