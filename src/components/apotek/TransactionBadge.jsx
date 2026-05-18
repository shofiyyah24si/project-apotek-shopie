export default function TransactionBadge({ type }) {
  const badgeConfig = {
    Selesai: {
      label: "Completed",
      styles: "bg-green-100 text-green-600",
    },
    Diproses: {
      label: "Pending",
      styles: "bg-red-100 text-red-400", 
    },
    Dibatalkan: {
      label: "Cancelled",
      styles: "bg-gray-100 text-gray-400",
    },
  };

  const currentBadge = badgeConfig[type] || { label: type, styles: "bg-gray-100 text-gray-600" };

  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${currentBadge.styles}`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {currentBadge.label}
    </span>
  );
}