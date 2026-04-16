"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname(); 

  return (
    <nav className="flex items-center justify-between py-5 px-6 md:px-16 bg-white border-b border-gray-100 sticky top-0 z-50">
      
      
      <Link href="/">
        
        <Image 
          src="/assets/logo.png" 
          alt="KeenKeeper Logo" 
          width={180} 
          height={40} 
          className="object-contain" 
          priority
        />
      </Link>

      
      <div className="flex items-center gap-2 md:gap-4">
        
        
        <Link
          href="/"
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm font-medium ${
            pathname === "/"
              ? "bg-[#1B4B36] text-white" // Active (Dark Green)
              : "text-gray-600 hover:bg-gray-100" // Inactive
          }`}
        >
          
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          <span className="hidden sm:block">Home</span>
        </Link>

        
        <Link
          href="/timeline"
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm font-medium ${
            pathname === "/timeline"
              ? "bg-[#1B4B36] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="hidden sm:block">Timeline</span>
        </Link>

        <Link
          href="/stats"
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-sm font-medium ${
            pathname === "/stats"
              ? "bg-[#1B4B36] text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
          <span className="hidden sm:block">Stats</span>
        </Link>
        
      </div>
    </nav>
  );
}