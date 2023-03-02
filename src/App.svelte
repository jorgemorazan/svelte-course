<script>
	import BaseButton from './lib/BaseButton.svelte';
	import FaAmazon from 'svelte-icons/fa/FaAmazon.svelte';
</script>

<BaseButton size="large" shadow bgColor="red" textColor="cyan">
	<div style:width="20px" slot="leftContent">
		<FaAmazon />
	</div>
	<span>Hello</span>
</BaseButton>

<style></style>
