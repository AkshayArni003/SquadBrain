import Link from "next/link";

export default function DashboardPage() {
    return (
        <div>
            <h1>
                Dashboard Page
            </h1>
            <ul>
                <li><Link href="/dashboard/pie-chart">Pie chart</Link></li>
                <li><Link href="/dashboard/line-chart">Line chart</Link></li>
                <li><Link href="/dashboard/bar-chart">Box chart</Link></li>
            </ul>
        </div>
    )
}