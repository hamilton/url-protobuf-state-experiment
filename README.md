This is a highly-timeboxed messy experiment to see if I could get sveltekit to do nice notion-style URLs.

The structure of the URL is `/dashboard/[niceName]--v1-[state]`, where `state` is the protobuf state.

If the `state` piece is not there (e.g. `/dashboard/my-dashboard`) it does nothing. If the `state` component is present
as per the parsing, it will make the state available to the Dashboardlayout.svelte component.

Using the `page` store within the layout part of the route was the key. Here, it preserves all the state so that all the
lower-level changes in `/routes/dashboard/[nameAndState]` don't really do much. The layout can capture the value of `nameAndState`
and theoretically persist / update the dashboard store. If you move the routing into the `+page.svelte`, it simply won't work.

This also means that we need to use `+layout.svelte` to actually render the dashboard workspace and not `+page.svelte`.

I'm not sure if this is a conclusive experiment but hopefully it will point the way toward bringing the protobuf message
directly into the URL, enabling forward + backward navigation.
