<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">{{LANG.TITLE.TRANSACTIONS}}  <span class="subTitl">{{hash}}</span></h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">{{LANG.NAV.HOME}}</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/blockIndex/txns' }">{{LANG.TITLE.TRANSACTIONS}}</el-breadcrumb-item>
					<el-breadcrumb-item>{{LANG.CRUMBS.TX_INFO}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			
			<div class="blocksDtil_box">
				<aside class="blocksDtil_top flex-bc">
					<div class=" flex-sc">						
						<h3 class="title">{{LANG.TITLE.TRANSACTION_INFORMATION}}</h3>
						<ul class="flex-bc">
							<li><i class="icon el-icon-arrow-left" @click="prevBtn"></i></li>
							<li><i class="icon el-icon-arrow-right" @click="nextBtn"></i></li>
						</ul>
					</div>
					<div class="transView_select">
						<el-select v-model="selectValue" :placeholder="LANG.SUBNAV.TOOLS_UTILITIES">
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
						:show-header="false"
					>
						<el-table-column
							prop="name"
							width="260"
						>
						</el-table-column>
						<el-table-column
							align="left"
						>
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
.transView_select .el-select .el-input__inner{height: 18px;padding-right: 17px;padding-left: 8px;background:none;}
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
			timestamp: 0,
			socket: null,
			dollerPrice: 0
		}
	},
	watch: {
		hash (cur, old) {
			this.getBlocksInfo()
		},
		'$route' () {
			this.hash = this.$route.query.params
		}
	},
	mounted () {
		this.socket = io(this.$$.serverUrl)
		this.hash = this.$route.query.params
		this.getDoller()
	},
	methods: {
		getBlocksInfo () {
			let _params = {
				hash: this.hash
			}
			// this.$$.ajax(this.$http, this.$$.serverUrl + '/data/transferDtil', _params).then(res => {
			this.socket.emit('transferDtil', _params)
			this.socket.on('transferDtil', (res) => {
				console.log(res)
				if (!res.info || res.info.length <= 0) {
					this.$message({
						showClose: true,
						message: this.LANG.ERROR.TIP_0,
						type: 'warning'
					})
					this.blocksInfo = []
					return
				}
				// let transGasPrice = res.info.gasPrice && res.info.gasPrice.c && res.info.gasPrice.c[0] ? res.info.gasPrice.c[0] : 0
				let transGasPrice = ''
				// console.log(res.info.gasPrice.toString(10))
				// console.log(web3)
				// console.log(web3.BigNumber(res.info.gasPrice))
				if (res.info.gasPrice && res.info.gasPrice.c && res.info.gasPrice.c[0]) {
					for (let i = 0; i < res.info.gasPrice.c.length; i++) {
						transGasPrice += res.info.gasPrice.c[i] + ''
					}
				} else if (res.info.gasPrice) {
					transGasPrice = res.info.gasPrice
				} else {
					transGasPrice = 0
				}
				let ActualTx = this.$$.thousandBit(web3.fromWei(Number(res.info.gasLimit) * Number(transGasPrice), 'ether'), 'no')
				let nowTime = Date.parse(new Date())
				this.blocksInfo = [
					{name: this.LANG.TABLE.TXHASH + ':', value: res.info.hash},
					{name: this.LANG.TABLE.TXRECEIPT_STATUS + ':', value: res.info.hash ? '<span style="color:#3bad4b">Success</span>' : '<span style="color:#ff5959">Pending</span>'},
					{name: this.LANG.TITLE.BLOCK_HEIGHT + ':', value: '<span class="cursorP blue" onclick=toUrl(\'/blockIndex/blocksDtil\','+ res.info.blockNumber +')>' + res.info.blockNumber + '</span>'},
					{name: this.LANG.TABLE.TIMESTAMP + ':', value: this.$$.timesFun(res.info.timestamp, nowTime)  + ' (' + new Date(res.info.timestamp * 1000) + ')'},
					{name: this.LANG.TABLE.FROM + ':', value: '<span onclick=toUrl(\'/blockIndex/accountDtil\',"' + res.info.from + '") class="cursorP blue">' + res.info.from + '</span'},
					{name: this.LANG.TABLE.TO + ':', value: '<span onclick=toUrl(\'/blockIndex/accountDtil\',"' + res.info.to + '") class="cursorP blue">' + res.info.to + '</span'},
					{name: this.LANG.TABLE.VALUE + ':', value: this.$$.thousandBit(res.info.value, 'no') + ' FSN($' + (this.dollerPrice * res.info.value) + ')'},
					{name: this.LANG.TABLE.GAS_LIMIT + ':', value: this.$$.thousandBit(res.info.gasLimit, 'no')},
					{name: this.LANG.TABLE.GAS_USED_BY_TRANSACTION + ':', value: this.$$.thousandBit(res.info.gasUsed, 'no') + ' (' + (res.info.gasUsed === 0 ? '100%' : (this.$$.thousandBit(Number(res.info.gas) / Number(res.info.gasUsed) * 100, 2) + '%')) + ')'},
					{name: this.LANG.TABLE.GAS_PRICE + ':', value: this.$$.thousandBit(transGasPrice, 'no') + ' (' + web3.fromWei(transGasPrice, 'ether') + ' Gwei)'},
					{name: this.LANG.TABLE.ACTUAL_TX_COST + ':', value: ActualTx + ' Gwei'},
					{name: this.LANG.TABLE.NONCE_POSITION + ':', value: this.$$.thousandBit(res.info.nonce, 'no') + ' & ' + res.info.transactionIndex},
					{name: this.LANG.TABLE.INPUT_DATA + ':', value: '<textarea class="textarea" disabled>' + res.info.input + '</textarea>'},
					// {name: this.LANG.TABLE.PRIVATE_NOTE + ': ', value: '&ltTo access the Private Note Feature, you must be Logged In&gt'}
				]
				this.timestamp = res.info.timestamp
			})
		},
		getDoller () {
			this.$http.get('https://api.coinmarketcap.com/v1/ticker/fusion/').then(res => {
				if (res.data.length > 0) {
					this.dollerPrice = res.data[0].price_usd
				} else {
					this.dollerPrice = 0
				}
			})
    },
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
			this.socket.emit('transferPage', _params)
			this.socket.on('transferPage', (res) => {
				if (!res.info) {
					this.$message({
						message: this.LANG.ERROR.TIP_0,
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
	beforeDestroy() {
		this.socket.close()
		this.socket.disconnect()
	}
}
</script>
