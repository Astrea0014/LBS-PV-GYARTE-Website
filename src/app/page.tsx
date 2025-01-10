import SelectorButtonsGroup from "./components/general/SelectorButtonsGroup";

export default function Startsida() {
  return (
    <section className="py-32 my-32">
      <SelectorButtonsGroup years={["2035", "2034", "2033", "2032", "2031", "2030", "2029", "2028", "2027", "2026", "2025"]} />
    </section>
  );
}
