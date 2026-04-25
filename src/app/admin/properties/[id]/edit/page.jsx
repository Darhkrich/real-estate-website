'use client';
import { useParams } from 'next/navigation';
import PropertyForm from '@/components/admin/PropertyForm';
import { mockProperties } from '@/lib/mockData';

export default function EditPropertyPage() {
  const { id } = useParams();
  const property = mockProperties.find(p => p.id === id);

  if (!property) return <div>Property not found</div>;
  return <PropertyForm initialData={property} isEditing />;
}