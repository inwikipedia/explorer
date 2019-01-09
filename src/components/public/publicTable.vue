<template>
	<div class="pubTable_box" :style="!isThead ? '' : 'padding:0'" :class="className">
		<slot></slot>
		<div class="pubTable_thead" v-if="!isThead">
			<el-col :span="Number(item.width)" class="th" v-for="(item, index) in thead" :key="item.index">{{item.th}}</el-col>
		</div>
		<div class="pubTable_tbody">						
			<el-scrollbar style="height:100%;width: 100%;">
				<table>
					<tbody v-html="tableHtml"></tbody>
				</table>
			</el-scrollbar>
		</div>
	</div>
</template>

<style>

</style>

<script>
export default {
	name: 'Table',
	props: ['dataUrl', 'params', 'resData', 'isThead', 'className', 'setTimeout', 'setTimeoutFlag'],
	data () {
		return {
			tableData: [],
			thead: [],
			tableHtml: '',
			loading: '',
			refreshSetInterval: ''
		}
	},
	mounted () {
		this.addLoading()
		this.getInitData()
		// console.log(this.setTimeoutFlag)
		if (this.setTimeoutFlag) {
			this.setTimeout = this.setTimeout ? this.setTimeout : 15000
			this.refreshSetInterval = setInterval(() => {
				this.getInitData()
			}, this.setTimeout)
		}
	},
	methods: {
		getInitData () {
			this.tableData = []
			this.$http.post(this.dataUrl, this.params).then(res => {
				// console.log(res)
				let data = res.data && res.data[this.resData] ? res.data[this.resData] : []
				if (data.length > 0) {
					this.tableData = data
					this.tableHTML(this.tableData)
					this.removeLoading()
				} else {
					this.tableData = []
				}
			})
		},
		tableHTML (data) {
			let _thead = this.thead
			let _tbody = ''
			for (let i = 0; i < data.length; i++) {
				let _tr = '<tr>'
				for (let j = 0; j < _thead.length; j++) {
					_tr += this.tdHTML(_thead[j].html, _thead[j].params, data[i])
				}
				_tr += '</tr>'
				_tbody += _tr
			}
			this.tableHtml = _tbody
		},
		tdHTML (html, params, data) {
			let _td = '<td>'
			if (html) {				
				let _html = html.split('{{param}}')
				if ((typeof params).toLowerCase() === 'object' || (typeof params).toLowerCase() === 'array') {					
					for (let i = 0; i < _html.length; i++) {
						if (i === (_html.length - 1)) {
							_td += _html[i]
						} else {
							if (typeof params[i] === 'string') {
								_td += _html[i] + data[params[i]]
							} else {
								_td += _html[i] + this.paramType(params[i], data)
							}
						}
					}
				} else {
					_td += _html[0] + data[params] + _html[1]
				}
				_td += '</td>'
			} else {
				_td += data[params] + '</td>'
			}
			return _td
		},
		paramType (param, data) {
			let callback = ''
			if (Number(param.type) === 0) { //time
				let nowTime = Date.parse(new Date())
				callback = this.$$.timesFun(data[param.param], nowTime)
			} else if (Number(param.type) === 1) { //ellipsis
				param.start = param.start ? param.start : 6
				param.end = param.end ? param.end : param.start
				callback = this.$$.cutStr(data[param.param], param.start, param.end)
			} else if (Number(param.type) === 2) { //number
				callback = this.$$.thousandBit(data[param.param], 'no')
			}
			return callback
		},
		addLoading () {
			this.loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(255, 255, 255, 0.5)',
				target: document.querySelector('.' + this.className),
			})
		},
		removeLoading () {
			this.loading.close()
		}
	},
	beforeDestroy() {
		clearInterval(this.refreshSetInterval)
		this.refreshSetInterval = null
	}
}
</script>
