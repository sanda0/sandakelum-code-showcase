"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Check if the path is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          Sandakelum<span className="text-purple-400">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>Home</Link>
          <Link href="/projects" className={`nav-link ${isActive("/projects") ? "active" : ""}`}>Projects</Link>
          <Link href="/articles" className={`nav-link ${isActive("/articles") ? "active" : ""}`}>Articles</Link>
          <Link href="/youtube" className={`nav-link ${isActive("/youtube") ? "active" : ""}`}>YouTube</Link>
          <Link href="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>About</Link>
          <Link href="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>Contact</Link>
        </div>

        {/* Mobile Navigation Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-white/10 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>Home</Link>
            <Link href="/projects" className={`nav-link ${isActive("/projects") ? "active" : ""}`}>Projects</Link>
            <Link href="/articles" className={`nav-link ${isActive("/articles") ? "active" : ""}`}>Articles</Link>
            <Link href="/youtube" className={`nav-link ${isActive("/youtube") ? "active" : ""}`}>YouTube</Link>
            <Link href="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`}>About</Link>
            <Link href="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
