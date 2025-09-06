import Image from "next/image";


interface OAuthParams {
    logo: string,
    children: string
}

export default function OAuthButton({ logo, children }: OAuthParams) {
    return (
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 bg-amber-50 cursor-pointer">
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