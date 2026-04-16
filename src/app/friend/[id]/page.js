"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

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

  if (!friend) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/" className="text-[#1B4B36] font-medium flex items-center gap-2 mb-8 hover:underline">
        ← Back to Dashboard
      </Link>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <img 
          src={friend.picture} 
          alt={friend.name} 
          className="w-32 h-32 rounded-full object-cover border-4 border-emerald-50 shadow-md"
        />
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{friend.name}</h1>
            <span className="px-4 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase rounded-full w-fit mx-auto md:mx-0">
              {friend.status}
            </span>
          </div>
          
          <p className="text-gray-500 mb-6 font-medium">Last contact was {friend.days_since_contact} days ago.</p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {friend.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}