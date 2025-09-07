'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useEffect } from 'react'

export default function HomePage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/login')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect to sign in
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Squad Brain</h1>
            </div>

            <div className="flex items-center gap-4">
              {session.user?.image
                //  && (
                //   <Image
                //     src={session.user.image}
                //     alt="Profile"
                //     width={32}
                //     height={32}
                //     className="rounded-full"
                //   />
                // )
              }

              <div className="text-right">
                <p className="text-sm font-medium">{session.user?.name}</p>
                <p className="text-xs text-gray-500">{session.user?.email}</p>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome to Squad Brain!</h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900">Session Information</h3>
            <div className="mt-2 space-y-1 text-sm text-blue-800">
              <p><strong>Name:</strong> {session.user?.name}</p>
              <p><strong>Email:</strong> {session.user?.email}</p>
              <p><strong>Provider:</strong> {session.provider}</p>
              <p><strong>User ID:</strong> {session.user?.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">🚀 Getting Started</h3>
              <p className="text-gray-600 text-sm">
                Your authentication is working! You can now build your team knowledge hub.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">🔐 Secure Access</h3>
              <p className="text-gray-600 text-sm">
                You're logged in via {session.provider}. Your session is secure and encrypted.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}