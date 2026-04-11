'use client';

import dynamic from 'next/dynamic';

const AgentsPageContent = dynamic(() => import('./AgentsClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function AgentsPageWrapper() {
  return <AgentsPageContent />;
}