"use client";

import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Navbar() {
  const { authenticated, logout } = usePrivy();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check both Privy auth state AND cookie
  useEffect(() => {
    const checkAuthStatus = () => {
      const hasCookie = Cookies.get('auth_status') === 'logged_in';
      setIsLoggedIn(authenticated && hasCookie);
    };

    checkAuthStatus();

    // Re-check when page becomes visible or focused
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAuthStatus();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', checkAuthStatus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', checkAuthStatus);
    };
  }, [authenticated, pathname]);

  const handleLogout = async () => {
    // Logout from Privy
    await logout();
    
    // Clear server-side cookies
    await fetch("/api/auth/logout", { method: "POST" });
    
    // Clear localStorage (removes Privy refresh token)
    localStorage.clear();
    
    // Redirect to login
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold font-heading text-gradient">
              MicroZones
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link 
                  href="/" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/") ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Home
                </Link>
                <Link 
                  href="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive("/dashboard") ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Dashboard
                </Link>
                {/* Use <a> for Blog to force server-side rewrite handling */}
                <a 
                  href="/blog" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname.startsWith("/blog") ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Blog
                </a>
              </div>
            </div>
          </div>
          <div>
            {authenticated && isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="btn-secondary text-sm"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="btn-primary text-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
