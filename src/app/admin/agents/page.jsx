'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import { mockAgents } from '@/lib/mockData';

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState(mockAgents);

  const handleDelete = (id) => {
    if (confirm('Delete this agent?')) {
      setAgents(agents.filter(a => a.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Agents</h1>
        <Link href="/admin/agents/new" className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl">
          <Plus className="w-4 h-4" /> Add Agent
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Agent</th>
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(a => (
              <tr key={a.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <OptimizedImage src={a.image} alt="" fill sizes="40px" />
                    </div>
                    <span className="font-medium">{a.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">{a.title}</td>
                <td className="px-6 py-4">{a.email}</td>
                <td className="px-6 py-4">{a.phone}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/agents/${a.id}/edit`} className="p-1 hover:bg-gray-200 rounded"><Edit className="w-4 h-4" /></Link>
                    <button onClick={() => handleDelete(a.id)} className="p-1 hover:bg-red-100 rounded text-red-600"><Trash2 className="w-4 h-4" /></button>
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