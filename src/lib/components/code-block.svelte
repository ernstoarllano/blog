<script lang="ts">
	let { code, language = 'typescript' }: { code: string; language?: string } = $props();
</script>

<pre class="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-xs text-zinc-300 leading-relaxed">
	<code class="language-{language}">{code}</code>
</pre>
