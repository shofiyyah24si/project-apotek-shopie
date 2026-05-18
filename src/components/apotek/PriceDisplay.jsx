export default function PriceDisplay({ amount, className = "" }) {
  return (
    <span
      className={`font-medium text-[#1C1D22] ${className}`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      Rp {amount.toLocaleString("id-ID")}
    </span>
  );
}
