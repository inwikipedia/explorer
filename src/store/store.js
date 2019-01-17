import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		storeBlocks: [],
	},
	mutations: {
		setStoreBlocks (state, data) {
			if (data === 'clear data') {
				state.storeBlocks = []
			} else {
				state.storeBlocks.push(data)
			}
		}
	}
})

export default store
