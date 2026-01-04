'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface PortfolioItem {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
}

export default function PortfolioGrid() {
    const [items, setItems] = useState<PortfolioItem[]>([]);
    const [filter, setFilter] = useState('all');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        fetch('/api/portfolio')
            .then((res) => res.json())
            .then((data) => setItems(data));
    }, []);

    const filteredItems = filter === 'all'
        ? items
        : items.filter((item) => item.category === filter);

    const openLightbox = (url: string) => {
        setSelectedImage(url);
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <section id="portfolio" className="py-24 bg-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Selected Works</h2>
                    <div className="w-16 h-px bg-primary mx-auto"></div>
                </div>

                {/* Filters */}
                <div className="flex justify-center flex-wrap gap-4 mb-12">
                    {['all', 'portrait', 'landscape', 'urban'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`text-xs uppercase tracking-widest px-4 py-2 border transition-all ${filter === cat
                                    ? 'bg-white/5 text-white border-primary text-primary'
                                    : 'border-white/10 text-gray-400 hover:border-primary hover:text-primary'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Masonry Grid (Simplified to responsive grid for now) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="relative group cursor-pointer overflow-hidden aspect-[3/4]" // aspect ratio placeholder
                            onClick={() => openLightbox(item.imageUrl)}
                        >
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white border border-white/50 px-4 py-2 text-xs tracking-widest uppercase">
                                    View
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-6 right-6 text-white hover:text-primary transition-colors p-2"
                        onClick={closeLightbox}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div className="max-w-5xl max-h-[90vh] p-4 relative">
                        <Image
                            src={selectedImage}
                            alt="Full view"
                            width={1200}
                            height={800}
                            className="max-w-full max-h-[85vh] object-contain shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </section>
    );
}
