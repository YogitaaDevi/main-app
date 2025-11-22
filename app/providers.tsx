"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  console.log("Providers: Rendering with App ID:", process.env.NEXT_PUBLIC_PRIVY_APP_ID ? "DEFINED" : "MISSING");
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || "INSERT_PRIVY_APP_ID"}
      config={{
        loginMethods: ["email", "wallet"],
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
