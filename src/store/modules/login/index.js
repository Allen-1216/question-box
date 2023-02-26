/* eslint-disable no-unused-vars */
import axios from "axios";
import router from  "@/router"

const state = {
    is_logged_in : {}
}
const mutations = {
    IS_LOGGED_IN(state, payload){
        state.is_login = payload;
    }
}
const actions = {
    async login({commit},user) {
        await axios.post(`/api/login`, {
            username: user.username,
            password: user.password,
        }).then((response) => {
            if(response.data.state === "success"){
                //alert(response.data.message)
                let backdrop = document.querySelector('.modal-backdrop'); //解決 modal-backdrop 背景
                backdrop.parentNode.removeChild(backdrop);
                router.push('/memberarea')
            }
            else{
                alert(response.data.message)
            }
        })
            .catch((error) => console.log(error))
    },
    async logout(){
        await axios.post(`/api/logout`)
            .then((response) => {
            if(response.data.state === "success"){
                router.push('/home')
            }
            else{
                alert(response.data.message)
            }
        })
            .catch((error) => console.log(error))
    },
    async isLoggedIn({commit}){
        await axios.get(`/api/user/loginStatus`)
            .then((response) => {
                // console.log("isLogin:", response.data.state === "success")
                commit('IS_LOGGED_IN', response.data.state === "success")
                // return(response.data.state === "success")
            })
            .catch((error) => console.log(error))
    },
    async signup({commit}, user) {
        await axios.post(`/api/signup`, {
            username: user.username,
            password: user.password,
            confirmPassword: user.confirmPassword,
        }).then((response) => {
            if(response.data.state === "success"){
                alert(response.data.message)
            }
            else{
                alert(response.data.message)
            }
        })
            .catch((error) => console.log(error))
    },
}
const getters = { //store 的 computed
    is_logged_in(state){
        return state.is_logged_in;
    }
}
const LoginModule = {
    state,
    mutations,
    actions,
    getters,
}
export default LoginModule;