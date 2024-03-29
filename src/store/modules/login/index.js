/* eslint-disable no-unused-vars */
import axios from "axios";
import router from  "@/router"

const state = {
    is_logged_in : {}
}
const mutations = {
    IS_LOGGED_IN(state, payload){
        state.is_logged_in = payload;
    }
}
const actions = {
    async logIn({commit}, user) {
        await axios.post(`/login`, {
            username: user.username,
            password: user.password,
        })
        .then((response) => {
            if(response.data.state === "success"){
                //alert(response.data.message)
                let backdrop = document.querySelector('.modal-backdrop'); //解決 modal-backdrop 背景
                backdrop.parentNode.removeChild(backdrop);
                history.go(0)
                //router.push('/memberarea')
            }
        })
        .catch((error) => alert(error.response.data.message))
    },
    async logOut(){
        await axios.post(`/logout`)
            .then((response) => {
                if(response.data.state === "success"){
                    let url = location.href;
                    if(url.includes('/home')){
                        history.go(0)
                    }else{
                        history.go(0)
                    }
                }
            })
            .catch((error) => console.log(error))
    },
    async isLoggedIn({commit}){
        await axios.get(`/user/loginStatus`)
            .then((response) => {
                commit('IS_LOGGED_IN', response.data.state === "success")
            })
            .catch((error) => console.log(error))
    },
    async signUp({commit}, user) {
        await axios.post(`/signup`, {
            username: user.username,
            password: user.password,
            confirmPassword: user.confirmPassword,
        }).then((response) => {
            if(response.data.state === "success"){
                alert(response.data.message)
                location.reload();
            }
        })
        .catch((error) => alert(error.response.data.message))
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