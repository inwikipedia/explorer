<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">{{LANG.NAV.BLOCKS}}</h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">{{LANG.NAV.HOME}}</el-breadcrumb-item>
					<el-breadcrumb-item>{{LANG.NAV.BLOCKS}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div style="height: 100%;">				
				<public-table 
					:dataUrl="dataUrl"
					:params="params"
					:resData="''"
					:className="LANG.NAV.BLOCKS"
					:title="{
						txt: LANG.SUBTITLE.BLOCKS_TITLE,
						params: ['strat#number','end#number','totalNum']
					}"
				>
					<table-data 
						:tableData="{
							th: LANG.TABLE.HEIGHT,
							width: '2',
							params: [{param: 'number'}, {param: 'number', type: 2}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'><a onclick=toUrl(\'/blockIndex/blocksDtil\',\'{{param}}\') class=\'cursorP\'><span class=\'blue\'>{{param}}</span></a></p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: LANG.TABLE.AGE,
							width: '4',
							params: [{param: 'timestamp', type: 0}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
						}"
					></table-data>
					<table-data :tableData="{
						th: LANG.NAV.TXNS,
						width: '2',
						params: [{param: 'blockNumber', type: 2}],
						html: '<span class=\'ellipsis\'>{{param}}</span>'
					}"></table-data>
					<table-data 
						:tableData="{
							th: LANG.TABLE.UNCLES,
							width: '2',
							params: [{param: 'uncles'}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'><a onclick=toUrl(\'/blocks?id=\') class=\'cursorP\'><span class=\'blue\'>{{param}}</span></a></p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: LANG.TABLE.MINER,
							width: '4',
							params: [{param: 'miner', type: 1, start: 10, end: 8}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'><span class=\'blue\'>{{param}}</span></p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: LANG.TABLE.GAS_USED,
							width: '4',
							params: [{param: 'gasUsed', type: 2}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: LANG.TABLE.GAS_LIMIT,
							width: '2',
							params: [{param: 'gasLimit', type: 2}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: LANG.TABLE.GAS_PRICE,
							width: '2',
							params: [{param: 'gas', type: 2}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: LANG.TABLE.REWARD,
							width: '2',
							params: [{param: 'miner', type: 2}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
						}"
					></table-data>
				</public-table>
			</div>
		</div>
	</div>
</template>

<style>
	
</style>

<script>
import Qs from 'qs'
export default {
	name: '',
	data () {
		return {
			// dataUrl: this.$$.serverUrl + '/data/blocks',
			dataUrl: 'blocks',
			blockData: [],
			params: {
				pageSize: 20,
				count: 0
			}
		}
	},
	mounted () {
		// console.log(this.lang)
		// 1545696000,
		// 1548547200
// 		console.log(this.$$.timeChange({
// 			type: 'yyyy-mm-dd hh:mm:ss',
// 			date: 1545696000 * 1000
// 		}))
		// this.dataUrl = this.$$.serverUrl + '/data/transaction'
// 		this.params = {
// 			pageSize: 20,
// 			count: 0
// 		}
// 		this.$$.ajax(this.$http, this.dataUrl, this.params).then(res => {
// 			console.log(res)
// 		})
	}
}
</script>
