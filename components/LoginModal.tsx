"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginModal() {
  const { login, authenticated, ready, user } = usePrivy();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  // Check if hash is #login
  useEffect(() => {
    const checkHash = () => {
      setIsOpen(window.location.hash === "#login");
    };

    // Check on mount
    checkHash();

    // Listen for hash changes
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  // Handle authentication
  useEffect(() => {
    if (ready && authenticated && user && isOpen) {
      console.log("User authenticated, setting cookie...");
      
      // Send user info to API to store in cookie
      fetch("/api/auth/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user })
      })
        .then(() => {
          console.log("Cookie set, closing modal and redirecting");
          
          // Get the current path (where user was trying to go)
          const currentPath = window.location.pathname;
          const redirectTo = searchParams.get("redirect_to");
          
          // Close modal
          window.location.hash = "";
          
          if (redirectTo) {
            // If redirected from middleware, go to original destination
            window.location.href = redirectTo;
          } else {
            // Stay on current page (reload to update auth state)
            window.location.reload();
          }
        })
        .catch((err) => {
          console.error("Failed to set auth cookie", err);
        });
    }
  }, [ready, authenticated, user, isOpen]);

  const closeModal = () => {
    const redirectTo = searchParams.get("redirect_to");
    
    // Remove the hash
    window.location.hash = "";
    
    // If there's a redirect_to param, we need to clean up the URL
    // Instead of going to the protected route (which will trigger middleware again),
    // just stay on the current page but remove the redirect_to param
    if (redirectTo) {
      // Remove the redirect_to query param from URL
      const url = new URL(window.location.href);
      url.searchParams.delete("redirect_to");
      window.history.replaceState({}, '', url.pathname + url.search);
    }
  };

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={closeModal}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="glass-panel p-8 rounded-2xl max-w-md w-full text-center space-y-6 border border-white/20 pointer-events-auto animate-in fade-in zoom-in duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="h-16 w-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto text-indigo-400">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to access your dashboard.</p>
          </div>

          <button
            onClick={login}
            disabled={!ready}
            className="w-full btn-primary py-3 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>{ready ? "Sign In with Privy" : "Loading Privy..."}</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
