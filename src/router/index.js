import { createRouter, createWebHistory } from 'vue-router';
import HomePage from "../view/HomePage.vue";
import MemberAreaPage from "../view/MemberAreaPage";
import MemberAreaLetterBoxPage from "../view/MemberAreaLetterBoxPage";
import MemberAreaBookmarkPage from "../view/MemberAreaBookmarkPage";
import MemberAreaDataPage from "../view/MemberAreaDataPage";
import NotFoundPage from "../view/NotFoundPage";
import MessageBoardPage from "../view/MessageBoardPage"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            redirect:'/home',
        },
        {
            path: '/home', //首頁
            component: HomePage,
        },
        {
            path: '/MemberArea', //會員專區頁面
            component: MemberAreaPage,
        },
        {
            path: '/MemberArea/letterbox', //收到的內容頁面
            component: MemberAreaLetterBoxPage,
        },
        {
            path: '/MemberArea/bookmark', //收藏的內容頁面
            component: MemberAreaBookmarkPage,
        },
        {
            path: '/MemberArea/data', //個人資料頁面
            component: MemberAreaDataPage,
        },
        {
            path: '/MessageBoardPage', //提交內容的頁面
            component: MessageBoardPage,
        },
        {
            path: '/:pathMatch(.*)*', //找不到頁面
            component: NotFoundPage,
        },
    ],
});

export default router;