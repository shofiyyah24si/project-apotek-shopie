import { LuPill } from "react-icons/lu";

const products = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Obat Bebas",
    price: 5000,
    image: "/img/paracetamol.avif",
    categoryColor: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    name: "Amoxicillin 500mg",
    category: "Obat Keras",
    price: 8500,
    image: "/img/amoxicilin.avif",
    categoryColor: "bg-red-100 text-red-700",
  },
  {
    id: 3,
    name: "Blackmores Vitamin C",
    category: "Suplemen",
    price: 185000,
    image: "/img/vitamin c.jpg",
    categoryColor: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 4,
    name: "Ibuprofen 400mg",
    category: "Obat Bebas",
    price: 7000,
    image: "/img/ibuprofen.avif",
    categoryColor: "bg-green-100 text-green-700",
  },
  {
    id: 5,
    name: "Omeprazole 20mg",
    category: "Obat Keras",
    price: 12000,
    image: "/img/omeprazole.png",
    categoryColor: "bg-red-100 text-red-700",
  },
  {
    id: 6,
    name: "Cetirizine 10mg",
    category: "Obat Bebas",
    price: 6000,
    image: "/img/cetirizine.png",
    categoryColor: "bg-green-100 text-green-700",
  },
];

function ProductCard({ product }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col">
      {/* Gambar */}
      <div className="h-44 bg-[#eef1fe] flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="hidden h-full w-full items-center justify-center">
          <LuPill className="text-[#5570F1] text-5xl opacity-30" />
        </div>
      </div>

      {/* Konten */}
      <div className="p-4 flex flex-col flex-1">
        {/* Badge kategori */}
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full w-fit mb-2 ${product.categoryColor}`}
          style={{ fontFamily: "Inter, sans-serif" }}>
          {product.category}
        </span>

        <h3 className="text-sm font-bold text-[#1C1D22] mb-1 flex-1"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          {product.name}
        </h3>

        <p className="text-base font-bold text-[#5570F1] mb-3"
          style={{ fontFamily: "Poppins, sans-serif" }}>
          Rp {product.price.toLocaleString("id-ID")}
        </p>

        {/* Tombol pasif */}
        <button
          disabled
          className="w-full py-2 border border-[#5570F1] text-[#5570F1] text-sm font-medium rounded-xl opacity-60 cursor-not-allowed"
          style={{ fontFamily: "Inter, sans-serif" }}>
          Lihat Detail
        </button>
      </div>
    </div>
  );
}

export default function Katalog() {
  return (
    <section id="katalog" className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-[#5570F1] uppercase tracking-widest"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Produk Pilihan
          </span>
          <h2 className="text-2xl font-bold text-[#1C1D22] mt-1"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Katalog Obat Kami
          </h2>
          <p className="text-sm text-gray-400 mt-1 max-w-md mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Produk berkualitas dari produsen terpercaya, tersedia setiap hari
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/login"
            className="inline-block bg-[#5570F1] hover:bg-[#4460e0] text-white text-sm font-semibold px-8 py-3 rounded-2xl transition shadow-lg shadow-[#5570F1]/20"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Lihat Semua Produk
          </a>
        </div>
      </div>
    </section>
  );
}
