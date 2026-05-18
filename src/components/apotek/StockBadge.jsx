export default function StockBadge({ stock }) {
  if (stock === 0) {
    return (
      <span
        className="font-semibold text-[#CC5F5F]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Habis
      </span>
    );
  }

  if (stock < 50) {
    return (
      <span style={{ fontFamily: "Inter, sans-serif" }}>
        <span className="font-semibold text-orange-500">{stock}</span>
        <span className="ml-1 text-xs text-orange-400">(Stok rendah)</span>
      </span>
    );
  }

  return (
    <span
      className="font-semibold text-[#1C1D22]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {stock}
    </span>
  );
}
