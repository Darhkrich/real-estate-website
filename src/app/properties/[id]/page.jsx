import { properties } from '@/data/properties';
import PropertyDetailsClient from './PropertyDetailsClient';

export async function generateMetadata({ params }) {
  const { id } = await params;

  // Find property by slug first, then by numeric id
  let property = properties.find((p) => p.slug === id);
  if (!property) {
    property = properties.find((p) => p.id === id || p.id === parseInt(id));
  }

  if (!property) {
    return {
      title: 'Property Not Found',
      description: 'The requested property could not be found.',
    };
  }

  const primaryImage =
    property.images?.find((img) => img.isPrimary)?.url ||
    property.images?.[0]?.url ||
    '/og-image.jpg';
  const price = property.formattedPrice || `$${property.price?.toLocaleString()}`;

  return {
    title: `${property.title} - ${price}`,
    description: property.shortDescription || property.description?.substring(0, 160),
    openGraph: {
      title: `${property.title} - ${price}`,
      description: property.shortDescription || property.description?.substring(0, 160),
      url: `/properties/${property.slug || property.id}`,
      images: [{ url: primaryImage, width: 1200, height: 630, alt: property.title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${property.title} - ${price}`,
      description: property.shortDescription || property.description?.substring(0, 160),
      images: [primaryImage],
    },
  };
}

export default function PropertyPage({ params }) {
  return <PropertyDetailsClient params={params} />;
}