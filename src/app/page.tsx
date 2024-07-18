import Navigation from "./components/navigation/navigation";
import { navigationData } from "./components/navigation/navigation-data";

export default function Home() {
  return (
    <main className="p-4 max-w-screen-2xl mx-auto">
      <Navigation navigationData={navigationData} />
    </main>
  );
}
