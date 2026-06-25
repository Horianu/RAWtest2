import { motion } from "motion/react";

export default function BundleBuilder() {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#f0f0f0] border-b-4 border-raw-charcoal">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* Left: Sculptural pile */}
        <motion.div
           initial={{ opacity: 0, rotate: -5 }}
           whileInView={{ opacity: 1, rotate: 0 }}
           className="relative group"
        >
          <div className="absolute inset-0 bg-raw-lime/20 blur-3xl rounded-full transform group-hover:scale-125 transition-transform duration-700"></div>
          <img 
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800" 
            alt="RAW skincare stack bundle" 
            className="w-full h-auto relative z-10 border-4 border-raw-charcoal shadow-[20px_20px_0px_0px_rgba(26,26,26,1)] grayscale contrast-125"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Right: Copy */}
        <div className="flex flex-col gap-8">
          <h2 className="text-7xl font-black leading-none uppercase">Build your own<br/><span className="text-raw-cyan">RAW stack</span></h2>
          <p className="text-2xl font-medium opacity-80 leading-relaxed">
            Stop over-thinking. Mix and match 2-3 products to create a custom routine that works for your skin’s unique demands. Plus, get <span className="font-black text-raw-magenta">15% OFF</span> when you stack 3 or more.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-raw-charcoal text-white px-12 py-6 font-display font-black text-2xl uppercase tracking-tighter self-start shadow-[6px_6px_0px_0px_#00f3ff]"
          >
            Start stacking
          </motion.button>
        </div>
      </div>
    </section>
  );
}
