import type { Metadata } from "next";
import "../globals.css";
import NextAuthProvider from "@/components/providers/session-provider";
import MainHeader from "@/components/headers/main-header";


export const metadata: Metadata = {
    title: "Squad Brain",
    description: "Real-time team knowledge hub + RAG + collaborative RFCs",
};

export default function AuthRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <MainHeader />
                {children}
            </body>
        </html>
    );
}
