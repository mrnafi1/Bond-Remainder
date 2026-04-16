"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Timeline() {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    // localStorage থেকে সেভ করা ডাটা লোড করা
    const data = JSON.parse(localStorage.getItem("timeline") || "[]");
    setTimeline(data);
  }, []);

  // আইকন আনার ফাংশন
  const getIcon = (type) => {
    switch (type) {
      case 'Call': return '/assets/call.png';
      case 'Text': return '/assets/text.png';
      case 'Video': return '/assets/video.png';
      default: return '';
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-gray-50">
        <Link href="/">
          <img src="/assets/logo.png" alt="KeenKeeper" className="h-8 object-contain" onError={(e) => e.target.style.display='none'} />
        </Link>
        <div className="flex gap-8 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
           <Link href="/" className="hover:text-black transition-colors">Home</Link>
           <Link href="/timeline" className="text-[#1B4B36] flex items-center gap-2">🕒 Timeline</Link>
           <Link href="/stats" className="hover:text-black transition-colors">📈 Stats</Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16 min-h-[60vh]">
        <h1 className="text-4xl font-black text-gray-900 mb-12 tracking-tight">Timeline</h1>

        {/* যদি কোনো হিস্ট্রি না থাকে */}
        {timeline.length === 0 ? (
          <div className="bg-white p-20 rounded-[32px] border border-gray-100 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <p className="text-gray-400 font-bold text-lg">No interactions logged yet.</p>
            <p className="text-gray-400 text-sm mt-2">Go to a friend's profile and click Call/Text/Video to start!</p>
          </div>
        ) : (
          /* হিস্ট্রি লিস্ট */
          <div className="space-y-4">
            {timeline.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-50 flex items-center justify-between hover:shadow-lg transition-all">
                <div className="flex items-center gap-6">
                  {/* Icon based on interaction type */}
                  <div className="p-4 rounded-[16px] bg-[#FDFBF7] border border-gray-50">
                    <img src={getIcon(item.type)} alt={item.type} className="w-8 h-8 object-contain" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{item.type} with {item.friendName}</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">{item.date}</p>
                  </div>
                </div>
                
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">Logged</span>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}