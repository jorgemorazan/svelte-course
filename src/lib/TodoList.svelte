<svelte:options immutable={true} />

<script lang="ts">
	import BaseButton from './BaseButton.svelte';
	import {
		afterUpdate,
		beforeUpdate,
		createEventDispatcher,
		onDestroy,
		onMount
	} from 'svelte';

	onMount(() => {
		console.log('Mounted');
		return () => {
			console.log('Destroyed 2');
		};
	});

	onDestroy(() => {
		console.log('Destroyed');
	});

	beforeUpdate(() => {
		if (!listDiv) return;
		console.log(listDiv.offsetHeight);
	});

	afterUpdate(() => {
		if (autoScroll) {
			listDiv.scrollTo(0, listDiv.scrollHeight);
			autoScroll = false;
		}
	});

	export let todos = [];
	let prevTodos = todos;

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
	let inputText = '';
	let input, listDiv, autoScroll;

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
		dispatch('removetodo', { id });
	}

	function handleToggleTodo(id, value) {
		dispatch('toggletodo', { id, value });
	}
</script>

<div>
	<div class="todo-list" bind:this={listDiv}>
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
					<button on:click={() => handleRemoveTodo(id)}>Remove</button>
				</li>
			{/each}
		</ul>
	</div>
	<form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
		<input bind:this={input} bind:value={inputText} />
		<BaseButton type="submit" disabled={!inputText}>Add</BaseButton>
	</form>
</div>

<style>
	.todo-list {
		max-height: 150px;
		overflow: auto;
	}
</style>
