import IndexView from "@/views/IndexView.vue";
import {createRouter, createWebHashHistory} from "vue-router";
import BasicLayout from "@/layout/BasicLayout.vue";
import QuestionView from "@/views/QuestionView.vue";
import ShareView from "@/views/ShareView.vue";
import AboutView from "@/views/AboutView.vue";

const routes = [
    {
        path: '/', // 路由地址
        component: BasicLayout,
        meta: { // meta 信息
            title: '首页' // 页面标题
        },
        children: [
            {
                path: '/', // 路由地址
                component: IndexView, // 对应组件
                meta: { // meta 信息
                    title: '首页' // 页面标题
                }
            },
            {
                path: '/share',
                component: ShareView,
                meta: {
                    title: '分享'
                }
            },
            {
                path: '/question',
                component: QuestionView,
                meta: {
                    title: '提问'
                }
            },
            {
                path: '/about',
                component: AboutView,
                meta: {
                    title: '关于'
                }
            }
        ]
    },
]
// 创建路由
const router = createRouter({
    // 指定路由的历史管理方式，hash 模式指的是 URL 的路径是通过 hash 符号（#）进行标识
    history: createWebHashHistory(),
    // routes: routes 的缩写
    routes,
})
export default router