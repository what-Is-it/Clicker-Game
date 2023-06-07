import {createRouter, createWebHistory} from 'vue-router'
import WelcomePage from '../views/WelcomePage.vue'

const routes = [
    {
        path: '/',
        name: 'WelcomePage',
        component: WelcomePage,
        meta: {
            layout: 'welcome',
        },
    },
    {
        path: '/game',
        name: 'Home',
        component: () => import('../views/Home.vue'),
        meta: {
            layout: 'game',
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
