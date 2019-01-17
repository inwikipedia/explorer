<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">Block  #{{blockNumber}}</h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/blocks' }">Blocks</el-breadcrumb-item>
					<el-breadcrumb-item>Block Information</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			
			<div class="blocksDtil_box">
				<aside class="blocksDtil_top flex-sc">
					<h3 class="title">Block Information</h3>
					<ul class="flex-bc">
						<li><i class="icon el-icon-arrow-left" @click="prevBtn"></i></li>
						<li><i class="icon el-icon-arrow-right" @click="nextBtn"></i></li>
					</ul>
				</aside>
				<div class="blocksDtil_table">
					<el-table
						:data="blocksInfo"
						style="width: 100%"
						size="mini"
						empty-text="Null"
					>
						<el-table-column
							prop="name"
							label="TITLE"
						>
						</el-table-column>
						<el-table-column
							align="left"
						>
							<template slot="header" slot-scope="scope">
								DETAILS
							</template>
							<template slot-scope="scope">
								<span v-html="scope.row.value"></span>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>
	</div>
</template>

<style>

</style>

<script>
export default {
	name: 'BlockDetails',
	data () {
		return {
			blockNumber: 0,
			blocksInfo: []
		}
	},
	watch: {
		blockNumber(cur, old) {
			this.getBlocksInfo()
		}
	},
	mounted () {
		this.blockNumber = this.$route.query.params
		// this.getBlocksInfo()
	},
	methods: {
		getBlocksInfo (number) {
			let _params = {
				number: this.blockNumber
			}
// 			let Qs = require('qs')
// 			this.$http.post(this.$$.serverUrl + '/data/blockNum', Qs.stringify(_params)).then((res) => {
// 				
// 			})
			this.$$.ajax(this.$http, this.$$.serverUrl + '/data/blockNum', _params).then(res => {
				if (!res.info) {
					// this.$message('Temporarily no data!')
					this.$message({
						showClose: true,
						message: 'Temporarily no data!',
						type: 'warning'
					})
					this.blocksInfo = []
					return
				}
				this.blocksInfo = [
					{name: 'Height:', value: this.$$.thousandBit(res.info.number, 'no')},
					{name: 'Timestamp:', value: this.$$.timesFun(res.info.timestamp)},
					{name: 'Transactions:', value: res.info.transactionsRoot},
					{name: 'Height:', value: this.$$.thousandBit(res.info.number, 'no')},
					{name: 'Parent Hash:', value: '<span style="color:#1665d8">' + res.info.parentHash + '</span'},
					{name: 'Sha3Uncles:', value: res.info.sha3Uncles},
					{name: 'Mined By:', value: '<span style="color:#1665d8">' + res.info.miner + '</span'},
					{name: 'Difficulty:', value: this.$$.thousandBit(res.info.difficulty, 'no')},
					{name: 'Total Difficulty:', value: this.$$.thousandBit(res.info.totalDifficulty, 'no')},
					{name: 'Size:', value: this.$$.thousandBit(res.info.size, 'no') + ' bytes'},
					{name: 'Gas Used:', value: this.$$.thousandBit(res.info.gasUsed, 'no')},
					{name: 'Gas Limit:', value: this.$$.thousandBit(res.info.gasLimit, 'no')},
					{name: 'Nonce:', value: Number(res.info.nonce)},
					{name: 'Block Reward:', value: res.info.number},
					{name: 'Uncles Reward:', value: res.info.uncles},
					{name: 'Extra Data:', value: res.info.extraData},
				]
			})
		},
		prevBtn () {
// 			this.blockNumber--
// 			console.log(this.blockNumber)
			this.$router.push({path: '/blockIndex/blocksDtil', query: {params: --this.blockNumber}})
		},
		nextBtn () {
// 			this.blockNumber++
// 			console.log(this.blockNumber)
			this.$router.push({path: '/blockIndex/blocksDtil', query: {params: ++this.blockNumber}})
		}
	},
}
</script>
