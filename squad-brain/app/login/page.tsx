import MainHeader from "@/components/headers/main-header";
import OAuthButton from "@/components/OAuth-buttons/oauth-button";


export default function LoginPage() {
    return (
        <>
            <MainHeader />
            <div className="min-h-screen flex flex-col justify-center items-center px-4">
                <div className="text-center mb-8">
                    <p className="text-lg font-semibold mb-2">Your Real-time team knowledge hub</p>
                    <p className="text-gray-600">Log in to your Squad Brain account</p>
                </div>

                <div className="flex flex-col gap-4 w-full max-w-sm">
                    <OAuthButton provider="google" logo="/images/google.jpg">Continue with Google</OAuthButton>
                    <OAuthButton provider="github" logo="/images/github.png">Continue with GitHub</OAuthButton>
                </div>
            </div>
        </>
    )
}