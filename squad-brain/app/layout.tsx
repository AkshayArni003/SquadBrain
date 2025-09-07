import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "@/components/providers/session-provider";


export const metadata: Metadata = {
  title: "Squad Brain",
  description: "Real-time team knowledge hub + RAG + collaborative RFCs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
