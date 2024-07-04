import { createRouter, createWebHistory } from "vue-router";

import LoginVue from '../views/Login.vue'
import LayoutVue from '../views/Layout.vue'
import ArticleCategory from '../views/article/ArticleCategory.vue'
import ArticleManage from '../views/article/ArticleManage.vue'
import UserAvatar from '../views/user/UserAvatar.vue'
import UserInfo from '../views/user/UserInfo.vue'
import UserResetPassword from '../views/user/UserResetPassword.vue'
import ArticleRecommend from '../views/article/ArticleRecommend.vue'
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";

const routes = [
    {
        path: '/login',
        component: LoginVue
    },
    {
        path: '/',
        component: LayoutVue,
        children: [
            {
                path: "/",
                redirect: "/article/recommend"
            },
            {
                path: '/article/recommend',
                component: ArticleRecommend
            },
            {
                path: '/article/category',
                component: ArticleCategory
            },
            {
                path: '/article/manage',
                component: ArticleManage
            },
            {
                path: '/user/avatar',
                component: UserAvatar
            },
            {
                path: '/user/info',
                component: UserInfo
            },
            {
                path: '/user/resetpassword',
                component: UserResetPassword
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router
