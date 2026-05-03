export default function ErrorPage({ code, description, image }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {image
        ? <img src={image} alt="error" className="w-48 mb-6" />
        : <p className="text-8xl mb-6">⚠️</p>
      }
      <h1 className="text-8xl font-extrabold text-teal-600">{code}</h1>
      <p className="text-2xl font-semibold text-gray-700 mt-4">{description}</p>
      <a href="/" className="mt-6 bg-teal-600 text-white px-6 py-2 rounded-lg hover:opacity-90">
        Kembali ke Dashboard
      </a>
    </div>
  );
}
