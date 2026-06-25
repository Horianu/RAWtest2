import { Instagram, Youtube, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-raw-charcoal text-white pt-24 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 mb-24">
        {/* Left Side */}
        <div className="flex flex-col gap-8">
          <h2 className="text-8xl font-black tracking-tighter leading-none transform scale-y-110 origin-left">RAW</h2>
          <p className="text-xl font-medium opacity-60 max-w-sm leading-relaxed">
            High-impact skincare for minimalists. We focus on barrier health and saturated actives, wrapped in packaging that screams.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 bg-raw-lime rounded-full flex items-center justify-center text-raw-charcoal hover:scale-110 transition-transform">
              <Instagram size={24} />
            </a>
            <a href="#" className="w-12 h-12 bg-raw-cyan rounded-full flex items-center justify-center text-raw-charcoal hover:scale-110 transition-transform">
              <div className="font-bold text-xs">TT</div>
            </a>
            <a href="#" className="w-12 h-12 bg-raw-magenta rounded-full flex items-center justify-center text-raw-charcoal hover:scale-110 transition-transform">
              <Youtube size={24} />
            </a>
          </div>
        </div>

        {/* Right Side Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
           <div className="flex flex-col gap-4">
              <h4 className="text-xl font-black text-raw-lime uppercase">Shop</h4>
              <ul className="flex flex-col gap-2 opacity-60 font-medium">
                <li><a href="#" className="hover:opacity-100 transition-opacity">Kits</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Singles</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Bundles</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Best Sellers</a></li>
              </ul>
           </div>
           <div className="flex flex-col gap-4">
              <h4 className="text-xl font-black text-raw-cyan uppercase">Help</h4>
              <ul className="flex flex-col gap-2 opacity-60 font-medium">
                <li><a href="#" className="hover:opacity-100 transition-opacity">FAQ</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Shipping</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Returns</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Contact</a></li>
              </ul>
           </div>
           <div className="flex flex-col gap-4">
              <h4 className="text-xl font-black text-raw-magenta uppercase">About</h4>
              <ul className="flex flex-col gap-2 opacity-60 font-medium">
                <li><a href="#" className="hover:opacity-100 transition-opacity">Our Story</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Ingredients</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Sustainability</a></li>
                <li><a href="#" className="hover:opacity-100 transition-opacity">Stockists</a></li>
              </ul>
           </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <h3 className="text-3xl font-black">Get RAW early drops & skin hacks.</h3>
          <p className="opacity-50">Zero spam, just the loud stuff.</p>
        </div>
        <div className="flex w-full md:w-auto">
          <input 
            type="email" 
            placeholder="Your Email" 
            className="bg-white/5 border-2 border-white/10 px-6 py-4 font-bold focus:border-raw-lime outline-none transition-colors w-full md:w-80"
          />
          <button className="bg-raw-lime text-raw-charcoal px-8 py-4 font-black uppercase tracking-tight flex items-center gap-2 hover:bg-white transition-colors">
            Join <Send size={18} />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 flex justify-between items-center text-[10px] uppercase font-bold tracking-widest opacity-30">
        <span>&copy; 2026 RAW SKINCARE STUDIO</span>
        <span>ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  );
}
