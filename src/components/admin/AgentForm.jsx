'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AgentForm({ initialData, isEditing }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    title: initialData?.title || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    bio: initialData?.bio || '',
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Agent saved:', formData);
    router.push('/admin/agents');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border space-y-6 max-w-3xl">
      <h2 className="text-lg font-semibold">{isEditing ? 'Edit Agent' : 'Add New Agent'}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div><label>Name</label><input name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" /></div>
        <div><label>Title</label><input name="title" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" /></div>
        <div><label>Email</label><input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border rounded-lg" /></div>
        <div><label>Phone</label><input name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" /></div>
        <div className="col-span-2"><label>Bio</label><textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" className="w-full px-4 py-2 border rounded-lg" /></div>
      </div>
      <div className="flex justify-end gap-4">
        <button type="button" onClick={() => router.back()} className="px-6 py-2 border rounded-lg">Cancel</button>
        <button type="submit" className="px-6 py-2 bg-amber-500 text-white rounded-lg">Save</button>
      </div>
    </form>
  );
}