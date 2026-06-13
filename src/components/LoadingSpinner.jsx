/**
 * LoadingSpinner — tampilan saat data sedang dimuat
 */
export default function LoadingSpinner({ text = "Memuat data..." }) {
  return (
    <div className="p-8 text-center text-gray-500"
      style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5570F1] mx-auto mb-3" />
      <p className="text-sm">{text}</p>
    </div>
  );
}
