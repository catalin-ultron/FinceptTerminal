import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fincept Terminal — Financial Intelligence for Professionals",
  description: "A unified investment explorer powered by AI. Global markets, financial analysis, and proprietary data in one terminal.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
