import type { Metadata } from "next";
import "./globals.css";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import Providers from "@/providers/query-client-providers";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { ToastProvider } from "@/components/ui/ToastProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})


export const metadata: Metadata = {
  title: "ConstructNest - Build Your Dream Home in Kerala",
  description: "ConstructNest provides affordable home construction services in Kerala. Get top-quality materials, skilled contractors, and everything needed to build your house at the best price.",
  keywords: "home construction Kerala, Kerala builders, building materials Kerala, house contractors Kerala, plumbing services Kerala, electrician services Kerala, buy bricks Kerala, affordable home building Kerala, house renovation Kerala",
  openGraph: {
    title: "ConstructNest - Your Home Construction Partner in Kerala",
    description: "Find top-quality building materials, hire skilled contractors, and get complete home construction services in Kerala.",
    url: "https://construct-nest-ng7c-two.vercel.app",
    siteName: "ConstructNest",
    images: [
      {
        url: "https://yvihkbfh9232cvoj.public.blob.vercel-storage.com/2025-03-19T21-01-39.498Z-HWlL5LwpUxmgcoUZaZD7dbE7idFVfT.jpeg",
        width: 1200,
        height: 630,
        alt: "ConstructNest Homepage",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@constructnest",
    title: "ConstructNest - Build Your Dream Home in Kerala",
    description: "One-stop home construction solutions in Kerala. Get building materials, expert contractors, and affordable services.",
    images: ["https://yvihkbfh9232cvoj.public.blob.vercel-storage.com/2025-03-19T21-01-39.498Z-HWlL5LwpUxmgcoUZaZD7dbE7idFVfT.jpeg"],
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}>
          <UserProvider>
          <Providers>
            <ToastProvider/>
          {children}
          </Providers>
          </UserProvider>
          </body>
    </html>
  );
}
