<script>
    export let recentMatch = [];

    const positionOrder = ['Top', 'Jungle', 'Mid', 'ADC', 'Support'];

    let winners = recentMatch.filter(player => player.winning === 1);
    let losers = recentMatch.filter(player => player.winning === 0);

    let purpleTeam = winners.filter(player => player.team_color === 'Purple');
    let redTeam = losers.filter(player => player.team_color === 'Red');

    if (purpleTeam.length === 0) {
        purpleTeam = losers.filter(player => player.team_color === 'Purple');
        redTeam = winners.filter(player => player.team_color === 'Red');
    }

    function sortByPosition(a, b) {
        return positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position);
    }

    purpleTeam.sort(sortByPosition);
    redTeam.sort(sortByPosition);
</script>

<div class="p-4 text-xs text-center dark:bg-gray-900">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class={`p-4 rounded-lg shadow-md ${purpleTeam[0]?.winning ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'}`}>
            <h2 class="text-center font-bold mb-4 bg-gray-200 dark:bg-gray-800">퍼플팀</h2>
            {#each purpleTeam as player}
                <div class={`grid grid-cols-3 gap-2 p-2 border-b ${purpleTeam[0]?.winning ? 'border-blue-200 dark:border-blue-800' : 'border-pink-200 dark:border-pink-800'}`}>
                    <div class="text-center">{player.nickname}</div>
                    <div class="text-center">{player.champion}</div>
                    <div class="text-center">{player.kills}/{player.deaths}/{player.assists}</div>
                </div>
            {/each}
        </div>
        <div class={`p-4 rounded-lg shadow-md ${redTeam[0]?.winning ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'}`}>
            <h2 class="text-center font-bold mb-4 bg-gray-200 dark:bg-gray-800">레드팀</h2>
            {#each redTeam as player}
                <div class={`grid grid-cols-3 gap-2 p-2 border-b ${redTeam[0]?.winning ? 'border-blue-200 dark:border-blue-800' : 'border-pink-200 dark:border-pink-800'}`}>
                    <div class="text-center">{player.nickname}</div>
                    <div class="text-center">{player.champion}</div>
                    <div class="text-center">{player.kills}/{player.deaths}/{player.assists}</div>
                </div>
            {/each}
        </div>
    </div>
</div>
