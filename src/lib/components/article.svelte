<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Article {
        title: string;
        datetime: string;
        children: Snippet;
    }

	let { title, datetime, children }: Article = $props();

	const formattedDate = $derived(
		new Date(datetime).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	);
</script>

<div class="max-w-[700px] mx-auto pt-44 pb-16">
	<article class="space-y-8">
		<header>
            <h1>
                {title}
            </h1>
            <time datetime={datetime}>{formattedDate}</time>
        </header>
        {@render children?.()}
    </article>
</div>