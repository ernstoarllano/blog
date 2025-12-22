import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Component } from 'svelte';

interface PostMetadata {
	title: string;
	date: string;
}

interface PostModule {
	default: Component;
	metadata: PostMetadata;
}

const posts = import.meta.glob<PostModule>('../*.svx');

export const load: PageLoad = async ({ params }) => {
	const postPath = `../${params.slug}.svx`;

	if (!(postPath in posts)) {
		throw error(404, `Post not found: ${params.slug}`);
	}

	const post = await posts[postPath]();

	return {
		content: post.default,
		metadata: {
			title: post.metadata.title,
			datetime: post.metadata.date
		}
	};
};
