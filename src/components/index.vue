<template>
  <div>
		<el-container>
			<el-header class="headerTop_box">
				<div class="headerNav_box flex-bc container">
					<div class="logo"><router-link to="/"><img src="@/assets/img/logo.svg"></router-link></div>
					<div class="flex-bc">
						<el-menu class="el-menu-demo hidden-sm-and-down" mode="horizontal">
							<el-menu-item index="1"><router-link to="/" class="itemNav" exact>{{LANG.NAV.HOME}}</router-link></el-menu-item>
							<el-submenu :index="'' + (indexs + 2)" v-for="(items, indexs) in navArr" :key="indexs">
								<template slot="title">{{items.name}}<div class="icon"><img src="@/assets/img/updown.svg"></div></template>
								<el-menu-item :index="(indexs + 2) + '-' + index" v-for="(item, index) in items.subNav" :key="index">
									<router-link class="itemNav" :to="item.url" v-html="item.name"></router-link>
								</el-menu-item>
							</el-submenu>
						</el-menu>
						<div class="headerNav_search" id="publicSearchId">
							<el-input :placeholder="LANG.PH.SEARCH_PLACEHOLDER" clearable v-model="searchVal">
								<template slot="prepend" class="flex-c">
									<div class="icon" @click="searchBtn">
										<i class="el-input__icon el-icon-search"></i>
									</div>
								</template>
							</el-input>
						</div>
						<div class="headerTop_langBox">
							<el-select v-model="language" size="mini" @change="changLanguage">
								<el-option
									v-for="item in languageOption"
									:key="item.value"
									:label="item.label"
									:value="item.value"
								>
								</el-option>
							</el-select>
						</div>
						<div class="navSet_box hidden-md-and-up">
							<el-dropdown trigger="click" :hide-on-click="navVisibleVal">
								<span class="el-dropdown-link">
									<p class="line"></p>
									<p class="line"></p>
									<p class="line"></p>
								</span>
								<el-dropdown-menu slot="dropdown" class="navSet_item">
									<el-dropdown-item><router-link to="/" class="itemNav homeNav" exact>{{LANG.NAV.HOME}}</router-link></el-dropdown-item>
									<el-dropdown-item>
										<el-collapse accordion>
											<el-collapse-item :title="items.name" :name="indexs + 1" v-for="(items, indexs) in navArr" :key="indexs">
												<ul class="navSet_list">
													<li v-for="(item, index) in items.subNav" :key="index">
														<router-link class="itemNav" :to="item.url" v-html="item.name"></router-link>
													</li>
												</ul>
											</el-collapse-item>
										</el-collapse>
									</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
						</div>
					</div>
				</div>
			</el-header>
			<el-main>
				<!-- <div class="container headerNav_searchBg">
					<div class="headerNav_search headerNav_searchCont">
							<div class="flex-bc headerNav_searchTitl">
								<h3 class="h3">FUSION Blockchain Explorer</h3>
								<ul class="flex-ec ul">
									<li><p>Quick links:</p></li>
									<li><router-link to="/assetsIndex/erc20Tokens">{{LANG.ERC20_TOKENS}}</router-link></li>
									<li><router-link to="/assetsIndex/liloAssets">LILO Tokens</router-link></li>
								</ul>
							</div>
							<el-input :placeholder="LANG.SEARCH_PLACEHOLDER" clearable v-model="searchVal">
								<template slot="suffix" class="flex-c">
									<div class="icon" @click="searchBtn">
										<i class="el-input__icon el-icon-search"></i>
									</div>
								</template>
							</el-input>
						</div>
				</div> -->
				<router-view></router-view>
			</el-main>
			<el-footer class="footerBottom_box">
				<div class="footerBottom_container container flex-bc">
					<div class="logoB opacity6"><img src="@/assets/img/logo-white.svg"></div>
					<div class="copyright">{{LANG.COPYRIGHT}}</div>
					<div class="outside flex-c">
						<a class="icon opacity6"><img src="@/assets/img/GIT.svg"></a>
						<a class="icon opacity6"><img src="@/assets/img/GIT2.svg"></a>
					</div>
				</div>
			</el-footer>
		</el-container>
	</div>
</template>

