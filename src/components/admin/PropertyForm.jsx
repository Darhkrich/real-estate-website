'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockAgents } from '@/lib/mockData';

export default function PropertyForm({ initialData, isEditing }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    price: initialData?.price || '',
    status: initialData?.status || 'buy',
    beds: initialData?.beds || '',
    baths: initialData?.baths || '',
    sqft: initialData?.sqft || '',
    description: initialData?.description || '',
    agentId: initialData?.agentId || '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In mock mode, just log and redirect
    console.log('Property saved:', formData);
    router.push('/admin/properties');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border space-y-6 max-w-3xl">
      <h2 className="text-lg font-semibold">{isEditing ? 'Edit Property' : 'Add New Property'}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Title</label>
          <input name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input name="price" type="number" value={formData.price} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
            <option value="buy">For Sale</option>
            <option value="rent">For Rent</option>
            <option value="new">New Development</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bedrooms</label>
          <input name="beds" type="number" value={formData.beds} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bathrooms</label>
          <input name="baths" type="number" step="0.5" value={formData.baths} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Square Feet</label>
          <input name="sqft" type="number" value={formData.sqft} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Listing Agent</label>
          <select name="agentId" value={formData.agentId} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
            <option value="">Select Agent</option>
            {mockAgents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border rounded-lg">Cancel</button>
        <button type="submit" className="px-6 py-2 bg-amber-500 text-white rounded-lg">Save</button>
      </div>
    </form>
  );
}