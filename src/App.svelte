<script>
	import TodoList from './lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';
	import { onMount, tick } from 'svelte';

	let todoList;
	let showList = true;
	let todos = null;
	let error = null;
	let isLoading = false;

	onMount(() => {
		loadTodos();
	});
	async function loadTodos() {
		isLoading = true;
		await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then(
			async (response) => {
				if (response.ok) {
					return (todos = await response.json());
				}
				error = 'An error has occurred';
			}
		);
		isLoading = false;
	}

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
	<div style:max-width="400px">
		<TodoList
			{todos}
			{error}
			{isLoading}
			bind:this={todoList}
			on:addtodo={handleAddTodo}
			on:removetodo={handleRemoveTodo}
			on:toggletodo={handleToggleTodo}
		/>
	</div>
{/if}

<style></style>
