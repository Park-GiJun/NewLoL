<script>
    import { createEventDispatcher } from 'svelte';

    let isOpen = true;
    const dispatch = createEventDispatcher();

    function toggleMenu() {
        isOpen = !isOpen;
        dispatch('toggle', { isOpen });
    }
</script>

<header class={`bg-gray-800 text-white p-4 flex flex-col h-full transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'}`}>
    <div class="flex justify-between items-center">
        <div class={`text-2xl font-bold mb-4 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'} ${!isOpen ? 'hidden' : 'block'}`}>
            OLM
            <small class={'text-xs'}>오롤몇</small>
        </div>
        <button class="mb-4" on:click={toggleMenu}>
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
        </button>
    </div>
    <nav class={`flex flex-col space-y-4 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <ul>
            <li>
                <a href="/" class="block py-2 px-4 hover:bg-gray-700 rounded">Home</a>
            </li>
            <li>
                <a href="/about" class="block py-2 px-4 hover:bg-gray-700 rounded">About</a>
            </li>
            <li>
                <a href="/services" class="block py-2 px-4 hover:bg-gray-700 rounded">Services</a>
            </li>
            <li>
                <a href="/contact" class="block py-2 px-4 hover:bg-gray-700 rounded">Contact</a>
            </li>
        </ul>
    </nav>
</header>
