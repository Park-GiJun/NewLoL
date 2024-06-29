import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma.js';

function replacer(key, value) {
    if (typeof value === 'bigint') {
        return value.toString();
    }
    return value;
}

export async function GET() {
    try {
        const data = await prisma.$queryRaw`
            SELECT g.summoner_name                                                              AS summonerName
                 , g.nickname                                                                   AS nickname
                 , (SELECT champion
                    FROM game_data gd
                    WHERE gd.summoner_name = g.summoner_name
                    GROUP BY gd.champion
                    ORDER BY COUNT(*) DESC
                    LIMIT 1)                                                                    AS mostChampion
                 , (SELECT COUNT(*) FROM game_data gd WHERE gd.summoner_name = g.summoner_name) AS playedGames
                 , ROUND(SUM(CASE WHEN g.winning = 1 THEN 1 ELSE 0 END) / COUNT(*) * 100, 2)    AS winningPercentage
                 , ROUND((SUM(g.kills) + SUM(g.assists)) / GREATEST(SUM(g.deaths), 1), 2)       AS kda
            FROM game_data g
            GROUP BY g.summoner_name, g.nickname
            ORDER BY winningPercentage DESC, playedGames DESC, kda desc
        `;

        const jsonData = JSON.stringify(data, replacer);

        return json(JSON.parse(jsonData));
    } catch (error) {
        console.error('Error fetching data:', error);
        return json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
