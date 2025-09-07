import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            // Persist the OAuth access_token and provider to the token right after signin
            if (account) {
                token.accessToken = account.access_token || ""
                token.provider = account.provider
            }
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            // Send properties to the client
            if (token) {
                session.user.id = token.id as string
                session.accessToken = token.accessToken as string
                session.provider = token.provider as string
            }
            return session
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.NEXTAUTH_SECRET,
}