<script>
	import Counter from './lib/Counter.svelte';

	const props = {
		initialCount: 3,
		maxCount: 10
	};
</script>

<Counter {...props} />

<style></style>
