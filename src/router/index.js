import { createRouter, createWebHistory } from 'vue-router';
import HomePage from "../view/HomePage.vue";
import MemberAreaPage from "../view/MemberAreaPage";
import MemberAreaLetterBoxPage from "../view/MemberAreaLetterBoxPage";
import MemberAreaBookmarkPage from "../view/MemberAreaBookmarkPage";
import MemberAreaDataPage from "../view/MemberAreaDataPage";
import NotFoundPage from "../view/NotFoundPage";
import MessageBoardPage from "../view/MessageBoardPage"
import axios from "axios";

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
            name:'home'
        },
        {
            path: '/memberarea', //對外資訊頁面
            component: MemberAreaPage,
            meta: { requiresAuth: true } //設定需為登入狀態
        },
        {
            path: '/memberarea/letterbox', //查看信箱頁面
            component: MemberAreaLetterBoxPage,
            meta: { requiresAuth: true }
        },
        {
            path: '/memberarea/bookmark', //收藏的內容頁面
            component: MemberAreaBookmarkPage,
            meta: { requiresAuth: true }
        },
        {
            path: '/memberarea/data', //個人資料頁面
            component: MemberAreaDataPage,
            meta: { requiresAuth: true }
        },
        {
            path: '/messageboardpage/:id', //提交內容的頁面
            component: MessageBoardPage,
        },
        {
            path: '/:pathMatch(.*)*', //找不到頁面
            component: NotFoundPage,
        },
    ],
});

// 全域設置進入路由之前的時間點
router.beforeEach((to, from, next) => {
    // 當路由物件的 meta 設有 requiresAuth 時
    if(to.matched.some(record => record.meta.requiresAuth)) {
        axios.get(`/api/user/loginStatus`) //查詢登入狀態
            .then((response) => {
                // console.log("是否登入", response.data.state === "success")
                if (response.data.state !== "success" && name !== 'home') {
                    next({path: '/home'}) // 導向登入頁面
                }else {
                    next() // 登入成功，則可繼續往下執行
                }
            }).catch((error) => console.log(error))
    }
    else next()
})


export default router;