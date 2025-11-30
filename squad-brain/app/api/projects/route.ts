import { prisma } from "@/lib/prisma";

export async function POST(request: Request){
    const req = await request.json();
    await prisma.project.create({
        data: {
            name: req.name,
            description: req.description,
            creatorId: req.creatorId
        }
    });
    return Response.json({ message: 'Project Created', status: 201 });
}