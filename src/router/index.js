import Vue from 'vue'
import Router from 'vue-router'
// import axios from 'axios'
// import index from '@/components/index'

const index = resolve =>
	require.ensure([], () => resolve(require('@/components/index')), 'group-index')
const home = resolve =>
	require.ensure([], () => resolve(require('@/components/home/index')), 'group-index')

const blockIndex = resolve =>
	require.ensure([], () => resolve(require('@/components/blocks/index')), 'group-blocks')
const blocks = resolve =>
	require.ensure([], () => resolve(require('@/components/blocks/blocks')), 'group-blocks')
const blocksDtil = resolve =>
	require.ensure([], () => resolve(require('@/components/blocks/blocksDtil')), 'group-blocks')
const pendingTxns = resolve =>
	require.ensure([], () => resolve(require('@/components/blocks/pendingTxns')), 'group-blocks')
const topAccounts = resolve =>
	require.ensure([], () => resolve(require('@/components/blocks/topAccounts')), 'group-blocks')
const accountDtil = resolve =>
	require.ensure([], () => resolve(require('@/components/blocks/accountDtil')), 'group-blocks')
const txns = resolve =>
	require.ensure([], () => resolve(require('@/components/blocks/txns')), 'group-blocks')
const txnsDtil = resolve =>
	require.ensure([], () => resolve(require('@/components/blocks/txnsDtil')), 'group-blocks')

const assetsIndex = resolve =>
	require.ensure([], () => resolve(require('@/components/assets/index')), 'group-assets')
const erc20Tokens = resolve =>
	require.ensure([], () => resolve(require('@/components/assets/erc20Tokens')), 'group-assets')
const erc20Transfers = resolve =>
	require.ensure([], () => resolve(require('@/components/assets/erc20Transfers')), 'group-assets')
const liloAssets = resolve =>
	require.ensure([], () => resolve(require('@/components/assets/liloAssets')), 'group-assets')
const liloTransfers = resolve =>
	require.ensure([], () => resolve(require('@/components/assets/liloTransfers')), 'group-assets')

const statsIndex = resolve =>
	require.ensure([], () => resolve(require('@/components/stats/index')), 'group-charts')
const addressChart = resolve =>
	require.ensure([], () => resolve(require('@/components/stats/addressChart')), 'group-charts')
const FSNhistoryPrices = resolve =>
	require.ensure([], () => resolve(require('@/components/stats/FSNhistoryPrices')), 'group-charts')
const FSNmarketChart = resolve =>
	require.ensure([], () => resolve(require('@/components/stats/FSNmarketChart')), 'group-charts')
const nodesTracker = resolve =>
	require.ensure([], () => resolve(require('@/components/stats/nodesTracker')), 'group-charts')
const totalFSNSupply = resolve =>
	require.ensure([], () => resolve(require('@/components/stats/totalFSNSupply')), 'group-charts')
const transactionChart = resolve =>
	require.ensure([], () => resolve(require('@/components/stats/transactionChart')), 'group-charts')

const moreIndex = resolve =>
	require.ensure([], () => resolve(require('@/components/more/index')), 'group-more')
const broadcastTXN = resolve =>
	require.ensure([], () => resolve(require('@/components/more/broadcastTXN')), 'group-more')
const verifyContracts = resolve =>
	require.ensure([], () => resolve(require('@/components/more/verifyContracts')), 'group-more')

Vue.use(Router)
// Vue.use(axios)

// Vue.prototype.$http = axios

const routers = new Router({
  routes: [
    {
      path: '/',
      component: index,
			children: [
				{
					path: '/',
					component: home
				}, {
					path: '/blocks',
					component: blockIndex,
					children: [{
						path: '/blocks',
						name: 'blocks',
						component: blocks
					}, {
						path: '/blockIndex/blocks',
						// name: 'blocks',
						component: blocks
					}, {
						path: '/blockIndex/blocksDtil',
						name: 'blocksDtil',
						component: blocksDtil
					}, {
						path: '/blockIndex/pendingTxns',
						name: 'pendingTxns',
						component: pendingTxns
					}, {
						path: '/blockIndex/topAccounts',
						name: 'topAccounts',
						component: topAccounts
					}, {
						path: '/blockIndex/accountDtil',
						name: 'accountDtil',
						component: accountDtil
					}, {
						path: '/blockIndex/txns',
						name: 'txns',
						component: txns
					}, {
						path: '/blockIndex/txnsDtil',
						name: 'txnsDtil',
						component: txnsDtil
					}]
				}, {
					path: '/assetsIndex',
					component: assetsIndex,
					children: [{
						path: '/erc20Tokens',
						component: erc20Tokens
					}, {
						path: '/assetsIndex/erc20Tokens',
						name: 'erc20Tokens',
						component: erc20Tokens
					}, {
						path: '/assetsIndex/erc20Transfers',
						name: 'erc20Transfers',
						component: erc20Transfers
					}, {
						path: '/assetsIndex/liloAssets',
						name: 'liloAssets',
						component: liloAssets
					}, {
						path: '/assetsIndex/liloTransfers',
						name: 'liloTransfers',
						component: liloTransfers
					}]
				}, {
					path: '/statsIndex',
					component: statsIndex,
					children: [{
						path: '/addressChart',
						component: addressChart
					}, {
						path: '/statsIndex/addressChart',
						name: 'addressChart',
						component: addressChart
					}, {
						path: '/statsIndex/FSNhistoryPrices',
						name: 'FSNhistoryPrices',
						component: FSNhistoryPrices
					}, {
						path: '/statsIndex/FSNmarketChart',
						name: 'FSNmarketChart',
						component: FSNmarketChart
					}, {
						path: '/statsIndex/nodesTracker',
						name: 'nodesTracker',
						component: nodesTracker
					}, {
						path: '/statsIndex/totalFSNSupply',
						name: 'totalFSNSupply',
						component: totalFSNSupply
					}, {
						path: '/statsIndex/transactionChart',
						name: 'transactionChart',
						component: transactionChart
					}]
				}, {
					path: '/moreIndex',
					component: moreIndex,
					children: [{
						path: '/broadcastTXN',
						component: broadcastTXN
					}, {
						path: '/moreIndex/broadcastTXN',
						name: 'broadcastTXN',
						component: broadcastTXN
					}, {
						path: '/moreIndex/verifyContracts',
						name: 'verifyContracts',
						component: verifyContracts
					}]
				}
			]
    }
  ]
})
// 
// routers.beforeEach((to, from, next) => {
// 	console.log(location.href)
// 	let navUrl = location.href.substr(location.href.lastIndexOf('/'))
// 	console.log(navUrl)
// 	next()
// })

export default routers
