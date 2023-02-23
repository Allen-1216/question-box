import axios from 'axios';

const state = {
    member_data: {},
}
const mutations = {
    SET_MEMBER_DATA(state, payload){
        state.member_data = payload;
    }
}
const actions = {
    async getMemberData ({commit}) {
        await axios.get(`/api/user`)
            .then((response) => {
                commit('SET_MEMBER_DATA', response.data)
                 //console.log(response.data)
            })
            .catch((error) => console.log(error))
    }
}
const getters = {
    member_data(state){
        return state.member_data;
    }
}
const MemberAreaModule = {
    state,
    mutations,
    actions,
    getters,
}
export default MemberAreaModule;