<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Article {
        title: string;
        datetime: string;
        children: Snippet;
    }

	let { title, datetime, children }: Article = $props();
</script>

<div class="max-w-[500px] mx-auto pt-44 pb-16">
	<article class="space-y-8">
		<header>
            <h1 class="text-2xl font-bold">
                {title}
            </h1>
            <time datetime={datetime}>{new Date(datetime)}</time>
        </header>
        {@render children?.()}
    </article>
</div>