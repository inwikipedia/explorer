<template>
	<div>
		<div class="container">
			<el-row :gutter="20" class="echarView_box mt-15">
				<el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
					<div class="item">
						<h3 class="title">Block Helght</h3>
						<div class="echarData flex-jc-sb">
							<h4 class="big" v-html="blockHeight"></h4>
							<!-- <p class="small">+6.9%</p> -->
						</div>
						<div class="echarView flex-jc-sb">
							<div class="icon"><img src="@/assets/img/BlockHelght.svg"></div>
							<div class="echarView_view">
								<div id="blockHeight" style="width: 100%;height: 100%;"></div>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
					<div class="item">
						<h3 class="title">Block Time</h3>
						<div class="echarData flex-jc-sb">
							<h4 class="big">{{blockTime}} <small style="font-size: 14px;">s</small></h4>
							<!-- <p class="small">+6.9%</p> -->
						</div>
						<div class="echarView flex-jc-sb">
							<div class="icon"><img src="@/assets/img/BlockTime.svg"></div>
							<div class="echarView_view">
								<div id="blockTime" style="width: 100%;height: 100%;"></div>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
					<div class="item">
						<h3 class="title">Price</h3>
						<div class="echarData flex-jc-sb">
							<h4 class="big">{{dollerPrice}}</h4>
							<p class="small" v-html="dollerPerent"></p>
						</div>
						<div class="echarView flex-jc-sb">
							<div class="icon"><img src="@/assets/img/Price.svg"></div>
							<div class="echarView_view">
								<div id="priceChart" style="width: 100%;height: 100%;"></div>
							</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
					<div class="item">
						<h3 class="title">Transactions</h3>
						<div class="echarData flex-jc-sb">
							<h4 class="big">{{txnsData}}</h4>
							<p class="small">+6.9%</p>
						</div>
						<div class="echarView flex-jc-sb">
							<div class="icon"><img src="@/assets/img/Transactions.svg"></div>
							<div class="echarView_view">
								<div id="transactionsChart" style="width: 100%;height: 100%;"></div>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
			
			<!-- <el-row class="newBlock_box" :gutter="20"> -->
			<el-row class="newBlock_box">
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="newBlock_list">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span class="title">Blocks</span>
							<el-button style="float: right; padding: 3px 0;color:#3e3f42" type="text" @click="toUrl('/blocks')">View All</el-button>
						</div>
						<div class="newBlock_table">
							<public-table
								:initData="blockData"
								:isThead="true"
								:className="'Blocks'"
								:isPageTop="true"
								:isPageBottom="true"
							>
								<table-data 
									:tableData="{
										params: [{param: 'number'},{param: 'number', type: 2}, {param: 'timestamp', type: 0}],
										html: '<div class=\'trans_style block_style cursorP\'><p class=\'rowItem\' onclick=toUrl(\'/blockIndex/blocksDtil\',\'{{param}}\')><span class=\'big\'>{{param}}</span> {{param}}</p></div>'
									}"
								></table-data>
								<table-data 
									:tableData="{
										params: [{param: 'miner'}, {param: 'miner', type: 1, start: 10, end: 8}],
										html: '<div class=\'trans_style\'><p class=\'rowItem\'>By <a  onclick=toUrl(\'/blockIndex/blocksDtil\',\'{{param}}\') class=\'cursorP\'><span class=\'blue\'>{{param}}</span></a></p></div>'
									}"
								></table-data>
								<table-data 
									:tableData="{
										params: [{param: 'txn'}, {param: 'txn', type: 2}],
										html: '<div class=\'trans_style\'><p class=\'rowItem\'><a  onclick=toUrl(\'/blockIndex/blocksDtil\',\'{{param}}\') class=\'cursorP\'><span class=\'blue\'>{{param}}</span></a>Txns</p></div>'
									}"
								></table-data>
								<table-data 
									:tableData="{
										params: [{param: 'txn', type: 2}],
										html: '<div class=\'trans_style text-r\'>Reward <span class=\'rowItem greenBg\'>{{param}} FSN</span></div>'
									}"
								></table-data>
							</public-table>
						</div>
					</el-card>
				</el-col>
				
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="newBlock_list">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span class="title">Transactions</span>
							<el-button style="float: right; padding: 3px 0;color:#3e3f42" type="text" @click="toUrl('/assetsIndex/erc20Transfers')">View All</el-button>
						</div>
						<div class="newBlock_table">
							<public-table 
								:initData="transData"
								:isThead="true"
								:className="'Transactions'"
								:isPageTop="true"
								:isPageBottom="true"
							>
								<table-data 
									:tableData="{
										params: [{param: 'hash'},{param: 'hash', type: 1, start: 10, end: 8}],
										html: '<div class=\'trans_style\'><p class=\'rowItem\'>TX# <span class=\'blue cursorP\' onclick=toUrl(\'/blockIndex/txnsDtil\',\'{{param}}\')>{{param}}</span></p></div>'
									}"
								></table-data>
								<table-data :tableData="{
									params: [{param: 'timestamp', type: 0}],
									html: '<span class=\'ellipsis\'>{{param}}</span>'
								}"></table-data>
								<table-data 
									:tableData="{
										params: [{param: 'from'},{param: 'from', type: 1, start: 10, end: 8}],
										html: '<div class=\'trans_style\'><p class=\'rowItem\'>From <span class=\'blue cursorP\' onclick=toUrl(\'/blockIndex/accountDtil\',\'{{param}}\')>{{param}}</span></p></div>'
									}"
								></table-data>
								<table-data 
									:tableData="{
										params: [{param: 'to'},{param: 'to', type: 1, start: 10, end: 8}],
										html: '<div class=\'trans_style\'><p class=\'rowItem\'>To <span class=\'blue cursorP\' onclick=toUrl(\'/blockIndex/accountDtil\',\'{{param}}\')>{{param}}</span></p></div>'
									}"
								></table-data>
								<table-data 
									:tableData="{
										params: ['value'],
										html: '<div class=\'trans_style text-r\'><p class=\'rowItem\'>{{param}} FSN</p></div>'
									}"
								></table-data>
							</public-table>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<style>

