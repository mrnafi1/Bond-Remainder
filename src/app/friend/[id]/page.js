"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import Footer from "@/components/Footer";

export default function FriendDetail() {
  const { id } = useParams();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        const foundFriend = data.find((f) => f.id === parseInt(id));
        setFriend(foundFriend);
      });
  }, [id]);

  
  const handleCheckIn = (type) => {
    
    const newInteraction = {
      id: Date.now(),
      friendName: friend.name,
      type: type, // Call, Text, or Video
      date: new Date().toLocaleString('en-GB', { 
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
      })
    };

    
    const existingTimeline = JSON.parse(localStorage.getItem("timeline") || "[]");
    
    
    const updatedTimeline = [newInteraction, ...existingTimeline];
    
    
    localStorage.setItem("timeline", JSON.stringify(updatedTimeline));

  
    toast.success(`${type} with ${friend.name} logged!`, {
      style: {
        borderRadius: '10px',
        background: '#1B4B36',
        color: '#fff',
        fontWeight: 'bold'
      }
    });
  };

  if (!friend) return <div className="p-20 text-center font-bold">Loading...</div>;

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans">
      {/* Navbar Area */}
      <nav className="max-w-[1100px] mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/">
          <img src="/assets/logo.png" alt="KeenKeeper" className="h-8 object-contain" />
        </Link>
        <div className="flex gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
           <Link href="/" className="hover:text-black transition-colors">Home</Link>
           <Link href="/timeline" className="hover:text-black transition-colors flex items-center gap-2">🕒 Timeline</Link>
           <Link href="/stats" className="hover:text-black transition-colors flex items-center gap-2">📈 Stats</Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-[1100px] mx-auto px-6 py-10">
        
        {/* Force Two-Column Layout on Desktop */}
        <div className="flex flex-col md:flex-row gap-8 items-start w-full">
          
          {/* 🟢 LEFT SIDE: Profile & Actions */}
          <div className="w-full md:w-[320px] shrink-0 flex flex-col gap-4">
            <div className="bg-white rounded-[32px] p-10 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col items-center text-center">
              <img src={friend.picture} alt={friend.name} className="w-28 h-28 rounded-full object-cover mb-6 ring-4 ring-gray-50 shadow-md" />
              <h1 className="text-xl font-bold text-gray-800 mb-2">{friend.name}</h1>
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-red-50 text-red-500 text-[9px] font-black uppercase rounded-full">Overdue</span>
                <span className="px-3 py-1 bg-green-50 text-green-500 text-[9px] font-black uppercase rounded-full">Family</span>
              </div>
              <p className="text-sm text-gray-400 italic mb-6 leading-relaxed">"{friend.bio}"</p>
              <p className="text-[10px] text-gray-300 uppercase font-bold tracking-widest">Preferred: email</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button className="w-full py-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-[11px] font-bold text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-50">
                🔔 Snooze 2 Weeks
              </button>
              <button className="w-full py-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-[11px] font-bold text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2">
                📁 Archive
              </button>
              <button className="w-full py-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-[11px] font-bold text-red-400 hover:bg-red-50 flex items-center justify-center gap-2">
                🗑️ Delete
              </button>
            </div>
          </div>

          {/* 🔵 RIGHT SIDE: Stats & Interaction */}
          <div className="flex-1 flex flex-col gap-6 w-full">
            
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-[0_4px_24px_rgba(0,0,0,0.03)] text-center">
                 <p className="text-4xl font-black text-gray-800 mb-2">{friend.days_since_contact}</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Days Since Contact</p>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-[0_4_24px_rgba(0,0,0,0.03)] text-center">
                 <p className="text-4xl font-black text-gray-800 mb-2">{friend.goal}</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Goal (Days)</p>
              </div>
              <div className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-[0_4px_24px_rgba(0,0,0,0.03)] text-center flex flex-col justify-center">
                 <p className="text-xl font-black text-gray-800 mb-1 mt-1">{friend.next_due_date}</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Next Due</p>
              </div>
            </div>

            {/* Relationship Goal Card */}
            <div className="bg-white p-10 rounded-[32px] border border-gray-50 shadow-[0_4px_24px_rgba(0,0,0,0.03)] relative">
              <button className="absolute top-10 right-10 px-4 py-1.5 border border-gray-100 rounded-lg text-[10px] font-bold text-gray-400 hover:text-black">Edit</button>
              <h3 className="text-sm font-bold text-gray-800 mb-4">Relationship Goal</h3>
              <p className="text-gray-600 text-sm">Connect every <span className="font-black text-black">{friend.goal} days</span></p>
            </div>

            {/* Quick Check-In (Using your .png Assets) */}
            <div className="bg-white p-10 rounded-[32px] border border-gray-50 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
              <h3 className="text-sm font-bold text-gray-800 mb-8">Quick Check-In</h3>
              <div className="grid grid-cols-3 gap-4">
                <button onClick={() => handleCheckIn('Call')} className="py-10 bg-[#FDFBF7] rounded-[24px] flex flex-col items-center gap-3 shadow-sm hover:bg-green-50 transition-all group border border-gray-50">
                  <img src="/assets/call.png" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" alt="call" />
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Call</span>
                </button>
                <button onClick={() => handleCheckIn('Text')} className="py-10 bg-[#FDFBF7] rounded-[24px] flex flex-col items-center gap-3 shadow-sm hover:bg-blue-50 transition-all group border border-gray-50">
                  <img src="/assets/text.png" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" alt="text" />
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Text</span>
                </button>
                <button onClick={() => handleCheckIn('Video')} className="py-10 bg-[#FDFBF7] rounded-[24px] flex flex-col items-center gap-3 shadow-sm hover:bg-purple-50 transition-all group border border-gray-50">
                  <img src="/assets/video.png" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" alt="video" />
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Video</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}