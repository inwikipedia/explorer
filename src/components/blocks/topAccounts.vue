<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">Top Accounts By ETH Balance</h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
					<el-breadcrumb-item>Accounts</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div style="height: 100%;">				
				<public-table 
					:dataUrl="dataUrl"
					:params="params"
					:resData="''"
					:className="'Transactions'"
					:title="{
						txt: 'A total of > 1999999 Accounts found (104,168,707.061 Ether)',
						params: ['totalNum']
					}"
				>
					<table-data 
						:tableData="{
							th: 'Rank',
							width: '2',
							params: 'paramIndex',
							html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
						}"
					></table-data>
					<table-data :tableData="{
						th: 'Address',
						width: '10',
						params: [{param: 'blockNumber'}, {param: 'blockNumber', type: 2}],
						html: '<div class=\'trans_style\'><p class=\'rowItem\'><span class=\'blue cursorP\' onclick=toUrl(\'/blockIndex/accountDtil\',\'{{param}}\')>{{param}}</span></p></div>'
					}"></table-data>
					<table-data 
						:tableData="{
							th: 'Balance',
							width: '4',
							params: [{param: 'timestamp', type: 0}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: 'Percentage',
							width: '4',
							params: [{param: 'from'}, {param: 'from', type: 1, start: 10, end: 8}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'><span class=\'blue\'>{{param}}</span></p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: 'TxCount',
							width: '4',
							params: [{param: 'to', type: 1, start: 10, end: 8}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'><span class=\'blue\'>{{param}}</span></p></div>'
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
			// dataUrl: this.$$.serverUrl + '/data/topAccounts',
			dataUrl: 'topAccounts',
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
