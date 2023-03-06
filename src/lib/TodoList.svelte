<svelte:options immutable={true} />

<script lang="ts">
	import BaseButton from './BaseButton.svelte';
	import { createEventDispatcher } from 'svelte';

	export let todos = [];
	let inputText = '';

	const dispatch = createEventDispatcher();

	function handleAddTodo() {
		if (!inputText) return;
		const isNotCancellable = dispatch(
			'addtodo',
			{ title: inputText },
			{ cancelable: true }
		);

		if (isNotCancellable) {
			inputText = '';
		}
	}
</script>

<div>
	<ul>
		{#each todos as { id, title }, index (id)}
			{@const number = index + 1}
			<li>{number} - {title}</li>
		{/each}
	</ul>
	{inputText}
	<form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
		<input bind:value={inputText} />
		<BaseButton type="submit" disabled={!inputText}>Add</BaseButton>
	</form>
</div>
