import Vue from 'vue'
import Router from 'vue-router'
// import axios from 'axios'
// import index from '@/components/index'

const index = resolve =>
	require.ensure([], () => resolve(require('@/components/index')), 'group-explorer')
const home = resolve =>
	require.ensure([], () => resolve(require('@/components/home/index')), 'group-explorer')

const blockIndex = resolve =>
	require.ensure([], () => resolve(require('@/components/blocks/index')), 'group-explorer')
const blocks = resolve =>
	require.ensure([], () => resolve(require('@/components/blocks/blocks')), 'group-explorer')
const pendingTxns = resolve =>
	require.ensure([], () => resolve(require('@/components/blocks/pendingTxns')), 'group-explorer')
const topAccounts = resolve =>
	require.ensure([], () => resolve(require('@/components/blocks/topAccounts')), 'group-explorer')
const txns = resolve =>
	require.ensure([], () => resolve(require('@/components/blocks/txns')), 'group-explorer')

const assetsIndex = resolve =>
	require.ensure([], () => resolve(require('@/components/assets/index')), 'group-explorer')
const erc20Tokens = resolve =>
	require.ensure([], () => resolve(require('@/components/assets/erc20Tokens')), 'group-explorer')
const erc20Transfers = resolve =>
	require.ensure([], () => resolve(require('@/components/assets/erc20Transfers')), 'group-explorer')
const liloAssets = resolve =>
	require.ensure([], () => resolve(require('@/components/assets/liloAssets')), 'group-explorer')
const liloTransfers = resolve =>
	require.ensure([], () => resolve(require('@/components/assets/liloTransfers')), 'group-explorer')

const statsIndex = resolve =>
	require.ensure([], () => resolve(require('@/components/stats/index')), 'group-explorer')
const addressChart = resolve =>
	require.ensure([], () => resolve(require('@/components/stats/addressChart')), 'group-explorer')
const FSNhistoryPrices = resolve =>
	require.ensure([], () => resolve(require('@/components/stats/FSNhistoryPrices')), 'group-explorer')
const FSNmarketChart = resolve =>
	require.ensure([], () => resolve(require('@/components/stats/FSNmarketChart')), 'group-explorer')
const nodesTracker = resolve =>
	require.ensure([], () => resolve(require('@/components/stats/nodesTracker')), 'group-explorer')
const totalFSNSupply = resolve =>
	require.ensure([], () => resolve(require('@/components/stats/totalFSNSupply')), 'group-explorer')
const transactionChart = resolve =>
	require.ensure([], () => resolve(require('@/components/stats/transactionChart')), 'group-explorer')

const moreIndex = resolve =>
	require.ensure([], () => resolve(require('@/components/more/index')), 'group-explorer')
const broadcastTXN = resolve =>
	require.ensure([], () => resolve(require('@/components/more/broadcastTXN')), 'group-explorer')
const verifyContracts = resolve =>
	require.ensure([], () => resolve(require('@/components/more/verifyContracts')), 'group-explorer')

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
						component: blocks
					}, {
						path: '/blockIndex/blocks',
						name: 'blocks',
						component: blocks
					}, {
						path: '/blockIndex/pendingTxns',
						name: 'pendingTxns',
						component: pendingTxns
					}, {
						path: '/blockIndex/topAccounts',
						name: 'topAccounts',
						component: topAccounts
					}, {
						path: '/blockIndex/txns',
						name: 'txns',
						component: txns
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
