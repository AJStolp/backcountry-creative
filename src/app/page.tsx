import Footer from "./components/footer/footer";
import Navigation from "./components/navigation/navigation";

import StickyScroll from "./components/stick-scroll/sticky-scroll";

export default function Home() {
  return (
    <main className="p-4 max-w-screen-2xl mx-auto">
      <Navigation />
      <StickyScroll />
      <Footer />
    </main>
  );
}
