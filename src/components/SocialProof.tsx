import { motion } from "motion/react";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Alex @skinthings",
    quote: "Finally packaging that doesn't look like a clinical pharmacy. The Barrier Kit saved my face after over-exfoliating.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400"
  },
  {
    name: "Jordan K.",
    quote: "The Glow Kit is actually insane. Saturated cyan and magenta vibes on my counter + skin that actually pops.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=400"
  },
  {
    name: "Sam R.",
    quote: "Acid orange is my new personality. Also the Calm Kit works. 3 steps, 5 minutes, zero drama.",
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=400"
  }
];

export default function SocialProof() {
  return (
    <section className="py-24 px-6 md:px-12 bg-raw-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl font-black mb-16 uppercase tracking-tighter">RAW results in the wild</h2>
        
        <div className="flex gap-8 overflow-x-auto pb-12 snap-x hide-scrollbar">
          {reviews.map((rev, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="flex-shrink-0 w-[350px] bg-white border-2 border-raw-charcoal p-8 snap-center hover:border-raw-lime transition-all group"
            >
              <div className="aspect-square bg-gray-100 mb-6 border-2 border-raw-charcoal overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                <img src={rev.img} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-1 mb-4 text-raw-orange">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} size={14} fill={i < Math.floor(rev.rating) ? "currentColor" : "none"} />
                 ))}
              </div>
              <p className="text-lg font-medium italic mb-6 leading-relaxed">"{rev.quote}"</p>
              <h4 className="font-black text-raw-charcoal uppercase tracking-tighter">— {rev.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