<style>
.navSet_box{margin: 0 15px;padding-top: 4px;}
.headerNav_searchTitl{color:#fff;font-size:12px;margin-bottom:5px;}
.headerNav_searchTitl .h3{}
.headerNav_searchTitl .ul li{margin-left:10px;}
.headerNav_searchTitl .ul li a{color:#fff;}

.headerTop_langBox{width: 100px;}
.headerTop_langBox .el-input__inner{border:none;}

.navSet_box .el-dropdown-link{height:22px;cursor: pointer;}
.navSet_box .line{width: 18px;height: 3px;background:#5c5c5c;margin:3px 0;border-radius: 2px;}
.navSet_item .el-dropdown-menu__item{padding:0}
.navSet_item .homeNav{height: 48px;line-height: 48px;padding: 0 20px;}
.navSet_item .el-collapse-item{background: #fff;width:260px;}
.navSet_item .el-collapse-item:last-child .el-collapse-item__header{border-bottom: none;}
.navSet_item .el-collapse-item__header{padding: 0 20px;}
.navSet_item .el-collapse-item__content{padding: 0;}
.navSet_item .navSet_list{background: #F8F8F8;}
.navSet_item .navSet_list li{padding: 0 30px;height: 40px;line-height: 40px;border-bottom: 1px solid #eee;}

.headerNav_searchBg{margin-top: 15px;}
.headerNav_search{position: relative;}
.headerNav_searchCont{padding:10px 15px;background:linear-gradient(to bottom,#2677fe,#7e63ff);background:-webkit-linear-gradient(to bottom,#2677fe,#7e63ff);background:-o-linear-gradient(to bottom,#2677fe,#7e63ff);background:-moz-linear-gradient(to bottom,#2677fe,#7e63ff);border-radius: 5px;}
.headerNav_search .icon{width:40px;height: 38px;position: absolute;top:0;right:0;padding:8px;cursor: pointer;}
.headerNav_search .icon img{height: 100%;display: block;}
.headerNav_search .icon .el-icon-search{line-height: 100%;font-size: 18px;}
.headerNav_search .el-input{width:100%;height: 38px;border-left:none;}
.headerNav_search .el-input-group__prepend{background: none;}
.headerNav_searchCont .el-input-group__prepend{background: none;border: none}
.headerNav_search .el-input__inner{border-left: none;padding-left: 0}
.headerNav_searchCont .el-input__inner{height: 38px;border-left: none;}
.headerNav_searchCont .el-input__inner{padding-left:15px;border-radius: 5px;}
.headerNav_search .el-input.is-active .el-input__inner, .headerNav_search .el-input__inner:focus{border:1px solid #dcdfe6;padding-left:10px;}
</style>

<script>
export default {
	name: 'public',
	inject: ['reload'],
  data () {
    return {
      searchVal: '',
			navVisibleVal: false,
      languageOption: [
        {value: 'en', label: 'English'},
        {value: 'zh', label: '中文简体'}
			],
			language: '',
			navArr: [
				{
					name: this.LANG.NAV.BLOCKS,
					subNav: [
						{name: this.LANG.NAV.TXNS, url: '/blockIndex/txns'},
						{name: this.LANG.NAV.PENDING_TXNS, url: '/blockIndex/pendingTxns'},
						{name: this.LANG.NAV.BLOCKS, url: '/blockIndex/blocks'},
						{name: this.LANG.NAV.TOP_ACCOUNTS, url: '/blockIndex/topAccounts'}
					]
				},
				{
					name: this.LANG.NAV.ASSETS,
					subNav: [
						{name: this.LANG.NAV.ERC20_TOKENS, url: '/assetsIndex/erc20Tokens'},
						{name: this.LANG.NAV.ERC20_TRANSFERS, url: '/assetsIndex/erc20Transfers'},
						{name: this.LANG.NAV.LILO_ASSETS, url: '/assetsIndex/liloAssets'},
						{name: this.LANG.NAV.LILO_TRANSFERS, url: '/assetsIndex/liloTransfers'}
					]
				},
				{
					name: this.LANG.NAV.STATS,
					subNav: [
						{name: this.LANG.NAV.TRANSACTION_HISTORY_CHART, url: '/statsIndex/transactionChart'},
						{name: this.LANG.NAV.ADDRESS_GROWTH_CHART, url: '/statsIndex/addressChart'},
						{name: this.LANG.NAV.TOTAL_FSN_SUPPLY, url: '/statsIndex/totalFSNSupply'},
						{name: this.LANG.NAV.FSN_HISTORICAL_PRICES, url: '/statsIndex/FSNhistoryPrices'},
						{name: this.LANG.NAV.FSN_MARKET_CAPITALIZATION_CHART, url: '/statsIndex/FSNmarketChart'},
						{name: this.LANG.NAV.NODES_TRACKER, url: '/statsIndex/nodesTracker'}
					]
				},
				{
					name: this.LANG.NAV.MORE,
					subNav: [
						{name: this.LANG.NAV.BROADCAST_TXN, url: '/moreIndex/broadcastTXN'},
						{name: this.LANG.NAV.VERIFY_CONTRACTS, url: '/moreIndex/verifyContracts'}
					]
				}
			]
    }
	},
	mounted () {
		this.language = localStorage.getItem('EXPLORER_LANGUAGE_TYPE') ? localStorage.getItem('EXPLORER_LANGUAGE_TYPE') : 'en'
	},
	methods: {
		searchBtn () {
			if (!this.searchVal) {
				this.$message({
					showClose: true,
					message: 'Can\'t be empty!',
					type: 'warning'
				})
				return
			}
			this.$router.push({
				path: '/blockIndex/accountDtil',
				query: {
					params: this.searchVal
				}
			})
			this.searchVal = ''
		},
    changLanguage () {
      localStorage.setItem('EXPLORER_LANGUAGE_TYPE', this.language)
      this.changeLang(this.language)
      this.reload()
    }
	},
}
</script>

