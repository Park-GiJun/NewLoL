<script>
    import '../app.css';
    import Header from "./Header.svelte";

    let isHeaderOpen = true;

    function handleToggle(event) {
        isHeaderOpen = event.detail.isOpen;
    }
</script>

<div class="flex h-screen bg-gray-300">
    <Header on:toggle={handleToggle}/>
    <div class={`flex-grow p-4 transition-all duration-300 ease-in-out`}>
        <slot/>
    </div>
</div>
