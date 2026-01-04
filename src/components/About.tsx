'use client';

import Image from 'next/image';

export default function About() {
    return (
        <section id="about" className="py-24 bg-surface relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
                    <div className="w-full md:w-1/2">
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-full h-full border border-primary/30 z-0"></div>
                            <Image
                                src="https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=800&q=80"
                                alt="Photographer"
                                width={800}
                                height={600}
                                className="relative z-10 w-full grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="font-serif text-4xl text-white mb-6">Behind the Lens</h2>
                        <div className="w-12 h-px bg-primary mb-8"></div>
                        <p className="text-gray-400 mb-6 leading-relaxed font-light">
                            Photography is more than just clicking a shutter; it's about freezing a moment in time that
                            tells a story. With over 10 years of experience, I strive to find the extraordinary in the
                            ordinary.
                        </p>
                        <p className="text-gray-400 mb-8 leading-relaxed font-light">
                            My work has been featured in various international galleries and publications. I believe in
                            natural light, genuine emotions, and the raw beauty of the world around us.
                        </p>

                        <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
                            <div>
                                <span className="block text-3xl font-serif text-white mb-1">10+</span>
                                <span className="text-xs uppercase tracking-widest text-gray-500">Years Exp.</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-serif text-white mb-1">500+</span>
                                <span className="text-xs uppercase tracking-widest text-gray-500">Projects</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-serif text-white mb-1">15</span>
                                <span className="text-xs uppercase tracking-widest text-gray-500">Awards</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
