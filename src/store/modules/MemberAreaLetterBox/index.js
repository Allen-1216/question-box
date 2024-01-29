import axios from "axios";

const state = {
    content: {},
}
const mutations = {
    SET_CONTENT(state, payload){
        state.content = payload.data;
    }
}
const actions = {
    async getContent ({commit}) {
        await axios.get(`/api/user/letterbox`)
            .then((response) => {
                commit('SET_CONTENT', response.data)
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
    //eslint-disable-next-line
    async addBookmarkContent({commit}, bookmarkContentDetail){
        await axios.post('/api/user/bookmark',{
            account: bookmarkContentDetail.account,
            article_id: bookmarkContentDetail.article_id,
        }).then((response) => {
            if(response.data.state === "success"){
                alert(response.data.message)
            }
            // else{
            //     alert(response.data.message)
            // }
        })
            .catch((error) => alert(error.response.data.message))
    }
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