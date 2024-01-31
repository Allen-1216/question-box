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
        await axios.get(`/user/bookmark`)
            .then((response) => {
                //處理UTC時區問題 依照本地調整
                const resData = response.data.data.map(message => {
                    const localTime = new Date(message.content_time).toLocaleString(undefined,{hour12: false,})
                    return { ...message, content_time: localTime };
                });
                commit('SET_BOOKMARK_CONTENT', resData)
            })
            .catch((error) => console.log(error))
    },
    //eslint-disable-next-line
    async deleteCollections({commit}, cid) {
        await axios.delete(`/user/bookmark`,{data:{
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
    //eslint-disable-next-line
    async deleteCollectionsfromletterbox({commit}, cid) {
        await axios.delete(`/user/bookmark`,{data:{
                cid: cid,
            }}).then((response) => {
            if(response.data.state != "success"){
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