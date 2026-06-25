import { motion } from "motion/react";
import { Zap, ShieldAlert, Sparkles } from "lucide-react";

const ingredients = [
  {
    name: "Ceramides",
    benefit: "Barrier-repairing lipids",
    color: "bg-raw-cyan",
    icon: <ShieldAlert size={32} />
  },
  {
    name: "Niacinamide",
    benefit: "Tone-evening multi-tasker",
    color: "bg-raw-lime",
    icon: <Zap size={32} />
  },
  {
    name: "Centella",
    benefit: "Calming botanical active",
    color: "bg-raw-magenta",
    icon: <Sparkles size={32} />
  }
];

export default function IngredientsBand() {
  return (
    <section className="flex flex-col md:flex-row border-y-4 border-raw-charcoal h-auto md:h-80">
      {ingredients.map((ing, index) => (
        <motion.div
          key={index}
          whileHover={{ flexGrow: 1.5 }}
          className={`flex-1 ${ing.color} p-12 flex flex-col justify-between group cursor-default transition-all duration-500 border-b-4 md:border-b-0 md:border-r-4 last:border-0 border-raw-charcoal`}
        >
          <div className="text-raw-charcoal">
             {ing.icon}
          </div>
          <div>
            <h3 className="text-5xl font-black text-raw-charcoal mb-2">{ing.name}</h3>
            <p className="text-raw-charcoal/70 font-display font-bold uppercase tracking-tight">{ing.benefit}</p>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
