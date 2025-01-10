interface SelectorButtonProps {
  onClickFunc?: VoidFunction;
  year: string;
}

export default function SelectorButton({ onClickFunc, year }: SelectorButtonProps) {
  return (
    <button
      onClick={onClickFunc}
      className={`text-xl md:text-2xl lg:text-3xl px-4 md:px-12 hover:underline cursor-pointer`}
    >
      {year}
    </button>
  );
}