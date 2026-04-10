import AgentCardSkeleton from './AgentCardSkeleton';

export default function AgentGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, i) => (
        <AgentCardSkeleton key={i} />
      ))}
    </div>
  );
}