<template>
	<div>
		<div class="container">
			<input type="text" id="addressCopy" v-model="address" style="height: 0;opacity: 0;"/>
			<div class="flex-bc breadcrumb_box">
				<h3 class="title flex-sc">Address <span v-html="address" class="ml-15"></span><div class="iconCopy flex-c ml-10 cursorP" @click="copyAddress('addressCopy')"><img src="@etc/img/copy.svg"></div></h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/blockIndex/topAccounts' }">Accounts</el-breadcrumb-item>
					<el-breadcrumb-item>Address</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			
			<div class="accountHeader_box bgbox">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
						<div class="accountHeader_item flex-sc">
							<p class="p p1 flex-sc"><span>Overview:</span></p>
							<div class="icon cursorP" @click="codeViewBtn">
								<img src="@etc/img/QRcode.svg">
							</div>
						</div>
						<div class="accountHeader_item flex-sc">
							<p class="p p1 flex-sc"><span>Balance:</span></p>
							<p class="p p2" v-html="fsnBalance"></p>
						</div>
						<div class="accountHeader_item flex-sc">
							<p class="p p1 flex-sc"><span>Ether Value:</span></p>
							<p class="p p2" v-html="0"></p>
						</div>
						<div class="accountHeader_item flex-sc">
							<p class="p p1 flex-sc"><span>Transactions:</span></p>
							<p class="p p2" v-html="txnsNum"></p>
						</div>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
						<div class="accountHeader_item flex-sc" v-for="(item, index) in coinData" :key="item.index">
							<p class="p p1 flex-sc"><img :src="item.icon" v-if="item.icon" width="16" height="16" style="margin-right: 5px;"><span v-html="item.name"></span></p>
							<div class="icon" v-if="item.img" @click="codeViewBtn">
								<img :src="item.img">
							</div>
							<p class="p p2" v-if="item.value" v-html="item.value"></p>
						</div>
					</el-col>
				</el-row>
			</div>
			
			<div class="accountInfo_tab">
				<el-tabs @tab-click="handleClick" type="card">
					<el-tab-pane>
						<span slot="label" class="item"><button class="tab">Transactionss</button><p class="arrow el-icon-caret-bottom"></p></span>
						<div class="bgbox">
							<div class="topHeader_title">
								<h3 class="title">Latest {{params.pageSize}} transactions from a total of {{txnsNum}} transactions </h3>
								<div class="topHeader_line">
									<el-dropdown trigger="click"  @command="moreSet">
										<span class="el-dropdown-link">
											<p class="line"></p>
											<p class="line"></p>
											<p class="line"></p>
										</span>
										<el-dropdown-menu slot="dropdown">
											<el-dropdown-item command="Completed">View Completed Txns</el-dropdown-item>
											<el-dropdown-item command="Pending">View Pending Txns</el-dropdown-item>
											<el-dropdown-item command="Failed">View Failed Txns</el-dropdown-item>
											<el-dropdown-item command="Outgoing" divided>View Outgoing Txns</el-dropdown-item>
											<el-dropdown-item command="Incomiing">View Incomiing Txns</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
								</div>
							</div>
							<div style="height: 100%;">				
								<public-table 
									:dataUrl="dataUrl"
									:params="params"
									:resData="''"
									:className="'Transactions'"
									:title="{
										txt: '{{param}} Transactions found',
										params: ['totalNum']
									}"
									:isPageTop="true"
								>
									<table-data 
										:tableData="{
											th: 'TxHash',
											width: '4',
											params: [{param: 'hash'}, {param: 'hash', type: 1, start: 10, end: 8}],
											html: '<div class=\'trans_style\'><p class=\'rowItem cursorP\' onclick=toUrl(\'/blockIndex/txnsDtil\',\'{{param}}\')><span class=\'blue\'>{{param}}</span></p></div>'
										}"
									></table-data>
									<table-data :tableData="{
										th: 'Block',
										width: '3',
										params: [{param: 'blockNumber', type: 2}],
										html: '<span class=\'ellipsis\'>{{param}}</span>'
									}"></table-data>
									<table-data 
										:tableData="{
											th: 'Age',
											width: '3',
											params: [{param: 'timestamp', type: 0}],
											html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
										}"
									></table-data>
									<table-data 
										:tableData="{
											th: 'From',
											width: '4',
											params: [{param: 'from'}, {param: 'from', type: 1, start: 10, end: 8}],
											html: '<div class=\'trans_style\'><p class=\'rowItem cursorP flex-bc\' onclick=toUrl2(\'/blockIndex/accountDtil\',\'{{param}}\')><span class=\'blue\'>{{param}}</span><i class=\'el-icon-caret-right\' style=\'color:#3bad4b;font-size:16px\'></i></p></div>'
										}"
									></table-data>
									<table-data 
										:tableData="{
											th: 'To',
											width: '4',
											params: [{param: 'to'},{param: 'to', type: 1, start: 10, end: 8}],
											html: '<div class=\'trans_style\'><p class=\'rowItem cursorP\' onclick=toUrl2(\'/blockIndex/accountDtil\',\'{{param}}\')><span class=\'blue\'>{{param}}</span></p></div>'
										}"
									></table-data>
									<table-data 
										:tableData="{
											th: 'Value',
											width: '3',
											params: [{param: 'value', type: 2}],
											html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
										}"
									></table-data>
									<table-data 
										:tableData="{
											th: '[TxFee]',
											width: '3',
											params: [{param: 'gas', param2: 'gasPrice', type: 3}],
											html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
										}"
									></table-data>
								</public-table>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane>
						<span slot="label" class="item"><button class="tab">Erc20 Token Txns</button><p class="arrow el-icon-caret-bottom"></p></span>
					</el-tab-pane>
					<el-tab-pane>
						<span slot="label" class="item"><button class="tab">LILO</button><p class="arrow el-icon-caret-bottom"></p></span>
					</el-tab-pane>
					<el-tab-pane>
						<span slot="label" class="item"><button class="tab">Token Balance</button><p class="arrow el-icon-caret-bottom"></p></span>
					</el-tab-pane>
				</el-tabs>
			</div>
			
		</div>
		
		<div class="qrCode_box">			
			<el-dialog
				:title="address"
				:visible.sync="codeViewVisible"
				width="400px"
				center
			>
				<div id="qrcode" ref="qrcode" class="flex-c"></div>
			</el-dialog>
		</div>
		
	</div>
