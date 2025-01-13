import SelectorButton from "./SelectorButton";
import TabSelector from "./TabSelector";
interface SelectorButtonsGroupProps {
  years: number[];
  pathYear: string | null;
}

export default function SelectorButtonsGroup({ years, pathYear }: SelectorButtonsGroupProps) {
  const sortedYearsSet = new Set([...years].sort(function(a: number, b:number){return b - a}))
  const sortedYearsArray = [...sortedYearsSet];

  return (
    <TabSelector>
      {sortedYearsArray.map((year ) => 
        <SelectorButton year={year} key={year} pathYear={pathYear} />
      )}
    </TabSelector>
  );
}