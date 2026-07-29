const SkeletonCard = () => (
  <div className="overflow-hidden rounded-2xl border border-white/5 bg-obsidian-2">
    <div className="skeleton h-48 w-full" />

    <div className="space-y-3 p-5">
      <div className="skeleton h-4 w-2/3 rounded" />
      <div className="skeleton h-3 w-1/2 rounded" />

      <div className="flex gap-2 pt-2">
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>

      <div className="skeleton h-9 w-full rounded-xl" />
    </div>
  </div>
);

export const SkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonCard;