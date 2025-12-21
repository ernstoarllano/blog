<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Ernesto Arellano</title>
	<meta name="description" content="Ernesto Arellano's portfolio" />
	<meta name="keywords" content="Ernesto Arellano, portfolio, front-end, architecture, development" />
	<link rel="icon" href={favicon} />
</svelte:head>
{@render children()}
