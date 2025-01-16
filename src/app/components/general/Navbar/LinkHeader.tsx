import Link from "next/link";

interface LinkHeaderProps {
  title: string;
  toPath: string;
  size: "small" | "big";
  currentPath: string;
  closeNavFunc: (param: boolean) => void;
}

export default function LinkHeader({ title, toPath, size, currentPath, closeNavFunc  }: LinkHeaderProps) {
  return (
    <Link
      href={toPath}
      className={`border-b ${size === "big" ? "text-2xl p-3 w-11/12"  : "text-md p-3 w-10/12"} ${currentPath.startsWith(toPath) ? "font-bold" : ""}`} 
      onClick={() => closeNavFunc(false)}
    >
      {title}
    </Link>
  );
}