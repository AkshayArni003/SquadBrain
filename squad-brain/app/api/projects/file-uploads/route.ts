import path from "path";
import fs from "fs/promises";

import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import publishToStream from "./stream";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const currentDir = process.cwd();
        const parentDir = path.resolve(currentDir, '..');
        const projectId = formData.get("projectId") as string;
        const fileNames = [];
        if (!formData) {
            return NextResponse.json(
                { error: "No form data found" },
                { status: 400 }
            );
        }
        for (const file of formData.getAll("file")) {
            const f = file as File;
            const bytes = await f.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const uploadDir = path.join(parentDir, "uploads");
            await fs.mkdir(uploadDir, { recursive: true });
            const filePath = path.join(uploadDir, f.name);
            const fileType = path.extname(f.name).split('.').pop() || '';
            fileNames.push({ fileName: f.name, fileSize: f.size, fileType: fileType, filePath: filePath, projectId: projectId });
            await fs.writeFile(filePath, buffer);
        }
        await prisma.documents.createMany({
            data: fileNames,
        });
        //Publish to stream
        //Future update with different stream names or queue names based on user or organization
        const streamConfig = { streamName: "file_ingest" }
        const streamMessage = { id: "", files: fileNames }
        publishToStream(streamConfig, streamMessage);
        return NextResponse.json(
            { message: "File(s) uploaded successfully" },
            { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error uploading file(s)" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const projectId = searchParams.get("projectId");
        if (!projectId) {
            return NextResponse.json(
                { error: "Project ID is required" },
                { status: 400 }
            );
        }
        const files = await prisma.documents.findMany({
            where: {
                projectId: projectId
            }
        });
        return NextResponse.json(files, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching files" }, { status: 500 });
    }
}