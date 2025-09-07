"use client"

import Image from "next/image";
import { signIn } from "next-auth/react";


interface OAuthParams {
    provider: "google" | "github"
    logo: string,
    children: string
}

export default function OAuthButton({ provider, logo, children }: OAuthParams) {
    const handleSignIn = () => {
        signIn(provider, {
            callbackUrl: '/'
        })
    }
    return (
        <button onClick={handleSignIn} className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 bg-amber-50 cursor-pointer">
            <Image
                src={logo}
                alt="Logo"
                width={20}
                height={20}
            />
            <span className="text-black">{children}</span>
        </button>
    )
}