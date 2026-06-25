import { motion } from "motion/react";
import { Star } from "lucide-react";

const kits = [
  {
    name: "BARRIER KIT",
    color: "bg-raw-lime",
    secondary: "bg-raw-charcoal",
    textColor: "text-raw-charcoal",
    benefit: "For over-treated, sensitive skin",
    price: "72€",
    rating: 5,
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800"
  },
  {
    name: "GLOW KIT",
    color: "bg-raw-cyan",
    secondary: "bg-raw-magenta",
    textColor: "text-raw-charcoal",
    benefit: "Radiance without the irritation",
    price: "85€",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800"
  },
  {
    name: "CALM KIT",
    color: "bg-raw-orange",
    secondary: "bg-raw-violet",
    textColor: "text-raw-charcoal",
    benefit: "Soothe inflammation instantly",
    price: "78€",
    rating: 5,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800"
  }
];

export default function FeaturedRoutines() {
  return (
    <section className="py-24 px-6 md:px-12 bg-raw-offwhite">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-black mb-4">Pick your RAW routine</h2>
          <div className="h-1 w-32 bg-raw-charcoal mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {kits.map((kit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative cursor-pointer"
            >
              {/* Product Card Container */}
              <div className={`aspect-[3/4] overflow-hidden ${kit.color} border-4 border-raw-charcoal relative`}>
                <motion.div
                   whileHover={{ scale: 1.05, rotate: 2 }}
                   className="w-full h-full"
                >
                  <img 
                    src={kit.image} 
                    alt={kit.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                {/* Overlay UI */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-raw-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="bg-white p-6 border-2 border-raw-charcoal transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                     <h3 className="text-3xl font-black mb-1">{kit.name}</h3>
                     <p className="text-sm font-medium mb-3 opacity-70">{kit.benefit}</p>
                     <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black">{kit.price}</span>
                        <div className="flex items-center gap-1">
                          <Star size={14} fill="currentColor" />
                          <span className="text-sm font-bold">{kit.rating}</span>
                        </div>
                     </div>
                     <button className={`w-full py-3 ${kit.color} border-2 border-raw-charcoal font-display font-black text-lg uppercase tracking-tighter active:scale-95 transition-transform`}>
                       Shop kit
                     </button>
                   </div>
                </div>
              </div>

              {/* Static Label for desktop clarity */}
              <div className="mt-6 flex justify-between items-center">
                 <h3 className="text-2xl font-black">{kit.name}</h3>
                 <span className="text-xl font-bold opacity-60">{kit.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
