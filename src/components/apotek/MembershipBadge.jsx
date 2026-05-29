
export default function MembershipBadge({ level = "Bronze" }) {
  const styles = {
    Bronze:   "bg-orange-100 text-orange-700",
    Silver:   "bg-gray-100 text-gray-600",
    Gold:     "bg-yellow-100 text-yellow-700",
    Platinum: "bg-purple-100 text-purple-700",
  };

  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[level] || styles.Bronze}`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {level}
    </span>
  );
}
