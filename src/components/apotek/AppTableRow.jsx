export default function AppTableRow({ children }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      {children}
    </tr>
  );
}
