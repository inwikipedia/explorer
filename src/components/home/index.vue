<template>
	<div>
		<div class="container">
			<div class="headerNav_searchBg">
				<div class="headerNav_search headerNav_searchCont">
						<div class="flex-bc headerNav_searchTitl">
							<h3 class="h3">FUSION Blockchain Explorer</h3>
							<ul class="flex-ec ul">
								<li><p>Quick links:</p></li>
								<li><router-link to="/assetsIndex/erc20Tokens">{{LANG.NAV.ERC20_TOKENS}}</router-link></li>
								<li><router-link to="/assetsIndex/liloAssets">{{LANG.NAV.LILO_TOKENS}}</router-link></li>
							</ul>
						</div>
						<el-input :placeholder="LANG.PH.SEARCH_PLACEHOLDER" v-model="searchVal">
							<template slot="suffix" class="flex-c">
								<div class="icon" @click="searchBtn">
									<!-- <img src="@/assets/img/search.svg" /> -->
									<i class="el-input__icon el-icon-search"></i>
								</div>
							</template>
						</el-input>
					</div>
			</div>
			<el-row :gutter="20" class="echarView_box mt-15">
				<el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
					<div class="item pubBg_white">
						<h3 class="title">{{LANG.TITLE.BLOCK_HEIGHT}}</h3>
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
					<div class="item pubBg_white">
						<h3 class="title">{{LANG.TITLE.BLOCK_TIME}}</h3>
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
					<div class="item pubBg_white">
						<h3 class="title">{{LANG.TITLE.PRICE}}</h3>
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
					<div class="item pubBg_white">
						<h3 class="title">{{LANG.TITLE.TRANSACTIONS}}</h3>
						<div class="echarData flex-jc-sb">
							<h4 class="big">{{txnsData}}</h4>
							<p class="small" v-html="transferPerent"></p>
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
					<el-card class="box-card pubBg_white">
						<div slot="header" class="clearfix">
							<span class="title">{{LANG.NAV.BLOCKS}}</span>
							<el-button style="float: right; padding: 3px 0;color:#3e3f42" type="text" @click="toUrl('/blocks')">View All</el-button>
						</div>
						<div class="newBlock_table">
							<public-table
								:initData="blockData"
								:isThead="true"
								:className="'Blocks'"
								:isPageTop="true"
								:isPageBottom="true"
								:isLoading="true"
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
										params: [{param: 'miner', type: 2}],
										html: '<div class=\'trans_style text-r\'>Reward <span class=\'rowItem greenBg\'>{{param}} FSN</span></div>'
									}"
								></table-data>
							</public-table>
						</div>
					</el-card>
				</el-col>
				
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="newBlock_list">
					<el-card class="box-card pubBg_white">
						<div slot="header" class="clearfix">
							<span class="title">{{LANG.TITLE.TRANSACTIONS}}</span>
							<el-button style="float: right; padding: 3px 0;color:#3e3f42" type="text" @click="toUrl('/blockIndex/txns')">View All</el-button>
						</div>
						<div class="newBlock_table">
							<public-table 
								:initData="transData"
								:isThead="true"
								:className="'Transactions'"
								:isPageTop="true"
								:isPageBottom="true"
								:isLoading="true"
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
			blockHeightChart: [],
			blockTimeChart: [],
			transferChart: [],
			transferPerent: 0,
			web3: '',
			refreshSetInterval: '',
			searchVal: '',
			socket: null
		}
	},
	mounted () {
		this.socket = io(this.$$.serverUrl)
		this.getData()
		this.setIintervalGetData()
		this.getAvgChart()
			document.getElementById('publicSearchId').style.display = 'none'
	},
	methods: {
		searchBtn () {
			if (!this.searchVal) {
				this.$message({
					showClose: true,
					message: 'Can\'t be empty!',
					type: 'warning'
				})
				return
			}
			this.$router.push({
				path: '/blockIndex/accountDtil',
				query: {
					params: this.searchVal
				}
			})
			this.searchVal = ''
		},
		getData () {
			// this.$http.get('https://api.coinmarketcap.com/v1/ticker/fusion/').then(res => {
			this.$http.get('https://api.coinmarketcap.com/v1/ticker/fusion/').then(res => {
			// this.$http.get('https://api.coinmarketcap.com/v2/listings/').then(res => {
// 			this.$http.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
// 			{
// 				headers: {
// 					'X-CMC_PRO_API_KEY': '6ef6f98b-48c0-44c7-8761-87a690712925'
// 				}
// 			}
// 			).then(res => {
				if (res.data.length > 0) {
					this.dollerPrice = '$ ' + Number(res.data[0].price_usd).toFixed(2)
					this.dollerPerent = res.data[0].percent_change_1h + '%'
					if (this.dollerPerent.indexOf('-') === -1) {
						this.dollerPerent = '<span style="color:red">' + this.dollerPerent + '</span>'
					}
				} else {
					this.dollerPrice = 0
				}
			})
    },
		getAvgChart () {
			let dataArr = {
				dataArr: [this.getBeforeDate(0), this.getBeforeDate(1), this.getBeforeDate(2), this.getBeforeDate(3), this.getBeforeDate(4), this.getBeforeDate(5)]
			}
			this.blockHeightChart = []
			this.blockTimeChart = []
			this.transferChart = []
			this.socket.emit('blockAvg', dataArr)
			this.socket.on('blockAvg', (data) => {
				console.log('blockAvg')
				console.log(data)
				let resData = data
				if (resData && resData.info) {
					for (let i = resData.info.length - 1; i >= 0 ; i--) {
						if (i === 0) break
						let blockDayHeight = Number(resData.info[i - 1].data.number) - Number(resData.info[i].data.number)
						let blockDayTimeAvg = Number(resData.info[i - 1].data.timestamp) - Number(resData.info[i].data.timestamp)
						blockDayTimeAvg = Number(blockDayTimeAvg / blockDayHeight).toFixed(2)
						this.blockHeightChart.push(blockDayHeight)
						this.blockTimeChart.push(blockDayTimeAvg)
					}
					this.barChart('blockHeight', this.blockHeightChart, this.LANG.TITLE.AVG_BLOCK_HEIGHT)
					this.barChart('blockTime', this.blockTimeChart, this.LANG.TITLE.AVG_BLOCK_TIME)
				} 
			})
// 			this.$$.ajax(this.$http, this.$$.serverUrl + '/data/blockAvg', dataArr).then(res => {
// 				// console.log(res)
// 				if (res && res.info) {
// 					for (let i = res.info.length - 1; i >= 0 ; i--) {
// 						if (i === 0) break
// 						let blockDayHeight = Number(res.info[i - 1].data.number) - Number(res.info[i].data.number)
// 						let blockDayTimeAvg = Number(res.info[i - 1].data.timestamp) - Number(res.info[i].data.timestamp)
// 						blockDayTimeAvg = Number(blockDayTimeAvg / blockDayHeight).toFixed(2)
// 						this.blockHeightChart.push(blockDayHeight)
// 						this.blockTimeChart.push(blockDayTimeAvg)
// 					}
// 					this.barChart('blockHeight', this.blockHeightChart, 'Avg Block Helght')
// 					this.barChart('blockTime', this.blockTimeChart, 'Avg Block Time')
// 				} 
// 			})
			this.socket.emit('transferAvg', dataArr)
			this.socket.on('transferAvg', (data) => {
				console.log('transferAvg')
				console.log(data)
				let resData = data
				if (resData && resData.info) {
					for (let i = resData.info.length - 1; i >= 0 ; i--) {
						// if (i === 0) break
						let transferNum = resData.info[i].data
						// blockDayTimeAvg = Number(blockDayTimeAvg / blockDayHeight).toFixed(2)
						this.transferChart.push(transferNum)
						
						// console.log(this.$$.timeChange({date: resData.info[i].timestamp * 1000, type: 'yyyy-mm-dd hh:mm:ss'}))
					}
					// console.log(this.transferChart)
					if (this.transferChart[3] === 0) {
						this.transferPerent = 0
					} else {
						this.transferPerent = (Number(this.transferChart[4]) - Number(this.transferChart[3])) / Number(this.transferChart[3])
						this.transferPerent = this.transferPerent.toFixed(2)
					}
					// console.log(this.transferPerent)
					if (this.transferPerent > 0) {
						this.transferPerent = '<span style="color:red">+' + this.transferPerent + '%</span>'
					} else {
						this.transferPerent = '<span>' + this.transferPerent + '%</span>'
					}
					this.barChart('transactionsChart', this.transferChart, this.LANG.TITLE.TRANSACTIONS)
				}  
			})
// 			this.$$.ajax(this.$http, this.$$.serverUrl + '/data/transferAvg', dataArr).then(res => {
// 				console.log(res)
// 				if (res && res.info) {
// 					for (let i = res.info.length - 1; i >= 0 ; i--) {
// 						// if (i === 0) break
// 						let transferNum = res.info[i].data
// 						// blockDayTimeAvg = Number(blockDayTimeAvg / blockDayHeight).toFixed(2)
// 						this.transferChart.push(transferNum)
// 						
// 						// console.log(this.$$.timeChange({date: res.info[i].timestamp * 1000, type: 'yyyy-mm-dd hh:mm:ss'}))
// 					}
// 					// console.log(this.transferChart)
// 					if (this.transferChart[3] === 0) {
// 						this.transferPerent = 0
// 					} else {
// 						this.transferPerent = (Number(this.transferChart[4]) - Number(this.transferChart[3])) / Number(this.transferChart[3])
// 					}
// 					if (this.transferPerent >= 0) {
// 						this.transferPerent = '<span style="color:red">+' + this.transferPerent + '%</span>'
// 					} else {
// 						this.transferPerent = '<span>' + this.transferPerent + '%</span>'
// 					}
// 					this.barChart('transactionsChart', this.transferChart, 'Transactions')
// 				} 
// 			})
			
			this.socket.emit('blockTime', dataArr)
			this.socket.on('blockTime', (data) => {
				// console.log(data)
				let resData = data
				if (resData && resData.info) {
					this.blockTime = Number(resData.info).toFixed(2)
				}
			})
// 			this.$http.get(this.$$.serverUrl + '/data/blockTime').then(res => {
// 				if (res && res.data && res.data.info) {
// 					this.blockTime = Number(res.data.info).toFixed(2)
// 				}
// 				// console.log(res)
// 			})
		},
		setIintervalGetData () {
			let _params = {
				pageNum: 1,
				pageSize: 20
			}
			this.socket.emit('blocksRefresh', _params)
			this.socket.on('blocksRefresh', (data) => {
				// console.log(data)
				let resData = data
				if (resData.info.length > 0) {
					this.blockData = resData.info
					this.blockHeight = this.$$.thousandBit(resData.info[0].number, 'no')
				} else {
					this.blockData = []
					this.blockHeight = 0
				}
			})
			this.socket.emit('transactionRefresh', _params)
			this.socket.on('transactionRefresh', (data) => {
				// console.log(data)
				let resData = data
				if (resData.info) {
					this.transData = resData.info
					this.txnsData = this.$$.thousandBit(resData.total, 'no')
				} else {
					this.transData = []
					this.txnsData = 0
				}
			})
// 			this.$$.ajax(this.$http, this.blockUrl, _params).then(res => {
// 				// console.log(res)
// 				let data = res.info
// 				if (data.length > 0) {
// 					this.blockData = data
// 					this.blockHeight = this.$$.thousandBit(data[0].number, 'no')
// 				} else {
// 					this.blockData = []
// 					this.blockHeight = 0
// 				}
// 			})
// 			this.$$.ajax(this.$http, this.transUrl, _params).then(res => {
// 				// console.log(res)
// 				let data = res.info
// 				if (data) {
// 					this.transData = data
// 					this.txnsData = this.$$.thousandBit(res.total, 'no')
// 				} else {
// 					this.transData = []
// 					this.txnsData = 0
// 				}
// 			})
		},
		toUrl (url) {
			this.$router.push(url)
		},
		barChart (id, data, title) {
			// console.log(id)
			// console.log(data)
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
					type : 'log',
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
		document.getElementById('publicSearchId').style.display = 'block'
		this.socket.emit('clearInterval')
		
		this.socket.close()
		this.socket.disconnect()
		// socket.close()
		// console.log(socket)
		// socket.connect()
		// console.log(socket)
	}
}
</script>
