import { motion } from "motion/react";

const articles = [
  {
    title: "Why your barrier hates your 10-step routine",
    tag: "BARRIER",
    color: "bg-raw-lime"
  },
  {
    title: "How to spot over-exfoliation",
    tag: "ROUTINES",
    color: "bg-raw-cyan"
  },
  {
    title: "Actives that play nice together",
    tag: "INGREDIENTS",
    color: "bg-raw-magenta"
  }
];

export default function Education() {
  return (
    <section id="story" className="py-24 px-6 md:px-12 bg-raw-offwhite">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-black mb-16 text-center">Learn to stop over-treating</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className={`aspect-video ${article.color} border-4 border-raw-charcoal mb-6 overflow-hidden relative`}>
                 <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-30 transition-opacity">
                    <span className="text-[10rem] font-black">RAW</span>
                 </div>
              </div>
              <span className="text-sm font-black bg-raw-charcoal text-white px-3 py-1 mb-4 inline-block">{article.tag}</span>
              <h3 className="text-3xl font-black group-hover:text-raw-cyan transition-colors">{article.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
