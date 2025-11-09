"use client"

import { usePathname } from "next/navigation";
import MainHeader from "./main-header";

export default function ConditionalHeader() {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard");

    if (isDashboard) {
        return null;
    }

    return <MainHeader />;
}

