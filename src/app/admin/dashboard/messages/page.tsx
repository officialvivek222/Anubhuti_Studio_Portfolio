'use client';

import { useState, useEffect } from 'react';

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    submittedAt: string;
    status: string;
}

export default function Messages() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = () => {
        fetch('/api/admin/messages')
            .then((res) => res.json())
            .then((data) => {
                setMessages(data);
                setIsLoading(false);
            });
    };

    const deleteMessage = async (id: number) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        const res = await fetch(`/api/admin/messages/${id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            setMessages(messages.filter((msg) => msg.id !== id));
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-serif text-white mb-8">Messages</h1>
            <div className="bg-white/5 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-gray-400">
                        <thead className="bg-black/20 text-white uppercase text-xs">
                            <tr>
                                <th className="p-4">Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Name</th>
                                <th className="p-4">Subject</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                            {messages.map((msg) => (
                                <tr key={msg.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-sm">{new Date(msg.submittedAt).toLocaleDateString()}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs rounded ${msg.status === 'UNREAD' ? 'bg-primary/20 text-primary' : 'bg-gray-700 text-gray-300'}`}>
                                            {msg.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-white">{msg.name}</div>
                                        <div className="text-xs">{msg.email}</div>
                                    </td>
                                    <td className="p-4">{msg.subject}</td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => deleteMessage(msg.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {messages.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-gray-500">
                                        No messages found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
