import { motion } from "motion/react";

const steps = [
  {
    num: "1",
    color: "text-raw-lime",
    title: "CLEANSE",
    copy: "Strip away the day, not your skin. Our sulfate-free pH-balanced cleansers remove debris while keeping your lipid layer locked in tight.",
    thumb: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=200"
  },
  {
    num: "2",
    color: "text-raw-cyan",
    title: "TREAT",
    copy: "Targeted actives in high-saturation formulas. Niacinamide, Vitamin C, or Ceramide complexes that penetrate deep without causing the drama.",
    thumb: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=200"
  },
  {
    num: "3",
    color: "text-raw-magenta",
    title: "SEAL",
    copy: "The final barrier. A moisture-locking shield that prevents transepidermal water loss and protects from environmental stressors all day long.",
    thumb: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=200"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-raw-offwhite overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        <div className="sticky top-40 hidden md:block">
           <h2 className="text-8xl lg:text-[12rem] font-black leading-none opacity-5">HOW IT<br/>WORKS</h2>
        </div>

        <div className="space-y-32">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false, margin: "-100px" }}
              className="flex gap-8 group"
            >
              <div className={`text-[10rem] font-black leading-none ${step.color} opacity-20 group-hover:opacity-100 transition-opacity duration-500`}>
                {step.num}
              </div>
              <div className="pt-8">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="text-4xl font-black">{step.title}</h3>
                  <img src={step.thumb} className="w-16 h-16 object-cover border-2 border-raw-charcoal grayscale group-hover:grayscale-0 transition-all" />
                </div>
                <p className="text-xl font-medium leading-relaxed opacity-70 max-w-md">
                  {step.copy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