</style>

<script>
// import publicTable from "@/components/public/table"
import Qs from 'qs'
export default {
	name: "",
	data () {
		return {
			blockUrl: this.$$.serverUrl + "/data/blocks",
			transUrl: this.$$.serverUrl + "/data/transaction",
			blockData: [],
			transData: [],
			dollerPrice: '',
			dollerPerent: '',
			blockHeight: 0,
			blockTime: 0,
			txnsData: '',
			blockChart: [9, 3, 6, 4, 2],
			web3: '',
			refreshSetInterval: ''
		}
	},
	mounted () {
		this.getData()
		this.setIintervalGetData()
		this.barChart('blockHeight', this.blockChart, 'Block Helght')
		this.barChart('blockTime', this.blockChart, 'Block Helght')
		this.barChart('priceChart', this.blockChart, 'Block Helght')
		this.barChart('transactionsChart', this.blockChart, 'Block Helght')
		this.refreshSetInterval = setInterval(() => {
			this.setIintervalGetData()
		}, 3000)
	},
	methods: {
		getData () {
			this.$http.get('https://api.coinmarketcap.com/v1/ticker/fusion/').then(res => {
				if (res.data.length > 0) {
					this.dollerPrice = '$ ' + Number(res.data[0].price_usd).toFixed(2)
					this.dollerPerent = res.data[0].percent_change_24h + '%'
					if (this.dollerPerent.indexOf('-') === -1) {
						this.dollerPerent = '<span style="color:red">' + this.dollerPerent + '</span>'
					}
				} else {
					this.dollerPrice = 0
				}
			})
    },
		setIintervalGetData () {
			let _params = {
				pageNum: 1,
				pageSize: 20
			}
			this.$$.ajax(this.$http, this.blockUrl, _params).then(res => {
				// console.log(res)
				let data = res.info
				if (data.length > 0) {
					this.blockData = data
					this.blockHeight = this.$$.thousandBit(data[0].number, 'no')
				} else {
					this.blockData = []
					this.blockHeight = 0
				}
			})
			this.$$.ajax(this.$http, this.transUrl, _params).then(res => {
				// console.log(res)
				let data = res.info
				if (data) {
					this.transData = data
					this.txnsData = this.$$.thousandBit(res.total, 'no')
				} else {
					this.transData = []
					this.txnsData = 0
				}
			})
		},
		toUrl (url) {
			this.$router.push(url)
		},
		barChart (id, data, title) {
			let myChart = echarts.init(document.getElementById(id))
			let option = {
				color: ['#3bad4b'],
				tooltip: {},
				xAxis: {
					type : 'category',
					splitNumber: 1,
					scale: false,
					show:false,
					splitLine:{
						show:false
					},
					position:"left",
					data : [
						this.getBeforeDate(5),
						this.getBeforeDate(4),
						this.getBeforeDate(3),
						this.getBeforeDate(2),
						this.getBeforeDate(1),
					],
					axisLabel :{
						interval:0,
						rotate:-30
					}
				},
				yAxis: {
					type : 'value',
					splitNumber: 1,
					scale: true,
					show:false,
					splitLine:{
			　　　　show:false
					}
				},
				series: {
					name: title,
					type: 'bar',
					data: [data[0], data[1], data[2], data[3], data[4]],
				}
			}
			myChart.setOption(option)
		},
		getBeforeDate(n) {
			// let n = n
			let s
			let d = new Date()
			let year = d.getFullYear()
			let mon = d.getMonth() + 1
			let day = d.getDate()
			if(day <= n) {
				if(mon > 1) {
					mon = mon - 1;
				} else {
					year = year - 1
					mon = 12
				}
			}
			d.setDate(d.getDate() - n)
			year = d.getFullYear()
			mon = d.getMonth() + 1
			day = d.getDate()
			s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day)
			return s
    }
	},
	beforeDestroy() {
		clearInterval(this.refreshSetInterval)
		this.refreshSetInterval = null
	}
}
</script>