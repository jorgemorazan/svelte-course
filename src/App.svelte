<script>
	import { onMount } from 'svelte';
	import Head from './lib/Head.svelte';
	import Home from './lib/pages/Home.svelte';
	import Settings from './lib/pages/Settings.svelte';

	let page;

	function onRouteChange() {
		const path = window.location.hash.slice(1);
		if (path === '/') {
			page = 'home';
		} else if (path === '/settings') {
			page = 'settings';
		} else {
			window.location.hash = '/';
		}
	}

	onMount(onRouteChange);
</script>

<Head />
<svelte:window on:hashchange={onRouteChange} />

<nav>
	<a href="#/">Home</a>
	<a href="#/settings">Settings</a>
</nav>

{#if page === 'home'}
	<Home />
{:else if page === 'settings'}
	<Settings />
{/if}
