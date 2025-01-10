import SelectorButton from "./SelectorButton";
import TabSelector from "./TabSelector";
interface SelectorButtonsGroupProps {
  years: string[];
}

export default function SelectorButtonsGroup({ years }: SelectorButtonsGroupProps) {
  return (
    <TabSelector>
      {years.map((year ) => 
        <SelectorButton year={year} key={year} />
      )}
    </TabSelector>
  );
}