</template>

<style>
.topHeader_title{padding: 30px 28px;border-bottom: 1px solid #eaedf3;position: relative;}
.topHeader_title .title{font-weight: bold;color: #333;}
.topHeader_line{position: absolute;top: 50%;right: 30px;margin-top:-10px;}
.topHeader_line .el-dropdown-link{height:22px;cursor: pointer;}
.topHeader_line .line{width: 18px;height: 3px;background:#5c5c5c;margin:3px 0;border-radius: 2px;}
</style>

<script>
import QRCode from "qrcodejs2"
export default {
	inject: ['reload'],
	name: 'accountDtil',
	data() {
		return {
			address: '',
			codeViewVisible: false,
			// headerData: [],
			// dataUrl: this.$$.serverUrl + '/data/accountTxn',
			coinData: [{
					name: 'BTC Balance:',
					value: '1,201.1234567890 BTC',
					icon: require('@etc/img/btc.svg')
				}, {
					name: 'ETH Balance:',
					value: '1,201.1234567890 BTC',
					icon: require('@etc/img/eth.svg')
				}, {
					name: 'GUSD Balance:',
					value: '1,201.1234567890 BTC',
					icon: require('@etc/img/gusd.svg')
				}, {
					name: 'BNB Balance:',
					value: '1,201.1234567890 BTC',
					icon: require('@etc/img/bnb.svg')
				}
			],
			dataUrl: 'accountTxn',
			blockData: [],
			params: {
				pageSize: 20,
				count: 0,
				addr: this.$route.query.params
			},
			fsnBalance: 'FSN',
			txnsNum: 'txns'
		}
	},
	mounted () {
		this.address = this.$route.query.params
		window.toUrl2 = (url, params) => {
			this.$router.push({
				path: url,
				query: {
					params: params
				}
			})
			this.reload()
		}
		let addressData = {
			address: this.address
		}
		socket.emit('accountDtil', addressData)
		socket.on('accountDtil', (res) => {
			console.log(res)
			this.fsnBalance = this.$$.thousandBit(res.fsnBalance, 'no') + ' FSN'
			this.txnsNum =  this.$$.thousandBit(res.txns, 'no') + ' txns'
		})
	},
	methods: {
		codeViewBtn() {
			this.codeViewVisible = true
			this.$nextTick(() => {
				this.qrcode()
			})
		},
		moreSet (command) {
			console.log(command)
		},
		qrcode () {
			document.getElementById('qrcode').innerHTML = ''
      let qrcode = new QRCode("qrcode", {
        width: 300,
        height: 340, // 高度
        text: this.address
      })
    },
		copyAddress (id) {
			document.getElementById(id).select()
      document.execCommand("Copy")
			this.$message({
				message: 'Copy success!',
				type: 'success'
			})
		},
		handleClick (tab, event) {
			console.log(tab)
			console.log(event)
		}
	}
}
</script>
