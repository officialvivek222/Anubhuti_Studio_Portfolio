'use client';

import { useState } from 'react';

export default function Contact() {
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
        };

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (res.ok) {
            setSuccess(true);
            form.reset();
        }
    };

    return (
        <section id="contact" className="py-24 bg-surface relative">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl text-white mb-4">Get in Touch</h2>
                    <p className="text-gray-400">Ready to create something beautiful? Let's discuss your project.</p>
                </div>

                {!success ? (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full bg-dark border border-white/10 p-4 text-white focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                                    placeholder="Name"
                                />
                                <label
                                    htmlFor="name"
                                    className="absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-surface peer-focus:px-1 pointer-events-none bg-surface -top-2.5 text-xs"
                                >
                                    Name
                                </label>
                            </div>
                            <div className="relative group">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full bg-dark border border-white/10 p-4 text-white focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                                    placeholder="Email"
                                />
                                <label
                                    htmlFor="email"
                                    className="absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-surface peer-focus:px-1 pointer-events-none bg-surface -top-2.5 text-xs"
                                >
                                    Email
                                </label>
                            </div>
                        </div>
                        <div className="relative group">
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="w-full bg-dark border border-white/10 p-4 text-white focus:outline-none focus:border-primary transition-colors peer placeholder-transparent"
                                placeholder="Subject"
                            />
                            <label
                                htmlFor="subject"
                                className="absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-surface peer-focus:px-1 pointer-events-none bg-surface -top-2.5 text-xs"
                            >
                                Subject
                            </label>
                        </div>
                        <div className="relative group">
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                required
                                className="w-full bg-dark border border-white/10 p-4 text-white focus:outline-none focus:border-primary transition-colors peer placeholder-transparent resize-none"
                                placeholder="Message"
                            ></textarea>
                            <label
                                htmlFor="message"
                                className="absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-primary peer-focus:bg-surface peer-focus:px-1 pointer-events-none bg-surface -top-2.5 text-xs"
                            >
                                Message
                            </label>
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="px-10 py-4 bg-white text-black hover:bg-primary hover:text-white transition-all duration-300 uppercase tracking-widest text-xs font-semibold"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center py-12 animate-fade-in-up">
                        <div className="text-primary text-5xl mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <h3 className="text-2xl font-serif text-white mb-2">Message Sent</h3>
                        <p className="text-gray-400">Thank you for reaching out. I will get back to you shortly.</p>
                    </div>
                )}
            </div>
        </section >
    );
}
