import type { Metadata } from "next";
import { DemoProvider } from "@/context/DemoContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jabar Export Hub | Premium B2B SME Export Directory",
  description: "Platform direktori B2B premium yang menghubungkan buyer internasional dengan UMKM produsen komoditas unggulan Jawa Barat (Kopi, Teh, Kriya, Tekstil).",
  keywords: ["export", "indonesia", "west java", "sme", "umkm", "coffee", "tea", "craft", "textile", "b2b", "directory"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col transition-colors duration-300">
        <DemoProvider>
          {children}
        </DemoProvider>
      </body>
    </html>
  );
}
