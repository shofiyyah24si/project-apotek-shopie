/**
 * AlertBox — reusable alert untuk success, error, info
 * Props: type = "success" | "error" | "info"
 */
export default function AlertBox({ type = "info", children }) {
  const styles = {
    success: "bg-green-50 border-green-300 text-green-700",
    error:   "bg-red-50 border-red-300 text-[#CC5F5F]",
    info:    "bg-[#eef1fe] border-[#5570F1]/30 text-[#5570F1]",
  };

  return (
    <div className={`px-4 py-3 rounded-xl mb-4 border text-sm ${styles[type] || styles.info}`}
      style={{ fontFamily: "Inter, sans-serif" }}>
      {children}
    </div>
  );
}
