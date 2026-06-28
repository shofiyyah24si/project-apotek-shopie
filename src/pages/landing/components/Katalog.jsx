import { useState } from "react";
import { LuPill, LuSearch, LuX, LuTrendingUp, LuCircleAlert } from "react-icons/lu";

// ── shadcn/ui: Dialog ────────────────────────────────────────
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription,
} from "@/components/ui/dialog";

// ── Data produk — useState-friendly, ada stok & jumlah_klik ─
const initialProducts = [
  {
    id: 1, name: "Paracetamol 500mg", category: "Obat Bebas",
    price: 5000, stok: 250, jumlah_klik: 0,
    image: "/img/paracetamol.avif",
    categoryColor: "bg-green-100 text-green-700",
    deskripsi: "Obat pereda nyeri dan penurun demam yang umum digunakan.",
    dosis: "3x sehari 1 tablet setelah makan.",
    efekSamping: "Mual, ruam kulit (jarang).",
  },
  {
    id: 2, name: "Amoxicillin 500mg", category: "Obat Keras",
    price: 8500, stok: 120, jumlah_klik: 0,
    image: "/img/amoxicilin.avif",
    categoryColor: "bg-red-100 text-red-700",
    deskripsi: "Antibiotik spektrum luas untuk infeksi bakteri.",
    dosis: "3x sehari 1 kapsul selama 5–7 hari.",
    efekSamping: "Diare, mual, reaksi alergi.",
  },
  {
    id: 3, name: "Blackmores Vitamin C", category: "Suplemen",
    price: 185000, stok: 0, jumlah_klik: 0,
    image: "/img/vitamin c.jpg",
    categoryColor: "bg-yellow-100 text-yellow-700",
    deskripsi: "Suplemen vitamin C dosis tinggi untuk meningkatkan daya tahan tubuh.",
    dosis: "1x sehari 1 tablet bersama makanan.",
    efekSamping: "Gangguan pencernaan jika berlebih.",
  },
  {
    id: 4, name: "Ibuprofen 400mg", category: "Obat Bebas",
    price: 7000, stok: 200, jumlah_klik: 0,
    image: "/img/ibuprofen.avif",
    categoryColor: "bg-green-100 text-green-700",
    deskripsi: "Obat antiinflamasi nonsteroid untuk nyeri dan demam.",
    dosis: "3x sehari 1 tablet setelah makan.",
    efekSamping: "Nyeri lambung, mual, pusing.",
  },
  {
    id: 5, name: "Omeprazole 20mg", category: "Obat Keras",
    price: 12000, stok: 80, jumlah_klik: 0,
    image: "/img/omeprazole.png",
    categoryColor: "bg-red-100 text-red-700",
    deskripsi: "Mengurangi produksi asam lambung berlebih.",
    dosis: "1x sehari 1 kapsul sebelum makan.",
    efekSamping: "Sakit kepala, diare, mual.",
  },
  {
    id: 6, name: "Cetirizine 10mg", category: "Obat Bebas",
    price: 6000, stok: 150, jumlah_klik: 0,
    image: "/img/cetirizine.png",
    categoryColor: "bg-green-100 text-green-700",
    deskripsi: "Obat alergi untuk mengatasi rhinitis dan urtikaria.",
    dosis: "1x sehari 1 tablet malam hari.",
    efekSamping: "Kantuk, mulut kering.",
  },
];

const CATEGORIES = ["Semua", "Obat Bebas", "Obat Keras", "Suplemen"];

