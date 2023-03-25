<script>
	import { onMount } from 'svelte';
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';

	let button;

	onMount(() => {
		tippy('.tooltip', {
			content: 'tooltip content'
		});
		tippy(button, {
			content: 'here'
		});
	});
</script>

<button class="tooltip" data-tippy-content="other text">Button</button>
<button bind:this={button}>Button</button>
