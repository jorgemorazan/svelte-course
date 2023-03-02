<script>
	export let initialCount = 0;
	export let maxCount = undefined;
	let count = 0;
	$: string = `You have clicked ${count}`;
	$: if (count > 5) {
		console.log(string);
	}
	function increment() {
		if (count === maxCount) return;
		count += 1;
	}
</script>

<button on:click={increment}> CLICK ME! </button>
<p>Initial count {initialCount}</p>
<p>{string}</p>
