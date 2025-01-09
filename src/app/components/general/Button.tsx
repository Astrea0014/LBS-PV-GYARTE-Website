import Link from "next/link"

interface ButtonProps {
  link: string;
  text: string;
  color: string;
  hColor: string;
}

export default function Button({ link, text, color, hColor }: ButtonProps ){
  return (
    <Link
    href={link}
    className={`${color} flex justify-center text-center p-2 w-28 rounded-full ${hColor} transition`}
    >
    {text}
    </Link>
  );
}