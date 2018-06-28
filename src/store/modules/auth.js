import Api from '../../api/admin/login'
import * as types from '../mutation-types'

const getters = {
    adminInfo: state => state.adminInfo
};

const state = {
    token: sessionStorage.getItem('admin-token'),
    adminInfo: sessionStorage.getItem('admin-info')
};

const actions = {
    createToken({commit, state}, {id, password}) {
        return Api.createToken(id, password).then(res => {
            if(res.data.success) {
                console.log('llll:' + res.data.name);
                commit(types.CREATE_TOKEN, res.data.token);
                commit(types.SET_INFO, res.data.name)
            }else {
                commit(types.DELETE_TOKEN);
            }
            return new Promise((resolve, reject) => {
                resolve(res);
            });
        });
    }
}

const mutations = {
    [types.CREATE_TOKEN](state, token) {
        state.token = token;
        sessionStorage.setItem('admin-token', token)
    },
    [types.DELETE_TOKEN](state) {
        state.token = null;
        sessionStorage.setItem('admin-token', '');
    },
    [types.SET_INFO](state, info) {
        state.adminInfo = info;
        sessionStorage.setItem('admin-info', info);
    }
}
export default {
    getters,
    state,
    actions,
    mutations
}