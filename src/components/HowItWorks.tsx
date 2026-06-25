import { motion } from "motion/react";

const steps = [
  {
    num: "01",
    color: "text-raw-lime border-raw-lime hover:bg-raw-lime",
    badgeColor: "bg-raw-lime",
    title: "CLEANSE",
    subtitle: "Reset the base, gently",
    copy: "Strip away the day, not your skin. Our sulfate-free pH-balanced cleansers remove debris while keeping your lipid layer locked in tight.",
    thumb: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200"
  },
  {
    num: "02",
    color: "text-raw-cyan border-raw-cyan hover:bg-raw-cyan",
    badgeColor: "bg-raw-cyan",
    title: "TREAT",
    subtitle: "Targeted cellular repair",
    copy: "Targeted actives in high-saturation formulas. Niacinamide, Vitamin C, or Ceramide complexes that penetrate deep without causing the drama.",
    thumb: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=200"
  },
  {
    num: "03",
    color: "text-raw-magenta border-raw-magenta hover:bg-raw-magenta",
    badgeColor: "bg-raw-magenta",
    title: "SEAL",
    subtitle: "Fortify the lipid shield",
    copy: "The final barrier. A moisture-locking shield that prevents transepidermal water loss and protects from environmental stressors all day long.",
    thumb: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=200"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-raw-offwhite overflow-hidden border-b-4 border-raw-charcoal relative">
      <div className="absolute inset-y-0 right-1/4 w-px bg-raw-charcoal/5 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left: Sticky Heading */}
        <div className="lg:col-span-5 sticky top-36">
          <span className="text-sm font-black bg-raw-charcoal text-white px-3 py-1.5 uppercase tracking-widest inline-block mb-4">
            HOW IT WORKS
          </span>
          <h2 className="text-6xl md:text-8xl font-black leading-none uppercase tracking-tighter">
            THE 3-STEP <br />
            <span className="text-raw-magenta">RAW SYSTEM</span>
          </h2>
          <p className="mt-6 text-xl font-medium opacity-75 max-w-sm leading-relaxed">
            We stripped out the fluff and the filler. No multi-step confusion. Just clean, highly-saturated, clinically-guided steps to reset skin health.
          </p>

          {/* Graphical line (Inspirux-inspired layout connection) */}
          <div className="hidden lg:flex items-center gap-4 mt-12">
            <div className="w-12 h-1 bg-raw-charcoal" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">SCI-BACKED MINIMALISM</span>
          </div>
        </div>

        {/* Right: Step List (Timeline-inspired layout with interactive blocks) */}
        <div className="lg:col-span-7 space-y-20 relative pl-4 md:pl-12">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-6 top-6 bottom-6 w-1 bg-raw-charcoal" />

          {/* Steps */}
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col md:flex-row gap-8 relative group"
            >
              {/* Timeline Bullet Node */}
              <div className="absolute left-[-22px] md:left-[-30px] top-4 w-10 h-10 bg-white border-4 border-raw-charcoal rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-125 z-10">
                <div className={`w-3 h-3 rounded-full ${step.badgeColor}`} />
              </div>

              {/* Step Card */}
              <div className="flex-1 bg-[#fbfaf8] hover:bg-white border-2 border-raw-charcoal p-8 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[10px_10px_0px_0px_rgba(26,26,26,1)] transition-all duration-300 relative">
                
                {/* Step badge */}
                <div className="absolute top-6 right-6 font-display font-black text-3xl opacity-20 group-hover:opacity-100 transition-opacity duration-300">
                  {step.num}
                </div>

                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-20 h-20 shrink-0 border-2 border-raw-charcoal overflow-hidden bg-white">
                    <img 
                      src={step.thumb} 
                      alt={step.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                    />
                  </div>

                  <div>
                    <span className="text-xs font-black tracking-widest text-raw-magenta uppercase block mb-1">
                      {step.subtitle}
                    </span>
                    <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-base font-medium leading-relaxed opacity-75 max-w-md">
                      {step.copy}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
