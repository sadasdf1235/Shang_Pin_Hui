import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLoginOut } from "@/api"

//登录与注册
const state = {
    code: '',
    token: localStorage.getItem("TOKEN"),
    userInfo: {}
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //登录
    async userLogin({ commit }, user) {
        let result = await reqUserLogin(user);
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token)
            //本地存储token 防止刷新token消失 因为vux不是持久化存储
            localStorage.setItem("TOKEN", result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //获取用户信息
    async userInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit("USERINFO", result.data)
            return 'ok'
        }
    },
    //退出登录
    async loginOut({ commit }) {
        let result = await reqLoginOut()
        if (result.code == 200) {
            //actions里不能操作state
            commit("CLEARUSER")
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    }
}
const mutations = {
    //获取验证码
    GETCODE(state, code) {
        state.code = code
    },
    //登录存储token
    USERLOGIN(state, token) {
        state.token = token
    },
    //获取用户信息
    USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //清除用户的信息
    CLEARUSER(state) {
        state.token = ''
        state.userInfo = ''
        localStorage.removeItem("TOKEN")
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}