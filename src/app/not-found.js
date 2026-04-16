"use client";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans flex flex-col">
      <nav className="max-w-7xl mx-auto px-6 py-6 w-full flex justify-between items-center border-b border-gray-50">
        <Link href="/" className="text-2xl font-black text-[#1B4B36]">KeenKeeper</Link>
      </nav>

      <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-[150px] font-black text-gray-200 leading-none mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          The page you are looking for doesn't exist.
        </p>
        <Link href="/">
          <button className="bg-[#1B4B36] text-white px-8 py-4 rounded-xl font-bold text-sm hover:bg-emerald-800 transition-colors shadow-sm">
            Go Back Home
          </button>
        </Link>
      </div>
      
      <Footer />
    </div>
  );
}