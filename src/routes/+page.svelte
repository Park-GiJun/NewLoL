<script>
    import Card from './MainComponent/Card.svelte';
    import MatchInfo from "./MainComponent/MatchInfo.svelte";
    import LeaderBoard from "./MainComponent/LeaderBoard.svelte";
    import {onMount} from "svelte";
    import {writable, get} from 'svelte/store';

    let cards = [];
    let recentMatch = [];
    let leaderBoardData = writable([]);
    let isLoading = true;

    onMount(async () => {
        try {
            const [cardsRes, matchRes, leaderBoardRes] = await Promise.all([
                fetch('./api/select/Card'),
                fetch('./api/select/MatchInfo'),
                fetch('./api/select/LeaderBoard')
            ]);

            const cardsData = await cardsRes.json();
            recentMatch = await matchRes.json();
            leaderBoardData.set(await leaderBoardRes.json());

            console.log(get(leaderBoardData));

            cards = [
                {header: 'Game', value: cardsData[0]["totalGamesPlayed"]},
                {header: 'Days', value: cardsData[0]["totalDaysPlayed"]},
                {header: 'Most Champion', value: cardsData[0]["mostPlayedChampion"]},
                {header: 'Most Kill', value: cardsData[0]["mostKillsChampion"]},
                {header: 'Most Death', value: cardsData[0]["mostDeathsChampion"]},
                {header: 'Best KDA', value: cardsData[0]["bestKDAChampion"]}
            ];

            isLoading = false;
        } catch (error) {
            console.error('Error loading data:', error);
        }
    });
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center gap-4 p-4 dark:bg-gray-900">
    {#each cards as card}
        <div class="col-span-1 p-4">
            <Card header={card.header} value={card.value} class="bg-gray-800 dark:bg-gray-700 text-white"/>
        </div>
    {/each}
    {#if isLoading}
        <div class="col-span-1 sm:col-span-2 lg:col-span-3">
            <p class="text-white">Loading...</p>
        </div>
    {:else}
        <div class="col-span-1 sm:col-span-2 lg:col-span-3">
            <MatchInfo {recentMatch}/>
        </div>
        <div class="col-span-1 sm:col-span-2 lg:col-span-3">
            <LeaderBoard rows={$leaderBoardData}/>
        </div>
    {/if}
</div>

<style>
    @media (max-width: 640px) {
        .grid {
            grid-template-columns: 1fr !important;
        }
    }
</style>
