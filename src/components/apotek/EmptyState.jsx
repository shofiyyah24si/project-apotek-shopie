export default function EmptyState({ icon, message = "Data tidak ditemukan" }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      {icon && <div className="text-5xl mb-3 text-gray-300">{icon}</div>}
      <p
        className="text-sm font-medium"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {message}
      </p>
    </div>
  );
}
