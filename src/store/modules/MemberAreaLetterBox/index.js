import axios from "axios";

const state = {
    content: {},
}
const mutations = {
    SET_CONTENT(state, payload){
        state.content = payload;
    }
}
const actions = {
    async getContent ({commit}) {
        await axios.get(`/user/letterbox`)
            .then((response) => {
                //處理UTC時區問題 依照本地調整
                const resData = response.data.data.map(message => {
                    const localTime = new Date(message.content_time).toLocaleString(undefined,{hour12: false,})
                    return { ...message, content_time: localTime };
                });
                commit('SET_CONTENT', resData)
            })
            .catch((error) => console.log(error))
    },
    //eslint-disable-next-line
    async deleteContent({commit}, mid) {
        await axios.delete(`/user/letterbox`,{data:{
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
        await axios.post('/user/bookmark',{
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