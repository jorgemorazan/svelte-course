<script>
	let name = 'Svelte';
	let src = 'https://picsum.com/1200/1200';
	let string = 'Some <strong>string</strong> with html';
</script>

<img {src} />
<h1>Hello {name.toLowerCase()}</h1>
<p>{@html string}</p>

<style></style>
