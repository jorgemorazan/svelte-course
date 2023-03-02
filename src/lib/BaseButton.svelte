<script>
	export let size = 'small';
	export let shadow = false;
</script>

<button
	class:size-lg={size === 'large'}
	class:size-sm={size === 'small'}
	class:shadow><slot>Fallback</slot></button
>

<style lang="scss">
	button {
		border: none;
		background-color: #ff3e00;
		color: #ffffff;

		font-weight: bold;
		border-radius: 5px;
		cursor: pointer;
		&.size-sm {
			padding: 15px 20px;
		}
		&.size-lg {
			padding: 15px 20px;
			font-size: 20px;
		}
		&.shadow {
			box-shadow: 0 0 10px rgba(1, 1, 1, 0.3);
		}
	}
</style>
