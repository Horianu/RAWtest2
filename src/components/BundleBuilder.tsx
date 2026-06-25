import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { Check, Sparkles, AlertCircle } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface StackProduct {
  id: string;
  name: string;
  step: string;
  price: number;
  color: string;
  bgHex: string;
  image: string;
  desc: string;
}

const STACK_PRODUCTS: StackProduct[] = [
  {
    id: "step-1-cleanser",
    name: "SUPER GEL CLEANSER",
    step: "STEP 1 - CLEANSE",
    price: 24,
    color: "bg-raw-lime text-raw-charcoal border-raw-lime",
    bgHex: "#d4ff00",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=400",
    desc: "Sulfate-free pH balanced wash to lock-in vital natural hydration.",
  },
  {
    id: "step-2-treatment",
    name: "NIACINAMIDE 10% SHOT",
    step: "STEP 2 - TREAT",
    price: 32,
    color: "bg-raw-cyan text-raw-charcoal border-raw-cyan",
    bgHex: "#00f3ff",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=400",
    desc: "A saturated radiance-booster that acts fast on tone & skin texture.",
  },
  {
    id: "step-3-barrier",
    name: "CERAMIDE SHIELD SEAL",
    step: "STEP 3 - SEAL",
    price: 28,
    color: "bg-raw-magenta text-white border-raw-magenta",
    bgHex: "#ff00ff",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=400",
    desc: "An ultimate lipid-replacement formula to build your skin's shield.",
  },
];

