import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	info: {} //用户信息
};

const mutations = {
	//更新用户信息
    updateInfo(state, res){
    	state.info = res;
    }
}
export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	state,
	mutations,
	modules: {
		
	}
})