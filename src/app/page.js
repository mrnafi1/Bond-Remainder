"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "on-track": return "bg-green-100 text-green-700";
      case "almost due": return "bg-orange-100 text-orange-700";
      case "overdue": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB]">
        <div className="w-16 h-16 border-4 border-green-100 border-t-[#1B4B36] rounded-full animate-spin mb-4"></div>
        <p className="font-bold text-gray-400 uppercase tracking-widest text-[10px]">Loading Your Network...</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      
     
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-gray-50">
        <Link href="/">
          <img src="/assets/logo.png" alt="KeenKeeper" className="h-8 object-contain" onError={(e) => e.target.style.display='none'} />
        </Link>
        <div className="flex items-center gap-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          
          <Link href="/" className="flex items-center gap-2 bg-[#1B4B36] text-white px-6 py-3 rounded-lg shadow-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            Home
          </Link>
          <Link href="/timeline" className="flex items-center gap-2 hover:text-black transition-colors">
            Timeline
          </Link>
          <Link href="/stats" className="flex items-center gap-2 hover:text-black transition-colors">
            Stats
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-20">
        
        
        <div className="text-center pt-16 pb-12">
          <h1 className="text-4xl md:text-[44px] font-black text-gray-900 mb-6 tracking-tight">Friends to keep close in your life</h1>
          <p className="text-sm text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
          <button className="bg-[#1B4B36] text-white px-6 py-3.5 rounded-lg font-bold text-sm inline-flex items-center gap-2 hover:bg-emerald-800 transition-colors shadow-sm">
            <span className="text-lg leading-none">+</span> Add a Friend
          </button>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-50 text-center">
            <p className="text-4xl font-black text-gray-800 mb-2">{friends.length}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Friends</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-50 text-center">
            <p className="text-4xl font-black text-gray-800 mb-2">{friends.filter(f => f.status === 'on-track').length}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">On Track</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-50 text-center">
            <p className="text-4xl font-black text-gray-800 mb-2">{friends.filter(f => f.status !== 'on-track').length}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Need Attention</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-50 text-center">
            <p className="text-4xl font-black text-gray-800 mb-2">12</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Interactions This Month</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-6">Your Friends</h2>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {friends.map((friend) => (
            <Link key={friend.id} href={`/friend/${friend.id}`} className="group block">
              <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-50 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center">
                <img 
                  src={friend.picture} 
                  alt={friend.name} 
                  className="w-20 h-20 rounded-full object-cover mb-4 ring-4 ring-gray-50 group-hover:scale-105 transition-transform" 
                />
                <h3 className="text-base font-bold text-gray-900 mb-1">{friend.name}</h3>
                <p className="text-[10px] text-gray-400 font-bold mb-4">{friend.days_since_contact}d ago</p>
                
                <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                  {friend.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-green-50 text-green-700 text-[8px] font-black uppercase rounded-full tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className={`w-full py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest ${getStatusColor(friend.status)}`}>
                  {friend.status}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}