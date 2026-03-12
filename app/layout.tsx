import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ChediiAI — AI-Powered Crop Intelligence",
  description:
    "Detect crop diseases early, get AI-powered treatment recommendations, and protect your harvest with ChediiAI.",
  keywords: ["crop disease", "AI", "agriculture", "plant health", "farming"],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}


