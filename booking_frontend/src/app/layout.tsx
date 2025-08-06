import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/lib/AuthContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SchedulePro",
  description: "Appointment booking and scheduling platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // The sidebar shows for admin pages, regular users get header and content.
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary min-h-screen`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Header />
          <div className="flex min-h-screen w-full pt-16">
            <Sidebar />
            <main className="flex-1 bg-white rounded-md shadow-sm p-6 max-w-full min-h-[calc(100vh-4rem)]">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
