<template>
	<div class="pubTable_box" :style="!isThead ? '' : 'padding:0'" :class="className">
		<slot></slot>
		<div class="pageView_box pageView_top flex-bc" v-if="!isPageTop">
			<h3 class="title">{{titleTxt}}</h3>
			<ul class="pageView_btn">
				<li class="prev" @click="prevBtn" :class="isPrev ? 'active' : ''"><span>First</span></li>
				<li class="now">
					<i class="icon el-icon-arrow-left" @click="prevBtn" :class="isPrev ? 'active' : ''"></i>
					<span class="curr">Page {{currPage}} of {{totalPage}}</span>
					<i class="icon el-icon-arrow-right" @click="nextBtn" :class="isNext ? 'active' : ''"></i>
				</li>
				<li class="next" @click="nextBtn" :class="isNext ? 'active' : ''"><span>Next</span></li>
			</ul>
		</div>
		<div class="pubTable_thead pubTable_theadAbso" v-if="!isThead">
			<el-col :span="Number(item.width)" class="th flex-ai-c" v-for="(item, index) in thead" :key="item.index">{{item.th}}</el-col>
		</div>
		<div class="pubTable_tbody">						
			<el-scrollbar style="height:100%;width: 100%;" v-if="tableFlag">
				<table>
					<tbody v-html="tableHtml"></tbody>
				</table>
			</el-scrollbar>
			<div v-if="!tableFlag" class="dataEmpty flex-c">Null</div>
		</div>
		<div class="pageView_box pageView_bottom flex-bc" v-if="!isPageBottom">
			<div class="pageView_select flex-c">
				Show
				<el-select v-model="selectValue" filterable placeholder="-- Please select --">
					<el-option
						v-for="item in selectPageSize"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
				Page
			</div>
			<ul class="pageView_btn">
				<li class="prev" @click="prevBtn" :class="isPrev ? 'active' : ''"><span>First</span></li>
				<li class="now">
					<i class="icon el-icon-arrow-left" @click="prevBtn" :class="isPrev ? 'active' : ''"></i>
					<span class="curr">Page {{currPage}} of {{totalPage}}</span>
					<i class="icon el-icon-arrow-right" @click="nextBtn" :class="isNext ? 'active' : ''"></i>
				</li>
				<li class="next" @click="nextBtn" :class="isNext ? 'active' : ''"><span>Next</span></li>
			</ul>
		</div>
	</div>
</template>

