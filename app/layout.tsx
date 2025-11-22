import type { Metadata } from "next";
import { inter, outfit } from "./fonts";
import "./globals.css";
import Providers from "./providers";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "MicroZones App",
  description: "Next.js Zones Micro-Frontend Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("RootLayout: Rendering");
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
