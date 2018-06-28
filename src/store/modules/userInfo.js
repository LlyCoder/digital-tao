const state = {
    userInfo: {},
    cartCount: 0
}
const mutations = {
    updateUserInfo(state, userInfo) {
        state.userInfo = userInfo;
    },
    updateCartCount(state, cartCount) {
        state.cartCount += cartCount;
    },
    initCartCount(state, cartCount) {
        state.cartCount = cartCount;
    }
}

export default {
    state,
    mutations
}