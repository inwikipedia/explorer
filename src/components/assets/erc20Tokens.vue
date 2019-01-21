<template>
	<div>
		
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
	mounted () {
		this.$http.get('https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0x57d90b64a1a57749b0f932f1a3395792e12e7055').then(res => {
			console.log(res)
		})
	}
}
</script>
