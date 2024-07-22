import Footer from "./components/footer/footer";
import Navigation from "./components/navigation/navigation";

import StickyScroll from "./components/stick-scroll/sticky-scroll";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow">
        <StickyScroll />
      </div>
      <Footer />
    </main>
  );
}
