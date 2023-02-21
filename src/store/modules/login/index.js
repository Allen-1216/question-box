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
                router.push("/MemberArea")
            }
            else{
                alert(response.data.message)
            }

        })
            .catch((error) => console.log(error))
    }
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