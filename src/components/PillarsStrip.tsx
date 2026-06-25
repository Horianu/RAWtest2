import { motion } from "motion/react";
import { ListChecks, Shield, Beaker } from "lucide-react";

const pillars = [
  {
    icon: <ListChecks size={40} />,
    title: "3-Step Routines",
    subtitle: "Cleanse, treat, seal. That's it."
  },
  {
    icon: <Shield size={40} />,
    title: "Barrier-Friendly",
    subtitle: "No over-exfoliating, no drama."
  },
  {
    icon: <Beaker size={40} />,
    title: "Clinically inspired",
    subtitle: "Actives that work, not fluff."
  }
];

export default function PillarsStrip() {
  return (
    <section className="bg-raw-coral w-full py-12 px-6 md:px-12 border-y-2 border-raw-charcoal">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
        {pillars.map((pillar, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
            <div className="mb-6 bg-raw-charcoal text-white p-4 rounded-none">
              {pillar.icon}
            </div>
            <h3 className="text-3xl font-black text-white mb-2">{pillar.title}</h3>
            <p className="text-raw-charcoal font-medium text-lg opacity-80">{pillar.subtitle}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
