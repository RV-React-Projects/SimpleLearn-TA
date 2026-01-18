'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-gray-900/80 backdrop-blur-md border-gray-800 shadow-lg" : "bg-transparent"
      )}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 transition-all duration-300">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {/* Simplilearn Logo Text - Using Image in real app, text for now matching design */}
            <span className="text-2xl font-bold text-white tracking-tight">
              simpli<span className="text-blue-500">learn</span>
            </span>
          </Link>

          {/* Navigation (optional - can be expanded) */}
          <nav className="hidden md:flex items-center space-x-6">
             {/* Future nav items */}
          </nav>
        </div>
      </div>
    </header>
  );
}
