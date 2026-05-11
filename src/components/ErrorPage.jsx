import React from 'react';

export default function ErrorPage({ 
  code = "404", 
  description = "Halaman tidak ditemukan.", 

  image = "/public/img/404 Error.png" 
}) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-sm border border-gray-100 p-10 flex flex-col items-center">
        
        {/* Bagian Visual */}
        <div className="relative mb-6">
          {image ? (
            <div className="w-64 h-64 flex items-center justify-center">
              <img 
                src={image} 
                alt="Error Illustration" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
          ) : (
            <div className="relative">
              <div className="absolute inset-0 bg-[#5570F1] opacity-10 blur-3xl rounded-full"></div>
              <p className="text-[100px] leading-none relative">🔍</p>
            </div>
          )}
        </div>

        {/* Text Area */}
        <div className="text-center">
          <h1 className="text-6xl font-black text-[#5570F1] mb-2 tracking-tight">
            {code}
          </h1>
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Opps! Ada masalah.
          </h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            {description} <br />
            <span className="text-sm opacity-75">Pastikan alamat URL sudah benar atau silakan kembali ke dashboard.</span>
          </p>
        </div>

        {/* Tombol Navigasi */}
        <div className="flex flex-col w-full gap-3">
          <a 
            href="/" 
            className="flex items-center justify-center bg-[#5570F1] text-white font-semibold py-3 px-8 rounded-xl hover:bg-[#445cd6] transition-all duration-200 shadow-md shadow-[#5570F1]/20 active:scale-95"
          >
            Kembali ke Dashboard
          </a>
          
          <button 
            onClick={() => window.history.back()}
            className="text-gray-400 font-medium py-2 hover:text-[#5570F1] transition-colors text-sm"
          >
            Halaman Sebelumnya
          </button>
        </div>
      </div>

      <p className="mt-8 text-gray-400 text-sm">
        © 2026 Apotek ShopiCare. All rights reserved.
      </p>
    </div>
  );
}