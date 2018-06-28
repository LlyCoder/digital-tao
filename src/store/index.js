import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import userInfo from './modules/userInfo'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        userInfo
    },
    strict: process.env.NODE_ENV !== 'production'
})