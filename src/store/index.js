import {createStore} from "vuex";
import MessageBoardModule from "@/store/modules/MessageBoard";
import MemberAreaModule from "@/store/modules/MemberArea";
import MemberAreaLetterBox from "@/store/modules/MemberAreaLetterBox";
import LoginModule from "@/store/modules/login";
import MemberAreaBookmark from "@/store/modules/MemberAreaBookmark";

export default createStore({
    modules:{
        MemberAreaBookmark,
        MessageBoardModule,
        MemberAreaModule,
        MemberAreaLetterBox,
        LoginModule,
    }
});