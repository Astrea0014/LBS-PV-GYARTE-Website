interface PageHeaderProps {
  headerTitle: string
}

export default function PageHeader({headerTitle}: PageHeaderProps) {
  return (
    <div className="py-8 flex w-11/12 lg:w-10/12 xl:w-8/12 mx-auto">
      <h1 className="text-5xl font-bold">{headerTitle}</h1>
    </div>

  );
}