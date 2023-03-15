<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	export let name: string;
	export let state: string = undefined;

	let counter = 0;

	$: if (name || state) {
		counter++;
	}

	let onOff = false;

	onMount(() => {
		console.log('re-rendered Scaffold.');
		setTimeout(() => {
			onOff = true;
		}, 1000);
	});

	function badID(length: number) {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < length) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
			counter += 1;
		}
		return result;
	}

	let innerState: string;
	$: innerState = badID(32);
</script>

<section
	style:font-family={`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial,
	sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol`}
>
	<h1 style:font-size="1.5rem">Updating the URL with explicit state w/o forcing re-render</h1>

	<div style:height="72px">
		{#if onOff}<div transition:fly={{ duration: 500, x: 30 }}>
				<div>
					<b>dashboard name</b> - {name}
				</div>
				<div><b>state</b> {state ? state : 'no explicit state set'}</div>
			</div>{:else}
			waiting ...
		{/if}
	</div>

	<div>
		<b>tldr:</b>The secret to this is that the DashboardLayout component, rendered in +layout.ts,
		should be doing most of the heavy lifting, utilizing the page store to pull out the param
		nameAndState and passing that into a dashboard workspace component. Try clicking the links below
		to see how "navigation" (e.g. clicking filters and changing dashboard state) might feel like.
		This approach would probably require us to create the protobuf and then use
		goto('dashboard/[name]--v1-[state]') to make it so that back buttons and forward buttons work
		without refreshing the ENTIRE page.
	</div>

	<div>
		Things to try:
		<ul>
			<li>
				<b>Click on the links below to simulate a "state change".</b> These trigger a link-based navigatino
				to a new route. Critically, it doesn't actually cause a complete reload of the frontend.
			</li>
			<li>
				<b>Try clicking the forward & back buttons.</b> This triggers a state change but also Critically
				does not completely reload the page, maintaining history.
			</li>
			<li>
				<b>Enter a different dashboard name.</b> This will cause a re-load of the whole page, as expected.
			</li>
		</ul>
	</div>

	<div style:font-size="20px">
		number of reactive (non page-refresh) updates to the DashboardLayout component: {counter}
	</div>
	<div>
		in the slot (e.g. this specific url route): <slot />
	</div>

	<div>
		<a href="/dashboard/my-first-dashboard">go to my-first-dashboard</a>
	</div>

	<div>
		<a href="/dashboard/311-calls">go to 311-calls</a>
	</div>
	<div>
		<a href="/dashboard/ad-bids">go to ad-bids</a>
	</div>

	<div>
		with state: <a
			on:click={() => {
				// this component does not update, so let's fake state changes
				innerState = badID(32);
			}}
			href="/dashboard/{name}--v1-{innerState}"
			>simulate a protobuf state change (e.g. a filter change)</a
		>
	</div>
</section>

<style>
	section {
		width: 608px;
		line-height: 1.6;
		font-size: 15px;
		margin: auto;
	}
	div + div {
		margin-bottom: 1rem;
	}
</style>
