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
            path: '/home',
            component: HomePage,
        },
        {
            path: '/memberarea',
            component: MemberAreaPage,
        },
        {
            path: '/memberarea/letterbox',
            component: MemberAreaLetterBoxPage,
        },
        {
            path: '/memberarea/bookmark',
            component: MemberAreaBookmarkPage,
        },
        {
            path: '/memberarea/data',
            component: MemberAreaDataPage,
        },
        {
            path: '/MessageBoardPage',
            component: MessageBoardPage,
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFoundPage,
        },
    ],
});

export default router;