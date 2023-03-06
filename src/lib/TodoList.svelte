<script lang="ts">
	import BaseButton from './BaseButton.svelte';
	import { v4 as uuid } from 'uuid';

	export let todos = [];
	let inputText = '';

	function handleAddTodo() {
		if (!inputText) return;
		// todos.push({
		// 	id: uuid(),
		// 	title: inputText,
		// 	completed: false
		// });
		// todos = todos;
		todos = [...todos, { id: uuid(), title: inputText, completed: false }];
		inputText = '';
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
