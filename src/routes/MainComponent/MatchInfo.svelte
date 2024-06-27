<script>
    const players = [
        { nickname: 'Player1', name: '이름1', champion: '챔피언1', kda: '10/2/8', winning: 1 },
        { nickname: 'Player2', name: '이름2', champion: '챔피언2', kda: '5/1/12', winning: 1 },
        { nickname: 'Player3', name: '이름3', champion: '챔피언3', kda: '8/4/7', winning: 1 },
        { nickname: 'Player4', name: '이름4', champion: '챔피언4', kda: '3/2/15', winning: 1 },
        { nickname: 'Player5', name: '이름5', champion: '챔피언5', kda: '12/3/9', winning: 1 },
        { nickname: 'Player6', name: '이름6', champion: '챔피언6', kda: '2/10/4', winning: 0 },
        { nickname: 'Player7', name: '이름7', champion: '챔피언7', kda: '1/5/3', winning: 0 },
        { nickname: 'Player8', name: '이름8', champion: '챔피언8', kda: '4/8/6', winning: 0 },
        { nickname: 'Player9', name: '이름9', champion: '챔피언9', kda: '3/7/2', winning: 0 },
        { nickname: 'Player10', name: '이름10', champion: '챔피언10', kda: '5/9/1', winning: 0 }
    ];

    let winners = players.filter(player => player.winning === 1);
    let losers = players.filter(player => player.winning === 0);
</script>

<style>
    .purple-team {
        background-color: #e0f7fa;
    }

    .red-team {
        background-color: #fce4ec;
    }
</style>

<div class="p-4 text-xs text-center">
    <div class="grid grid-cols-2 gap-4">
        <div class="purple-team p-4 rounded">
            <h2 class="text-center font-bold mb-4">퍼플팀</h2>
            {#each winners as player}
                <div class="grid grid-cols-4 gap-2 p-2 border-b">
                    <div class="text-center">{player.nickname}</div>
                    <div class="text-center">{player.name}</div>
                    <div class="text-center">{player.champion}</div>
                    <div class="text-center">{player.kda}</div>
                </div>
            {/each}
        </div>
        <div class="red-team p-4 rounded">
            <h2 class="text-center font-bold mb-4">레드팀</h2>
            {#each losers as player}
                <div class="grid grid-cols-4 gap-2 p-2 border-b">
                    <div class="text-center">{player.nickname}</div>
                    <div class="text-center">{player.name}</div>
                    <div class="text-center">{player.champion}</div>
                    <div class="text-center">{player.kda}</div>
                </div>
            {/each}
        </div>
    </div>
</div>
