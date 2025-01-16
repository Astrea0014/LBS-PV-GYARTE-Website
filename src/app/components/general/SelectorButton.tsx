import Link from "next/link";

interface SelectorButtonProps {
  year: number;
  pathYear: string | null;
}

export default function SelectorButton({ year, pathYear }: SelectorButtonProps) {
  return (
    <Link
      href={`/programveckor?year=${year}`}
      className={`text-xl md:text-2xl lg:text-3xl px-4 md:px-12 hover:underline cursor-pointer font-avenirRoman ${pathYear === year.toString() ? "font-bold underline": ""}`}
    >
      {year}
    </Link>
  );
}