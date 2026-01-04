'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black py-12 border-t border-white/10">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                    <Link href="/" className="text-2xl font-serif font-bold text-white tracking-wider">
                        LUMINA.
                    </Link>
                </div>
                <div className="flex space-x-6 mb-6 md:mb-0">
                    <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                        Instagram
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                        Twitter
                    </Link>
                    <Link href="#" className="text-gray-400 hover:text-primary transition-colors">
                        Behance
                    </Link>
                </div>
                <div className="text-gray-600 text-sm">
                    &copy; {new Date().getFullYear()} Lumina Photography. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
