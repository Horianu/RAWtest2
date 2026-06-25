import Header from "./components/Header";
import Hero from "./components/Hero";
import PillarsStrip from "./components/PillarsStrip";
import FeaturedRoutines from "./components/FeaturedRoutines";
import HowItWorks from "./components/HowItWorks";
import IngredientsBand from "./components/IngredientsBand";
import SocialProof from "./components/SocialProof";
import BundleBuilder from "./components/BundleBuilder";
import Education from "./components/Education";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen selection:bg-raw-lime selection:text-raw-charcoal">
      <Header />
      <main>
        <Hero />
        <PillarsStrip />
        <FeaturedRoutines />
        <HowItWorks />
        <IngredientsBand />
        <SocialProof />
        <BundleBuilder />
        <Education />
      </main>
      <Footer />
    </div>
  );
}
