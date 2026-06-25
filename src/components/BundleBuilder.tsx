import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../context/CartContext";
import { 
  Check, 
  Sparkles, 
  AlertCircle, 
  Trash2, 
  Truck, 
  Gift, 
  RefreshCw, 
  Layers, 
  Calendar, 
  HeartHandshake, 
  Percent,
  X
} from "lucide-react";
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
    id: "step-1-5-hydrator",
    name: "HYALURONIC HYDRATOR",
    step: "STEP 1.5 - HYDRATE",
    price: 26,
    color: "bg-raw-orange text-raw-charcoal border-raw-orange",
    bgHex: "#ff5e00",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=400",
    desc: "Triple-weight HA moisture infusion that floods dehydrated cells with deep volume.",
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
  
  // Start with all 4 items selected by default to demonstrate the full tier & subscription capabilities!
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "step-1-cleanser",
    "step-1-5-hydrator",
    "step-2-treatment",
    "step-3-barrier"
  ]);
  
  const [isSubscription, setIsSubscription] = useState<boolean>(false);
  const [subscriptionInterval, setSubscriptionInterval] = useState<number>(30); // days
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  
  const [animationContainer] = useAutoAnimate();

  const toggleProduct = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const removeProduct = (id: string) => {
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    if (hoveredProductId === id) {
      setHoveredProductId(null);
    }
  };

  const selectedProducts = STACK_PRODUCTS.filter((p) => selectedIds.includes(p.id));
  const subtotal = selectedProducts.reduce((acc, p) => acc + p.price, 0);

  // Dynamic Tiered Perks Logic
  const itemCount = selectedProducts.length;
  
  let discountPercent = 0;
  let hasFreeShipping = false;
  let hasStickerPack = false;
  let hasCanvasBag = false;

  if (itemCount === 1) {
    discountPercent = 0;
    hasFreeShipping = false;
  } else if (itemCount === 2) {
    discountPercent = 0;
    hasFreeShipping = true;
  } else if (itemCount === 3) {
    discountPercent = 10;
    hasFreeShipping = true;
    hasStickerPack = true;
  } else if (itemCount >= 4) {
    discountPercent = 20;
    hasFreeShipping = true;
    hasStickerPack = true;
    hasCanvasBag = true;
  }

  // If user chooses subscription, give them an extra flat 15% discount on top, or lock it to 15% minimum if low item count!
  const subscriptionBonusDiscount = isSubscription ? 15 : 0;
  const totalDiscountPercent = Math.min(discountPercent + subscriptionBonusDiscount, 35); // capped at 35% max discount
  
  // If subscription, shipping is always free
  const shippingFree = hasFreeShipping || isSubscription;

  const discountAmount = Math.round(subtotal * (totalDiscountPercent / 100));
  const finalPrice = subtotal - discountAmount;

  const handleAddStackToCart = () => {
    if (selectedProducts.length === 0) return;

    let stackName = `CUSTOM ${itemCount}-STEP STACK`;
    if (isSubscription) {
      stackName += ` (AUTO-REFILL EVERY ${subscriptionInterval} DAYS)`;
    }

    addToCart({
      id: `custom-stack-${selectedIds.sort().join("-")}-${isSubscription ? `sub-${subscriptionInterval}` : "once"}`,
      name: stackName,
      price: finalPrice,
      image: selectedProducts[0].image,
      color: totalDiscountPercent >= 20 ? "bg-raw-magenta text-white" : "bg-raw-lime text-raw-charcoal",
    });
  };

  return (
    <section id="bundle-builder" className="py-24 px-6 md:px-12 bg-raw-offwhite border-b-4 border-raw-charcoal relative overflow-hidden">
      {/* Visual background lines (Inspirux-style subtle alignment) */}
      <div className="absolute inset-y-0 left-1/4 w-px bg-raw-charcoal/5 pointer-events-none hidden lg:block" />
      <div className="absolute inset-y-0 left-2/4 w-px bg-raw-charcoal/5 pointer-events-none hidden lg:block" />
      <div className="absolute inset-y-0 left-3/4 w-px bg-raw-charcoal/5 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <span className="text-sm font-black bg-raw-charcoal text-white px-3 py-1.5 uppercase tracking-widest inline-block mb-4">
            LIVE STACK DESIGNER
          </span>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
            BUILD YOUR OWN <br />
            <span className="text-raw-magenta">RAW STACK</span>
          </h2>
          <p className="mt-4 text-lg font-bold opacity-60 uppercase tracking-wide">
            Select products to layer. Unlock escalating discounts & exclusive gifts live.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Product Toggles (Inspirux-style card checklist) */}
          <div className="lg:col-span-7 flex flex-col gap-6" ref={animationContainer}>
            <div className="flex justify-between items-center bg-white border-2 border-raw-charcoal p-4 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
              <span className="font-display font-black text-xs uppercase tracking-wider flex items-center gap-2">
                <Layers size={16} /> BUILDER CONTROLS
              </span>
              <button
                onClick={() => setSelectedIds([])}
                className="text-xs font-black uppercase tracking-wider text-raw-magenta hover:underline"
              >
                Clear Selections
              </button>
            </div>

            {STACK_PRODUCTS.map((prod) => {
              const isSelected = selectedIds.includes(prod.id);
              const isLayerHovered = hoveredProductId === prod.id;

              return (
                <div
                  key={prod.id}
                  onClick={() => toggleProduct(prod.id)}
                  onMouseEnter={() => isSelected && setHoveredProductId(prod.id)}
                  onMouseLeave={() => setHoveredProductId(null)}
                  className={`border-4 border-raw-charcoal p-6 flex flex-col md:flex-row gap-6 items-center cursor-pointer transition-all duration-300 relative ${
                    isSelected 
                      ? "bg-white shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] translate-x-[-2px] translate-y-[-2px]" 
                      : "bg-[#f2f0ec] opacity-60 hover:opacity-100 hover:translate-y-[-1px]"
                  } ${isLayerHovered ? "ring-4 ring-raw-magenta ring-offset-2" : ""}`}
                >
                  {/* Select badge */}
                  <div className={`absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-raw-charcoal flex items-center justify-center transition-colors duration-300 ${
                    isSelected ? "bg-raw-lime text-raw-charcoal" : "bg-transparent"
                  }`}>
                    {isSelected ? <Check size={16} strokeWidth={3} /> : <div className="w-2 h-2 rounded-full bg-raw-charcoal/30" />}
                  </div>

                  {/* Product thumbnail */}
                  <div className="w-24 h-24 shrink-0 border-2 border-raw-charcoal overflow-hidden bg-white relative">
                    <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                    {isSelected && (
                      <div className="absolute top-1 left-1 bg-raw-charcoal text-white font-mono font-black text-[9px] px-1.5 py-0.5 uppercase tracking-widest">
                        ACTIVE
                      </div>
                    )}
                  </div>

                  {/* Info details */}
                  <div className="flex-1 text-center md:text-left">
                    <span className="text-xs font-black tracking-widest text-raw-charcoal/60 block mb-1">
                      {prod.step}
                    </span>
                    <h3 className="text-2xl font-black mb-2 flex items-center justify-center md:justify-start gap-2">
                      {prod.name}
                    </h3>
                    <p className="text-sm font-medium opacity-75 max-w-md">{prod.desc}</p>
                  </div>

                  {/* Price & Action */}
                  <div className="shrink-0 flex flex-col items-center md:items-end gap-2">
                    <span className="text-2xl font-black block">{prod.price}€</span>
                    {isSelected ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeProduct(prod.id);
                        }}
                        className="text-xs font-bold text-raw-magenta hover:underline flex items-center gap-1 uppercase"
                      >
                        <Trash2 size={12} /> Remove layer
                      </button>
                    ) : (
                      <span className="text-xs font-bold text-raw-lime uppercase">Add to Stack</span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* SUBSCRIPTION AUTO-REFILL SERVICE CONTAINER */}
            <div className="border-4 border-raw-charcoal p-8 bg-white shadow-[10px_10px_0px_0px_rgba(26,26,26,1)] flex flex-col gap-6 relative overflow-hidden mt-6">
              {/* Corner badge */}
              <div className="absolute top-0 right-0 bg-raw-lime text-raw-charcoal border-l-4 border-b-4 border-raw-charcoal font-display font-black text-xs px-4 py-2 uppercase tracking-widest">
                SAVE 15% ALWAYS
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-raw-magenta border-2 border-raw-charcoal flex items-center justify-center text-white">
                  <RefreshCw size={24} className="animate-spin-slow" />
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">RAW REPLENISH AUTO-REFILL</h3>
                  <p className="text-xs font-bold text-raw-charcoal/60 uppercase">Never run dry • Cancel/Pause with 1 click</p>
                </div>
              </div>

              <div className="h-0.5 bg-raw-charcoal/10" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <h4 className="font-black text-sm uppercase text-raw-charcoal">How subscription works</h4>
                  <p className="text-sm font-medium text-raw-charcoal/80 leading-relaxed">
                    Choose monthly auto-refill to automatically receive your custom skin stack at your door step every month. 
                    No lock-ins, skip orders, modify layers, or cancel easily.
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 bg-[#fdfdfc] border-2 border-dashed border-raw-charcoal/30 p-4">
                  <h4 className="font-black text-sm uppercase text-raw-magenta flex items-center gap-1.5">
                    <Sparkles size={14} /> EXCLUSIVE SUBSCRIBER PERKS:
                  </h4>
                  <ul className="text-xs font-bold space-y-1.5 text-raw-charcoal/90">
                    <li className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-raw-lime" />
                      FLAT 15% BONUS SAVINGS ON EVERY AUTO-REFILL
                    </li>
                    <li className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-raw-cyan" />
                      FREE SHIPPING ALWAYS (ON EVERY RENEWAL)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-raw-magenta" />
                      EARLY VIP ACCESS TO LIMITED RUN DROPS & SALES
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {/* One-Time vs Auto-Refill selector */}
                <button
                  type="button"
                  onClick={() => setIsSubscription(false)}
                  className={`py-4 px-6 border-2 border-raw-charcoal font-display font-black text-sm uppercase tracking-wider flex items-center justify-between transition-all ${
                    !isSubscription 
                      ? "bg-raw-charcoal text-white shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] translate-x-[-2px] translate-y-[-2px]" 
                      : "bg-white text-raw-charcoal hover:bg-[#faf9f6]"
                  }`}
                >
                  <span>One-Time Purchase</span>
                  <span className="text-xs opacity-60">Standard</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSubscription(true)}
                  className={`py-4 px-6 border-2 border-raw-charcoal font-display font-black text-sm uppercase tracking-wider flex items-center justify-between transition-all ${
                    isSubscription 
                      ? "bg-raw-magenta text-white shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] translate-x-[-2px] translate-y-[-2px]" 
                      : "bg-raw-lime/10 text-raw-charcoal hover:bg-raw-lime/20"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <RefreshCw size={14} className="animate-spin-slow" /> Auto-Refill & Save
                  </span>
                  <span className="bg-raw-magenta text-white text-[10px] px-2 py-0.5 rounded-full font-black animate-pulse">
                    -15%
                  </span>
                </button>
              </div>

              {isSubscription && (
                <div className="bg-[#fcfcfa] border-2 border-raw-charcoal p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-raw-magenta" />
                    <span className="text-sm font-black uppercase tracking-tight">DELIVERY INTERVAL</span>
                  </div>
                  <div className="flex gap-2">
                    {[30, 45, 60].map((days) => (
                      <button
                        key={days}
                        onClick={() => setSubscriptionInterval(days)}
                        className={`px-4 py-2 border-2 border-raw-charcoal font-mono font-black text-xs uppercase tracking-wider transition-colors ${
                          subscriptionInterval === days 
                            ? "bg-raw-charcoal text-white" 
                            : "bg-white text-raw-charcoal hover:bg-raw-lime"
                        }`}
                      >
                        {days} Days
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Stack Render & Checkout Summary (Asymmetrical Layout) */}
          <div className="lg:col-span-5 sticky top-32">
            <div className="border-4 border-raw-charcoal p-8 bg-white shadow-[12px_12px_0px_0px_#00f3ff] flex flex-col gap-8 relative">
              {/* Dynamic Pile visual feedback */}
              <div className="h-56 bg-[#f9f8f6] border-2 border-raw-charcoal flex flex-col justify-between p-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                  <span className="text-8xl font-black">STK</span>
                </div>

                <div className="flex justify-between items-center relative z-20">
                  <span className="text-[10px] font-mono font-black bg-raw-charcoal text-white px-2 py-0.5 tracking-wider uppercase">
                    LIVE PILE PREVIEW
                  </span>
                  {selectedProducts.length > 0 && (
                    <span className="text-[10px] font-mono font-bold text-raw-charcoal/60">
                      Hover layer to focus & remove
                    </span>
                  )}
                </div>

                {/* Animated piling blocks based on selections */}
                <div className="flex flex-col-reverse items-center w-full max-w-xs mx-auto gap-1 relative z-10 pt-4">
                  <AnimatePresence>
                    {selectedProducts.map((p, index) => {
                      const isHovered = hoveredProductId === p.id;
                      
                      return (
                        <motion.div
                          key={p.id}
                          layout
                          initial={{ opacity: 0, y: -50, scale: 0.9 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0, 
                            scale: isHovered ? 1.08 : 1.0,
                            rotate: isHovered ? -0.5 : 0,
                            zIndex: isHovered ? 50 : index + 10,
                          }}
                          exit={{ opacity: 0, scale: 0.8, y: 20 }}
                          transition={{ type: "spring", stiffness: 350, damping: 22 }}
                          style={{ 
                            backgroundColor: p.bgHex, 
                            width: `${90 - index * 6}%`,
                          }}
                          onMouseEnter={() => setHoveredProductId(p.id)}
                          onMouseLeave={() => setHoveredProductId(null)}
                          className={`h-11 border-2 border-raw-charcoal text-[11px] font-black tracking-wider text-raw-charcoal flex items-center justify-between shadow-sm uppercase px-3 relative cursor-pointer transition-all ${
                            isHovered 
                              ? "shadow-[0px_6px_15px_rgba(0,0,0,0.15)] ring-2 ring-white" 
                              : ""
                          }`}
                        >
                          <span className="truncate max-w-[120px]">{p.name.split(" ")[0]} {p.name.split(" ")[1] || ""}</span>
                          
                          {/* Close/Remove Action on the Layer Block */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeProduct(p.id);
                            }}
                            className={`w-5 h-5 rounded-full border border-raw-charcoal/40 bg-white/40 flex items-center justify-center transition-all ${
                              isHovered ? "bg-raw-magenta text-white border-raw-charcoal scale-110" : "opacity-60"
                            }`}
                            title="Remove layer"
                          >
                            <X size={10} strokeWidth={3} />
                          </button>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>

                  {selectedProducts.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      className="text-xs font-bold text-raw-charcoal/50 py-12 flex items-center gap-2"
                    >
                      <AlertCircle size={16} /> SELECT PRODUCTS TO BUILD STACK
                    </motion.div>
                  )}
                </div>
              </div>

              {/* TIERED REWARDS PROGRESS BAR */}
              <div className="bg-[#fbfaf7] border-2 border-raw-charcoal p-4 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="font-display font-black text-xs uppercase tracking-wider flex items-center gap-1.5 text-raw-charcoal">
                    <Percent size={14} className="text-raw-magenta animate-bounce" /> REWARDS STATUS
                  </span>
                  <span className="bg-raw-charcoal text-white text-[10px] font-black px-2 py-0.5 uppercase tracking-widest">
                    {itemCount} {itemCount === 1 ? "Product" : "Products"} Active
                  </span>
                </div>

                {/* Progress Slider Track with Checkpoints */}
                <div className="relative pt-2 pb-1">
                  {/* Background Track Line */}
                  <div className="h-3 bg-raw-charcoal/10 border border-raw-charcoal relative rounded-full overflow-hidden">
                    {/* Glowing active fill */}
                    <div 
                      className="h-full bg-raw-lime transition-all duration-500" 
                      style={{ width: `${Math.min((itemCount / 4) * 100, 100)}%` }}
                    />
                  </div>

                  {/* Milestone flags */}
                  <div className="flex justify-between mt-3 text-[10px] font-black uppercase text-raw-charcoal/70">
                    <div className={`flex flex-col items-center text-center ${itemCount >= 1 ? "text-raw-charcoal" : "opacity-40"}`}>
                      <div className={`w-3 h-3 rounded-full border border-raw-charcoal mb-1 ${itemCount >= 1 ? "bg-raw-lime" : "bg-white"}`} />
                      <span>1 item</span>
                      <span className="text-[8px] font-bold text-raw-charcoal/50">Start</span>
                    </div>

                    <div className={`flex flex-col items-center text-center ${itemCount >= 2 ? "text-raw-charcoal" : "opacity-40"}`}>
                      <div className={`w-3 h-3 rounded-full border border-raw-charcoal mb-1 ${itemCount >= 2 ? "bg-raw-lime" : "bg-white"}`} />
                      <span>2 items</span>
                      <span className="text-[8px] font-bold text-raw-lime bg-raw-charcoal px-1 mt-0.5 rounded-sm">Free Ship</span>
                    </div>

                    <div className={`flex flex-col items-center text-center ${itemCount >= 3 ? "text-raw-charcoal" : "opacity-40"}`}>
                      <div className={`w-3 h-3 rounded-full border border-raw-charcoal mb-1 ${itemCount >= 3 ? "bg-raw-lime" : "bg-white"}`} />
                      <span>3 items</span>
                      <span className="text-[8px] font-bold text-raw-magenta bg-white border border-raw-charcoal px-1 mt-0.5 rounded-sm">-10% + Gift</span>
                    </div>

                    <div className={`flex flex-col items-center text-center ${itemCount >= 4 ? "text-raw-charcoal" : "opacity-40"}`}>
                      <div className={`w-3 h-3 rounded-full border border-raw-charcoal mb-1 ${itemCount >= 4 ? "bg-raw-lime" : "bg-white"}`} />
                      <span>4 items</span>
                      <span className="text-[8px] font-bold text-raw-cyan bg-raw-charcoal text-white px-1 mt-0.5 rounded-sm">-20% + Tote</span>
                    </div>
                  </div>
                </div>

                {/* Bullet details on active perks */}
                <div className="border-t border-raw-charcoal/10 pt-3 flex flex-col gap-1.5 text-xs font-bold text-raw-charcoal">
                  {shippingFree && (
                    <div className="flex items-center gap-2 text-raw-charcoal">
                      <Truck size={14} className="text-raw-cyan shrink-0" />
                      <span>Perk Unlocked: <strong className="uppercase">FREE EXPRESS SHIPPING</strong> (Saves 4.90€)</span>
                    </div>
                  )}
                  {hasStickerPack && (
                    <div className="flex items-center gap-2 text-raw-charcoal">
                      <Gift size={14} className="text-raw-magenta shrink-0" />
                      <span>Perk Unlocked: <strong className="uppercase">FREE RAW STICKER PACK</strong></span>
                    </div>
                  )}
                  {hasCanvasBag && (
                    <div className="flex items-center gap-2 text-raw-charcoal">
                      <Sparkles size={14} className="text-raw-lime shrink-0" />
                      <span>Perk Unlocked: <strong className="uppercase">FREE HEAVY CANVAS TOTE BAG</strong></span>
                    </div>
                  )}
                  {selectedProducts.length === 1 && (
                    <div className="text-raw-charcoal/50 italic font-medium flex items-center gap-1">
                      <AlertCircle size={14} /> Add 1 more item to unlock Free Shipping!
                    </div>
                  )}
                  {selectedProducts.length === 0 && (
                    <div className="text-raw-charcoal/50 italic font-medium flex items-center gap-1">
                      <AlertCircle size={14} /> Add products to begin stacking perks!
                    </div>
                  )}
                </div>
              </div>

              {/* Stack Summary Details */}
              <div className="flex flex-col gap-4">
                <h3 className="text-2xl font-black uppercase tracking-tight flex justify-between items-center">
                  <span>STACK SUMMARY</span>
                  {isSubscription && (
                    <span className="text-xs bg-raw-magenta text-white px-2 py-0.5 tracking-wider font-mono">
                      AUTO-REFILL EVERY {subscriptionInterval} DAYS
                    </span>
                  )}
                </h3>
                <div className="h-0.5 bg-raw-charcoal/10" />

                <div className="flex flex-col gap-2 max-h-32 overflow-y-auto pr-1">
                  {selectedProducts.map((p) => (
                    <div key={p.id} className="flex justify-between items-center text-sm font-bold">
                      <span className="opacity-70 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full border border-raw-charcoal" style={{ backgroundColor: p.bgHex }} />
                        {p.name}
                      </span>
                      <div className="flex items-center gap-3">
                        <span>{p.price}€</span>
                        <button
                          onClick={() => removeProduct(p.id)}
                          className="text-raw-charcoal/40 hover:text-raw-magenta"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-0.5 bg-raw-charcoal/10" />

                {/* Pricing / Discount Rows */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center font-bold text-sm">
                    <span className="opacity-70">SUBTOTAL</span>
                    <span>{subtotal}€</span>
                  </div>

                  {totalDiscountPercent > 0 && (
                    <div className="flex justify-between items-center font-bold text-raw-magenta text-sm">
                      <span className="flex items-center gap-1.5">
                        <Percent size={14} /> SAVINGS UNLOCKED ({totalDiscountPercent}%)
                      </span>
                      <span>-{discountAmount}€</span>
                    </div>
                  )}

                  {isSubscription && (
                    <div className="flex justify-between items-center font-bold text-raw-lime text-xs">
                      <span className="flex items-center gap-1.5">
                        <RefreshCw size={12} className="animate-spin-slow" /> REPLENISH AUTO-REFILL DISCOUNT
                      </span>
                      <span>Included (-15% on stack)</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center font-bold text-sm">
                    <span className="opacity-70">SHIPPING</span>
                    {shippingFree ? (
                      <span className="text-raw-lime uppercase font-black text-xs bg-raw-charcoal px-2 py-0.5 rounded-sm">FREE</span>
                    ) : (
                      <span>4.90€</span>
                    )}
                  </div>
                </div>

                <div className="h-1 bg-raw-charcoal" />

                <div className="flex justify-between items-center font-display font-black text-2xl">
                  <span>TOTAL PRICE</span>
                  <div className="flex flex-col items-end">
                    <span className="text-3xl text-raw-charcoal leading-none">{finalPrice}€</span>
                    {!shippingFree && <span className="text-[10px] font-bold text-raw-charcoal/50 mt-1">+ 4.90€ SHIPPING</span>}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                disabled={selectedProducts.length === 0}
                onClick={handleAddStackToCart}
                className={`w-full py-5 font-display font-black text-xl uppercase tracking-tighter shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] transition-all ${
                  selectedProducts.length > 0
                    ? "bg-raw-lime text-raw-charcoal border-2 border-raw-charcoal cursor-pointer hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]"
                    : "bg-raw-charcoal/10 text-raw-charcoal/40 border-2 border-raw-charcoal/10 cursor-not-allowed"
                }`}
              >
                {selectedProducts.length > 0 
                  ? (isSubscription ? "SUBSCRIBE & ADD TO CART" : "ADD STACK TO CART") 
                  : "SELECT PRODUCTS TO BUILD STACK"
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
