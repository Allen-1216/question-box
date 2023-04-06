import axios from "axios";

const state = {
    bookmark_content: {},
}
const mutations = {
    SET_BOOKMARK_CONTENT(state, payload){
        state.bookmark_content = payload;
    }
}
const actions = {
    async getBookmarkContent ({commit}) {
        await axios.get(`/api/user/bookmark`)
            .then((response) => {
                commit('SET_BOOKMARK_CONTENT', response.data)
            })
            .catch((error) => console.log(error))
    },
    //eslint-disable-next-line
    async deleteCollections({commit}, cid) {
        await axios.delete(`/api/user/bookmark`,{data:{
                cid: cid,
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
    bookmark_content(state){
        return state.bookmark_content;
    }
}
const MemberAreaBookmark = {
    state,
    mutations,
    actions,
    getters,
}
export default MemberAreaBookmark;