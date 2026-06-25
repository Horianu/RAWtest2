import { motion, AnimatePresence } from "motion/react";
import { Search, User, ShoppingBag, X, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Header() {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    totalPrice 
  } = useCart();

  // Apply useAutoAnimate to the cart items container
  const [cartListRef] = useAutoAnimate();

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-50 w-full flex flex-col">
        {/* Top Bar Ticker */}
        <div className="bg-raw-charcoal text-white py-2 overflow-hidden whitespace-nowrap border-b border-white/10">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <span className="inline-block px-4 font-display text-sm uppercase tracking-widest">
              Free shipping from 49€ - 30-day RAW results guarantee • Free shipping from 49€ - 30-day RAW results guarantee • Free shipping from 49€ - 30-day RAW results guarantee • Free shipping from 49€ - 30-day RAW results guarantee
            </span>
          </motion.div>
        </div>

        {/* Main Navigation */}
        <nav className="bg-raw-offwhite/90 backdrop-blur-md px-6 md:px-12 py-6 flex items-center justify-between border-b border-raw-charcoal/5">
          <div className="flex items-center gap-12">
            <a href="/" className="text-4xl font-display font-black tracking-tighter transform scale-y-110">
              RAW
            </a>
            <div className="hidden lg:flex items-center gap-8 font-display text-sm font-bold uppercase tracking-wide">
              <a href="#" className="hover:text-raw-lime transition-colors">Shop</a>
              <a href="#" className="hover:text-raw-cyan transition-colors">Routines</a>
              <a href="#" className="hover:text-raw-magenta transition-colors">Ingredients</a>
              <a href="#" className="hover:text-raw-orange transition-colors">Story</a>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="hover:scale-110 transition-transform cursor-pointer">
              <Search size={22} strokeWidth={2.5} />
            </button>
            <button className="hover:scale-110 transition-transform cursor-pointer">
              <User size={22} strokeWidth={2.5} />
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative group cursor-pointer"
            >
              <ShoppingBag size={22} strokeWidth={2.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-raw-lime text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-raw-charcoal">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-raw-offwhite text-raw-charcoal border-l-4 border-raw-charcoal z-55 flex flex-col shadow-2xl"
            >
              {/* Cart Header */}
              <div className="p-6 border-b-2 border-raw-charcoal flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-4xl font-black">YOUR CART</h2>
                  <span className="bg-raw-charcoal text-white text-xs font-black px-2 py-1">
                    {totalItems} ITEMS
                  </span>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 border-2 border-raw-charcoal hover:bg-raw-lime transition-colors cursor-pointer"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
              </div>

              {/* Cart Items (Animated with auto-animate) */}
              <div className="flex-1 overflow-y-auto p-6" ref={cartListRef}>
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <ShoppingBag size={48} className="opacity-30 mb-4" />
                    <h3 className="text-2xl font-black mb-2">YOUR CART IS EMPTY</h3>
                    <p className="opacity-60 mb-6 font-medium">Add some RAW formulas to kickstart your 3-step routine.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-3 bg-raw-lime border-2 border-raw-charcoal font-display font-black uppercase tracking-tighter hover:scale-105 transition-transform cursor-pointer"
                    >
                      Shop Now
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {cartItems.map((item) => (
                      <div 
                        key={item.id}
                        className="flex gap-4 border-2 border-raw-charcoal p-4 bg-white relative"
                      >
                        <div className={`w-20 h-20 shrink-0 ${item.color} border border-raw-charcoal`}>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="text-xl font-black">{item.name}</h4>
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="text-raw-charcoal/40 hover:text-raw-magenta cursor-pointer transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                            <span className="text-sm font-bold opacity-60">
                              {item.price}€ / each
                            </span>
                          </div>

                          <div className="flex justify-between items-center mt-2">
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-raw-charcoal">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 px-2 border-r border-raw-charcoal hover:bg-raw-charcoal hover:text-white transition-colors cursor-pointer"
                              >
                                <Minus size={12} strokeWidth={3} />
                              </button>
                              <span className="px-3 font-display font-black text-sm">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 px-2 border-l border-raw-charcoal hover:bg-raw-charcoal hover:text-white transition-colors cursor-pointer"
                              >
                                <Plus size={12} strokeWidth={3} />
                              </button>
                            </div>

                            <span className="font-display font-black text-lg">
                              {item.price * item.quantity}€
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t-2 border-raw-charcoal bg-white flex flex-col gap-4">
                  <div className="flex justify-between items-center font-display font-black text-xl">
                    <span>SUBTOTAL</span>
                    <span className="text-2xl">{totalPrice}€</span>
                  </div>
                  <p className="text-xs font-medium opacity-60">
                    Shipping & taxes calculated at checkout. Free shipping active over 49€!
                  </p>
                  <button className="w-full py-4 bg-raw-lime border-2 border-raw-charcoal font-display font-black text-xl uppercase tracking-tighter shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] transition-all cursor-pointer text-center">
                    Proceed to checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
