<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">Unique Address Growth Chart</h3>
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
			let _params = {
				startTime: Date.parse(new Date()) / 1000 - (1 * 60 * 60 * 24 * 60),
				endTime: Date.parse(new Date()) / 1000
			}
			this.nowDate = this.$$.timeToEN(_params.endTime, 'all')
			this.beforeDate = this.$$.timeToEN(_params.startTime, 'all')
			// this.$$.ajax(this.$http, this.$$.serverUrl + '/chart/transfer', _params).then(res => {
			socket.emit('transfer', _params)
			socket.on('transfer', (res) => {
				// console.log(res)
				let data = res.info.sort((val1, val2) => {
					if (val1.timestamp < val2.timestamp) {
						return -1
					} else {
						return 1
					}
				})
				let dataArr = []
				for (let i = 0; i < data.length; i++) {
					if (i > 1) {
						if (data[i].addressNum === data[i - 1].addressNum) {
							continue
						} else {
							dataArr.push(data[i])
						}
					} else {
						dataArr.push(data[i])
					}
				}
				this.chartView(dataArr)
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
						// console.log(param)
						param = param[0]
						param = param.data.data
						// console.log(param)
						return [
								this.$$.timeToEN(param.timestamp, 'all') + '<br/>[Total Distinct Address: '+ param['txnCount'] +']'
						].join('')
					}
				},
				xAxis: {
					data: data.map((item, index) => {
						return this.$$.timeToEN(item.timestamp)
					})
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
					smooth: true,
					smoothMonotone: 'none',
					areaStyle: {normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1,
							[
								{offset: 0, color: '#7eb6ec'},
								{offset: 1, color: '#fff'}
							]
						)
					}},
					data: data.map((item) => {
							return {
								data: item,
								value: item.addressNum
							}
					})
				}]
			}, true)
		}
	}
}
</script>
