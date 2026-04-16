"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/friends.json")
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "overdue":
        return "bg-red-100 text-red-600";
      case "almost due":
        return "bg-orange-100 text-orange-600";
      case "on-track":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Friends to keep close in your life
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto mb-8">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="bg-[#1B4B36] text-white px-6 py-2.5 rounded-md font-medium flex items-center gap-2 mx-auto hover:bg-[#153b2a] transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add a Friend
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-2">10</h3>
          <p className="text-sm text-gray-400 font-medium">Total Friends</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-2">3</h3>
          <p className="text-sm text-gray-400 font-medium">On Track</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-2">6</h3>
          <p className="text-sm text-gray-400 font-medium">Need Attention</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-2">12</h3>
          <p className="text-sm text-gray-400 font-medium">Interactions This Month</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-8">Your Friends</h2>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#1B4B36]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {friends.map((friend) => (
            <Link href={`/friend/${friend.id}`} key={friend.id}>
              <div className="bg-white p-6 rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-gray-100 flex flex-col items-center text-center hover:scale-[1.02] transition-transform cursor-pointer h-full">
                <div className="relative w-24 h-24 mb-4">
                  <img
                    src={friend.picture}
                    alt={friend.name}
                    className="w-full h-full rounded-full object-cover border-4 border-gray-50 shadow-sm"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{friend.name}</h3>
                <p className="text-sm text-gray-400 mb-4 font-medium">{friend.days_since_contact} days ago</p>
                
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {friend.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-[#F1F5F9] text-[#475569] text-[10px] font-bold uppercase tracking-wider rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <span className={`mt-auto w-full py-2 rounded-lg text-[11px] font-black uppercase tracking-widest ${getStatusColor(friend.status)}`}>
                  {friend.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}