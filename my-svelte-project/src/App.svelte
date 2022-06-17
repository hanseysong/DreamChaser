<script>
import { get_current_component } from "svelte/internal";


	let firstName = 'ourWork';
	let lastName = 'group5';
	let color = 'blue'
	let showText = false
	let users = [
		{
			id: '1',
			name: 'sarah'
		},
		{
			id: '2',
			name: 'john'
		},
		{
			id: '3',
			name: 'kiwi'
		},
	]

	$: name = firstName + " " + lastName

	const toggle = () => {
		if (color !== 'blue') {
			color = 'blue'}
		else {color = 'green'}
		showText = !showText

	}
	
</script>

<main>
	<h1 style="color: {color};">Hello {name}!</h1>
	{#if showText}
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	{:else}
		<p>No text</p>
	{/if}
	<button on:click={toggle}>Click here</button>

	{#each users as user (user.id)}
		<h3>{user.id}: {user.name}</h3>
	{/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>