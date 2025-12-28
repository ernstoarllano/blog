<script lang="ts">
	import { onMount } from 'svelte';

	let { diagram }: { diagram: string; } = $props();
	let container: HTMLPreElement;

	onMount(async () => {
		const mermaid = (await import('mermaid')).default;
		mermaid.initialize({
			startOnLoad: true,
			theme: 'dark',
			themeVariables: {
				darkMode: true,
				background: '#18181b',
				primaryColor: '#3b82f6',
				primaryTextColor: '#fff',
				primaryBorderColor: '#1e40af',
				lineColor: '#6b7280',
				secondaryColor: '#10b981',
				tertiaryColor: '#f59e0b',
			}
		});

		if (container) {
			await mermaid.run({ nodes: [container] });
		}
	});
</script>

<pre bind:this={container} class='bg-zinc-900 border border-zinc-800 rounded-lg [&>svg]:mx-auto'>{diagram}</pre>
