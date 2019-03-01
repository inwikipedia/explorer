<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">Total Ether Supply and Market Capitalization</h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">{{LANG.NAV.HOME}}</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '' }">{{LANG.CRUMBS.LIST_OF_CHARTS}}</el-breadcrumb-item>
					<el-breadcrumb-item>{{LANG.CRUMBS.CHARTS_STATS}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="bgbox chartView_box">
				<el-row :gutter="10">
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="chartView_left">
						<el-row :gutter="10">
							<el-col :span="24" class="item"><div class="flex-sc"><img><h3 class="bold">ETHER DISTRIBUTION OVERVIIEW</h3></div></el-col>
							<el-col :span="12" class="item">Genesis (60M Crowdsales)</el-col>
							<el-col :span="12" class="item">234234 Ether</el-col>
							<el-col :span="12" class="item">+Mining Block Rewards:</el-col>
							<el-col :span="12" class="item">234234 Ether</el-col>
							<el-col :span="12" class="item">+Mining Uncle Rewards:</el-col>
							<el-col :span="12" class="item">234234 Ether</el-col>
							<el-col  :span="12" class="item">=Current Total Supply:</el-col>
							<el-col :span="12" class="item">234234 Ether</el-col>
							<el-col :span="24" class="mt-10">Data Source: <span class="blue">Total Ether Supply API</span></el-col>
						</el-row>
						
						<el-row :gutter="10" class="mt-60">
							<el-col :span="24" class="item"><div class="flex-sc"><h3 class="bold">$ PRICE PER ETHER</h3></div></el-col>
							<el-col :span="12" class="item">In USD:</el-col>
							<el-col :span="12" class="item">$ 151.21</el-col>
							<el-col :span="12" class="item">In BTC:</el-col>
							<el-col :span="12" class="item">0.4569</el-col>
							<el-col :span="24" class="mt-10">Data Source: <span class="blue">CryptoCompare</span></el-col>
						</el-row>
					</el-col>
					<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
						<div class="chartView_right">
							<el-row :gutter="10">
								<el-col :span="12" class="item">
									<h3 class="big">103,366</h3>
									<p class="p">Total Ether Supply</p>
								</el-col>
								<el-col :span="12" class="item">
									<h3 class="big">$103,366</h3>
									<p class="p">Market Capitalization</p>
								</el-col>
							</el-row>
							<div id="supplyType" class="supplyType_box"></div>
						</div>
					</el-col>
				</el-row>
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
			
		}
	},
	mounted () {
		this.getData()
	},
	methods: {
		getData () {
// 			let _params = {
// 				startTime: Date.parse(new Date()) / 1000 - (1 * 60 * 60 * 24 * 60),
// 				endTime: Date.parse(new Date()) / 1000
// 			}
// 			this.nowDate = this.$$.timeToEN(_params.endTime, 'all')
// 			this.beforeDate = this.$$.timeToEN(_params.startTime, 'all')
// 			this.$$.ajax(this.$http, this.$$.serverUrl + '/chart/transfer', _params).then(res => {
// 				this.chartView(res.info)
// 				this.highestBlock = res.info[res.info.length - 1].blockNumber
// 				this.lowestBlock = res.info[0].blockNumber
// 				// console.log(res)
// 			})
			let data = [
				{name: 'Genesis', value: 100},
				{name: 'Block Rewards', value: 200},
				{name: 'Uncle Rewards', value: 300},
			]
			this.chartView(data)
		},
		chartView (data) {
			let myChart = echarts.init(document.getElementById('supplyType'))
			let legendData = ['Genesis', 'Block Rewards', 'Uncle Rewards']
			let option = {
				title : {
					text: 'Breakdown By Supply Types',
					// subtext: '纯属虚构',
					x:'center'
				},
				tooltip : {},
				legend: {
					orient: 'vertical',
					bottom: '10',
					data: legendData,
					width: '100%',
					orient: 'horizontal'
				},
				series : [
					{
						name: '访问来源',
						type: 'pie',
						radius : '55%',
						label: {
							show: false
						},
						center: ['50%', '50%'],
						data: data.map((item, index) => {
							return item.value
						}),
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						},
						tooltip: {
							trigger: 'item',
							formatter: (param) => {
								// param = param[0]
								// console.log(param)
								// console.log(myChart.legend)
								return legendData[param.dataIndex]
							}
						}
					}
				]
			}
			myChart.setOption(option, true)
		}
	}
}
</script>
