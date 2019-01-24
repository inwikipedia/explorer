<template>
  <div>
		<el-container>
			<el-header class="headerTop_box">
				<div class="headerNav_box flex-bc container">
					<div class="logo"><router-link to="/"><img src="@/assets/img/logo.svg"></router-link></div>
					<div class="flex-bc">
						<el-menu class="el-menu-demo hidden-sm-and-down" mode="horizontal">
							<el-menu-item index="1"><router-link to="/" class="itemNav" exact>Home</router-link></el-menu-item>
							<!-- <el-submenu index="1">
								<template slot="title"><router-link class="itemNav" to="/">Home</router-link></template>
							</el-submenu> -->
							<el-submenu index="2">
								<template slot="title">Blocks<div class="icon"><img src="@/assets/img/updown.svg"></div></template>
								<el-menu-item index="2-1"><router-link class="itemNav" to="/blockIndex/txns">Txns</router-link></el-menu-item>
								<el-menu-item index="2-2"><router-link class="itemNav" to="/blockIndex/pendingTxns">Pending Txns</router-link></el-menu-item>
								<el-menu-item index="2-3"><router-link class="itemNav" to="/blockIndex/blocks">Blocks</router-link></el-menu-item>
								<el-menu-item index="2-4"><router-link class="itemNav" to="/blockIndex/topAccounts">Top Accounts</router-link></el-menu-item>
							</el-submenu>
							<el-submenu index="3">
								<template slot="title">Assets<div class="icon"><img src="@/assets/img/updown.svg"></div></template>
								<el-menu-item index="3-1"><router-link class="itemNav" to="/assetsIndex/erc20Tokens">ERC-20 Tokens</router-link></el-menu-item>
								<el-menu-item index="3-2"><router-link class="itemNav" to="/assetsIndex/erc20Transfers">ERC-20 Transfers</router-link></el-menu-item>
								<el-menu-item index="3-3"><router-link class="itemNav" to="/assetsIndex/liloAssets">LILO Assets</router-link></el-menu-item>
								<el-menu-item index="3-4"><router-link class="itemNav" to="/assetsIndex/liloTransfers">LILO Transfers</router-link></el-menu-item>
							</el-submenu>
							<el-submenu index="4">
								<template slot="title">Stats<div class="icon"><img src="@/assets/img/updown.svg"></div></template>
								<el-menu-item index="4-1"><router-link class="itemNav" to="/statsIndex/transactionChart">Transaction History Chart</router-link></el-menu-item>
								<el-menu-item index="4-2"><router-link class="itemNav" to="/statsIndex/addressChart">Address Growth Chart</router-link></el-menu-item>
								<el-menu-item index="4-3"><router-link class="itemNav" to="/statsIndex/totalFSNSupply">Total FSN Supply</router-link></el-menu-item>
								<el-menu-item index="4-4"><router-link class="itemNav" to="/statsIndex/FSNhistoryPrices">FSN Historical Prices</router-link></el-menu-item>
								<el-menu-item index="4-5"><router-link class="itemNav" to="/statsIndex/FSNmarketChart">FSN Market Capitalization Chart</router-link></el-menu-item>
								<el-menu-item index="4-6"><router-link class="itemNav" to="/statsIndex/nodesTracker">Nodes Tracker</router-link></el-menu-item>
							</el-submenu>
							<el-submenu index="5">
								<template slot="title">More<div class="icon"><img src="@/assets/img/updown.svg"></div></template>
								<el-menu-item index="5-1"><router-link class="itemNav" to="/moreIndex/broadcastTXN">Broadcast TXN</router-link></el-menu-item>
								<el-menu-item index="5-2"><router-link class="itemNav" to="/moreIndex/verifyContracts">Verify Contracts</router-link></el-menu-item>
							</el-submenu>
						</el-menu>
						<div class="headerNav_search">
							<el-input placeholder="Search by Address..." clearable v-model="searchVal">
								<template slot="prepend" class="flex-c"><div class="icon" @click="searchBtn"><img src="@/assets/img/search.svg" /></div></template>
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
									<el-dropdown-item><router-link to="/" class="itemNav homeNav" exact>Home</router-link></el-dropdown-item>
									<el-dropdown-item>
										<el-collapse accordion>
											<el-collapse-item title="Blocks" name="1">
												<ul class="navSet_list">
													<li><router-link class="itemNav" to="/blockIndex/txns">Txns</router-link></li>
													<li><router-link class="itemNav" to="/blockIndex/pendingTxns">Pending Txns</router-link></li>
													<li><router-link class="itemNav" to="/blockIndex/blocks">Blocks</router-link></li>
													<li><router-link class="itemNav" to="/blockIndex/topAccounts">Top Accounts</router-link></li>
												</ul>
											</el-collapse-item>
											<el-collapse-item title="Assets" name="2">
												<ul class="navSet_list">
													<li><router-link class="itemNav" to="/assetsIndex/erc20Tokens">ERC-20 Tokens</router-link></li>
													<li><router-link class="itemNav" to="/assetsIndex/erc20Transfers">ERC-20 Transfers</router-link></li>
													<li><router-link class="itemNav" to="/assetsIndex/liloAssets">LILO Assets</router-link></li>
													<li><router-link class="itemNav" to="/assetsIndex/liloTransfers">LILO Transfers</router-link></li>
												</ul>
											</el-collapse-item>
											<el-collapse-item title="Stats" name="3">
												<ul class="navSet_list">
													<li><router-link class="itemNav" to="/statsIndex/transactionChart">Transaction History Chart</router-link></li>
													<li><router-link class="itemNav" to="/statsIndex/addressChart">Address Growth Chart</router-link></li>
													<li><router-link class="itemNav" to="/statsIndex/totalFSNSupply">Total FSN Supply</router-link></li>
													<li><router-link class="itemNav" to="/statsIndex/FSNhistoryPrices">FSN Historical Prices</router-link></li>
													<li><router-link class="itemNav" to="/statsIndex/FSNmarketChart">FSN Market Capitalization Chart</router-link></li>
													<li><router-link class="itemNav" to="/statsIndex/nodesTracker">Nodes Tracker</router-link></li>
												</ul>
											</el-collapse-item>
											<el-collapse-item title="More" name="4">
												<ul class="navSet_list">
													<li><router-link class="itemNav" to="/moreIndex/broadcastTXN">Broadcast TXN</router-link></li>
													<li><router-link class="itemNav" to="/moreIndex/verifyContracts">Verify Contracts</router-link></li>
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
				<router-view></router-view>
			</el-main>
			<el-footer class="footerBottom_box">
				<div class="footerBottom_container container flex-bc">
					<div class="logoB opacity6"><img src="@/assets/img/logo-white.svg"></div>
					<div class="copyright">© 2018 FUSION Foundation. All rights reserved.</div>
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

