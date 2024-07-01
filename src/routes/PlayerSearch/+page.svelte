<script>
    import { writable } from 'svelte/store';
    import { onMount } from 'svelte';

    let searchQuery = '';
    let matchRecords = writable([]);
    let positionWinRates = writable([]);
    let mostPlayedChampions = writable([]);
    let highWinRatePlayers = writable([]);
    let isLoading = writable(true);

    async function fetchData() {
        try {
            await Promise.all([]);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            isLoading.set(false);
        }
    }

    async function fetchDataByNickname(nickname) {
        try {
            const [matchRecordsRes, positionWinRatesRes, mostPlayedChampionsRes, highWinRatePlayersRes] = await Promise.all([
                fetch(`../PlayerSearch/api/select/MatchRecord?nickname=${encodeURIComponent(nickname)}`),
                fetch(`./PlayerSearch/api/select/PositionWinRate?nickname=${encodeURIComponent(nickname)}`),
                fetch(`./PlayerSearch/api/select/MostPlayedChampion?nickname=${encodeURIComponent(nickname)}`),
                fetch(`./PlayerSearch/api/select/HighWinRatePlayer?nickname=${encodeURIComponent(nickname)}`)
            ]);

            const matchRecordsData = await matchRecordsRes.json();
            const positionWinRatesData = await positionWinRatesRes.json();
            const mostPlayedChampionsData = await mostPlayedChampionsRes.json();
            const highWinRatePlayersData = await highWinRatePlayersRes.json();

            matchRecords.set(matchRecordsData);
            positionWinRates.set(positionWinRatesData);
            mostPlayedChampions.set(mostPlayedChampionsData);
            highWinRatePlayers.set(highWinRatePlayersData);
        } catch (error) {
            console.error('Error fetching data by nickname:', error);
        }
    }

    onMount(fetchData);

    async function handleSearch() {
        console.log(`Searching for: ${searchQuery}`);
        await fetchDataByNickname(searchQuery);
    }
</script>

<div class="flex flex-col items-center h-[95vh] bg-gray-100">
    <div class="w-full bg-gray-600 p-4 flex justify-center items-center">
        <div class="flex gap-2">
            <input
                    class="w-[80vh] p-2 border rounded-lg shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    type="text"
                    bind:value={searchQuery}
                    placeholder="검색어를 입력하세요..."
            />
            <button
                    class="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                    on:click={handleSearch}
            >
                검색
            </button>
        </div>
    </div>

    {#if $isLoading}
        <p class="text-center mt-4 text-lg">Loading...</p>
    {:else}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 w-full p-4 mt-4">
            <!-- Position Win Rates -->
            <div class="bg-white p-4 rounded-lg shadow-md text-center">
                <h2 class="text-center font-bold mb-4 bg-gray-300 py-2 rounded text-lg p">포지션별 승률</h2>
                <div class="grid grid-cols-3 gap-2 font-bold  border-gray-300 text-xs ">
                    <div class="border-r border-gray-300">Position</div>
                    <div class="border-r border-gray-300">Win Rate</div>
                    <div class="border-r border-gray-300">Played</div>
                </div>
                {#each $positionWinRates as rate}
                    <div class="grid grid-cols-3 gap-2 py-2  border-gray-300 text-xs">
                        <div class="border-r border-gray-300">{rate.position}</div>
                        <div class="border-r border-gray-300">{rate.winRate}</div>
                        <div>{rate.played}</div>
                    </div>
                {/each}
            </div>

            <!-- Most Played Champions -->
            <div class="bg-white p-4 rounded-lg shadow-md text-center">
                <h2 class="text-center font-bold mb-4 bg-gray-300 py-2 rounded text-lg">모스트 챔피언</h2>
                <div class="grid grid-cols-4 gap-2 font-bold  border-gray-300 text-xs">
                    <div class="border-r border-gray-300">Champion</div>
                    <div class="border-r border-gray-300">KDA</div>
                    <div class="border-r border-gray-300">Position</div>
                    <div class="border-r border-gray-300">Win Rate</div>
                </div>
                {#each $mostPlayedChampions as champion}
                    <div class="grid grid-cols-4 gap-2 py-2  border-gray-300 text-xs">
                        <div class="border-r border-gray-300">{champion.champion}</div>
                        <div class="border-r border-gray-300">{champion.kda}</div>
                        <div class="border-r border-gray-300">{champion.position}</div>
                        <div class="border-r border-gray-300">{champion.winRate}</div>
                    </div>
                {/each}
            </div>

            <!-- High Win Rate Players -->
            <div class="bg-white p-4 rounded-lg shadow-md text-center">
                <h2 class="text-center font-bold mb-4 bg-gray-300 py-2 rounded text-lg">함께 했을 때 승률 높은 플레이어</h2>
                <div class="grid grid-cols-3 gap-2 font-bold  border-gray-300 text-xs">
                    <div class="border-r border-gray-300">Player</div>
                    <div class="border-r border-gray-300">Win Rate</div>
                    <div class="border-r border-gray-300">Played</div>
                </div>
                {#each $highWinRatePlayers as player}
                    <div class="grid grid-cols-3 gap-2 py-2  border-gray-300 text-xs">
                        <div class="border-r border-gray-300">{player.player}</div>
                        <div class="border-r border-gray-300">{player.winRate}</div>
                        <div class="border-r border-gray-300">{player.played}</div>
                    </div>
                {/each}
            </div>
        </div>

        <!-- Match Records -->
        <div class="w-full max-w-4xl mt-8 overflow-y-auto" style="max-height: 80vh;">
            {#each $matchRecords as record}
                <div class="p-4 m-2 rounded-lg shadow-md flex justify-between items-center {record.result === 'Win' ? 'bg-blue-200' : 'bg-pink-200'} text-xs">
                    <div class="flex-grow">
                        <p class="font-bold">{record.champion}</p>
                        <p>{record.kills} / {record.deaths} / {record.assists}</p>
                        <p>{record.result}</p>
                    </div>
                    <div class="flex border-r border-gray-300 pr-2">
                        <p>{record.position}</p>
                    </div>
                    <div class="text-right">
                        <p>{new Date(record.date).toLocaleDateString()}</p>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>
