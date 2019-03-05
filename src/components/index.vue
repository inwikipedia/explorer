<template>
  <div class="appBox" :class="dayAndNightData === 'DARK' ? 'DARK' : 'WHITE'">
		<el-container>
			<el-header class="headerTop_box" height="70px">
				<div class="headerNav_box pubBg_white">
					<div class="flex-bc container" style="height:70px;">
						<div class="logo">
							<router-link to="/"><img :src="dayAndnightLogo"></router-link>
						</div>
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

							<div class="dayAndNight_box cursorP" @click="dayAndNight">
								<img :src="dayAndNightIimg">
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
.dayAndNight_box{width:25px;height: 25px;}
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
			dayAndNightData: '',
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
			],
			dayAndNightIimg: '',
			dayAndnightLogo: ''
    }
	},
	mounted () {
		this.language = localStorage.getItem('FUSION_EXPLORER_LANGUAGE_TYPE') ? localStorage.getItem('FUSION_EXPLORER_LANGUAGE_TYPE') : 'en'
		this.dayAndNightData = localStorage.getItem('FUSION_EXPLORER_DAY_AND_NIGHT_TYPE') ? localStorage.getItem('FUSION_EXPLORER_DAY_AND_NIGHT_TYPE') : 'WHITE'
		this.dayAndNightInit()
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
      localStorage.setItem('FUSION_EXPLORER_LANGUAGE_TYPE', this.language)
      this.changeLang(this.language)
      this.reload()
		},
		dayAndNightInit () {
			if (this.dayAndNightData === 'DARK') {
				document.body.classList.add('DARK')
				document.body.classList.remove('WHITE')
				this.dayAndNightIimg = require('@/assets/img/night.svg')
				this.dayAndnightLogo = require('@/assets/img/logo_night.svg')
			} else {
				document.body.classList.add('WHITE')
				document.body.classList.remove('DARK')
				this.dayAndNightIimg = require('@/assets/img/day.svg')
				this.dayAndnightLogo = require('@/assets/img/logo.svg')
			}
		},
		dayAndNight () {
			if (this.dayAndNightData === 'DARK') {
				this.dayAndNightData = 'WHITE'
				document.body.classList.add('WHITE')
				document.body.classList.remove('DARK')
				this.dayAndNightIimg = require('@/assets/img/day.svg')
				this.dayAndnightLogo = require('@/assets/img/logo.svg')
			} else {
				this.dayAndNightData = 'DARK'
				document.body.classList.add('DARK')
				document.body.classList.remove('WHITE')
				this.dayAndNightIimg = require('@/assets/img/night.svg')
				this.dayAndnightLogo = require('@/assets/img/logo_night.svg')
			}
			localStorage.setItem('FUSION_EXPLORER_DAY_AND_NIGHT_TYPE', this.dayAndNightData)
		}
	},
}
</script>

