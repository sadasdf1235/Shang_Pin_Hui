import { reqAddressInfo, reqOrderInfo } from '@/api'
const state = {
    address: [],
    orderInfo: {}
}
const actions = {
    //获取用户地址信息
    async getAddressInfo({ commit }) {
        let result = await reqAddressInfo()
        if (result.code == 200) {
            commit("GRTADDRESSINFO", result.data)
            return 'ok'
        }
    },
    //获取商品清单
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        if (result.code == 200) {
            commit("GETORDERINFO", result.data)
            return 'ok'
        }
    }
}
const mutations = {
    //获取用户地址信息
    GRTADDRESSINFO(state, address) {
        state.address = address
    },
    //获取商品清单
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}