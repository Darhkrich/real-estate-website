'use client';
import Link from 'next/link';
import { Bell, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminHeader() {
  const { user } = useAuth();
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-6 flex items-center justify-between h-16">
        <Link href="/admin/dashboard" className="text-xl font-serif font-bold">
          Admin<span className="text-amber-600">Panel</span>
        </Link>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-amber-600" />
            </div>
            <span className="text-sm font-medium">{user?.name || 'Admin'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}