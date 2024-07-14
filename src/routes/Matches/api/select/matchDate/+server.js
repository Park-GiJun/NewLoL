import {json} from '@sveltejs/kit';
import prisma from '$lib/prisma.js';

export async function GET() {
    const results = await prisma.$queryRaw`
        SELECT game_data.date
        from game_data
        group by game_data.date
        ORDER BY game_data.date desc;
    `;
    return json(results);
}
