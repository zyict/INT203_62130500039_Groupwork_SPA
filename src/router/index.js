import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Comments from '../views/Comments.vue'
import MemberList from '../views/MemberList.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/comments',
        name: 'Comments',
        component: Comments
    },
    {
        path: '/memberlist',
        name: 'MemberList',
        component: MemberList
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router