"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Timeline() {
  const [timeline, setTimeline] = useState([]);
  const [filter, setFilter] = useState("All"); // 🚀 C2: ফিল্টার করার জন্য

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("timeline") || "[]");
    setTimeline(data);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'Call': return '/assets/call.png';
      case 'Text': return '/assets/text.png';
      case 'Video': return '/assets/video.png';
      default: return '';
    }
  };

  
  const filteredTimeline = filter === "All"
    ? timeline
    : timeline.filter(item => item.type === filter);

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans flex flex-col">
      {/* Navbar Area */}
      <nav className="max-w-7xl mx-auto px-6 py-6 w-full flex justify-between items-center border-b border-gray-100">
        <Link href="/">
          <img src="/assets/logo.png" alt="KeenKeeper" className="h-8 object-contain" onError={(e)=>e.target.style.display='none'} />
        </Link>
        <div className="flex items-center gap-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
           <Link href="/" className="hover:text-black transition-colors">Home</Link>
           <Link href="/timeline" className="flex items-center gap-2 bg-[#1B4B36] text-white px-5 py-2.5 rounded-lg shadow-sm">
             🕒 Timeline
           </Link>
           <Link href="/stats" className="hover:text-black transition-colors">📈 Stats</Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow max-w-3xl mx-auto w-full px-6 py-16">
        <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight text-left">Timeline</h1>

        
        <div className="mb-8">
          <div className="relative inline-block w-64">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-gray-200 text-gray-500 py-3 px-4 pr-8 rounded-xl shadow-sm outline-none focus:border-[#1B4B36] focus:ring-1 focus:ring-[#1B4B36] text-sm font-medium cursor-pointer"
            >
              <option value="All">Filter timeline</option>
              <option value="Call">Call</option>
              <option value="Text">Text</option>
              <option value="Video">Video</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {/* Timeline Cards */}
        {filteredTimeline.length === 0 ? (
           <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
             <p className="text-gray-400 font-bold text-lg">No interactions found.</p>
           </div>
        ) : (
          <div className="space-y-4">
            {filteredTimeline.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-5 hover:shadow-md transition-shadow">
                <img src={getIcon(item.type)} alt={item.type} className="w-8 h-8 object-contain" />
                <div>
                  <h3 className="text-gray-800 text-sm">
                     <span className="font-bold">{item.type}</span> with {item.friendName}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}