<script>
	import TodoList from './lib/TodoList.svelte';
	import { v4 as uuid } from 'uuid';
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

	function handleAddTodo(event) {
		todos = [
			...todos,
			{ id: uuid(), title: event.detail.title, completed: false }
		];
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

<h2>{todos.length} - Todos</h2>
<TodoList
	{todos}
	on:addtodo={handleAddTodo}
	on:removetodo={handleRemoveTodo}
	on:toggletodo={handleToggleTodo}
/>

<style></style>
