<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">{{LANG.TRANSACTIONS}}  {{hash}}</h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">{{LANG.HOME}}</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/blockIndex/txns' }">{{LANG.TRANSACTIONS}}</el-breadcrumb-item>
					<el-breadcrumb-item>{{LANG.TX_INFO}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			
			<div class="blocksDtil_box">
				<aside class="blocksDtil_top flex-bc">
					<div class=" flex-sc">						
						<h3 class="title">{{LANG.TRANSACTION_INFORMATION}}</h3>
						<ul class="flex-bc">
							<li><i class="icon el-icon-arrow-left" @click="prevBtn"></i></li>
							<li><i class="icon el-icon-arrow-right" @click="nextBtn"></i></li>
						</ul>
					</div>
					<div class="transView_select">
						<el-select v-model="selectValue" :placeholder="LANG.TOOLS_UTILITIES">
							<el-option
								v-for="item in selectOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</aside>
				<div class="blocksDtil_table">
					<el-table
						:data="blocksInfo"
						style="width: 100%"
						size="mini"
						empty-text="Null"
					>
						<el-table-column
							prop="name"
							:label="LANG.TITLE"
						>
						</el-table-column>
						<el-table-column
							align="left"
						>
							<template slot="header" slot-scope="scope">
								{{LANG.DETAILS}}
							</template>
							<template slot-scope="scope">
								<span v-html="scope.row.value"></span>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.transView_select .el-select{width:122px;margin: 0 5px;}
.transView_select .el-input{font-size:12px;}
.transView_select .el-select .el-input__suffix{right:0;padding:0 3px;border-left:1px solid #c0c4cc;}
.transView_select .el-select .el-input__inner{height: 18px;padding-right: 17px;padding-left: 8px;}
.transView_select .el-select .el-input__icon{line-height: 18px;width: 12px;font-size:12px;}
</style>

<script>
// let BigNumber = require('bignumber.js')
export default {
	name: 'BlockDetails',
	data () {
		return {
			hash: 0,
			blocksInfo: [],
			selectValue: '',
			selectOptions: [{
				label: 'Validate Transaction',
				value: 0
			}, {
				label: 'Txns Visualizer',
				value: 1
			}, {
				label: 'Get Raw TxHash',
				value: 2
			}],
			web3: '',
			timestamp: 0,
			count: 0
		}
	},
	watch: {
		hash (cur, old) {
			this.getBlocksInfo()
		}
	},
	mounted () {
		this.hash = this.$route.query.params
		window.toUrl = (params) => {
			this.$router.push({
				path: '/blockIndex/accountDtil',
				query: {
					params: params
				}
			})
		}
		
	},
	methods: {
		getBlocksInfo (number) {
			this.$$.web3(this)
			let _params = {
				hash: this.hash
			}
			// this.$$.ajax(this.$http, this.$$.serverUrl + '/data/transferDtil', _params).then(res => {
			this.count = 0
			socket.emit('transferDtil', _params)
			socket.on('transferDtil', (res) => {
				this.count ++
				if (this.count > 1) return
				console.log(res)
				if (!res.info) {
					this.$message({
						showClose: true,
						message: this.LANG.ERROR_TIP_0,
						type: 'warning'
					})
					this.blocksInfo = []
					return
				}
				// let hashData = this.hash
// 				let blockNumData = res.info.blockNumber
// 				// console.log(hashData)
// 				let blockData = this.web3.eth.getBlock(blockNumData)
// 				if (blockData === null) {
// 					blockData = {
// 						gasLimit: 0,
// 						gasUsed: 0
// 					}
// 				}
				let transGasPrice = res.info.gasPrice && res.info.gasPrice.c && res.info.gasPrice.c[0] ? res.info.gasPrice.c[0] : 0
// 				if (transData === null) {
// 					transData = {
// 						gasPrice: 0
// 					}
// 				}
				// console.log(this.web3.createBatch())
				// console.log(blockData.gasUsed)
				// console.log(res.info.gasPrice.c[0])
				// console.log(this.toNonExponential(res.info.gasPrice))
				// console.log(new BigNumber(res.info.gasPrice).toNumber())
				let nowTime = Date.parse(new Date())
				this.blocksInfo = [
					{name: this.LANG.TXHASH + ':', value: res.info.hash},
					{name: this.LANG.TXRECEIPT_STATUS + ':', value: res.info.hash ? '<span style="color:#3bad4b">Success</span>' : '<span style="color:#ff5959">Pending</span>'},
					{name: this.LANG.BLOCK_TIME + ':', value: this.$$.thousandBit(res.info.blockNumber, 'no')},
					{name: this.LANG.TIMESTAMP + ':', value: this.$$.timesFun(res.info.timestamp, nowTime)},
					{name: this.LANG.FROM + ':', value: '<span style="color:#1665d8" onclick=toUrl("' + res.info.from + '") class="cursorP">' + res.info.from + '</span'},
					{name: this.LANG.TO + ':', value: '<span style="color:#1665d8" onclick=toUrl("' + res.info.from + '") class="cursorP">' + res.info.to + '</span'},
					{name: this.LANG.VALUE + ':', value: this.$$.thousandBit(res.info.value, 'no')},
					{name: this.LANG.GAS_LIMIT + ':', value: this.$$.thousandBit(res.info.gasLimit, 'no')},
					{name: this.LANG.GAS_USED_BY_TRANSACTION, value: res.info.gasUsed === 0 ? '100%' : (this.$$.thousandBit(Number(res.info.gas) / Number(res.info.gasUsed) * 100, 'no') + '%')},
					{name: this.LANG.GAS_PRICE + ':', value: this.$$.thousandBit(transGasPrice, 'no')},
					{name: this.LANG.ACTUAL_TX_COST + ':', value: this.$$.thousandBit(Number(res.info.gasLimit) * Number(transGasPrice), 'no')},
					{name: this.LANG.NONCE_POSITION + ':', value: this.$$.thousandBit(res.info.nonce, 'no')},
					{name: this.LANG.INPUT_DATA + ':', value: '<textarea class="textarea" disabled>' + res.info.input + '</textarea>'},
					{name: this.LANG.PRIVATE_NOTE + ': ', value: '&ltTo access the Private Note Feature, you must be Logged In&gt'}
				]
				this.timestamp = res.info.timestamp
			})
		},
// 		toNonExponential (num) {
//         let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
//         return num.toFixed(Math.max(0, (m[1] || '').length - m[2]))
// 		},
		prevBtn () {
			let _params = {
				timestamp: this.timestamp,
				page: 'prev'
			}
			this.getPageUrl(_params)
		},
		nextBtn () {
			let _params = {
				timestamp: this.timestamp,
				page: 'next'
			}
			this.getPageUrl(_params)
		},
		getPageUrl (_params) {
			// this.$$.ajax(this.$http, this.$$.serverUrl + '/data/transferPage', _params).then(res => {
			socket.emit('transferPage', _params)
			socket.on('transferPage', (res) => {
				if (!res.info) {
					this.$message({
						message: this.LANG.ERROR_TIP_0,
						type: 'warning'
					})
					this.blocksInfo = []
					return
				}
				this.$router.push({path: '/blockIndex/txnsDtil', query: {params: res.info.hash}}),
				this.hash = res.info.hash
			})
		}
	},
}
</script>
