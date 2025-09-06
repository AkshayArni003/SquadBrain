import { notFound } from "next/navigation";


interface DashboardParams {
    params: Promise<{
        slug: string
    }>
}

export default async function DashboardSubPages({ params }: DashboardParams) {
    const { slug } = await params
    console.log(slug)
    const mainPath = slug[0];
    let component = <h1>{`${mainPath} component displayed`}</h1>
    if (slug.includes("name") && !slug.includes("city")) {
        component = <h1>{`${slug[1]} component displayed`}</h1>
    }
    if (slug.includes("name") && slug.includes("city")) {
        component = <h1>{`${slug[2]} component displayed`}</h1>
    }
    if (!slug.includes("name")) {
        notFound();
    }
    return (
        component
    )
}