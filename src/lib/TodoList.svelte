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

	function handleRemoveTodo(id) {
		console.log(id);
		dispatch('removetodo', { id });
	}
</script>

<div>
	<ul>
		{#each todos as { id, title, completed } (id)}
			<li>
				<label>
					<input type="checkbox" checked={completed} />
					{title}
				</label>
				<button on:click={() => handleRemoveTodo(id)}>Remove</button>
			</li>
		{/each}
	</ul>
	{inputText}
	<form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
		<input bind:value={inputText} />
		<BaseButton type="submit" disabled={!inputText}>Add</BaseButton>
	</form>
</div>
