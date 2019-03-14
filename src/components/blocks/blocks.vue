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
							params: [{param: 'number'}, {param: 'number'}],
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
						params: [{param: 'number'}, {param: 'txns', type: 2}],
						html: '<div class=\'trans_style\'><span class=\'ellipsis cursorP blue\' onclick=toUrl(\'/blockIndex/txns\',\'{{param}}\')>{{param}}</span></div>'
					}"></table-data>
					<table-data 
						:tableData="{
							th: LANG.TABLE.UNCLES,
							width: '2',
							params: [{param: 'uncles', type: 4}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'><span>{{param}}</span></p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: LANG.TABLE.MINER,
							width: '4',
							params: [{param: 'miner'}, {param: 'miner', type: 1, start: 10, end: 8}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'><span onclick=toUrl(\'/blockIndex/accountDtil\',\'{{param}}\') class=\'blue cursorP\'>{{param}}</span></p></div>'
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
							th: LANG.TABLE.AVG_GAS_PRICE,
							width: '2',
							params: [{param: 'avgGasprice'}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}} Gwei</p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: LANG.TABLE.REWARD,
							width: '2',
							params: [{param: 'reward', type: 2}],
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
				pageSize: 50,
				pageNum: 0
			}
		}
	},
	mounted () {
		
	}
}
</script>