// ── Kartu produk ─────────────────────────────────────────────
function ProductCard({ product, onDetail }) {
  const habis = product.stok === 0;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col">
      {/* Gambar */}
      <div className="h-44 bg-[#eef1fe] flex items-center justify-center overflow-hidden relative">
        <img src={product.image} alt={product.name}
          className="h-full w-full object-cover"
          onError={e => { e.target.style.display = "none"; }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <LuPill className="text-[#5570F1] text-5xl opacity-10" />
        </div>
        {/* Badge stok habis */}
        {habis && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Stok Habis
          </div>
        )}
      </div>

      {/* Konten */}
      <div className="p-4 flex flex-col flex-1">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full w-fit mb-2 ${product.categoryColor}`}
          style={{ fontFamily: "Inter, sans-serif" }}>
          {product.category}
        </span>

        <h3 className="text-sm font-bold text-[#1C1D22] mb-1 flex-1"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          {product.name}
        </h3>

        <div className="flex items-center justify-between mb-3">
          <p className="text-base font-bold text-[#5570F1]"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Rp {product.price.toLocaleString("id-ID")}
          </p>
          {!habis && (
            <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
              Stok: {product.stok}
            </p>
          )}
        </div>

        {/* Tombol Lihat Detail — aktif jika ada stok, disabled jika habis */}
        <button
          onClick={() => !habis && onDetail(product)}
          disabled={habis}
          className={`w-full py-2 text-sm font-medium rounded-xl transition border ${
            habis
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-[#5570F1] text-[#5570F1] hover:bg-[#eef1fe]"
          }`}
          style={{ fontFamily: "Inter, sans-serif" }}>
          {habis ? "Tidak Tersedia" : "Lihat Detail"}
        </button>
      </div>
    </div>
  );
}

// ── Komponen utama Katalog ───────────────────────────────────
export default function Katalog() {
  const [products, setProducts]         = useState(initialProducts);
  const [search, setSearch]             = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedProduct, setSelectedProduct] = useState(null); // untuk Dialog

  // Klik "Lihat Detail" → tambah jumlah_klik & buka modal
  const handleDetail = (product) => {
    setProducts(prev =>
      prev.map(p => p.id === product.id ? { ...p, jumlah_klik: p.jumlah_klik + 1 } : p)
    );
    setSelectedProduct({ ...product, jumlah_klik: product.jumlah_klik + 1 });
  };

  // Filter: search + kategori (case-insensitive)
  const filtered = products.filter(p => {
    const matchSearch   = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "Semua" ||
      p.category.toLowerCase() === activeCategory.toLowerCase();
    return matchSearch && matchCategory;
  });

  // Visdat: 3 obat paling sering dicari
  const terpopuler = [...products]
    .sort((a, b) => b.jumlah_klik - a.jumlah_klik)
    .slice(0, 3)
    .filter(p => p.jumlah_klik > 0);

  return (
    <section id="katalog" className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-semibold text-[#5570F1] uppercase tracking-widest"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Produk Pilihan
          </span>
          <h2 className="text-2xl font-bold text-[#1C1D22] mt-1"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Katalog Obat Kami
          </h2>
        </div>

        {/* ── Search & Filter ────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search Input */}
          <div className="relative flex-1 max-w-sm">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari nama obat..."
              className="w-full pl-9 pr-9 py-2.5 border border-gray-200 rounded-xl text-sm outline-none focus:border-[#5570F1] bg-white transition"
              style={{ fontFamily: "Inter, sans-serif" }}
            />
            {search && (
              <button onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <LuX className="text-sm" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition border ${
                  activeCategory === cat
                    ? "bg-[#5570F1] text-white border-[#5570F1]"
                    : "bg-white text-gray-500 border-gray-200 hover:bg-[#eef1fe] hover:text-[#5570F1]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Produk */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <LuCircleAlert className="text-4xl mx-auto mb-3 text-gray-300" />
            <p className="text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
              Tidak ada obat yang cocok dengan pencarian "{search}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onDetail={handleDetail} />
            ))}
          </div>
        )}

        {/* ── Visdat: 3 Obat Paling Sering Dicari ───────────── */}
        {terpopuler.length > 0 && (
          <div className="mt-12 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <LuTrendingUp className="text-[#5570F1] text-lg" />
              <h3 className="font-bold text-[#1C1D22]"
                style={{ fontFamily: "Poppins, sans-serif" }}>
                3 Obat Paling Sering Dicari Minggu Ini
              </h3>
            </div>
            <div className="space-y-3">
              {terpopuler.map((p, i) => (
                <div key={p.id} className="flex items-center gap-4">
                  {/* Rank */}
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                    i === 0 ? "bg-yellow-100 text-yellow-700" :
                    i === 1 ? "bg-gray-100 text-gray-600" :
                              "bg-orange-100 text-orange-600"
                  }`} style={{ fontFamily: "Inter, sans-serif" }}>
                    {i + 1}
                  </span>
                  {/* Nama */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1C1D22] truncate"
                      style={{ fontFamily: "Inter, sans-serif" }}>
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
                      {p.category}
                    </p>
                  </div>
                  {/* Jumlah klik */}
                  <span className="text-xs font-bold text-[#5570F1] bg-[#eef1fe] px-2.5 py-1 rounded-full flex-shrink-0"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    {p.jumlah_klik}x dilihat
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-8">
          <a href="/login"
            className="inline-block bg-[#5570F1] hover:bg-[#4460e0] text-white text-sm font-semibold px-8 py-3 rounded-2xl transition shadow-lg shadow-[#5570F1]/20"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Lihat Semua Produk
          </a>
        </div>
      </div>

      {/* ── shadcn Dialog: Detail Obat ─────────────────────── */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
            <DialogDescription>{selectedProduct?.category}</DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-4">
              {/* Gambar */}
              <div className="h-40 bg-[#eef1fe] rounded-xl overflow-hidden flex items-center justify-center">
                <img src={selectedProduct.image} alt={selectedProduct.name}
                  className="h-full w-full object-cover rounded-xl"
                  onError={e => { e.target.style.display = "none"; }} />
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Harga", value: `Rp ${selectedProduct.price.toLocaleString("id-ID")}` },
                  { label: "Sisa Stok", value: `${selectedProduct.stok} unit` },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 mb-0.5" style={{ fontFamily: "Inter, sans-serif" }}>
                      {item.label}
                    </p>
                    <p className="text-sm font-bold text-[#1C1D22]" style={{ fontFamily: "Inter, sans-serif" }}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Detail teks */}
              {[
                { label: "Deskripsi",    value: selectedProduct.deskripsi },
                { label: "Dosis",        value: selectedProduct.dosis },
                { label: "Efek Samping", value: selectedProduct.efekSamping },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1"
                    style={{ fontFamily: "Inter, sans-serif" }}>
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
                    {item.value}
                  </p>
                </div>
              ))}

              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full py-2.5 bg-[#5570F1] hover:bg-[#4460e0] text-white text-sm font-medium rounded-xl transition"
                style={{ fontFamily: "Inter, sans-serif" }}>
                Tutup
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
