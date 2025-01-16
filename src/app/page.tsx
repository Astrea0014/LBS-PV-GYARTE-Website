import StartSection from "./components/mainpage/StartSection";
import OverviewSection from "./components/mainpage/Overview";
import GyarteSection from "./components/mainpage/Gyarte";
import ProgramveckorSection from "./components/mainpage/PVSection";

export default function Startsida() {
  return (
    <main>
      <StartSection/>
      <OverviewSection/>
      <GyarteSection/>
      <ProgramveckorSection/>
    </main>
  );
}
