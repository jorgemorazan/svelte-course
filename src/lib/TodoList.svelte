<svelte:options immutable={true} />

<script lang="ts">
	import BaseButton from './BaseButton.svelte';
	import { afterUpdate, createEventDispatcher } from 'svelte';
	import FaRegTrashAlt from 'svelte-icons/fa/FaRegTrashAlt.svelte';

	afterUpdate(() => {
		if (autoScroll) {
			listDiv.scrollTo(0, listDivScrollHeight);
			autoScroll = false;
		}
	});

	export let todos = [];
	const dispatch = createEventDispatcher();
	let prevTodos = todos;
	let inputText = '';
	let input, listDiv, autoScroll, listDivScrollHeight;

	$: {
		autoScroll = todos.length > prevTodos.length;
		prevTodos = todos;
	}

	export function clearInput() {
		inputText = '';
	}
	export function focusInput() {
		input.focus();
	}

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
		dispatch('removetodo', { id });
	}

	function handleToggleTodo(id, value) {
		dispatch('toggletodo', { id, value });
	}
</script>

<div>
	<div class="todo-list" bind:this={listDiv}>
		<div bind:offsetHeight={listDivScrollHeight}>
			{#if todos.length === 0}
				<p class="no-items-text">No todos yet</p>
			{:else}
				<ul>
					{#each todos as { id, title, completed } (id)}
						<li>
							<label>
								<input
									type="checkbox"
									on:input={(event) => {
										event.currentTarget.checked = completed;
										handleToggleTodo(id, !completed);
									}}
									checked={completed}
								/>
								{title}
							</label>
							<button
								class="remove-todo-button"
								aria-label="Remove todo: {title}"
								on:click={() => handleRemoveTodo(id)}
							>
								<span style:width="10px" style:display="inline-block"
									><FaRegTrashAlt /></span
								></button
							>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	</div>
	<form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
		<input bind:this={input} bind:value={inputText} placeholder="New Todo" />
		<BaseButton type="submit" disabled={!inputText}>Add</BaseButton>
	</form>
</div>

<style>
	.todo-list {
		max-height: 150px;
		overflow: auto;
	}
</style>
