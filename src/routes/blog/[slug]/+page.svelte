<script lang="ts">
	import Article from '$lib/components/article.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const Content = $derived(data.content);
</script>

<Article title={data.metadata.title} datetime={data.metadata.datetime}>
	{#if Content}
		<Content />
	{/if}
</Article>
