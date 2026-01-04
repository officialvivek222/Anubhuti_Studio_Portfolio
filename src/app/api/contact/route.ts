import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { name, email, subject, message } = await request.json();

        // 1. Get Admin Settings
        const settings = await prisma.settings.findFirst();
        const receiverEmail = settings?.receiverEmail || 'admin@example.com';
        const emailSubjectPrefix = settings?.emailSubjectPrefix || 'Contact Form: ';
        const emailEnabled = settings?.emailEnabled !== false; // Default true

        // 2. Save Message to Database
        await prisma.contactMessage.create({
            data: {
                name,
                email,
                subject,
                message,
                status: 'UNREAD',
            },
        });

        // 3. Send Email if Enabled
        if (emailEnabled) {
            const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                    user: "maddison53@ethereal.email",
                    pass: "jn7jnAPss4f63QBp6D",
                },
            });

            await transporter.sendMail({
                from: `"${name}" <${email}>`,
                to: receiverEmail,
                subject: `${emailSubjectPrefix}${subject}`,
                text: message,
                html: `<p><strong>Name:</strong> ${name}</p>
                       <p><strong>Email:</strong> ${email}</p>
                       <p><strong>Subject:</strong> ${subject}</p>
                       <p><strong>Message:</strong></p>
                       <p>${message}</p>`,
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error processing contact form:", error);
        return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
    }
}
