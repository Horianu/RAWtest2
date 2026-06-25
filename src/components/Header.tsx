import { motion } from "motion/react";
import { Search, User, ShoppingBag } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex flex-col">
      {/* Top Bar Ticker */}
      <div className="bg-raw-charcoal text-white py-2 overflow-hidden whitespace-nowrap border-b border-white/10">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="inline-block"
        >
          <span className="inline-block px-4 font-display text-sm uppercase tracking-widest">
            Free shipping from 49€ - 30-day RAW results guarantee • Free shipping from 49€ - 30-day RAW results guarantee • Free shipping from 49€ - 30-day RAW results guarantee • Free shipping from 49€ - 30-day RAW results guarantee
          </span>
        </motion.div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-raw-offwhite/90 backdrop-blur-md px-6 md:px-12 py-6 flex items-center justify-between border-b border-raw-charcoal/5">
        <div className="flex items-center gap-12">
          <a href="/" className="text-4xl font-display font-black tracking-tighter transform scale-y-110">
            RAW
          </a>
          <div className="hidden lg:flex items-center gap-8 font-display text-sm font-bold uppercase tracking-wide">
            <a href="#" className="hover:text-raw-lime transition-colors">Shop</a>
            <a href="#" className="hover:text-raw-cyan transition-colors">Routines</a>
            <a href="#" className="hover:text-raw-magenta transition-colors">Ingredients</a>
            <a href="#" className="hover:text-raw-orange transition-colors">Story</a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="hover:scale-110 transition-transform">
            <Search size={22} strokeWidth={2.5} />
          </button>
          <button className="hover:scale-110 transition-transform">
            <User size={22} strokeWidth={2.5} />
          </button>
          <button className="relative group">
            <ShoppingBag size={22} strokeWidth={2.5} />
            <span className="absolute -top-1 -right-1 bg-raw-lime text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-raw-charcoal">2</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
