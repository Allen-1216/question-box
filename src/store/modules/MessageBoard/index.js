import axios from "axios";

const state = {
    message_board_data: {},
}
const mutations = {
    SET_MESSAGE_BOARD_DATA(state, payload){
        state.message_board_data = payload;
    }
}
const actions = {
    async getMessageBoardData({commit}) {
        const path = window.location.pathname;
        const regex = /^\/messageboardpage\/(\d+)$/; //讀取網址後方的 account
        const matches = path.match(regex);
        if (matches) {
            const account = matches[1];
            // console.log("account: ", account)
            await axios.get(`/api/user/${account}`)
                .then((response) => {
                    commit('SET_MESSAGE_BOARD_DATA', response.data)
                    //console.log(response.data)
                })
                .catch((error) => console.log(error))
        }
    },
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