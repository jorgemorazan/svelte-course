<script>
	import TodoList from './lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';
	import { tick } from 'svelte';

	let todoList;
	let showList = true;
	let todos = null;
	let promise = loadTodos();

	function loadTodos() {
		return fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then(
			(response) => {
				if (response.ok) {
					return response.json();
				}
				throw new Error('An error has occurred');
			}
		);
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
	{#await promise}
		<p>Loading ...</p>
	{:then todos}
		<div style:max-width="400px">
			<TodoList
				{todos}
				bind:this={todoList}
				on:addtodo={handleAddTodo}
				on:removetodo={handleRemoveTodo}
				on:toggletodo={handleToggleTodo}
			/>
		</div>
	{:catch error}
		<p>{error.messages || 'An error has occured'}</p>
	{/await}
	<button
		on:click={() => {
			promise = loadTodos();
		}}>Refresh</button
	>
{/if}

<style></style>
