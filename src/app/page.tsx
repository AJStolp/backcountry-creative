import Footer from "./components/footer/footer";
import Navigation from "./components/navigation/navigation";
import MyStickyScroll from "./components/stick-scroll/sticky-scroll";
import TransitionSection from "./components/transition-section/transition-section";

export default function Home() {
  return (
    <main>
      <Navigation />
      <MyStickyScroll />
      <TransitionSection />
      <Footer />
    </main>
  );
}
