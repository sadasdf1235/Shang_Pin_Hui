import { reqCategoryList, reqGetBannerList, reqGetFloorList } from "@/api"
const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
}
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        if (result.code == 200) {
            commit('GEtBANNERLIST', result.data)
        }
    },
    async getFloorList({ commit }) {
        let result = await reqGetFloorList()
        if (result.code == 200) {
            commit('GEtFLOORLIST', result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GEtBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GEtFLOORLIST(state, floorList) {
        state.floorList = floorList
    },
}
const getters = {

}
export default ({
    // ...
    // namespaced: true,
    state,
    actions,
    mutations,
    getters
})