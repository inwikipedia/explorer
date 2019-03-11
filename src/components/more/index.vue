<template>
	<div>
		<!-- <router-view></router-view> -->
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<style>
	
</style>

<script>
export default {
	name: '',
	data () {
		return {
			
		}
	},
	// beforeRouteLeave(to, from, next) {
	// 		// 设置下一个路由的 meta
	// 		// to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
	// 		// next();
	// 		console.log(to)
	// 		console.log(from)
	// }
}
</script>
