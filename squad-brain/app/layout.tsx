import type { Metadata } from "next";
import "./globals.css";


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
        {children}
      </body>
    </html>
  );
}
