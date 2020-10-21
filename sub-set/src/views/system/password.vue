<template>
	<div>
		<h1 class="color">组件</h1>
		<!-- <fly-verification-code :length="4" @code="onCode"></fly-verification-code> -->

		<hr />
	</div>
</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		created(){
	 		console.log(localStorage.token)
	 	},
		methods: {
			onCode() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	.color {
		color: blue;

	}
</style>