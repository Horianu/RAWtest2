import { motion } from "motion/react";
import { Star, Quote, ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useRef } from "react";

const reviews = [
  {
    name: "Alex @skinthings",
    quote: "Finally packaging that doesn't look like a clinical pharmacy. The Barrier Kit saved my face after over-exfoliating.",
    rating: 5,
    tag: "BARRIER KIT",
    color: "border-raw-lime",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=400"
  },
  {
    name: "Jordan K.",
    quote: "The Glow Kit is actually insane. Saturated cyan and magenta vibes on my counter + skin that actually pops.",
    rating: 5,
    tag: "GLOW KIT",
    color: "border-raw-cyan",
    img: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=400"
  },
  {
    name: "Sam R.",
    quote: "Acid orange is my new personality. Also the Calm Kit works. 3 steps, 5 minutes, zero drama.",
    rating: 4.9,
    tag: "CALM KIT",
    color: "border-raw-magenta",
    img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=400"
  },
  {
    name: "Taylor D.",
    quote: "Absolutely love the minimalistic routine. My skin barrier is stronger than ever.",
    rating: 5,
    tag: "BARRIER KIT",
    color: "border-raw-lime",
    img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=400"
  }
];

export default function SocialProof() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth / 2 
        : scrollLeft + clientWidth / 2;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id="community" className="py-24 px-6 md:px-12 bg-raw-offwhite border-b-4 border-raw-charcoal relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
        <div>
          <span className="text-sm font-black bg-raw-charcoal text-white px-3 py-1.5 uppercase tracking-widest inline-block mb-4">
            COMMUNITY & REVIEWS
          </span>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            RAW RESULTS <br />
            <span className="text-raw-cyan">IN THE WILD</span>
          </h2>
        </div>

        {/* Carousel buttons (Inspirux Brutalist style) */}
        <div className="flex gap-4">
          <button 
            onClick={() => scroll("left")}
            className="w-14 h-14 border-2 border-raw-charcoal flex items-center justify-center hover:bg-raw-lime transition-all active:scale-95 cursor-pointer shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]"
          >
            <ArrowLeft size={24} />
          </button>
          <button 
            onClick={() => scroll("right")}
            className="w-14 h-14 border-2 border-raw-charcoal flex items-center justify-center hover:bg-raw-cyan transition-all active:scale-95 cursor-pointer shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      {/* Overflow reviews list */}
      <div className="max-w-7xl mx-auto relative">
        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto pb-12 snap-x hide-scrollbar select-none"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full sm:w-[380px] snap-center relative group"
            >
              {/* Card shadow layer */}
              <div className="absolute inset-0 bg-raw-charcoal border-2 border-raw-charcoal transform translate-x-3 translate-y-3 group-hover:translate-x-5 group-hover:translate-y-5 transition-transform duration-300" />

              {/* Card main body */}
              <div className="bg-white border-2 border-raw-charcoal p-8 relative transform group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between h-full min-h-[460px]">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="aspect-square w-20 h-20 bg-gray-100 border-2 border-raw-charcoal overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                      <img src={rev.img} alt={rev.name} className="w-full h-full object-cover" />
                    </div>
                    <Quote className="text-raw-charcoal/10 group-hover:text-raw-lime transition-colors duration-500" size={40} />
                  </div>

                  <span className={`text-xs font-black border-2 px-2.5 py-1 uppercase tracking-wider mb-4 inline-block ${rev.color}`}>
                    {rev.tag}
                  </span>

                  <p className="text-lg font-medium italic mb-6 leading-relaxed text-raw-charcoal/90">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="border-t border-raw-charcoal/10 pt-4 flex justify-between items-center">
                  <h4 className="font-black text-raw-charcoal uppercase tracking-tighter text-sm">
                    {rev.name}
                  </h4>
                  <div className="flex items-center gap-1 text-raw-orange">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill={i < Math.floor(rev.rating) ? "currentColor" : "none"} strokeWidth={2.5} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
