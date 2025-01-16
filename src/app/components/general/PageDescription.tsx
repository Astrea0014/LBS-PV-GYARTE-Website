interface PageDescriptionProps {
  description: string
}

export default function PageDescription({description}: PageDescriptionProps) {
  return (
    <div className="flex w-11/12 lg:w-10/12 xl:w-8/12 mx-auto">
      <p className="text-lg sm:text-xl leading-8">
        {description}
      </p>
    </div>
  );
}