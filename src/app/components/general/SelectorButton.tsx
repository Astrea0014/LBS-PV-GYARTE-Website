"use client";
import { useSearchParams, useRouter } from "next/navigation";

interface SelectorButtonProps {
  year: number;
  pathYear: string;
}

export default function SelectorButton({ year, pathYear }: SelectorButtonProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.replace(`?${params.toString()}`);
    console.log("function ran...", params)
  };
  return (
    <button
      onClick={() => updateQuery("year", year.toString())}
      className={`text-xl md:text-2xl lg:text-3xl px-4 md:px-12 hover:underline cursor-pointer font-avenirRoman ${pathYear === year.toString() ? "font-bold underline": ""}`}
    >
      {year}
    </button>
  );
}