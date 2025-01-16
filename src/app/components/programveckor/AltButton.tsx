interface ButtonProps {
  link: string;
  text: string;
  customClasses: string;
  icon?: React.ReactElement;
}

export default function AltButton({ link, text, customClasses, icon}: ButtonProps ){
  return (
    <a
      href={link}
      className={`${customClasses} flex justify-center items-center text-center w-28 rounded-full transition`}
    >
      {text}&nbsp;{icon}
    </a>
  );
}