<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">Charts   Ethereum Transaction History</h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '' }">List of Charts</el-breadcrumb-item>
					<el-breadcrumb-item>Chart & Stats</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="bgbox chartTitle_box">
				<div class="chartTitle_time">
					<el-row :gutter="10">
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<div class="text">Highest number of {{highestBlock}} Transactions On {{nowDate}}</div>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<div class="text text-r">Lowest number of {{lowestBlock}} Transactions On {{beforeDate}}</div>
						</el-col>
					</el-row>
				</div>
				<div class="chartTitle_title">
					<h3 class="h3">FSN Transaction Chart</h3>
					<h4 class="h4">Source: Etherscan.io</h4>
					<h5 class="h5">Click and drag in the plot area to zoom in</h5>
					<div class="chartSet_box">
						<el-dropdown trigger="click"  @command="downloadPic">
							<span class="el-dropdown-link">
								<p class="line"></p>
								<p class="line"></p>
								<p class="line"></p>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="PNG">Download PNG image</el-dropdown-item>
								<el-dropdown-item command="JPG">Download JPG image</el-dropdown-item>
								<el-dropdown-item command="PDF">Download PDF document</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
				
				<div id="transferChart" style="height: 400px;"></div>
				<div class="downloadCsv">Download: <span class="blue">CSV Data</span> (Attribution Required)</div>
			</div>
		</div>
	</div>
</template>

<style>

</style>

<script>
import JsPDF from 'jspdf'
export default {
	name: '',
	data () {
		return {
			nowDate: '',
			beforeDate: '',
			highestBlock: '',
			lowestBlock: '',
			chartPic: ''
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
			// this.$$.ajax(this.$http, this.$$.serverUrl + '/chart/transfer', _params).then(res => {
			socket.emit('transfer')
			socket.on('transfer', (res) => {
				let data = res.info.sort((val1, val2) => {
					if (val1.timestamp < val2.timestamp) {
						return -1
					} else {
						return 1
					}
				})
				this.chartView(data)
				let tranData = res.info.sort((val1, val2) => {
					if (val1.blockCount < val2.blockCount) {
						return -1
					} else {
						return 1
					}
				})
				// console.log(tranData)
				this.nowDate = this.$$.timeToEN(tranData[tranData.length - 1].timestamp, 'all')
				this.beforeDate = this.$$.timeToEN(tranData[0].timestamp, 'all')
				this.highestBlock = tranData[tranData.length - 1].blockCount
				this.lowestBlock = tranData[0].blockCount
				// console.log(res)
			})
		},
		downloadPic (command) {
			let picBase64Info = this.chartPic.getDataURL()
			if (command === 'PDF') {
				var doc = new JsPDF('p', 'pt')
				doc.addImage(picBase64Info, 'JPEG', 0, 0, 500, 200)
				doc.save('Transaction.pdf')
				return
			}
			var $a = document.createElement('a')
			if (command === 'JPG') {
				let pic = picBase64Info.split('png')
				picBase64Info = pic[0] + 'jpeg' + pic[1]
			}
			$a.setAttribute("href", picBase64Info)
			$a.setAttribute("download", "Transaction")
			$a.click()
		},
		chartView (data) {
			let myChart = this.chartPic = echarts.init(document.getElementById('transferChart'))
			let option
			myChart.setOption(option = {
				color: ['#7cb5ec'],
				tooltip: {
					show: true,
					trigger: 'axis',
					backgroundColor: 'rgba(255,255,255,.8)',
					textStyle: {
						color: '#333',
						fontSize: 10
					},
					borderColor: '#7cb5ec',
					borderWidth: 1,
					formatter: (param) => {
						param = param[0]
						// console.log(param)
						param = param.data.data
						// console.log(param)
						return [
								this.$$.timeToEN(param.timestamp, 'all') + '<br/>[Total Transactions: '+ param['txnCount'] +']<hr size=1 style="margin: 3px 0">',
								'Avg Difficulty： <span style="font-weight:bold">' + param['difficultyAvg'] + '</span><br/>',
								'Est HashRate： <span style="font-weight:bold">' + param['EstHashRate'] + '</span><br/>',
								'Avg Block Time： <span style="font-weight:bold">' + param['blockTimeAvg'] + ' s</span><br/>',
								'Avg Block Size： <span style="font-weight:bold">' + param['blockSizeAvg'] + '</span><br/>',
								'Total Block Count： <span style="font-weight:bold">' + param['blockCount'] + '</span><br/>',
								'Total Uncles Count： <span style="font-weight:bold">' + param['unclesCount'] + '</span><br/>',
								'New Address Seen： <span style="font-weight:bold">' + param['addressCount'] + '</span><br/>'
						].join('')
					}
				},
				xAxis: {
					data: data.map((item, index) => {
						return this.$$.timeToEN(item.timestamp)
					}),
					min: 'dataMin',
					minInterval: 1,
					axisTick: {
						alignWithLabel: true
					}
				},
				yAxis: [
					{
						name: 'Transactions Per Day',
						splitLine: {
							show: true
						},
						axisLine: {
							show: false
						},
						nameLocation: 'middle',
						nameRotate: 90,
						nameGap: 50
					}
				],
				toolbox: {
					show: false
				},
				dataZoom: [{
					type: 'inside'
				}],
				series: [{
					name: 'Vlaue',
					type: 'line',
					data: data.map((item) => {
						return {
							data: item,
							value: item.txnCount
						}
					})
				}]
			}, true)
		}
	}
}
</script>
