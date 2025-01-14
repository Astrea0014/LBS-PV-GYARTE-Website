interface PageHeaderProps {
  headerTitle: string;
  centerd?: boolean;
}

export default function PageHeader({headerTitle, centerd}: PageHeaderProps) {
  return (
    <div className={`flex w-11/12 lg:w-10/12 xl:w-8/12 mx-auto mb-4 ${centerd ? "justify-center" : ""}`}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{headerTitle}</h1>
    </div>
  );
}