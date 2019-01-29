<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">{{LANG.BLOCKS}}  #{{blockNumber}}</h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">{{LANG.HOME}}</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/blocks' }">{{LANG.BLOCKS}}</el-breadcrumb-item>
					<el-breadcrumb-item>{{LANG.BLOCK_INFORMATION}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			
			<div class="blocksDtil_box">
				<aside class="blocksDtil_top flex-sc">
					<h3 class="title">{{LANG.BLOCK_INFORMATION}}</h3>
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
							:label="LANG.TITLE"
						>
						</el-table-column>
						<el-table-column
							align="left"
						>
							<template slot="header" slot-scope="scope">
								{{LANG.DETAILS}}
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
			blocksInfo: [],
			count: 0,
			timestamp: 0
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
			// this.$$.ajax(this.$http, this.$$.serverUrl + '/data/blockNum', _params).then(res => {
			this.count = 0
			socket.emit('blockNum', _params)
			socket.on('blockNum', (res) => {
				this.count ++
				if (this.count > 1) return
				if (!res.info) {
					// this.$message('Temporarily no data!')
					this.$message({
						showClose: true,
						message: this.LANG.ERROR_TIP_0,
						type: 'warning'
					})
					this.blocksInfo = []
					return
				}
				this.timestamp = res.info.timestamp
				this.setDatd(res)
			})
		},
		prevBtn () {
			this.$router.push({path: '/blockIndex/blocksDtil', query: {params: --this.blockNumber}})
		},
		nextBtn () {
			this.$router.push({path: '/blockIndex/blocksDtil', query: {params: ++this.blockNumber}})
		},
		setDatd (res) {
			this.blocksInfo = [
				{name: this.LANG.HEIGHT + ':', value: this.$$.thousandBit(res.info.number, 'no')},
				{name: this.LANG.TIMESTAMP + ':', value: this.$$.timesFun(res.info.timestamp)},
				{name: this.LANG.TRANSACTIONS + ':', value: res.info.transactionsRoot},
				{name: this.LANG.HEIGHT + ':', value: this.$$.thousandBit(res.info.number, 'no')},
				{name: this.LANG.PARENT_HASH + ':', value: '<span style="color:#1665d8">' + res.info.parentHash + '</span'},
				{name: this.LANG.SHA3UNCLES + ':', value: res.info.sha3Uncles},
				{name: this.LANG.MINED_BY + ':', value: '<span style="color:#1665d8">' + res.info.miner + '</span'},
				{name: this.LANG.DIFFICULTY + ':', value: this.$$.thousandBit(res.info.difficulty, 'no')},
				{name: this.LANG.TOTAL_DIFFICULTY + ':', value: this.$$.thousandBit(res.info.totalDifficulty, 'no')},
				{name: this.LANG.SIZE + ':', value: this.$$.thousandBit(res.info.size, 'no') + ' bytes'},
				{name: this.LANG.GAS_USED + ':', value: this.$$.thousandBit(res.info.gasUsed, 'no')},
				{name: this.LANG.GAS_LIMIT + ':', value: this.$$.thousandBit(res.info.gasLimit, 'no')},
				{name: this.LANG.NONCE + ':', value: Number(res.info.nonce)},
				{name: this.LANG.BLOCK_REWARD + ':', value: res.info.number},
				{name: this.LANG.UNCLES_REWARD + ':', value: res.info.uncles},
				{name: this.LANG.EXTRA_DATA + ':', value: res.info.extraData},
			]
		},
// 		prevBtn () {
// 			let _params = {
// 				timestamp: this.timestamp,
// 				page: 'prev'
// 			}
// 			this.getPageUrl(_params)
// 		},
// 		nextBtn () {
// 			let _params = {
// 				timestamp: this.timestamp,
// 				page: 'next'
// 			}
// 			this.getPageUrl(_params)
// 		},
// 		getPageUrl (_params) {
// 			// this.$$.ajax(this.$http, this.$$.serverUrl + '/data/transferPage', _params).then(res => {
// 			console.log(_params)
// 			socket.emit('blockPage', _params)
// 			socket.on('blockPage', (res) => {
// 				console.log(res)
// 				if (!res.info) {
// 					this.$message({
// 						message: 'Temporarily no data!',
// 						type: 'warning'
// 					})
// 					this.blocksInfo = []
// 					return
// 				}
// 				this.$router.push({path: '/blockIndex/blocksDtil', query: {params: res.info.number}}),
// 				this.blockNumber = res.info.number
// 				// this.setDatd(res)
// 			})
// 		}
	},
}
</script>
