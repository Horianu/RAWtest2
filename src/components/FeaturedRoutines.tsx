import { useState } from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const kits = [
  {
    id: "barrier-kit",
    name: "BARRIER KIT",
    color: "bg-raw-lime",
    secondary: "bg-raw-charcoal",
    textColor: "text-raw-charcoal",
    benefit: "For over-treated, sensitive skin",
    price: 72,
    rating: 5,
    category: "barrier",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800"
  },
  {
    id: "glow-kit",
    name: "GLOW KIT",
    color: "bg-raw-cyan",
    secondary: "bg-raw-magenta",
    textColor: "text-raw-charcoal",
    benefit: "Radiance without the irritation",
    price: 85,
    rating: 4.9,
    category: "glow",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800"
  },
  {
    id: "calm-kit",
    name: "CALM KIT",
    color: "bg-raw-orange",
    secondary: "bg-raw-violet",
    textColor: "text-raw-charcoal",
    benefit: "Soothe inflammation instantly",
    price: 78,
    rating: 5,
    category: "calm",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800"
  }
];

const filterCategories = [
  { label: "ALL ROUTINES", value: "all" },
  { label: "BARRIER REPAIR", value: "barrier" },
  { label: "INSTANT GLOW", value: "glow" },
  { label: "SKIN CALMING", value: "calm" }
];

export default function FeaturedRoutines() {
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState("all");
  const [gridRef] = useAutoAnimate();

  const filteredKits = activeFilter === "all" 
    ? kits 
    : kits.filter(k => k.category === activeFilter);

  return (
    <section id="routines" className="py-24 px-6 md:px-12 bg-raw-offwhite">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-black mb-4">Pick your RAW routine</h2>
          <div className="h-1 w-32 bg-raw-charcoal mx-auto mb-8"></div>
          
          {/* Filters Bar */}
          <div className="flex flex-wrap justify-center gap-3">
            {filterCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveFilter(cat.value)}
                className={`px-6 py-3 font-display font-black text-sm uppercase tracking-wider transition-all cursor-pointer border-2 border-raw-charcoal ${
                  activeFilter === cat.value
                    ? "bg-raw-charcoal text-white"
                    : "bg-white text-raw-charcoal hover:bg-raw-lime"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - Animated smoothly using auto-animate */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={gridRef}>
          {filteredKits.map((kit) => (
            <motion.div
              key={kit.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="group relative cursor-pointer"
            >
              {/* Product Card Container */}
              <div className="relative group">
                {/* Background Shadow Box (Offset/Asymmetric Layer) */}
                <div className={`absolute inset-0 bg-raw-charcoal border-4 border-raw-charcoal transform translate-x-3 translate-y-3 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-300`} />
                
                <div className={`aspect-[3/4] overflow-hidden ${kit.color} border-4 border-raw-charcoal relative transform group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-transform duration-300`}>
                  <motion.div
                     whileHover={{ scale: 1.05, rotate: 0.5 }}
                     className="w-full h-full"
                  >
                    <img 
                      src={kit.image} 
                      alt={kit.name}
                      className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>

                  {/* High Contrast Top Tag */}
                  <div className="absolute top-4 left-4 bg-raw-charcoal text-white font-display font-black text-xs px-3 py-1 uppercase tracking-wider">
                    {kit.category}
                  </div>

                  {/* Overlay UI */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-raw-charcoal/90 via-raw-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <div className="bg-white p-6 border-2 border-raw-charcoal transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                       <h3 className="text-3xl font-black mb-1">{kit.name}</h3>
                       <p className="text-xs font-medium mb-3 opacity-70 leading-relaxed">{kit.benefit}</p>
                       <div className="flex items-center justify-between mb-4">
                          <span className="text-2xl font-black">{kit.price}€</span>
                          <div className="flex items-center gap-1">
                            <Star size={14} fill="currentColor" />
                            <span className="text-sm font-bold">{kit.rating}</span>
                          </div>
                       </div>
                       <button 
                         onClick={(e) => {
                           e.stopPropagation();
                           addToCart({
                             id: kit.id,
                             name: kit.name,
                             price: kit.price,
                             image: kit.image,
                             color: kit.color
                           });
                         }}
                         className={`w-full py-3 ${kit.color} border-2 border-raw-charcoal font-display font-black text-lg uppercase tracking-tighter active:scale-95 transition-transform cursor-pointer hover:bg-raw-charcoal hover:text-white transition-colors`}
                       >
                         Shop kit
                       </button>
                     </div>
                  </div>
                </div>
              </div>

              {/* Static Label for desktop clarity */}
              <div className="mt-8 flex justify-between items-center px-2">
                 <div className="flex flex-col">
                   <h3 className="text-2xl font-black group-hover:text-raw-magenta transition-colors">{kit.name}</h3>
                   <span className="text-xs font-bold opacity-60 uppercase tracking-widest mt-1">{kit.benefit}</span>
                 </div>
                 <span className="text-2xl font-black text-raw-charcoal">{kit.price}€</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
