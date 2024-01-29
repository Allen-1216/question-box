import axios from "axios";

const state = {
    message_board_data: {},
}
const mutations = {
    SET_MESSAGE_BOARD_DATA(state, payload){
        state.message_board_data = payload.data;
    }
}
const actions = {
    async getMessageBoardData({commit}) {
        const path = window.location.pathname;
        const regex = /^\/messageboardpage\/(\d+)$/; //讀取網址後方的 account
        const matches = path.match(regex);
        if (matches) {
            const account = matches[1];
            await axios.get(`/api/user/${account}`)
                .then((response) => {
                    commit('SET_MESSAGE_BOARD_DATA', response.data)
                })
                .catch((error) => console.log(error))
        }
    },
    //eslint-disable-next-line
    async addContent({commit}, contentDetail){
        await axios.post('/api/user/letterbox',{
            account: contentDetail.account,
            content: contentDetail.input,
            sender_name: contentDetail.sender_name,
        }).then((response) => {
            if(response.data.state === "success"){
                alert(response.data.message)
            }
            // else{
            //     alert(response.data.message)
            //     window.location.reload();
            // }
        }).catch((error) => alert(error.response.data.message))
    }
}
const getters = {
    message_board_data(state){
        return state.message_board_data;
    }
}
const MessageBoardModule = {
    state,
    mutations,
    actions,
    getters,
}
export default MessageBoardModule;