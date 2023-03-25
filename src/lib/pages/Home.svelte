<script>
	import { onDestroy } from 'svelte';
	import settings from '../stores/settings';
	let colorScheme;
	const unsubscribe = settings.subscribe(
		(settings) => (colorScheme = settings.colorScheme)
	);

	onDestroy(unsubscribe);
</script>

<h2>Home</h2>

{colorScheme}
