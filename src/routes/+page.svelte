<script>
    import Card from './MainComponent/Card.svelte';
    import MatchInfo from "./MainComponent/MatchInfo.svelte";
    import LeaderBoard from "./MainComponent/LeaderBoard.svelte";

    const cards = [
        { header: '헤더', value: '밸류' },
        { header: '헤더1', value: '밸류1' },
        { header: '헤더2', value: '밸류2' },
        { header: '헤더3', value: '밸류3' },
        { header: '헤더4', value: '밸류4' },
        { header: '헤더5', value: '밸류5' }
    ];
</script>

<div class="grid grid-cols-3 text-center gap-4 p-4">
    {#each cards as card}
        <div class="col-span-1 p-4">
            <Card header={card.header} value={card.value} />
        </div>
    {/each}
</div>
<div>
    <MatchInfo/>
</div>

<div>
    <LeaderBoard/>
</div>
