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
  title: "ConstructNest | Home Construction & Services in Kerala",
  description: "ConstructNest offers complete home construction services in Kerala, from building materials to skilled workers. Your one-stop home solutions provider.",
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
