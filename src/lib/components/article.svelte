<script lang="ts">
    import type { Snippet } from 'svelte';

    interface Article {
        title: string;
        datetime: string;
        children: Snippet;
    }

	let { title, datetime, children }: Article = $props();

	const formattedDate = $derived(
		(() => {
			const [year, month, day] = datetime.split('-').map(Number);
			return new Date(year, month - 1, day).toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		})()
	);
</script>

<div class="max-w-[700px] mx-auto px-4 md:px-0 pt-24 md:pt-44 pb-16">
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