interface IframeProps {
  link: string;
}

export default function Iframe({link}: IframeProps) {
  return (
    <iframe
      src={link}
      className="w-full h-full border-y-2 sm:border-2 border-dark outline-none focus-visible:outline-none"
      allowFullScreen
    />
  );
}