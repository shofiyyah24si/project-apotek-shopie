export default function PageHeader({ title, breadcrumb, children }) {
  const crumbs = Array.isArray(breadcrumb)
    ? breadcrumb
    : (breadcrumb || "Dashboard").split("/").map((c) => c.trim());

  return (
    <div className="flex items-center justify-between px-4 pb-4">
      <div>
        <h1 className="text-2xl font-poppins-extrabold text-gray-800">{title || "Dashboard"}</h1>
        <div className="flex items-center gap-1.5 mt-1">
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className={`text-xs ${i === crumbs.length - 1 ? "text-teal-600 font-medium" : "text-gray-400"}`}>
                {crumb}
              </span>
              {i < crumbs.length - 1 && <span className="text-gray-300 text-xs">/</span>}
            </span>
          ))}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
