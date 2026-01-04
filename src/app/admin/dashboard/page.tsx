'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, LogOut } from 'lucide-react';
import Image from 'next/image';

interface PortfolioItem {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
}

export default function Dashboard() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [newItem, setNewItem] = useState({ title: '', category: 'portrait', imageUrl: '' });
    const router = useRouter();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch('/api/portfolio');
            const data = await res.json();
            setItems(data);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure?')) return;
        try {
            await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
            fetchItems();
        } catch (error) {
            alert('Failed to delete');
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/portfolio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem),
            });
            if (res.ok) {
                setNewItem({ title: '', category: 'portrait', imageUrl: '' });
                fetchItems();
            }
        } catch (error) {
            alert('Failed to add');
        }
    };

    const handleLogout = () => {
        // Ideally clear cookie via API, but for now just redirect
        document.cookie = 'admin_session=; Max-Age=0; path=/;';
        router.push('/admin');
    };

    if (loading) return <div className="text-white p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-dark text-white p-6">
            <div className="container mx-auto max-w-5xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif">Admin Dashboard</h1>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-white">
                        <LogOut size={20} /> Logout
                    </button>
                </div>

                {/* Add New Item Form */}
                <div className="bg-white/5 p-6 rounded-lg mb-8 border border-white/10">
                    <h2 className="text-xl font-serif mb-4 flex items-center gap-2">
                        <Plus size={20} /> Add New Item
                    </h2>
                    <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={newItem.title}
                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                            required
                            className="bg-dark border border-white/10 p-3 rounded"
                        />
                        <select
                            value={newItem.category}
                            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                            className="bg-dark border border-white/10 p-3 rounded"
                        >
                            <option value="portrait">Portrait</option>
                            <option value="landscape">Landscape</option>
                            <option value="urban">Urban</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={newItem.imageUrl}
                            onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                            required
                            className="bg-dark border border-white/10 p-3 rounded"
                        />
                        <button type="submit" className="bg-primary text-black font-bold p-3 rounded hover:bg-primary/90">
                            Add Item
                        </button>
                    </form>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded overflow-hidden">
                                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold">{item.title}</h3>
                                    <span className="text-sm text-gray-400 uppercase tracking-wider">{item.category}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="text-red-500 hover:text-red-400 p-2 hover:bg-white/5 rounded"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
