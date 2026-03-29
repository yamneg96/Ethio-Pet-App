import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { AuthProvider } from "@/components/shared/AuthProvider";
import { Toaster } from "sonner";
import { getSession } from "@/lib/actions/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetSanctuary | Multi-Tenant Pet Marketplace",
  description: "Connect hearts and paws. A premium platform for pet adoption and breeder management.",
};

import { ThemeProvider } from "@/components/shared/ThemeProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-surface-container-lowest text-on-surface antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider initialUser={session}>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="grow pt-16">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster position="top-center" richColors />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
