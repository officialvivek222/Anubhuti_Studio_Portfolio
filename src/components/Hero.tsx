'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Parallax effect */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Hero Background"
                    fill
                    className="object-cover opacity-60 scale-105 animate-slow-zoom"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-dark/50 to-dark"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <p
                    className="text-primary tracking-[0.3em] text-sm md:text-base mb-4 animate-fade-in-up"
                    style={{ animationDelay: '0.2s' }}
                >
                    FINE ART & EDITORIAL
                </p>
                <h1
                    className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-light mb-6 leading-tight animate-fade-in-up"
                    style={{ animationDelay: '0.4s' }}
                >
                    Capturing the <br /> <span className="italic font-normal">Unspoken</span>
                </h1>
                <p
                    className="text-gray-300 text-sm md:text-lg max-w-lg mx-auto mb-10 font-light animate-fade-in-up"
                    style={{ animationDelay: '0.6s' }}
                >
                    Specializing in emotive portraits, breathtaking landscapes, and storytelling through the lens.
                </p>
                <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                    <Link href="#portfolio" className="inline-block group">
                        <span className="text-white text-xs uppercase tracking-widest border-b border-primary pb-1 group-hover:text-primary transition-colors">
                            View Work
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
