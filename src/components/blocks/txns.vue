<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">{{LANG.TITLE.TRANSACTIONS}}</h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">{{LANG.NAV.HOME}}</el-breadcrumb-item>
					<el-breadcrumb-item>{{LANG.TITLE.TRANSACTIONS}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div style="height: 100%;">				
				<public-table 
					:dataUrl="dataUrl"
					:params="params"
					:resData="''"
					:className="LANG.TITLE.TRANSACTIONS"
					:title="{
						txt: LANG.SUBTITLE.TXNS_TITLE,
						params: ['totalNum']
					}"
				>
					<table-data 
						:tableData="{
							th: LANG.TABLE.TXHASH,
							width: '4',
							params: [{param: 'hash'}, {param: 'hash', type: 1, start: 10, end: 8}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'><span class=\'blue cursorP\' onclick=toUrl(\'/blockIndex/txnsDtil\',\'{{param}}\')>{{param}}</span></p></div>'
						}"
					></table-data>
					<table-data :tableData="{
						th: LANG.NAV.BLOCKS,
						width: '3',
						params: [{param: 'blockNumber'}, {param: 'blockNumber', type: 2}],
						html: '<div class=\'trans_style\'><span class=\'ellipsis blue cursorP\' onclick=toUrl(\'/blockIndex/blocksDtil\',\'{{param}}\')>{{param}}</span></div>'
					}"></table-data>
					<table-data 
						:tableData="{
							th: LANG.TABLE.AGE,
							width: '3',
							params: [{param: 'timestamp', type: 0}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: LANG.TABLE.FROM,
							width: '4',
							params: [{param: 'from'}, {param: 'from', type: 1, start: 10, end: 8}],
							html: '<div class=\'trans_style\'><p class=\'rowItem flex-bc\'><span class=\'blue cursorP\' onclick=toUrl(\'/blockIndex/accountDtil\',\'{{param}}\')>{{param}}</span><i class=\'el-icon-caret-right\' style=\'color:#3bad4b;font-size:16px\'></i></p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: LANG.TABLE.TO,
							width: '4',
							params: [{param: 'to'},{param: 'to', type: 1, start: 10, end: 8}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'><span class=\'blue cursorP\' onclick=toUrl(\'/blockIndex/accountDtil\',\'{{param}}\')>{{param}}</span></p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: LANG.TABLE.VALUE,
							width: '3',
							params: [{param: 'value', type: 2}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'>{{param}}</p></div>'
						}"
					></table-data>
					<table-data 
						:tableData="{
							th: LANG.TABLE.TXFEE,
							width: '3',
							params: [{param: 'gas', param2: 'gasPrice', type: 3}],
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
			// dataUrl: this.$$.serverUrl + '/data/transaction',
			dataUrl: 'transaction',
			blockData: [],
			params: {
				pageSize: 50,
				pageNum: 0
			},
			web3: ''
		}
	},
	mounted () {
		this.params.blockNumber = this.$route.query.params ? Number(this.$route.query.params) : undefined
	}
}
</script>
