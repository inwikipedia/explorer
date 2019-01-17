<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">Broadcast Raw Transaction</h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
					<el-breadcrumb-item>Broadcast Transaction</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			
			<div class="broadCast_box bgbox">
				<aside class="broadCast_title">
					<h3>This page allows you to paste a Signed Raw Transaction in hex format (i.e. characters 0-9, a-f) and broadcast it over the Ethereum network.</h3>
				</aside>
				<div class="broadCast_cont">
					<h3 class="title">Enter TX Hex</h3>
					<el-input
						type="textarea"
						:autosize="{ minRows: 8, maxRows: 12}"
						placeholder="0x"
						v-model="serializedTx">
					</el-input>
					<p class="info">Tip: You can also broadcast programatically via our [eth_sendRawTransaction]. Accepts the paramater "hex" for prefilling the input box above (i.e Click here)</p>
					<button class="btn-primary cursorP" @click="sendRawtransaction">Send Transaction</button>
				</div>
			</div>
			
		</div>
	</div>
</template>

<style>

</style>

<script>
export default {
	name: '',
	data () {
		return {
			serializedTx: '',
			web3: ''
		}
	},
	methods: {
		sendRawtransaction() {
			if (!this.serializedTx) {
				this.$message({
					showClose: true,
          message: 'TX Hex cannot be empty',
          type: 'warning'
        })
				return
			}
			this.$$.web3(this)
			this.web3.eth.sendRawTransaction(this.serializedTx, (err, res) => {
				if (err) {
					this.$message.error(err.toString())
				} else {
					this.$message({
						showClose: true,
						message: 'Send success, hash: ' + res,
						type: 'success'
					})
				}
			})
		}
	},
}
</script>
