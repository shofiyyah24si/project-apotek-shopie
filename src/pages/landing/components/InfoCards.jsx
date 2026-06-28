import { LuClock, LuMapPin, LuPhone } from "react-icons/lu";

const cards = [
  {
    icon: LuClock,
    title: "Jam Operasional",
    value: "Buka Setiap Hari",
    detail: "07.00 – 22.00 WIB",
    color: "bg-[#eef1fe] text-[#5570F1]",
  },
  {
    icon: LuMapPin,
    title: "Lokasi Apotek",
    value: "Jl. Kesehatan No. 1",
    detail: "Pekanbaru, Riau",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: LuPhone,
    title: "Hubungi Kami",
    value: "0761-123-456",
    detail: "WhatsApp: 0812-3456-7890",
    color: "bg-orange-100 text-orange-500",
  },
];

export default function InfoCards() {
  return (
    <section id="informasi" className="bg-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#1C1D22]"
            style={{ fontFamily: "Poppins, sans-serif" }}>
            Informasi Apotek
          </h2>
          <p className="text-sm text-gray-400 mt-1"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Kami siap melayani Anda setiap hari
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ icon: Icon, title, value, detail, color }) => (
            <div key={title}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon className="text-2xl" />
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-1 font-medium uppercase tracking-wider"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {title}
                </p>
                <p className="text-base font-bold text-[#1C1D22]"
                  style={{ fontFamily: "Poppins, sans-serif" }}>
                  {value}
                </p>
                <p className="text-sm text-gray-500 mt-0.5"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  {detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
