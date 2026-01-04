'use client';

import { useState, useEffect } from 'react';

export default function Settings() {
    const [receiverEmail, setReceiverEmail] = useState('');
    const [emailSubjectPrefix, setEmailSubjectPrefix] = useState('Contact Form: ');
    const [emailEnabled, setEmailEnabled] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/admin/settings')
            .then((res) => res.json())
            .then((data) => {
                if (data.receiverEmail) setReceiverEmail(data.receiverEmail);
                if (data.emailSubjectPrefix) setEmailSubjectPrefix(data.emailSubjectPrefix);
                if (data.emailEnabled !== undefined) setEmailEnabled(data.emailEnabled);
                setIsLoading(false);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        const res = await fetch('/api/admin/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ receiverEmail, emailSubjectPrefix, emailEnabled }),
        });

        if (res.ok) {
            setMessage('Settings updated successfully!');
        } else {
            setMessage('Failed to update settings.');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-serif text-white mb-8">Settings</h1>
            <div className="bg-white/5 p-6 rounded-lg max-w-md">
                <h2 className="text-xl text-white mb-4">Contact Form Configuration</h2>
                {message && (
                    <div className={`p-3 mb-4 rounded ${message.includes('success') ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                        {message}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-400 mb-2">Receiver Email</label>
                        <input
                            type="email"
                            value={receiverEmail}
                            onChange={(e) => setReceiverEmail(e.target.value)}
                            className="w-full bg-dark border border-white/10 p-3 text-white focus:outline-none focus:border-primary rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Email Subject Prefix</label>
                        <input
                            type="text"
                            value={emailSubjectPrefix}
                            onChange={(e) => setEmailSubjectPrefix(e.target.value)}
                            className="w-full bg-dark border border-white/10 p-3 text-white focus:outline-none focus:border-primary rounded"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="emailEnabled"
                            checked={emailEnabled}
                            onChange={(e) => setEmailEnabled(e.target.checked)}
                            className="w-4 h-4"
                        />
                        <label htmlFor="emailEnabled" className="text-gray-400">Enable Email Notifications</label>
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/80 transition-colors"
                    >
                        Save Settings
                    </button>
                </form>
            </div>
        </div>
    );
}