export default function BundleBuilder() {
  const { addToCart } = useCart();
  const [selectedIds, setSelectedIds] = useState<string[]>(["step-1-cleanser", "step-2-treatment", "step-3-barrier"]);
  const [animationContainer] = useAutoAnimate();

  const toggleProduct = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item.id !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const selectedProducts = STACK_PRODUCTS.filter((p) => selectedIds.includes(p.id));
  const subtotal = selectedProducts.reduce((acc, p) => acc + p.price, 0);
  
  // 15% discount for 3 items
  const isEligibleForDiscount = selectedProducts.length >= 3;
  const discountAmount = isEligibleForDiscount ? Math.round(subtotal * 0.15) : 0;
  const finalPrice = subtotal - discountAmount;

  const handleAddStackToCart = () => {
    if (selectedProducts.length === 0) return;

    addToCart({
      id: `custom-stack-${selectedIds.sort().join("-")}`,
      name: `CUSTOM ${selectedProducts.length}-STEP STACK`,
      price: finalPrice,
      image: selectedProducts[0].image,
      color: isEligibleForDiscount ? "bg-raw-lime" : "bg-raw-cyan",
    });
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-raw-offwhite border-b-4 border-raw-charcoal relative overflow-hidden">
      {/* Visual background lines (Inspirux-style subtle alignment) */}
      <div className="absolute inset-y-0 left-1/4 w-px bg-raw-charcoal/5 pointer-events-none hidden lg:block" />
      <div className="absolute inset-y-0 left-2/4 w-px bg-raw-charcoal/5 pointer-events-none hidden lg:block" />
      <div className="absolute inset-y-0 left-3/4 w-px bg-raw-charcoal/5 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <span className="text-sm font-black bg-raw-charcoal text-white px-3 py-1.5 uppercase tracking-widest inline-block mb-4">
            LIVE BUNDLE BUILDER
          </span>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            BUILD YOUR OWN <br />
            <span className="text-raw-magenta">RAW STACK</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Product Toggles (Inspirux-style card checklist) */}
          <div className="lg:col-span-7 flex flex-col gap-6" ref={animationContainer}>
            {STACK_PRODUCTS.map((prod) => {
              const isSelected = selectedIds.includes(prod.id);
              return (
                <div
                  key={prod.id}
                  onClick={() => toggleProduct(prod.id)}
                  className={`border-4 border-raw-charcoal p-6 flex flex-col md:flex-row gap-6 items-center cursor-pointer transition-all duration-300 relative ${
                    isSelected 
                      ? "bg-white shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] translate-x-[-2px] translate-y-[-2px]" 
                      : "bg-[#f2f0ec] opacity-60 hover:opacity-100 hover:translate-y-[-1px]"
                  }`}
                >
                  {/* Select badge */}
                  <div className={`absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-raw-charcoal flex items-center justify-center ${
                    isSelected ? "bg-raw-lime" : "bg-transparent"
                  }`}>
                    {isSelected && <Check size={16} strokeWidth={3} />}
                  </div>

                  {/* Product thumbnail */}
                  <div className="w-24 h-24 shrink-0 border-2 border-raw-charcoal overflow-hidden bg-white">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Info details */}
                  <div className="flex-1 text-center md:text-left">
                    <span className="text-xs font-black tracking-widest text-raw-charcoal/60 block mb-1">
                      {prod.step}
                    </span>
                    <h3 className="text-2xl font-black mb-2">{prod.name}</h3>
                    <p className="text-sm font-medium opacity-70 max-w-md">{prod.desc}</p>
                  </div>

                  {/* Price */}
                  <div className="shrink-0 text-right">
                    <span className="text-2xl font-black block">{prod.price}€</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Stack Render & Checkout Summary (Asymmetrical Layout) */}
          <div className="lg:col-span-5">
            <div className="border-4 border-raw-charcoal p-8 bg-white shadow-[12px_12px_0px_0px_#00f3ff] flex flex-col gap-8 relative">
              {/* Dynamic Pile visual feedback */}
              <div className="h-44 bg-[#f9f8f6] border-2 border-raw-charcoal flex items-end justify-center pb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                  <span className="text-8xl font-black">STK</span>
                </div>

                {/* Animated piling blocks based on selections */}
                <div className="flex flex-col-reverse items-center w-full max-w-xs gap-1 relative z-10">
                  <AnimatePresence>
                    {selectedProducts.map((p, index) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: -40, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        style={{ backgroundColor: p.bgHex, width: `${100 - index * 10}%` }}
                        className="h-10 border-2 border-raw-charcoal text-[10px] font-black tracking-wider text-raw-charcoal flex items-center justify-center shadow-sm uppercase overflow-hidden px-2 whitespace-nowrap"
                      >
                        {p.name.split(" ")[0]}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {selectedProducts.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      className="text-xs font-bold text-raw-charcoal/50 pb-8 flex items-center gap-2"
                    >
                      <AlertCircle size={16} /> SELECT TO BUILD A STACK
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Stack Summary Details */}
              <div className="flex flex-col gap-4">
                <h3 className="text-3xl font-black uppercase">YOUR CUSTOM STACK</h3>
                <div className="h-0.5 bg-raw-charcoal/10" />

                <div className="flex flex-col gap-2">
                  {selectedProducts.map((p) => (
                    <div key={p.id} className="flex justify-between items-center text-sm font-bold">
                      <span className="opacity-70">{p.name}</span>
                      <span>{p.price}€</span>
                    </div>
                  ))}
                </div>

                <div className="h-0.5 bg-raw-charcoal/10" />

                {/* Discount banner */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span className="opacity-70">SUBTOTAL</span>
                    <span>{subtotal}€</span>
                  </div>

                  {isEligibleForDiscount ? (
                    <div className="flex justify-between items-center font-bold text-raw-magenta">
                      <span className="flex items-center gap-1.5">
                        <Sparkles size={16} /> 3-STEP STACK DISCOUNT (15%)
                      </span>
                      <span>-{discountAmount}€</span>
                    </div>
                  ) : (
                    <div className="bg-raw-cyan/10 border-2 border-raw-cyan/20 p-3 text-xs font-semibold text-raw-charcoal/80 flex items-center gap-2">
                      <AlertCircle size={16} className="text-raw-cyan" />
                      <span>Add 3 products to activate the bundle discount!</span>
                    </div>
                  )}
                </div>

                <div className="h-1 bg-raw-charcoal" />

                <div className="flex justify-between items-center font-display font-black text-2xl">
                  <span>FINAL PRICE</span>
                  <span className="text-3xl text-raw-charcoal">{finalPrice}€</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                disabled={selectedProducts.length === 0}
                onClick={handleAddStackToCart}
                className={`w-full py-5 font-display font-black text-xl uppercase tracking-tighter shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] transition-all ${
                  selectedProducts.length > 0
                    ? "bg-raw-lime text-raw-charcoal border-2 border-raw-charcoal cursor-pointer hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)]"
                    : "bg-raw-charcoal/10 text-raw-charcoal/40 border-2 border-raw-charcoal/10 cursor-not-allowed"
                }`}
              >
                {selectedProducts.length > 0 ? "ADD STACK TO CART" : "SELECT PRODUCTS"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
