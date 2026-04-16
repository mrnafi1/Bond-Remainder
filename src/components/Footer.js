export default function Footer() {
  return (
    <footer className="bg-[#1B4B36] text-white py-16 mt-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 text-center">
        
        
        <div className="mb-6 flex justify-center">
          <img 
            src="/assets/logo-xl.png" 
            alt="KeenKeeper" 
            className="h-16 md:h-20 object-contain" 
          />
        </div>
        
        <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-sm leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        
        <p className="text-[10px] font-black uppercase tracking-widest mb-4 text-emerald-200">Social Links</p>
        
        
        <div className="flex justify-center gap-4 mb-12">
          <img src="/assets/instagram.png" className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity" alt="insta" />
          <img src="/assets/facebook.png" className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity" alt="fb" />
          <img src="/assets/twitter.png" className="w-8 h-8 cursor-pointer hover:opacity-80 transition-opacity" alt="x" />
        </div>

        <div className="border-t border-emerald-800 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-emerald-200 uppercase tracking-widest font-bold">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0 cursor-pointer">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}