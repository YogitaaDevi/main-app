"use client";

import { useEffect, useState } from "react";

interface UserInfo {
  id: string;
  email: string | null;
  wallet: string | null;
  createdAt: string;
}

export default function DashboardPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user info from cookie
    fetch("/api/auth/user")
      .then((res) => res.json())
      .then((data) => {
        setUserInfo(data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch user info:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold font-heading text-white mb-8">
          Dashboard
        </h1>

        {loading ? (
          <div className="glass-panel p-8 rounded-2xl">
            <p className="text-gray-400">Loading user info...</p>
          </div>
        ) : userInfo ? (
          <div className="glass-panel p-8 rounded-2xl mb-6">
            <h2 className="text-2xl font-bold text-white mb-4">User Information</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-400">User ID:</span>
                <p className="text-white font-mono text-sm">{userInfo.id}</p>
              </div>
              {userInfo.email && (
                <div>
                  <span className="text-gray-400">Email:</span>
                  <p className="text-white">{userInfo.email}</p>
                </div>
              )}
              {userInfo.wallet && (
                <div>
                  <span className="text-gray-400">Wallet:</span>
                  <p className="text-white font-mono text-sm">{userInfo.wallet}</p>
                </div>
              )}
              <div>
                <span className="text-gray-400">Member Since:</span>
                <p className="text-white">{new Date(userInfo.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel p-8 rounded-2xl mb-6">
            <p className="text-gray-400">No user information available</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Recent Activity</h3>
            <p className="text-gray-400">No recent activity</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Quick Stats</h3>
            <p className="text-gray-400">Stats coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}
