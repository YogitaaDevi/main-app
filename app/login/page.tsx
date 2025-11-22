"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function LoginContent() {
  console.log("LoginContent: Rendering");
  const { login, authenticated, ready, user } = usePrivy();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect_to");

  useEffect(() => {
    console.log("LoginContent: Effect - ready=", ready, "authenticated=", authenticated, "redirectTo=", redirectTo);
    if (ready && authenticated && user) {
      console.log("LoginContent: User is authenticated, redirecting...");
      console.log("User info:", user);
      
      // Send user info to API to store in cookie
      fetch("/api/auth/login", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user })
      })
        .then(() => {
          const destination = redirectTo || "/dashboard";
          console.log("Redirecting to:", destination);
          // Use window.location for full page navigation to ensure redirect works
          window.location.href = destination;
        })
        .catch((err) => {
          console.error("LoginContent: Failed to set auth cookie", err);
        });
    }
  }, [ready, authenticated, user, redirectTo]);

  // Temporarily render content even if not ready, to debug UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-900">
      <div className="mb-4 text-red-500 font-bold bg-white p-2 rounded">
        Debug Status: Ready={String(ready)}, Auth={String(authenticated)}<br/>
        Redirect To: {redirectTo || "None"}
      </div>
      
      <div className="glass-panel p-8 rounded-2xl max-w-md w-full text-center space-y-6 border border-white/20">
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
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-white text-center pt-20">Loading Login...</div>}>
      <LoginContent />
    </Suspense>
  );
}
