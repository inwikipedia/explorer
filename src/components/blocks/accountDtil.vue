<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title flex-sc">Address <span v-html="address" class="ml-15"></span><div class="iconCopy flex-c ml-10 cursorP"><img src="@etc/img/copy.svg"></div></h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/blockIndex/topAccounts' }">Accounts</el-breadcrumb-item>
					<el-breadcrumb-item>Address</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			
			<div class="accountHeader_box bgbox">
				<el-row :gutter="20">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-for="(item, index) in headerData" :key="item.index">
						<div class="accountHeader_item flex-sc">
							<p class="p p1"><img :src="item.icon" v-if="item.icon"><span v-html="item.name"></span></p>
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
											html: '<div class=\'trans_style\'><p class=\'rowItem\'><span class=\'blue cursorP\' onclick=toUrl(\'/blockIndex/txnsDtil\',\'{{param}}\')>{{param}}</span></p></div>'
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
											html: '<div class=\'trans_style\'><p class=\'rowItem\'><a onclick=toUrl(\'/blocks?id={{param}}\') class=\'cursorP\'><span class=\'blue\'>{{param}}</span></a></p></div>'
										}"
									></table-data>
									<table-data 
										:tableData="{
											th: 'To',
											width: '4',
											params: [{param: 'to', type: 1, start: 10, end: 8}],
											html: '<div class=\'trans_style\'><p class=\'rowItem\'><span class=\'blue\'>{{param}}</span></p></div>'
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
											params: [{param: 'gas', type: 2}],
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
				<!-- <ul>
					<li class="item">
						<div class="btn">							
							Transactionss
							<i class="arrow"></i>
						</div>
					</li>
				</ul> -->
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
.iconCopy{width: 10px;height: 10px;}
.iconCopy img{max-width: 100%;max-height: 100%;}
.accountHeader_box{padding: 36px 16px;}
.accountHeader_item{width: 100%;border-bottom: 1px solid #eee;padding:6px 0;}
.accountHeader_item .p{font-size: 14px;color:#3e3f42;padding-left: 10px;}
.accountHeader_item .p1{width:40%;}
.accountHeader_item .p2{width:60%;}
.accountHeader_item .icon{width: 16px;height: 16px;margin-left: 10px;}
.qrCode_box .el-dialog__title{font-size:12px;color:#666;}
.accountInfo_tab{width: 100%;margin-top: 30px;}
.accountInfo_tab .el-tabs__header{border: none!important;}
.accountInfo_tab .el-tabs__nav{border: none!important;}
.accountInfo_tab .el-tabs__item{border: none!important;padding: 0!important;}
.accountInfo_tab .el-tabs__item .tab{width:150px;height:30px;line-height: 30px;margin-right: 5px;border: none!important;background: #e6e6e6;color:#3e3f42;border-radius: 5px;text-align: center;font-weight: bold;margin-bottom:10px;cursor:pointer;}
.accountInfo_tab .item .arrow{width:100%;position: absolute;bottom: -3px;left: 0;font-size: 20px;line-height: 20px;text-align: center;color:#3371d7;display: none;}
.accountInfo_tab .is-active .tab{background: #3371d7;color: #fff;}
.accountInfo_tab .is-active .arrow{display: block;}
</style>

<script>
import QRCode from "qrcodejs2"
export default {
	name: 'accountDtil',
	data() {
		return {
			address: '0x98d26e065C56e5A366a4d84Aee08f4b26Bc901FA  ',
			codeViewVisible: false,
			headerData: [
				{
					name: 'Overview',
					value: '',
					icon: '',
					img: require('@etc/img/Smartcontract.svg')
				}, {
					name: 'BTC Balance:',
					value: '1,201.1234567890 BTC',
					icon: ''
				}, {
					name: 'Balance:',
					value: '1,201.1234567890 BTC',
					icon: ''
				}, {
					name: 'ETH Balance:',
					value: '1,201.1234567890 BTC',
					icon: ''
				}, {
					name: 'Ether Value:',
					value: '1,201.1234567890 BTC',
					icon: ''
				}, {
					name: 'USDT Balance:',
					value: '1,201.1234567890 BTC',
					icon: ''
				}, {
					name: 'Transactions:',
					value: '1,201.1234567890 BTC',
					icon: ''
				}, {
					name: 'BNB Balance:',
					value: '1,201.1234567890 BTC',
					icon: ''
				}
			],
			dataUrl: this.$$.serverUrl + '/data/transaction',
			blockData: [],
			params: {
				pageSize: 20,
				count: 0
			}
		}
	},
	methods: {
		codeViewBtn() {
			this.codeViewVisible = true
			this.$nextTick(() => {
				this.qrcode()
			})
		},
		qrcode () {
			document.getElementById('qrcode').innerHTML = ''
      let qrcode = new QRCode("qrcode", {
        width: 300,
        height: 340, // 高度
        text: this.address
      })
    },
		handleClick (tab, event) {
			console.log(tab)
			console.log(event)
		}
	}
}
</script>
