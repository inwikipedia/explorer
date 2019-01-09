<template>
	<div>
		<div class="container">
			<!-- <div class="flex-bc selectTime_box">
				<h3 class="title">Overview</h3>
				<el-date-picker v-model="selectTime" align="right" type="date" placeholder="Last 30 Days" :picker-options="pickerOptions1"></el-date-picker>
			</div> -->
			<el-row :gutter="20" class="echarView_box mt-15">
				<el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
					<div class="item">
						<h3 class="title">Block Helght</h3>
						<div class="echarData flex-jc-sb">
							<h4 class="big">98,351</h4>
							<!-- <p class="small">+6.9%</p> -->
						</div>
						<div class="echarView flex-jc-sb">
							<div class="icon"><img src="@/assets/img/BlockHelght.svg"></div>
							<div class="echarView_view"></div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
					<div class="item">
						<h3 class="title">Block Time</h3>
						<div class="echarData flex-jc-sb">
							<h4 class="big">15 <small style="font-size: 14px;">s</small></h4>
							<!-- <p class="small">+6.9%</p> -->
						</div>
						<div class="echarView flex-jc-sb">
							<div class="icon"><img src="@/assets/img/BlockTime.svg"></div>
							<div class="echarView_view"></div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
					<div class="item">
						<h3 class="title">Price</h3>
						<div class="echarData flex-jc-sb">
							<h4 class="big">{{dollerPrice}}</h4>
							<p class="small">{{dollerPerent}}</p>
						</div>
						<div class="echarView flex-jc-sb">
							<div class="icon"><img src="@/assets/img/Price.svg"></div>
							<div class="echarView_view"></div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="6">
					<div class="item">
						<h3 class="title">Transactions</h3>
						<div class="echarData flex-jc-sb">
							<h4 class="big">98,351</h4>
							<p class="small">+6.9%</p>
						</div>
						<div class="echarView flex-jc-sb">
							<div class="icon"><img src="@/assets/img/Transactions.svg"></div>
							<div class="echarView_view"></div>
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
							<el-button style="float: right; padding: 3px 0;color:#3e3f42" type="text">View All</el-button>
						</div>
						<div class="newBlock_table">
							<public-table
								:dataUrl="dataUrl"
								:params="{action: 'latest_blocks'}"
								:resData="'blocks'"
								:isThead="true"
								:className="'Blocks'"
								:setTimeout="15000"
								:setTimeoutFlag="true"
							>
								<table-data 
									:tableData="{
										params: [{param: 'number', type: 2}, {param: 'timestamp', type: 0}],
										html: '<div class=\'trans_style block_style\'><p class=\'rowItem\'><span class=\'big\'>{{param}}</span> {{param}}</p></div>'
									}"
								></table-data>
								<table-data 
									:tableData="{
										params: [{param: 'miner', type: 1, start: 10, end: 8}],
										html: '<div class=\'trans_style\'><p class=\'rowItem\'>By <span class=\'blue\'>{{param}}</span></p></div>'
									}"
								></table-data>
								<table-data 
									:tableData="{
										params: [{param: 'txn', type: 2}],
										html: '<div class=\'trans_style\'><p class=\'rowItem\'><span class=\'blue\'>{{param}}</span>Txns</p></div>'
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
							<el-button style="float: right; padding: 3px 0;color:#3e3f42" type="text">View All</el-button>
						</div>
						<div class="newBlock_table">
							<public-table 
								:dataUrl="dataUrl"
								:params="{action: 'latest_txs'}"
								:resData="'txs'"
								:isThead="true"
								:className="'Transactions'"
								:setTimeout="15000"
								:setTimeoutFlag="true"
							>
								<table-data 
									:tableData="{
										params: [{param: 'hash', type: 1, start: 10, end: 8}],
										html: '<div class=\'trans_style\'><p class=\'rowItem\'>TX# <span class=\'blue\'>{{param}}</span></p></div>'
									}"
								></table-data>
								<table-data :tableData="{
									params: [{param: 'timestamp', type: 0}],
									html: '<span class=\'ellipsis\'>{{param}}</span>'
								}"></table-data>
								<table-data 
									:tableData="{
										params: [{param: 'from', type: 1, start: 10, end: 8}],
										html: '<div class=\'trans_style\'><p class=\'rowItem\'>From <span class=\'blue\'>{{param}}</span></p></div>'
									}"
								></table-data>
								<table-data 
									:tableData="{
										params: [{param: 'to', type: 1, start: 10, end: 8}],
										html: '<div class=\'trans_style\'><p class=\'rowItem\'>To <span class=\'blue\'>{{param}}</span></p></div>'
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
export default {
	name: "",
	// comments: table,
	data () {
		return {
// 			pickerOptions1: {
// 				disabledDate(time) {
// 					return time.getTime() > Date.now();
// 				},
// 				shortcuts: [{
// 					text: "Today",
// 					onClick(picker) {
// 						picker.$emit("pick", new Date());
// 					}
// 				}, {
// 					text: "Last 1 Days",
// 					onClick(picker) {
// 					const date = new Date();
// 					date.setTime(date.getTime() - 3600 * 1000 * 24);
// 						picker.$emit("pick", date);
// 					}
// 				}, {
// 				text: "Last 7 Days",
// 					onClick(picker) {
// 					const date = new Date();
// 					date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
// 						picker.$emit("pick", date);
// 					}
// 				}, {
// 				text: "Last 30 Days",
// 					onClick(picker) {
// 					const date = new Date();
// 					date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
// 						picker.$emit("pick", date);
// 					}
// 				}]
// 			},
// 			selectTime: "",
			dataUrl: this.$$.baseUrl + "/data",
			dollerPrice: '',
			dollerPerent: ''
		}
	},
	mounted () {
		this.getDoller()
	},
	methods: {
		getDoller () {
			this.$http.get('https://api.coinmarketcap.com/v1/ticker/fusion/').then(res => {
				// console.log(res)
				if (res.data.length > 0) {
					this.dollerPrice = '$ ' + Number(res.data[0].price_usd).toFixed(2)
					this.dollerPerent = res.data[0].percent_change_24h + '%'
				} else {
					this.dollerPrice = 0
				}
			})
    }
	}
}
</script>