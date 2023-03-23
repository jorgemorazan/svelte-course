<script>
	import TodoList from './lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';
	import { tick } from 'svelte';

	let todoList;
	let showList = true;
	let todos = [
		{
			id: uuid(),
			title: 'Todo 1',
			completed: true
		},
		{
			id: uuid(),
			title: 'Todo 2',
			completed: false
		},
		{
			id: uuid(),
			title: 'Todo 3',
			completed: true
		}
	];

	async function handleAddTodo(event) {
		event.preventDefault();
		todos = [
			...todos,
			{ id: uuid(), title: event.detail.title, completed: false }
		];
		await tick();
		todoList.clearInput();
	}

	function handleRemoveTodo(event) {
		const id = event.detail.id;
		todos = todos.filter((todo) => todo.id !== id);
	}

	function handleToggleTodo(event) {
		const id = event.detail.id;
		const completed = event.detail.value;

		todos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed };
			}
			return { ...todo };
		});
	}
</script>

<label>
	<input type="checkbox" bind:checked={showList} />
	Show List
</label>
{#if showList}
	<div style:max-width="200px">
		<TodoList
			{todos}
			bind:this={todoList}
			on:addtodo={handleAddTodo}
			on:removetodo={handleRemoveTodo}
			on:toggletodo={handleToggleTodo}
		/>
	</div>
{/if}

<style></style>
