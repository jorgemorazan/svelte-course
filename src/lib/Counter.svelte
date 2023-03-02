<script>
	let count = 0;
	$: string = `You have clicked ${count}`;
	$: if (count > 5) {
		console.log(string);
	}
	const increment = () => {
		count += 1;
	};
</script>

<button on:click={increment}> CLICK ME! </button>
<p>{string}</p>
