import AgentGridSkeleton from '@/components/skeletons/AgentGridSkeleton';
export const dynamic = 'force-dynamic';

export default function AgentsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
      <AgentGridSkeleton />
    </div>
  );
}