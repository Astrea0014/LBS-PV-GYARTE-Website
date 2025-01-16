import Link from "next/link"

interface ButtonProps {
  link: string;
  text: string;
  customClasses: string;
}

export default function Button({ link, text, customClasses }: ButtonProps ){
  return (
    <Link
      href={link}
      className={`${customClasses} flex justify-center text-center p-2 w-28 rounded-full transition font-avenirBlack`}
    >
      {text}
    </Link>
  );
}