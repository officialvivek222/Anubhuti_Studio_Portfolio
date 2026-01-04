import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const items = await prisma.portfolioItem.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching items' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { title, category, imageUrl } = body;

        const newItem = await prisma.portfolioItem.create({
            data: {
                title,
                category,
                imageUrl,
            },
        });
        return NextResponse.json(newItem);
    } catch (error) {
        return NextResponse.json({ error: 'Error creating item' }, { status: 500 });
    }
}
