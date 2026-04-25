'use client';
import { Home, Users, Mail, Eye, DollarSign } from 'lucide-react';
import { mockStats } from '@/lib/mockData';
import { useAuth } from '@/context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const stats = mockStats;

  const statCards = [
    { label: 'Total Properties', value: stats.properties, icon: Home, color: 'bg-blue-50 text-blue-600' },
    { label: 'Total Views', value: stats.views, icon: Eye, color: 'bg-green-50 text-green-600' },
    { label: 'Inquiries', value: stats.inquiries, icon: Mail, color: 'bg-purple-50 text-purple-600' },
    ...(user?.role === 'admin' ? [{ label: 'Agents', value: stats.agents, icon: Users, color: 'bg-amber-50 text-amber-600' }] : []),
    { label: 'Portfolio Value', value: `$${stats.portfolio_value.toLocaleString()}`, icon: DollarSign, color: 'bg-emerald-50 text-emerald-600' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => (
          <div key={s.label} className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-2xl font-bold">{s.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}