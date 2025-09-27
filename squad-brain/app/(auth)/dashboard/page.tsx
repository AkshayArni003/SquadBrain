import LogoutButton from "@/components/logout-button/logout-button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation";
import Image from "next/image";


export default async function DashboardPage() {
    const session = await auth();
    if (!session) {
        redirect("/login");
    }
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            image: true
        }
    })
    return (
        <div>
            <h1>
                Dashboard Page
            </h1>
            <LogoutButton />
            <ul>
                {users.map((user, id) => (
                    <div>
                        {user.image && <Image src={user.image} width={48} height={48} alt="Image" />}
                        <li key={id}>{user.name} {user.email}</li>
                    </div>
                ))}
            </ul>
        </div>
    )
}