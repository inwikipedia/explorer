<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">Pending Transactions</h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
					<el-breadcrumb-item>Pending</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div style="height: 100%;">				
				<public-table 
					:dataUrl="dataUrl"
					:params="params"
					:resData="''"
					:className="'Transactions'"
					:title="{
						txt: 'A total of {{param}} Pending Txns found',
						params: ['totalNum']
					}"
				>
					<table-data 
						:tableData="{
							th: 'TxHash',
							width: '4',
							params: [{param: 'hash'}, {param: 'hash', type: 1, start: 10, end: 8}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'><span class=\'blue cursorP\' onclick=toUrl(\'/blockIndex/txnsDtil\',\'{{param}}\')>{{param}}</span></p></div>'
						}"
					></table-data>
					<table-data :tableData="{
						th: 'Block',
						width: '3',
						params: [{param: 'blockNumber', type: 2}],
						html: '<span class=\'ellipsis\'>{{param}}</span>'
					}"></table-data>
					<table-data 
						:tableData="{
							th: 'Age',
							width: '3',
							params: [{param: 'timestamp', type: 0}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: 'From',
							width: '4',
							params: [{param: 'from'}, {param: 'from', type: 1, start: 10, end: 8}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'><span class=\'blue cursorP\' onclick=toUrl(\'/blockIndex/accountDtil\',\'{{param}}\')>{{param}}</span></p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: 'To',
							width: '4',
							params: [{param: 'to'},{param: 'to', type: 1, start: 10, end: 8}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'><span class=\'blue\' onclick=toUrl(\'/blockIndex/accountDtil\',\'{{param}}\')>{{param}}</span></p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: 'Value',
							width: '3',
							params: [{param: 'value', type: 2}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: '[TxFee]',
							width: '3',
							params: [{param: 'gas', type: 2}],
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
// import Qs from 'qs'
export default {
	name: '',
	data () {
		return {
			dataUrl: this.$$.serverUrl + '/data/pendingBlocks',
			blockData: [],
			params: {
				pageSize: 20,
				count: 0
			}
		}
	},
	mounted () {
	}
}
</script>
