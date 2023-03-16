This is a highly-timeboxed messy experiment to see if I could get sveltekit to do nice notion-style URLs.

**Current recommendation: go with `dashboard-2` route strategy.**

The structure of the URL is `/dashboard-2/[niceName]--v1-[state]`, where `state` is the protobuf state.

If the `state` piece is not there (e.g. `/dashboard-2/my-dashboard`) it does nothing. If the `state` component is present
as per the parsing, it will make the state available to the Dashboardlayout.svelte component.

This methodology seems to work pretty well in practice. We let sveltekit do the hard work of
detemrining history, and we use basic anchor tags or `goto` to direct the user to the next step.
The `+page.svelte` component will break apart the `nameAndState` parameter from the `$page` store
and update the page accordingly. As long as we're in the same part of the route tree, we should not force
any re-rendering.
