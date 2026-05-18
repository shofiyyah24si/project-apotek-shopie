/**
 * AppBadge — Basic Component
 */
export default function AppBadge({ children, className = "" }) {
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${className}`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {children}
    </span>
  );
}