<style>
.pageView_box{width:100%;padding:20px 15px;}
.pageView_box .title{font-size:14px;color: #3e3f42;font-weight: bold;}
.pageView_top{position: absolute;top:0px;left:0;border-bottom: 1px solid #eaedf3;}
.pageView_bottom{position: absolute;bottom:0px;left:0;}
.pageView_btn{}
.pageView_btn li{display: inline-block;font-size: 12px;line-height: 16px;color:#333;border:1px solid #cccccc;color:#3e3f42;}
.pageView_btn .prev, .pageView_btn .next{padding:0px 15px;cursor: pointer;}
.pageView_btn .active{background: #ebebff;}
.pageView_btn .now{margin:0 5px;}
.pageView_btn .now .curr{margin:0 5px;}
.pageView_btn .now .icon{display: inline-block;cursor: pointer;}
.pageView_btn .now .el-icon-arrow-left{border-right: 1px solid #cccccc;}
.pageView_btn .now .el-icon-arrow-right{border-left: 1px solid #cccccc;}
.pageView_select .el-select{width:55px;margin: 0 5px;}
.pageView_select .el-input{font-size:12px;}
.pageView_select .el-select .el-input__inner{height: 18px;padding-right: 15px;padding-left: 8px;}
.pageView_select .el-select .el-input__icon{line-height: 18px;width: 12px;font-size:12px;}
.dataEmpty{width: 100%;min-height: 60px;color: #909399;}
</style>

<script>
// import Qs from 'qs'
export default {
	name: 'Table',
	props: [
		'isThead', // is thead
		'isSetTimeout', // is setTimeout
		'isPageTop', // is page top
		'isPageBottom', // is page bottom
		'dataUrl', // get data url
		'initData', // init data and not need ajax
		'params', // ajax param
		'resData', // response param
		'className', // public table class
		'setTimeout', // setTimeout time
		'title'
	],
	data () {
		return {
			tableData: [], //table data
			thead: [], // thead data
			tableHtml: '', // tbody html
			loading: '', // loading
			refreshSetInterval: '', // set setTimeout
			totalPage: 0,
			totalNum: 0,
			currPage: 1,
			isPrev: true,
			isNext: true,
			selectPageSize: [{
				label: 10,
				value: 10
			}, {
				label: 15,
				value: 15
			}, {
				label: 20,
				value: 20
			}, {
				label: 25,
				value: 25
			}],
			selectValue: this.params && this.params.pageSize ? this.params.pageSize : 20,
			titleTxt: '',
			tableFlag: true
		}
	},
	watch: {
		initData (cur, old) {
			if (cur !== old && !this.dataUrl) {
				// console.log(0)
				this.setInitData()
			}
		},
		params (cur, old) {
			this.getInitData()
		},
		currPage (cur) {
			if (cur === 1) {
				this.isPrev = true
			} else if (cur === this.totalPage) {
				this.isNext = true
			} else {
				this.isPrev = false
				this.isNext = false
			}
		},
		selectValue (cur, old) {
			let _params = {
				pageNum: this.currPage,
				pageSize: cur,
				addr: this.params.addr ? this.params.addr : ''
			}
			this.getData(_params)
		}
	},
	mounted () {
		this.addLoading()
		// console.log(this.params)
		if (this.dataUrl) {
			// console.log(1)
			this.getInitData()
		} else {
			// console.log(2)
			this.setInitData()
		}
		if (this.isSetTimeout) {
			// console.log(3)
			this.setTimeout = this.setTimeout ? this.setTimeout : 15000
			this.refreshSetInterval = setInterval(() => {
				this.getInitData()
			}, this.setTimeout)
		}
		window.toUrl = (url, params) => {
			this.$router.push({
				path: url,
				query: {
					params: params
				}
			})
		}
	},
	methods: {
		getInitData () {
			if (!this.params) return
			let _params = {
				pageNum: this.params.pageNum ? this.params.pageNum : 1,
				pageSize: this.selectValue,
				addr: this.params.addr ? this.params.addr : ''
			}
			this.getData(_params)
		},
		prevBtn () {
			if (this.currPage <= 1) {
				return
			}
			this.currPage --
			let _params = {
				pageNum: this.currPage,
				pageSize: this.selectValue,
				addr: this.params.addr ? this.params.addr : ''
			}
			this.getData(_params)
		},
		nextBtn () {
			if (this.currPage >= this.totalPage) {
				return
			}
			this.currPage ++
			let _params = {
				pageNum: this.currPage,
				pageSize: this.selectValue,
				addr: this.params.addr ? this.params.addr : ''
			}
			this.getData(_params)
		},
		getData (params) {
			// this.addLoading()
			this.tableData = []
			this.tableHtml = ''
			this.$$.ajax(this.$http, this.dataUrl, params).then(res => {
				let data
				if (this.resData) {
					data = res && res.info && res.info[this.resData] ? res.info[this.resData] : []
				} else {
					data = res && res.info ? res.info : []
				}
				let pageTatal = res && res.total ? Number(res.total) : 0
				let pageSizeNum = this.selectValue
				this.totalNum = this.$$.thousandBit(pageTatal, 'no')
				this.totalPage = Math.ceil(Number(pageTatal / pageSizeNum))
				if (this.title) {
					let _html = this.title.txt.split('{{param}}')
					for (let i = 0; i < _html.length; i++) {
						if (i === (_html.length - 1)) {
							this.titleTxt += _html[i]
						} else {
							if (this.title.params[i] === 'totalNum') {
								this.titleTxt += _html[i] + this.totalNum
							} else if (this.title.params[i] === 'totalPage') {
								this.titleTxt += _html[i] + this.$$.thousandBit(this.totalPage, 'no')
							} else if (this.title.params[i] === 'currPage') {
								this.titleTxt += _html[i] + this.currPage
							} else if (this.title.params[i].indexOf('strat#') === 0) {
								let startArr = this.title.params[i].split('#')
								this.titleTxt += _html[i] + ' ' + data[data.length - 1][startArr[1]]
							} else if (this.title.params[i].indexOf('end#') === 0) {
								let endArr = this.title.params[i].split('#')
								this.titleTxt += _html[i] + ' ' + data[0][endArr[1]]
							}
						}
					}
				}
				if (this.currPage < this.totalPage) {
					this.isNext = false
				} else {
					this.isNext = true
				}
				if (res.info.length <= 0) {
					// console.log(res.info.length)
					this.$message({
						showClose: true,
						message: 'Temporarily no data!',
						type: 'warning'
					})
					this.removeLoading()
					this.tableFlag = false
					return
				}
				this.tableFlag = true
				
				this.titleTxt = ''
				if (data.length > 0) {
					this.tableData = data
					this.tableHTML(this.tableData)
				} else {
					this.tableData = []
				}
			})
		},
		setInitData () {
			this.tableData = this.initData
			this.tableHTML(this.tableData)
		},
		tableHTML (data) {
			data = data ? data : []
			let _thead = this.thead
			let _tbody = ''
			for (let i = 0; i < data.length; i++) {
				let _tr = '<tr>'
				for (let j = 0; j < _thead.length; j++) {
					_tr += this.tdHTML(_thead[j].html, _thead[j].params, data[i], _thead[j].width, (i + 1))
				}
				_tr += '</tr>'
				_tbody += _tr
			}
			this.tableHtml = _tbody
			this.removeLoading()
		},
		tdHTML (html, params, data, width, paramIndex) {
			let w = 100 / 24
			let _td = '<td width="'+ (w * Number(width)) +'%">'
			if (html) {				
				let _html = html.split('{{param}}')
				if ((typeof params).toLowerCase() === 'object' || (typeof params).toLowerCase() === 'array') {					
					for (let i = 0; i < _html.length; i++) {
						if (i === (_html.length - 1)) {
							_td += _html[i]
						} else {
							if (typeof params[i] === 'string') {
								_td += _html[i] + (data[params[i]] ? data[params[i]] : '')
							} else {
								if (params[i].type === undefined) {
									_td += _html[i] + (data[params[i].param] ? data[params[i].param] : '')
								} else {
									_td += _html[i] + this.paramType(params[i], data)
								}
							}
						}
					}
				} else {
					if (params === 'paramIndex') {
						_td += _html[0] + paramIndex + _html[1]
					} else {
						_td += _html[0] + (data[params] ? data[params] : '') + _html[1]
					}
				}
				_td += '</td>'
			} else {
				_td += (data[params] ? data[params] : '') + '</td>'
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
			} else if (Number(param.type) === 3) { //multiplication
				// console.log(Number(data[param.param2].c[0]))
				this.$$.web3(this)
				let _number = Number(data[param.param]) * Number(data[param.param2].c[0])
				// _number = this.web3.fromWei(_number, "ether")
				callback = this.$$.thousandBit(_number, 'no')
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
