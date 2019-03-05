<template>
	<div>
		<div class="container">
			<div class="flex-bc breadcrumb_box">
				<h3 class="title">{{LANG.TOP_ACCOUNTS.TITLE_0}}</h3>
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }">{{LANG.NAV.HOME}}</el-breadcrumb-item>
					<el-breadcrumb-item>{{LANG.CRUMBS.ACCOUNT}}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<div style="height: 100%;">				
				<public-table 
					:dataUrl="dataUrl"
					:params="params"
					:resData="''"
					:className="'topAccount'"
					:title="{
						txt: LANG.TOP_ACCOUNTS.TITLE_1 + params.balance + LANG.TOP_ACCOUNTS.TITLE_2,
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
						params: [{param: 'address'}, {param: 'address'}],
						html: '<div class=\'trans_style\'><p class=\'rowItem\'><span class=\'blue cursorP\' onclick=toUrl(\'/blockIndex/accountDtil\',\'{{param}}\')>{{param}}</span></p></div>'
					}"></table-data>
					<table-data 
						:tableData="{
							th: 'Balance',
							width: '4',
							params: [{param: 'balance', type: 2}],
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
							params: [{param: 'TxCount', type: 2}],
							html: '<div class=\'trans_style\'><p class=\'rowItem\'><span class=\'\'>{{param}}</span></p></div>'
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
			// dataUrl: 'topAccounts',
			dataUrl: 'getAccounts',
			blockData: [],
			params: {
				pageSize: 20,
				count: 0,
				balance: 500
			},
			socket: null
		}
	},
	mounted () {
		this.socket = io(this.$$.serverUrl)
		let params = {}
		this.socket.emit(this.dataUrl, params)
		this.socket.on(this.dataUrl, (res) => {
			
		})
	},
	beforeDestroy() {
		this.socket.close()
		this.socket.disconnect()
	}
}
</script>
