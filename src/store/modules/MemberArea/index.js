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
    async getMemberData({commit}) {
        await axios.get(`/api/user`)
            .then((response) => {
                commit('SET_MEMBER_DATA', response.data)
                 //console.log(response.data)
            })
            .catch((error) => console.log(error))
    },
    // eslint-disable-next-line no-unused-vars
    async chgAreaData({commit}, user) {
        if (!user.name) {
            user.name = null;
        }
        if (!user.email) {
            user.email = null;
        }
        if (!user.introduction) {
            user.introduction = null;
        }
        await axios.patch(`/api/user`, {
            name: user.name,
            email: user.email,
            introduction: user.introduction,
        }).then((response) => {
            if(response.data.state === "success"){
                location.reload();
            }
            else{
                alert(response.data.message)
            }
        })
            .catch((error) => console.log(error))
    },
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