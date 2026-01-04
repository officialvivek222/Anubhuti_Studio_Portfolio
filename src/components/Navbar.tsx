'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-dark/90 backdrop-blur-md shadow-lg py-4' : 'py-6 bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-serif font-bold text-white tracking-wider">
                    ANUBHUTI STUDIO
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center">
                    <Link href="#home" className="text-sm uppercase tracking-widest text-gray-300 hover:text-primary transition-colors duration-300">
                        Home
                    </Link>
                    <Link href="#portfolio" className="text-sm uppercase tracking-widest text-gray-300 hover:text-primary transition-colors duration-300">
                        Portfolio
                    </Link>
                    <Link href="#about" className="text-sm uppercase tracking-widest text-gray-300 hover:text-primary transition-colors duration-300">
                        About
                    </Link>
                    <Link
                        href="#contact"
                        className="px-6 py-2 border border-white/20 text-white hover:bg-primary hover:border-primary hover:text-black transition-all duration-300 text-sm uppercase tracking-widest"
                    >
                        Contact
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-dark transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    } transition-transform duration-300 flex flex-col justify-center items-center md:hidden z-40`}
            >
                <button
                    className="absolute top-6 right-6 text-white"
                    onClick={() => setIsOpen(false)}
                >
                    <X size={32} />
                </button>
                <div className="flex flex-col space-y-8 text-center">
                    <Link href="#home" className="text-2xl font-serif text-white hover:text-primary" onClick={() => setIsOpen(false)}>
                        Home
                    </Link>
                    <Link href="#portfolio" className="text-2xl font-serif text-white hover:text-primary" onClick={() => setIsOpen(false)}>
                        Portfolio
                    </Link>
                    <Link href="#about" className="text-2xl font-serif text-white hover:text-primary" onClick={() => setIsOpen(false)}>
                        About
                    </Link>
                    <Link href="#contact" className="text-2xl font-serif text-white hover:text-primary" onClick={() => setIsOpen(false)}>
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
}
