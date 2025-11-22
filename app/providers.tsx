"use client";

import dynamic from "next/dynamic";

const PrivyClientProvider = dynamic(
  () => import("./providers/PrivyClientProvider"),
  { ssr: false }
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyClientProvider>
      {children}
    </PrivyClientProvider>
  );
}
