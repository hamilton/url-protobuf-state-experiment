<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import DashboardLayout from './DashboardLayout.svelte';

	// we can always from within a layout get the page parameters. In this case, it pulls from
	// nameAndState.
	$: nameAndState = $page.params.nameAndState;
	let counter = 0;

	onMount(() => {
		counter += 1;
	});

	function parseStateFromName(nameString: string) {
		const [name, statePortion] = nameString.split('--');
		// no state has been defined here.
		if (!statePortion?.length) return { name, state: undefined };

		const [_, state] = statePortion.split('v1-');
		return { name, state };
	}

	onMount(() => {
		console.log('re-rendered layout.');
	});

	let name: string;
	let state: string;

	$: parts = parseStateFromName(nameAndState);
	$: name = parts.name;
	$: state = parts.state;
	let onOff = false;
	onMount(() => {
		console.log('re-rendered Scaffold.');
		setTimeout(() => {
			onOff = true;
		}, 1000);
	});
</script>

<DashboardLayout {name} {state}>
	<slot /> - number of reactive-updates (1 means it keeps re-rendering): {counter}
</DashboardLayout>
