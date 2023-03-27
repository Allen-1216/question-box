import axios from "axios";

const state = {
    content: {},
    bookmark_content: {},
}
const mutations = {
    SET_CONTENT(state, payload){
        state.content = payload;
    }
}
const actions = {
    async getContent ({commit}) {
        await axios.get(`/api/user/letterbox`)
            .then((response) => {
                commit('SET_CONTENT', response.data)
                //console.log(response.data)
            })
            .catch((error) => console.log(error))
    },
    //eslint-disable-next-line
    async deleteContent({commit}, mid) {
        await axios.delete(`/api/user/letterbox`,{data:{
            mid: mid,
        }}).then((response) => {
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
    content(state){
        return state.content;
    }
}
const MemberAreaLetterBox = {
    state,
    mutations,
    actions,
    getters,
}
export default MemberAreaLetterBox;