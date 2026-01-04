import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: {
                submittedAt: 'desc',
            },
            take: 100, // Limit to 100 for now
        });
        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }
}
