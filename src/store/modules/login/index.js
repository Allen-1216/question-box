/* eslint-disable no-unused-vars */
import axios from "axios";
import router from  "@/router"

const state = {}
const mutations = {}
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
    // async isLogin(){
    //     await axios.get(`/api/user/loginStatus`)
    //         .then((response) => {
    //             //console.log(response.data.state === "success")
    //             return(response.data.state === "success")
    //         })
    // }
}
const getters = { //store 的 computed
}
const LoginModule = {
    state,
    mutations,
    actions,
    getters,
}
export default LoginModule;