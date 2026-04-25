'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { api } from '@/lib/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api.post('/auth/login/', { email, password });
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-serif font-bold text-white">PRIME<span className="text-amber-400">ESTATE</span>.</Link>
          <h2 className="text-white/80 mt-2">Admin & Agent Portal</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border rounded-xl" />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-3 bg-gray-50 border rounded-xl pr-12" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-3 text-gray-400"><EyeOff className="w-5 h-5" /></button>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-amber-500 text-white py-3 rounded-xl font-medium disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? 'Signing in...' : <><LogIn className="w-4 h-4" /> Sign In</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}