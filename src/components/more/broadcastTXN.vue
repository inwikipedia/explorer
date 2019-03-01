<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">{{LANG.MORE.BROADCAST_RAW_TRANSACTION}}</h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">{{LANG.NAV.HOME}}</el-breadcrumb-item>
					<el-breadcrumb-item>{{LANG.MORE.BROAD_TRANSACTION}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			
			<div class="broadCast_box bgbox">
				<aside class="broadCast_title">
					<h3>{{LANG.MORE.BROADCAST_TIP_0}}</h3>
				</aside>
				<div class="broadCast_cont">
					<h3 class="title">{{LANG.MORE.ENTER_TX_HEX}}</h3>
					<el-input
						type="textarea"
						:autosize="{ minRows: 8, maxRows: 12}"
						placeholder="0x"
						v-model="serializedTx">
					</el-input>
					<p class="info">{{LANG.MORE.BROADCAST_TIP_0}}</p>
					<button class="btn-primary cursorP" @click="sendRawtransaction">{{LANG.BTN.SEND_TRANSACTION}}</button>
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
