<script>
	import settings from '../stores/settings';
	import location from '../stores/location';
</script>

<h2>Home</h2>

{$settings.colorScheme}
{#if $location && !$location.error}
	{$location.latitude}, {$location.longitude}
{/if}

{#if $location.error}
	{$location.error.message}
{/if}
