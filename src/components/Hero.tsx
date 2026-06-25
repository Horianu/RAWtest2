import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col md:flex-row items-stretch overflow-hidden">
      {/* Left Content */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-24 py-20 bg-raw-offwhite z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-7xl lg:text-[9rem] font-black text-raw-charcoal leading-[0.85] mb-8">
            RAW SKIN.<br />
            <span className="text-raw-charcoal/20">LOUD COLOUR.</span>
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 text-raw-charcoal/80">
            3-step routines that kill the 10-step chaos.
          </h2>

          <ul className="space-y-3 mb-10 font-sans text-lg font-medium">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-raw-lime rounded-full"></span>
              Barrier-safe formulas
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-raw-cyan rounded-full"></span>
              High-impact packaging
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-raw-magenta rounded-full"></span>
              2–3 steps max.
            </li>
          </ul>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#c0e600" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-raw-lime text-raw-charcoal font-display font-black text-xl uppercase tracking-tighter rounded-none border-2 border-raw-charcoal shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
            >
              Shop 3-Step Kits
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "#1a1a1a" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-transparent text-raw-charcoal font-display font-black text-xl uppercase tracking-tighter border-2 border-raw-charcoal/10"
            >
              See how it works
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Right Image */}
      <div className="flex-1 relative bg-blue-600 min-h-[500px]">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1200" 
            alt="RAW Skincare boxes and products" 
            className="w-full h-full object-cover grayscale brightness-110 contrast-125"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        {/* Decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-raw-lime rounded-full blur-3xl opacity-30"
        />
      </div>
    </section>
  );
}
