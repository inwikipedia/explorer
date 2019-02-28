<template>
  <div>
		<el-container>
			<el-header class="headerTop_box">
				<div class="headerNav_box flex-bc container">
					<div class="logo"><router-link to="/"><img src="@/assets/img/logo.svg"></router-link></div>
					<div class="flex-bc">
						<el-menu class="el-menu-demo hidden-sm-and-down" mode="horizontal">
							<el-menu-item index="1"><router-link to="/" class="itemNav" exact>{{LANG.HOME}}</router-link></el-menu-item>
							<!-- <el-submenu index="1">
								<template slot="title"><router-link class="itemNav" to="/">Home</router-link></template>
							</el-submenu> -->
							<el-submenu index="2">
								<template slot="title">{{LANG.BLOCKS}}<div class="icon"><img src="@/assets/img/updown.svg"></div></template>
								<el-menu-item index="2-1"><router-link class="itemNav" to="/blockIndex/txns">{{LANG.TXNS}}</router-link></el-menu-item>
								<el-menu-item index="2-2"><router-link class="itemNav" to="/blockIndex/pendingTxns">{{LANG.PENDING_TXNS}}</router-link></el-menu-item>
								<el-menu-item index="2-3"><router-link class="itemNav" to="/blockIndex/blocks">{{LANG.BLOCKS}}</router-link></el-menu-item>
								<el-menu-item index="2-4"><router-link class="itemNav" to="/blockIndex/topAccounts">{{LANG.TOP_ACCOUNTS}}</router-link></el-menu-item>
							</el-submenu>
							<el-submenu index="3">
								<template slot="title">{{LANG.ASSETS}}<div class="icon"><img src="@/assets/img/updown.svg"></div></template>
								<el-menu-item index="3-1"><router-link class="itemNav" to="/assetsIndex/erc20Tokens">{{LANG.ERC20_TOKENS}}</router-link></el-menu-item>
								<el-menu-item index="3-2"><router-link class="itemNav" to="/assetsIndex/erc20Transfers">{{LANG.ERC20_TRANSFERS}}</router-link></el-menu-item>
								<el-menu-item index="3-3"><router-link class="itemNav" to="/assetsIndex/liloAssets">{{LANG.LILO_ASSETS}}</router-link></el-menu-item>
								<el-menu-item index="3-4"><router-link class="itemNav" to="/assetsIndex/liloTransfers">{{LANG.LILO_TRANSFERS}}</router-link></el-menu-item>
							</el-submenu>
							<el-submenu index="4">
								<template slot="title">{{LANG.STATS}}<div class="icon"><img src="@/assets/img/updown.svg"></div></template>
								<el-menu-item index="4-1"><router-link class="itemNav" to="/statsIndex/transactionChart">{{LANG.TRANSACTION_HISTORY_CHART}}</router-link></el-menu-item>
								<el-menu-item index="4-2"><router-link class="itemNav" to="/statsIndex/addressChart">{{LANG.ADDRESS_GROWTH_CHART}}</router-link></el-menu-item>
								<el-menu-item index="4-3"><router-link class="itemNav" to="/statsIndex/totalFSNSupply">{{LANG.TOTAL_FSN_SUPPLY}}</router-link></el-menu-item>
								<el-menu-item index="4-4"><router-link class="itemNav" to="/statsIndex/FSNhistoryPrices">{{LANG.FSN_HISTORICAL_PRICES}}</router-link></el-menu-item>
								<el-menu-item index="4-5"><router-link class="itemNav" to="/statsIndex/FSNmarketChart">{{LANG.FSN_MARKET_CAPITALIZATION_CHART}}</router-link></el-menu-item>
								<el-menu-item index="4-6"><router-link class="itemNav" to="/statsIndex/nodesTracker">{{LANG.NODES_TRACKER}}</router-link></el-menu-item>
							</el-submenu>
							<el-submenu index="5">
								<template slot="title">{{LANG.MORE}}<div class="icon"><img src="@/assets/img/updown.svg"></div></template>
								<el-menu-item index="5-1"><router-link class="itemNav" to="/moreIndex/broadcastTXN">{{LANG.BROADCAST_TXN}}</router-link></el-menu-item>
								<el-menu-item index="5-2"><router-link class="itemNav" to="/moreIndex/verifyContracts">{{LANG.VERIFY_CONTRACTS}}</router-link></el-menu-item>
							</el-submenu>
						</el-menu>
						<div class="headerNav_search" id="publicSearchId">
							<el-input :placeholder="LANG.SEARCH_PLACEHOLDER" clearable v-model="searchVal">
								<template slot="prepend" class="flex-c">
									<div class="icon" @click="searchBtn">
										<!-- <img src="@/assets/img/search.svg" /> -->
										<i class="el-input__icon el-icon-search"></i>
									</div>
								</template>
							</el-input>
						</div>
						<div class="navSet_box hidden-md-and-up">
							<el-dropdown trigger="click" :hide-on-click="navVisibleVal">
								<span class="el-dropdown-link">
									<p class="line"></p>
									<p class="line"></p>
									<p class="line"></p>
								</span>
								<el-dropdown-menu slot="dropdown" class="navSet_item">
									<el-dropdown-item><router-link to="/" class="itemNav homeNav" exact>{{LANG.HOME}}</router-link></el-dropdown-item>
									<el-dropdown-item>
										<el-collapse accordion>
											<el-collapse-item :title="LANG.BLOCKS" name="1">
												<ul class="navSet_list">
													<li><router-link class="itemNav" to="/blockIndex/txns">{{LANG.TXNS}}</router-link></li>
													<li><router-link class="itemNav" to="/blockIndex/pendingTxns">{{LANG.PENDING_TXNS}}</router-link></li>
													<li><router-link class="itemNav" to="/blockIndex/blocks">{{LANG.BLOCKS}}</router-link></li>
													<li><router-link class="itemNav" to="/blockIndex/topAccounts">{{LANG.TOP_ACCOUNTS}}</router-link></li>
												</ul>
											</el-collapse-item>
											<el-collapse-item :title="LANG.ASSETS" name="2">
												<ul class="navSet_list">
													<li><router-link class="itemNav" to="/assetsIndex/erc20Tokens">{{LANG.ERC20_TOKENS}}</router-link></li>
													<li><router-link class="itemNav" to="/assetsIndex/erc20Transfers">{{LANG.ERC20_TRANSFERS}}</router-link></li>
													<li><router-link class="itemNav" to="/assetsIndex/liloAssets">{{LANG.LILO_ASSETS}}</router-link></li>
													<li><router-link class="itemNav" to="/assetsIndex/liloTransfers">{{LANG.LILO_TRANSFERS}}</router-link></li>
												</ul>
											</el-collapse-item>
											<el-collapse-item :title="LANG.STATS" name="3">
												<ul class="navSet_list">
													<li><router-link class="itemNav" to="/statsIndex/transactionChart">{{LANG.TRANSACTION_HISTORY_CHART}}</router-link></li>
													<li><router-link class="itemNav" to="/statsIndex/addressChart">{{LANG.ADDRESS_GROWTH_CHART}}</router-link></li>
													<li><router-link class="itemNav" to="/statsIndex/totalFSNSupply">{{LANG.TOTAL_FSN_SUPPLY}}</router-link></li>
													<li><router-link class="itemNav" to="/statsIndex/FSNhistoryPrices">{{LANG.FSN_HISTORICAL_PRICES}}</router-link></li>
													<li><router-link class="itemNav" to="/statsIndex/FSNmarketChart">{{LANG.FSN_MARKET_CAPITALIZATION_CHART}}</router-link></li>
													<li><router-link class="itemNav" to="/statsIndex/nodesTracker">{{LANG.NODES_TRACKER}}</router-link></li>
												</ul>
											</el-collapse-item>
											<el-collapse-item :title="LANG.MORE" name="4">
												<ul class="navSet_list">
													<li><router-link class="itemNav" to="/moreIndex/broadcastTXN">{{LANG.BROADCAST_TXN}}</router-link></li>
													<li><router-link class="itemNav" to="/moreIndex/verifyContracts">{{LANG.VERIFY_CONTRACTS}}</router-link></li>
												</ul>
											</el-collapse-item>
										</el-collapse>
									</el-dropdown-item>
									<!-- <el-dropdown-item><router-link to="/" class="itemNav" exact>Home</router-link></el-dropdown-item>
									<hr />
									<el-dropdown-item><router-link class="itemNav" to="/blockIndex/txns">Txns</router-link></el-dropdown-item>
									<el-dropdown-item><router-link class="itemNav" to="/blockIndex/pendingTxns">Pending Txns</router-link></el-dropdown-item>
									<el-dropdown-item><router-link class="itemNav" to="/blockIndex/blocks">Blocks</router-link></el-dropdown-item>
									<el-dropdown-item><router-link class="itemNav" to="/blockIndex/topAccounts">Top Accounts</router-link></el-dropdown-item>
									<hr />
									<el-dropdown-item><router-link class="itemNav" to="/assetsIndex/erc20Tokens">ERC-20 Tokens</router-link></el-dropdown-item>
									<el-dropdown-item><router-link class="itemNav" to="/assetsIndex/erc20Transfers">ERC-20 Transfers</router-link></el-dropdown-item>
									<el-dropdown-item><router-link class="itemNav" to="/assetsIndex/liloAssets">LILO Assets</router-link></el-dropdown-item>
									<el-dropdown-item><router-link class="itemNav" to="/assetsIndex/liloTransfers">LILO Transfers</router-link></el-dropdown-item>
									<hr />
									<el-dropdown-item><router-link class="itemNav" to="/statsIndex/transactionChart">Transaction History Chart</router-link></el-dropdown-item>
									<el-dropdown-item><router-link class="itemNav" to="/statsIndex/addressChart">Address Growth Chart</router-link></el-dropdown-item>
									<el-dropdown-item><router-link class="itemNav" to="/statsIndex/totalFSNSupply">Total FSN Supply</router-link></el-dropdown-item>
									<el-dropdown-item><router-link class="itemNav" to="/statsIndex/FSNhistoryPrices">FSN Historical Prices</router-link></el-dropdown-item>
									<el-dropdown-item><router-link class="itemNav" to="/statsIndex/FSNmarketChart">FSN Market Capitalization Chart</router-link></el-dropdown-item>
									<el-dropdown-item><router-link class="itemNav" to="/statsIndex/nodesTracker">Nodes Tracker</router-link></el-dropdown-item>
									<hr />
									<el-dropdown-item><router-link class="itemNav" to="/moreIndex/broadcastTXN">Broadcast TXN</router-link></el-dropdown-item>
									<el-dropdown-item><router-link class="itemNav" to="/moreIndex/verifyContracts">Verify Contracts</router-link></el-dropdown-item> -->
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
  data () {
    return {
      searchVal: '',
			navVisibleVal: false
    }
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
// 		navVisible () {
// 			this.navVisibleVal = false
// 			
// 		}
	},
}
</script>

