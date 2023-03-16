<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	// export let name: string;
	$: nameAndState = $page.params.nameAndState;

	function parseStateFromName(nameString: string) {
		const [name, statePortion] = nameString.split('--');
		// no state has been defined here.
		if (!statePortion?.length) return { name, state: undefined };

		const [_, state] = statePortion.split('v1-');
		return { name, state };
	}

	$: parts = parseStateFromName(nameAndState);
	$: name = parts.name;
	$: state = parts.state;
	// export let state: string = undefined;

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

<div class="container">
	<main>
		<h1 style:margin="0" style:font-size="1.5rem">
			dashboard-2 – leveraging the $page store on +page.svelte
		</h1>

		<section>
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
				<b>tldr:</b> the dashboard-2 route puts all of the logic directly into the +page.svelte.
				This preserves the component state perfectly so long as we stay within this part of the
				route tree. If we navigate to a different route, then the component state is lost and we
				re-render. You can see this by clicking on the link that points to /dashboard (rather than
				the ones that point to /dashboard-2). <b>This really should be the preferred method.</b>
			</div>

			<div>
				Things to try:
				<ul>
					<li>
						<b>Click on the links below to simulate a "state change".</b> These trigger a link-based
						navigatino to a new route. Critically, it doesn't actually cause a complete reload of the
						frontend.
					</li>
					<li>
						<b>Try clicking the forward & back buttons.</b> This triggers a state change but also Critically
						does not completely reload the page, maintaining history.
					</li>
					<li>
						<b>Enter a different dashboard name.</b> This will cause a re-load of the whole page, as
						expected.
					</li>
				</ul>
			</div>

			<div style:font-size="20px">
				number of reactive (non page-refresh) updates to this route: {counter}
			</div>

			<div>
				<a href="/dashboard-2/my-first-dashboard">go to my-first-dashboard</a>
			</div>

			<div>
				<a href="/dashboard-2/311-calls">go to 311-calls</a>
			</div>
			<div>
				<a href="/dashboard-2/ad-bids">go to ad-bids</a>
			</div>

			<div>
				with state: <a
					on:click={() => {
						// this component does not update, so let's fake state changes
						innerState = badID(32);
					}}
					href="/dashboard-2/{name}--v1-{innerState}"
					>simulate a protobuf state change (e.g. a filter change)</a
				>
			</div>
		</section>
	</main>
</div>

<style>
	.container {
		width: 100vw;
		height: 100vh;
		background-color: hsl(217, 10%, 10%);
		color: white;
		padding: 2rem 0;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizeLegibility;
	}

	h1 {
		padding-bottom: 2rem;
	}

	main {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

		width: 608px;
		margin: auto;
	}

	a {
		color: blueviolet;
	}

	a:visited {
		color: cornflowerblue;
	}

	section {
		line-height: 1.6;
		font-size: 15px;
		font-weight: 300;
	}
	div + div {
		margin-bottom: 1rem;
	}
</style>
