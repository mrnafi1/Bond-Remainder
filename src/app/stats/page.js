"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Stats() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    
    const timeline = JSON.parse(localStorage.getItem("timeline") || "[]");
    
    let callCount = 0;
    let textCount = 0;
    let videoCount = 0;

    
    timeline.forEach((item) => {
      if (item.type === "Call") callCount++;
      if (item.type === "Text") textCount++;
      if (item.type === "Video") videoCount++;
    });

    
    setChartData([
      { name: "Text", value: textCount, fill: "#8B5CF6" },   // Purple
      { name: "Call", value: callCount, fill: "#1B4B36" },   // Dark Green
      { name: "Video", value: videoCount, fill: "#10B981" }, // Light Green
    ]);
  }, []);

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans flex flex-col">
      
      <nav className="max-w-7xl mx-auto px-6 py-6 w-full flex justify-between items-center border-b border-gray-50">
        <Link href="/">
          <img src="/assets/logo.png" alt="KeenKeeper" className="h-8 object-contain" onError={(e) => e.target.style.display='none'} />
        </Link>
        <div className="flex gap-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest items-center">
           <Link href="/" className="hover:text-black transition-colors">Home</Link>
           <Link href="/timeline" className="hover:text-black transition-colors flex items-center gap-2">🕒 Timeline</Link>
           
           <Link href="/stats" className="flex items-center gap-2 bg-[#1B4B36] text-white px-5 py-2.5 rounded-lg shadow-sm">
              📈 Stats
           </Link>
        </div>
      </nav>

      
      <main className="flex-grow max-w-5xl mx-auto px-6 py-16 w-full">
        
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-10 tracking-tight text-left">Friendship Analytics</h1>

        <div className="bg-white p-10 rounded-[24px] shadow-sm border border-gray-100">
          
          <p className="text-gray-700 font-bold mb-8 text-sm text-left">By Interaction Type</p>
          
          
          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={90} 
                  outerRadius={130} 
                  paddingAngle={5} 
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Legend 
                  iconType="circle" 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ fontSize: '12px', fontWeight: 'bold', paddingTop: '30px' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}