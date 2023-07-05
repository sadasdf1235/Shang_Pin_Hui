import { reqCartList, reqDeleteCart, reqUpdateCheckedById } from "@/api"
import { Promise } from "core-js"
const state = {
    cartList: []
}
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车某个产品
    async deleteCartList({ commit }, skuId) {
        let result = await reqDeleteCart(skuId)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车某个产品的勾选框
    async updateCartChecked({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //删除购物车所选全部产品
    deleteAllChecked({ dispatch, getters }) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch("deleteCartList", item.skuId) : '';
            PromiseAll.push(promise)
        });
        //promose 都为成功 返回的结果为成功
        return Promise.all(PromiseAll)
    },
    //更新全选框
    updateAllChecked({ dispatch, state }, isChecked) {
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch("updateCartChecked", { skuId: item.skuId, isChecked })
            PromiseAll.push(promise)
        });
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const getters = {
    cartList() {
        return state.cartList[0] || []
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}