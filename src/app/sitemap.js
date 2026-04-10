import { properties } from '@/data/properties';
import { agents } from '@/data/agents';

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://primeestate.com';

  // Static routes
  const staticRoutes = [
    '',
    '/properties',
    '/agents',
    '/about',
    '/careers',
    '/press',
    '/privacy',
    '/terms',
    '/accessibility',
    '/contact',
    '/list-property',
    '/favorites',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic property routes
  const propertyRoutes = properties.map((property) => ({
    url: `${baseUrl}/properties/${property.slug || property.id}`,
    lastModified: new Date(property.listingDate || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Dynamic agent routes
  const agentRoutes = agents.map((agent) => ({
    url: `${baseUrl}/agents/${agent.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...propertyRoutes, ...agentRoutes];
}