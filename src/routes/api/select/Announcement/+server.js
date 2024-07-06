import { PrismaClient } from '@prisma/client';
import { formatISO, addHours } from 'date-fns';

const prisma = new PrismaClient();

export async function GET() {
    const now = new Date();

    const koreaNow = addHours(now, 9);

    const announcements = await prisma.announcements.findMany({
        where: {
            expiredDate: {
                gte: koreaNow
            }
        },
        orderBy: {
            createDate: 'desc'
        },
        take: 1
    });

    return new Response(JSON.stringify(announcements), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
