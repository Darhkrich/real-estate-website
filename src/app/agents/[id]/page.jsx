import { agents } from '@/data/agents';
import AgentDetailsClient from './AgentDetailsClient';

export async function generateMetadata({ params }) {
  const { id } = await params;

  const agent = agents.find((a) => a.id === id || a.id === parseInt(id));

  if (!agent) {
    return {
      title: 'Agent Not Found',
      description: 'The requested agent profile could not be found.',
    };
  }

  return {
    title: `${agent.name} - ${agent.title}`,
    description: agent.bio?.substring(0, 160) || `${agent.name} is a ${agent.title} at Prime Estate.`,
    openGraph: {
      title: `${agent.name} - ${agent.title}`,
      description: agent.bio?.substring(0, 160),
      url: `/agents/${agent.id}`,
      images: [{ url: agent.image, width: 800, height: 800, alt: agent.name }],
      type: 'profile',
    },
  };
}

export default function AgentPage({ params }) {
  return <AgentDetailsClient params={params} />;
}