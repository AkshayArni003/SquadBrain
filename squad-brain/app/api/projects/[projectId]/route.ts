import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(request: NextRequest, { params }: { params: { projectId: string } }) {
    const {projectId} = await params;
    if (projectId) {
        await prisma.project.delete({
            where: {
                id: projectId
            }
        });
        return NextResponse.json({ message: 'Project Deleted', status: 200 });
    } else {
        return NextResponse.json({ message: 'Project ID not provided', status: 400 });
    }
}