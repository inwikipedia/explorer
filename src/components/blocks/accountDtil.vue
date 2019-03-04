<template>
	<div>
		<div class="container">
			<input type="text" id="addressCopy" v-model="address" style="height: 0;opacity: 0;"/>
			<div class="flex-bc breadcrumb_box">
				<h3 class="title flex-sc">{{LANG.CRUMBS.ADDRESS}} <span v-html="address" class="ml-15"></span><div class="iconCopy flex-c ml-10 cursorP" @click="copyAddress('addressCopy')"><img src="@etc/img/copy.svg"></div></h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">{{LANG.NAV.HOME}}</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/blockIndex/topAccounts' }">{{LANG.CRUMBS.ACCOUNT}}</el-breadcrumb-item>
					<el-breadcrumb-item>{{LANG.CRUMBS.ADDRESS}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			
			<div class="accountHeader_box bgbox">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
						<div class="accountHeader_item flex-sc">
							<p class="p p1 flex-sc"><span>{{LANG.SUBTITLE.OVERVIEW}}:</span></p>
							<div class="icon cursorP" @click="codeViewBtn">
								<img src="@etc/img/QRcode.svg">
							</div>
						</div>
						<div class="accountHeader_item flex-sc">
							<p class="p p1 flex-sc"><span>{{LANG.SUBTITLE.BALANCE}}:</span></p>
							<p class="p p2" v-html="fsnBalance"></p>
						</div>
						<div class="accountHeader_item flex-sc">
							<p class="p p1 flex-sc"><span>{{LANG.SUBTITLE.ETHER_VALUE}}:</span></p>
							<p class="p p2" v-html="0"></p>
						</div>
						<div class="accountHeader_item flex-sc">
							<p class="p p1 flex-sc"><span>{{LANG.TITLE.TRANSACTIONS}}:</span></p>
							<p class="p p2" v-html="txnsNum"></p>
						</div>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
						<div class="accountHeader_item flex-sc">
							<p class="p p1 flex-sc"><img src="@etc/img/btc.svg" class="imgIcon"><span>BTC {{LANG.SUBTITLE.BALANCE}}:</span></p>
							<p class="p p2" v-html="BTCbalance"></p>
						</div>
						<div class="accountHeader_item flex-sc">
							<p class="p p1 flex-sc"><img src="@etc/img/eth.svg" class="imgIcon"><span>ETH {{LANG.SUBTITLE.BALANCE}}:</span></p>
							<p class="p p2" v-html="ETHbalance"></p>
						</div>
						<div class="accountHeader_item flex-sc">
							<p class="p p1 flex-sc"><img src="@etc/img/gusd.svg" class="imgIcon"><span>GUSD {{LANG.SUBTITLE.BALANCE}}:</span></p>
							<p class="p p2" v-html="GUSDbalance"></p>
						</div>
						<div class="accountHeader_item flex-sc">
							<p class="p p1 flex-sc"><img src="@etc/img/bnb.svg" class="imgIcon"><span>BNB {{LANG.SUBTITLE.BALANCE}}:</span></p>
							<p class="p p2" v-html="BNBbalance"></p>
						</div>
					</el-col>
				</el-row>
			</div>
			
			<div class="accountInfo_tab">
				<el-tabs @tab-click="handleClick" type="card">
					<el-tab-pane>
						<span slot="label" class="item"><button class="tab">{{LANG.TITLE.TRANSACTIONS}}</button><p class="arrow el-icon-caret-bottom"></p></span>
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
											<el-dropdown-item command="Completed">{{LANG.SUBNAV.VIEW_COMPLETED_TXNS}}</el-dropdown-item>
											<el-dropdown-item command="Pending">{{LANG.SUBNAV.VIEW_PENDING_TXNS}}</el-dropdown-item>
											<el-dropdown-item command="Failed">{{LANG.SUBNAV.VIEW_FAILED_TXNS}}</el-dropdown-item>
											<el-dropdown-item command="Outgoing" divided>{{LANG.SUBNAV.VIEW_OUTGOING_TXNS}}</el-dropdown-item>
											<el-dropdown-item command="Incomiing">{{LANG.SUBNAV.VIEW_INCOMIING_TXNS}}</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
								</div>
							</div>
							<div style="height: 100%;">				
								<public-table 
									:dataUrl="dataUrl"
									:params="params"
									:resData="''"
									:className="LANG.TITLE.TRANSACTIONS"
									:title="{
										txt: '{{param}} Transactions found',
										params: ['totalNum']
									}"
									:isPageTop="true"
								>
									<table-data 
										:tableData="{
											th: LANG.TABLE.TXHASH,
											width: '4',
											params: [{param: 'hash'}, {param: 'hash', type: 1, start: 10, end: 8}],
											html: '<div class=\'trans_style\'><p class=\'rowItem cursorP\' onclick=toUrl(\'/blockIndex/txnsDtil\',\'{{param}}\')><span class=\'blue\'>{{param}}</span></p></div>'
										}"
									></table-data>
									<table-data :tableData="{
										th: LANG.NAV.BLOCKS,
										width: '3',
										params: [{param: 'blockNumber', type: 2}],
										html: '<span class=\'ellipsis\'>{{param}}</span>'
									}"></table-data>
									<table-data 
										:tableData="{
											th: LANG.TABLE.AGE,
											width: '3',
											params: [{param: 'timestamp', type: 0}],
											html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
										}"
									></table-data>
									<table-data 
										:tableData="{
											th: LANG.TABLE.FROM,
											width: '4',
											params: [{param: 'from'}, {param: 'from', type: 1, start: 10, end: 8}],
											html: '<div class=\'trans_style\'><p class=\'rowItem cursorP flex-bc\' onclick=toUrl2(\'/blockIndex/accountDtil\',\'{{param}}\')><span class=\'blue\'>{{param}}</span><i class=\'el-icon-caret-right\' style=\'color:#3bad4b;font-size:16px\'></i></p></div>'
										}"
									></table-data>
									<table-data 
										:tableData="{
											th: LANG.TABLE.TO,
											width: '4',
											params: [{param: 'to'},{param: 'to', type: 1, start: 10, end: 8}],
											html: '<div class=\'trans_style\'><p class=\'rowItem cursorP\' onclick=toUrl2(\'/blockIndex/accountDtil\',\'{{param}}\')><span class=\'blue\'>{{param}}</span></p></div>'
										}"
									></table-data>
									<table-data 
										:tableData="{
											th: LANG.TABLE.VALUE,
											width: '3',
											params: [{param: 'value', type: 2}],
											html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
										}"
									></table-data>
									<table-data 
										:tableData="{
											th: LANG.TABLE.TXFEE,
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
						<span slot="label" class="item"><button class="tab">{{LANG.SUBTITLE.ERC20_TOKEN_TXNS}}</button><p class="arrow el-icon-caret-bottom"></p></span>
					</el-tab-pane>
					<el-tab-pane>
						<span slot="label" class="item"><button class="tab">{{LANG.SUBTITLE.LILO}}</button><p class="arrow el-icon-caret-bottom"></p></span>
					</el-tab-pane>
					<el-tab-pane>
						<span slot="label" class="item"><button class="tab">{{LANG.SUBTITLE.TOKEN_BALANCE}}</button><p class="arrow el-icon-caret-bottom"></p></span>
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
			dataUrl: 'accountTxn',
			blockData: [],
			params: {
				pageSize: 20,
				count: 0,
				addr: this.$route.query.params
			},
			fsnBalance: 'FSN',
			BTCbalance: '0 BTC',
			ETHbalance: '0 ETH',
			GUSDbalance: '0 GUSD',
			BNBbalance: '0 BNB',
			txnsNum: 'txns',
			count: 0
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
		this.count = 0
		socket.emit('accountDtil', addressData)
		socket.on('accountDtil', (res) => {
			this.count ++
			if (this.count > 1) return
			console.log(res)
			this.fsnBalance = this.$$.thousandBit(res.info.balance, 'no') + ' FSN'
			this.txnsNum =  this.$$.thousandBit(res.info.TxCount, 'no') + ' txns'
			this.BTCbalance = res.info.BTCbalance ? this.$$.thousandBit(res.info.BTCbalance, 'no') + ' BTC' : '0 BTC'
			this.ETHbalance = res.info.ETHbalance ? this.$$.thousandBit(res.info.ETHbalance, 'no') + ' ETH' : '0 ETH'
			this.GUSDbalance = res.info.GUSDbalance ? this.$$.thousandBit(res.info.GUSDbalance, 'no') + ' GUSD' : '0 GUSD'
			this.BNBbalance = res.info.BNBbalance ? this.$$.thousandBit(res.info.BNBbalance, 'no') + ' BNB' : '0 BNB'
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
				message: this.LANG.SUCCESS.TIP_0,
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
