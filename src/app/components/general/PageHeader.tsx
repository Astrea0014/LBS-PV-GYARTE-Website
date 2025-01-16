interface PageHeaderProps {
  headerTitle: string;
  centerd?: boolean;
  colorClass?: string;
}

export default function PageHeader({headerTitle, centerd, colorClass}: PageHeaderProps) {
  return (
    <div className={`flex ${colorClass} mx-auto mb-4 ${centerd ? "justify-center w-full" : "w-11/12 lg:w-10/12 xl:w-8/12"}`}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{headerTitle}</h1>
    </div>
  );
}