import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        await prisma.project.create({
            data: {
                name: req.name,
                description: req.description,
                creatorId: req.creatorId
            }
        });
    } catch (error: any) {
        if (error.message.includes("Unique constraint failed")) {
            return NextResponse.json({ message: 'Project name must be unique' }, { status: 400 });
        }
        return NextResponse.json({ message: "Error Creating Project" }, { status: 500 });
    }
    return NextResponse.json({ message: 'Project Created', status: 201 });
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const creatorId = searchParams.get('creatorId');
    console.log('Fetching projects for creatorId:', creatorId);
    const where = creatorId ? { creatorId } : undefined;
    const projects = await prisma.project.findMany({
        where
    });
    return NextResponse.json(projects);
}