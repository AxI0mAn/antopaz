<script>
	import imageThemeTest from '$lib/assets/image/theme.webp';
</script>

<div class="startBlock">
	<h1>Start!</h1>

	<img src={imageThemeTest} alt="test image" />
</div>

<style lang="scss">
	.startBlock {
		height: 100vh;
		display: flex;
		flex-flow: column nowrap;
		justify-content: center;
		align-items: center;
		gap: 4rem;
		h1 {
			font-family: 'Orbitron';
			font-size: xx-large;
			color: variables.$color;
			text-align: center;
			text-shadow: variables.$text_shadow_dark;
		}
		img {
			width: 240px;
			aspect-ratio: 1/1;
			border: 0px solid transparent;
			border-radius: 50%;
		}
	}
</style>
