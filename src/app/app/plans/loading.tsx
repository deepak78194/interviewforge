export default function Loading() {
  return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-8 bg-muted rounded w-1/3" />
      <div className="h-4 bg-muted rounded w-2/3" />
      <div className="space-y-3 mt-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-36 bg-muted rounded-lg" />
        ))}
      </div>
    </div>
  );
}
