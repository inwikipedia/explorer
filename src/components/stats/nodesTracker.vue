<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">Ethereum Node Tracker</h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
					<el-breadcrumb-item>Node Tracker</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div class="bgbox chartView_box">
				<div class="nodeTracker_box">
					<el-row :gutter="10">
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="chartView_left">
							<el-row :gutter="10">
								<el-col :span="24" class="item"><div class="flex-sc"><img><h3 class="bold">Top 10 Countries</h3></div></el-col>
							</el-row>
							
							<div>
								
							</div>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
							<div class="chartView_right">
								<el-row :gutter="10">
									
								</el-row>
								<div id="supplyType" class="supplyType_box"></div>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
.nodeTracker_box{width:100%;background: #f7f7f7;padding: 25px 18px;}
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
		getData() {
// 			this.$http.get('https://etherscan.io/stats_nodehandler.ashx?t=1&code=&range=1&additional=').then(res => {
// 				console.log(res)
// 			})
		}
	},
}
</script>
