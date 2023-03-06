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
		event.preventDefault();
		todos = [
			...todos,
			{ id: uuid(), title: event.detail.title, completed: false }
		];
	}
	function handleRemoveTodo(event) {
		const id = event.detail.id;
		console.log(id);
		todos = todos.filter((todo) => todo.id !== id);
	}
</script>

<h2>{todos.length} - Todos</h2>
<TodoList {todos} on:addtodo={handleAddTodo} on:removetodo={handleRemoveTodo} />

<style></style>
