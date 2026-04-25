'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import { mockProperties } from '@/lib/mockData';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState(mockProperties);

  const handleDelete = (id) => {
    if (confirm('Delete this property?')) {
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Properties</h1>
        <Link href="/admin/properties/new" className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl">
          <Plus className="w-4 h-4" /> Add Property
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Agent</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {properties.map(p => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="w-12 h-12 rounded overflow-hidden bg-gray-200">
                    <OptimizedImage src={p.images?.[0]?.url} alt="" fill sizes="48px" />
                  </div>
                </td>
                <td className="font-medium">{p.title}</td>
                <td>{p.formattedPrice || `$${p.price?.toLocaleString()}`}{p.status === 'rent' ? '/mo' : ''}</td>
                <td>
                  <span className={`px-2 py-1 text-xs rounded-full ${p.status === 'buy' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {p.status}
                  </span>
                </td>
                <td>{p.agent_name || '-'}</td>
                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/properties/${p.slug}`} target="_blank" className="p-1 hover:bg-gray-200 rounded">
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link href={`/admin/properties/${p.id}/edit`} className="p-1 hover:bg-gray-200 rounded">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleDelete(p.id)} className="p-1 hover:bg-red-100 rounded text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}