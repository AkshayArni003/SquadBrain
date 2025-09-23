"use client"

import { logout } from "@/actions/auth"
export default function LogoutButton() {
    return (
        <button onClick={() => {
            logout()
        }} className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 bg-amber-50 cursor-pointer">Logout</button>
    )
}
