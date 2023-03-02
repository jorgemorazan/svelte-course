<script>
	import BaseButton from './lib/BaseButton.svelte';
	import FaAmazon from 'svelte-icons/fa/FaAmazon.svelte';
	import FaAllergies from 'svelte-icons/fa/FaAllergies.svelte';
</script>

<BaseButton
	on:click={() => alert(true)}
	let:isLeftHovered
	size="large"
	shadow
	bgColor="red"
	textColor="cyan"
>
	<div style:width="20px" slot="leftContent">
		{#if isLeftHovered}
			<FaAmazon />
		{:else}
			<FaAllergies />
		{/if}
	</div>
	<span>Hello</span>
</BaseButton>

<style></style>
