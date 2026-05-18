export default function AppContainer({ children, className = "" }) {
  return (
    <div className={`mx-4 ${className}`}>
      {children}
    </div>
  );
}
