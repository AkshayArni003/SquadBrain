"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
export default function LoginNav() {
    const path = usePathname();
    return (
        <>
            {path === "/" ? <ul>
                <li>
                    <Link href="/login">Login</Link>
                </li>
            </ul> : <></>}
        </>
    )
}