'use client';
import { useState } from 'react';

export default function SettingsPage() {
  const [formData, setFormData] = useState({ name: 'Admin User', email: 'admin@primeestate.com' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved (mock)');
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
        </div>
        <button type="submit" className="px-6 py-2 bg-amber-500 text-white rounded-lg">Save Changes</button>
      </form>
    </div>
  );
}