'use client';
import { useState } from 'react';
import { mockInquiries } from '@/lib/mockData';
import { Mail, Phone, CheckCircle } from 'lucide-react';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState(mockInquiries);

  const markAsRead = (id) => {
    setInquiries(inquiries.map(i => i.id === id ? { ...i, status: 'read' } : i));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Inquiries</h1>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left">From</th>
              <th className="px-6 py-3 text-left">Subject</th>
              <th className="px-6 py-3 text-left">Property</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map(i => (
              <tr key={i.id} className={i.status === 'unread' ? 'bg-amber-50/30' : ''}>
                <td className="px-6 py-4">
                  <div className="font-medium">{i.name}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Mail className="w-3 h-3" /> {i.email}
                    {i.phone && <><Phone className="w-3 h-3 ml-2" /> {i.phone}</>}
                  </div>
                </td>
                <td>{i.subject}</td>
                <td>{i.property}</td>
                <td><span className={`px-2 py-1 text-xs rounded-full ${i.status === 'read' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{i.status}</span></td>
                <td>
                  <button onClick={() => markAsRead(i.id)} className="p-1 hover:bg-gray-100 rounded" title="Mark as read">
                    <CheckCircle className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}