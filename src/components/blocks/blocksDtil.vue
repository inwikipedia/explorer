<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">{{LANG.NAV.BLOCKS}}  <span class="subTitl">#{{blockNumber}}</span></h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">{{LANG.NAV.HOME}}</el-breadcrumb-item>
					<el-breadcrumb-item :to="{ path: '/blocks' }">{{LANG.NAV.BLOCKS}}</el-breadcrumb-item>
					<el-breadcrumb-item>{{LANG.CRUMBS.BLOCK_INFORMATION}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			
			<div class="blocksDtil_box">
				<aside class="blocksDtil_top flex-sc">
					<h3 class="title">{{LANG.CRUMBS.BLOCK_INFORMATION}}</h3>
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
						:show-header="false"
					>
						<el-table-column
							prop="name"
							width="260"
						>
						</el-table-column>
						<el-table-column
							align="left"
						>
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
			timestamp: 0,
			socket: null
		}
	},
	watch: {
		blockNumber(cur, old) {
			this.getBlocksInfo()
		},
		'$route' (to, from) {
			this.blockNumber = this.$route.query.params
		}
	},
	mounted () {
		this.socket = io(this.$$.serverUrl)
		this.blockNumber = this.$route.query.params
	},
	methods: {
		getBlocksInfo (number) {
			let _params = {
				number: this.blockNumber
			}
			// console.log(_params)
			// this.$$.ajax(this.$http, this.$$.serverUrl + '/data/blockNum', _params).then(res => {
			this.socket.emit('blockNum', _params)
			this.socket.on('blockNum', (res) => {
				if (!res.info) {
					// this.$message('Temporarily no data!')
					this.$message({
						showClose: true,
						message: this.LANG.ERROR.TIP_0,
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
			console.log(res)
			// console.log( this.$$.thousandBit((Number(res.info.gasUsed) / Number(res.info.gasLimit)), 2))
			this.blocksInfo = [
				{name: this.LANG.TABLE.HEIGHT + ':', value: this.$$.thousandBit(res.info.number, 'no')},
				{name: this.LANG.TABLE.TIMESTAMP + ':', value: this.$$.timesFun(res.info.timestamp) + ' (' + new Date(res.info.timestamp * 1000) + ')'},
				{name: this.LANG.TITLE.TRANSACTIONS + ':', value: '<span class="cursorP txnsBg" onclick=toUrl(\'/blockIndex/txns\','+ res.info.number +')>' + res.info.txns + ' transactions </span>in this block'},
				{name: this.LANG.TABLE.MINED_BY + ':', value: '<span class="blue cursorP" onclick=toUrl(\'/blockIndex/accountDtil\',"'+ res.info.miner +'")>' + res.info.miner + '</span'},
				{name: this.LANG.TABLE.BLOCK_REWARD + ':', value: this.$$.thousandBit(res.info.reward, 2)},
				{name: this.LANG.TABLE.UNCLES_REWARD + ':', value: res.info.uncles.length},
				{name: this.LANG.TABLE.DIFFICULTY + ':', value: this.$$.thousandBit(res.info.difficulty, 'no')},
				{name: this.LANG.TABLE.TOTAL_DIFFICULTY + ':', value: this.$$.thousandBit(res.info.totalDifficulty, 'no')},
				{name: this.LANG.TABLE.SIZE + ':', value: this.$$.thousandBit(res.info.size, 'no') + ' bytes'},
				{
					name: this.LANG.TABLE.GAS_USED + ':',
					value: this.$$.thousandBit(res.info.gasUsed, 'no') + ' (' + this.$$.thousandBit((Number(res.info.gasUsed) / Number(res.info.gasLimit)), 2) + '%)'},
				{name: this.LANG.TABLE.GAS_LIMIT + ':', value: this.$$.thousandBit(res.info.gasLimit, 'no')},
				{name: this.LANG.TABLE.PARENT_HASH + ':', value: '<span style="color:#1665d8">' + res.info.parentHash + '</span'},
				{name: this.LANG.TABLE.SHA3UNCLES + ':', value: res.info.sha3Uncles},
				{name: this.LANG.TABLE.NONCE + ':', value: Number(res.info.nonce)},
				{name: this.LANG.TABLE.EXTRA_DATA + ':', value: res.info.extraData},
			]
		}
	},
	beforeDestroy() {
		this.socket.close()
		this.socket.disconnect()
	}
}
</script>
