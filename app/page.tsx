import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-3xl space-y-8 mt-24">
        <h1 className="text-6xl md:text-7xl font-bold font-heading text-gradient tracking-tight">
          Next.js Zones
          <br />
          <span className="text-white">Micro-Frontend</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          A seamless integration of multiple Next.js applications using Zones.
          Experience unified authentication and shared UI components across different domains.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link href="/login" className="btn-primary text-lg">
            Get Started
          </Link>
          <Link href="/blog" className="btn-secondary text-lg">
            View Blog
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 text-left">
          <div className="glass-panel p-6 rounded-2xl">
            <div className="h-12 w-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Unified Auth</h3>
            <p className="text-gray-400 text-sm">Single sign-on experience across all zones using Privy authentication.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl">
            <div className="h-12 w-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Micro-Frontends</h3>
            <p className="text-gray-400 text-sm">Independent deployments for Main App and Blog App using Next.js Zones.</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl">
            <div className="h-12 w-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4 text-pink-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Shared Design</h3>
            <p className="text-gray-400 text-sm">Consistent UI/UX with shared Tailwind configuration and global styles.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
