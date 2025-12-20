import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardLayout from "@/components/dashboard/dashboard-layout";

export default async function DashboardPage() {
    const session = await auth();
    console.log("User Session:", session);
    if (!session) {
        redirect("/login");
    }
    return <DashboardLayout userSession={session} />
}