import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AegisMed | Healthcare By Ryan",
  description: "Optimized study platform for medical, pharmacy, and nursing students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {/* We removed the banner and wrapper from here */}
          {children}
        </Providers>
      </body>
    </html>
  );
}