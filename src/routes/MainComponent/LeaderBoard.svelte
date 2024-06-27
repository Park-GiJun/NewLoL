<script>
    import {flip} from 'svelte/animate';
    import {writable} from 'svelte/store';

    const rows = writable([
        { id: 1, playedGames: 100, nickname: 'Player1', summonerName: '이름1', mostChampion: '챔피언1', winningPercentage: '60%', kda: '3.5' },
        { id: 2, playedGames: 200, nickname: 'Player2', summonerName: '이름2', mostChampion: '챔피언2', winningPercentage: '55%', kda: '4.2' },
        { id: 3, playedGames: 150, nickname: 'Player3', summonerName: '이름3', mostChampion: '챔피언3', winningPercentage: '70%', kda: '2.8' },
        { id: 4, playedGames: 50, nickname: 'Player4', summonerName: '이름4', mostChampion: '챔피언4', winningPercentage: '45%', kda: '3.1' },
        { id: 5, playedGames: 120, nickname: 'Player5', summonerName: '이름5', mostChampion: '챔피언5', winningPercentage: '65%', kda: '3.9' }
    ]);

    let currentSort = 'playedGames';
    let isAscending = true;

    function sortTable(sortKey) {
        if (currentSort === sortKey) {
            isAscending = !isAscending;
        } else {
            isAscending = true;
        }
        currentSort = sortKey;

        rows.update(currentRows => {
            return [...currentRows].sort((a, b) => {
                let valueA = a[sortKey];
                let valueB = b[sortKey];

                if (sortKey === 'winningPercentage') {
                    valueA = parseFloat(valueA);
                    valueB = parseFloat(valueB);
                }

                if (!isNaN(valueA) && !isNaN(valueB)) {
                    return isAscending ? valueA - valueB : valueB - valueA;
                }

                valueA = valueA?.toString().toLowerCase() ?? "";
                valueB = valueB?.toString().toLowerCase() ?? "";
                if (valueA < valueB) return isAscending ? -1 : 1;
                if (valueA > valueB) return isAscending ? 1 : -1;

                return 0;
            });
        });
    }
</script>

<div class="overflow-x-auto overflow-y-auto max-h-96 text-center" role="table">
    <div class="grid grid-cols-6 gap-4 bg-gray-50 p-4 font-medium text-gray-500 uppercase cursor-pointer" role="row">
        <div on:click={() => sortTable('playedGames')} role="columnheader">Played Game</div>
        <div on:click={() => sortTable('nickname')} role="columnheader">Nickname</div>
        <div on:click={() => sortTable('summonerName')} role="columnheader">Name</div>
        <div on:click={() => sortTable('mostChampion')} role="columnheader">Most Champion</div>
        <div on:click={() => sortTable('winningPercentage')} role="columnheader">Winning Percentage</div>
        <div on:click={() => sortTable('kda')} role="columnheader">KDA</div>
    </div>
    {#each $rows as row (row.id)}
        <div class="grid grid-cols-6 gap-4 p-4 border-b" role="row" animate:flip={{ duration: 200 }}>
            <div class="text-sm text-gray-500" role="cell">{row.playedGames}</div>
            <div class="text-sm text-blue-500" role="cell"><a href="https://www.op.gg/summoners/kr/{row.nickname}" target="_blank" />{row.nickname}</div>
            <div class="text-sm text-gray-500" role="cell">{row.summonerName}</div>
            <div class="text-sm text-gray-500" role="cell">{row.mostChampion}</div>
            <div class="text-sm text-gray-500" role="cell">{row.winningPercentage}</div>
            <div class="text-sm text-gray-500" role="cell">{row.kda}</div>
        </div>
    {/each}
</div>
