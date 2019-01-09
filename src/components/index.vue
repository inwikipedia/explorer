<template>
  <div>
		<el-container>
			<el-header class="headerTop_box">
				<div class="headerNav_box flex-bc container">
					<div class="logo"><img src="@/assets/img/logo.svg"></div>
					<div class="flex-bc">
						<el-menu class="el-menu-demo" mode="horizontal">
							<el-menu-item index="1"><router-link to="/" class="item" exact>Home</router-link></el-menu-item>
							<!-- <el-submenu index="1">
								<template slot="title"><router-link class="item" to="/">Home</router-link></template>
							</el-submenu> -->
							<el-submenu index="2">
								<template slot="title"><router-link class="item" to="/blocks">Blocks<div class="icon"><img src="@/assets/img/updown.svg"></div></router-link></template>
								<el-menu-item index="2-1"><router-link class="item" to="/blockIndex/txns">Txns</router-link></el-menu-item>
								<el-menu-item index="2-2"><router-link class="item" to="/blockIndex/pendingTxns">Pending Txns</router-link></el-menu-item>
								<el-menu-item index="2-3"><router-link class="item" to="/blockIndex/blocks">Blocks</router-link></el-menu-item>
								<el-menu-item index="2-4"><router-link class="item" to="/blockIndex/topAccounts">Top Accounts</router-link></el-menu-item>
							</el-submenu>
							<el-submenu index="3">
								<template slot="title"><router-link class="item" to="/assetsIndex">Assets<div class="icon"><img src="@/assets/img/updown.svg"></div></router-link></template>
								<el-menu-item index="3-1"><router-link class="item" to="/assetsIndex/erc20Tokens">ERC-20 Tokens</router-link></el-menu-item>
								<el-menu-item index="3-2"><router-link class="item" to="/assetsIndex/erc20Transfers">ERC-20 Transfers</router-link></el-menu-item>
								<el-menu-item index="3-3"><router-link class="item" to="/assetsIndex/liloAssets">LILO Assets</router-link></el-menu-item>
								<el-menu-item index="3-4"><router-link class="item" to="/assetsIndex/liloTransfers">LILO Transfers</router-link></el-menu-item>
							</el-submenu>
							<el-submenu index="4">
								<template slot="title"><router-link class="item" to="/statsIndex">Stats<div class="icon"><img src="@/assets/img/updown.svg"></div></router-link></template>
								<el-menu-item index="4-1"><router-link class="item" to="/statsIndex/transactionChart">Transaction History Chart</router-link></el-menu-item>
								<el-menu-item index="4-2"><router-link class="item" to="/statsIndex/addressChart">Address Growth Chart</router-link></el-menu-item>
								<el-menu-item index="4-3"><router-link class="item" to="/statsIndex/totalFSNSupply">Total FSN Supply</router-link></el-menu-item>
								<el-menu-item index="4-4"><router-link class="item" to="/statsIndex/FSNhistoryPrices">FSN Historical Prices</router-link></el-menu-item>
								<el-menu-item index="4-5"><router-link class="item" to="/statsIndex/FSNmarketChart">FSN Market Capitalization Chart</router-link></el-menu-item>
								<el-menu-item index="4-6"><router-link class="item" to="/statsIndex/nodesTracker">Nodes Tracker</router-link></el-menu-item>
							</el-submenu>
							<el-submenu index="5">
								<template slot="title"><router-link class="item" to="/moreIndex">More<div class="icon"><img src="@/assets/img/updown.svg"></div></router-link></template>
								<el-menu-item index="5-1"><router-link class="item" to="/moreIndex/broadcastTXN">Broadcast TXN</router-link></el-menu-item>
								<el-menu-item index="5-2"><router-link class="item" to="/moreIndex/verifyContracts">Verify Contracts</router-link></el-menu-item>
							</el-submenu>
						</el-menu>
						<el-col :span="8" class="headerNav_search">
							<el-input placeholder="Search by Address..." clearable>
								<template slot="prepend" class="flex-c"><div class="icon"><img src="@/assets/img/search.svg" /></div></template>
							</el-input>
						</el-col>
					</div>
				</div>
			</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
			<el-footer class="footerBottom_box">
				<div class="footerBottom_container container flex-bc">
					<div class="logoB opacity6"><img src="@/assets/img/logo-white.svg"></div>
					<div class="copyright">©201 FUSION Foundation。版权所有。</div>
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

</style>

<script>
export default {
  name: 'public',
  data () {
    return {
      
    }
  }
}
</script>

