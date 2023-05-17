import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import IndicesDetail from '../views/IndicesDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    // ...
     // return 期望滚动到哪个的位置
    // to:要进入的目标路由对象，到哪里去ss
    // console.log(to)
    // from:离开的路由对象，从哪儿来
    // console.log(from)  
    // savedPosition: 会记录滚动条的坐标，点击"后退/前进" 时的记录值(x:?,y:?)
    // console.log(savedPosition)  
    return { left: 100, top: 100 }
  },
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { top: 0 }
  //   }
  // },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/indices',
      name: 'indices',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/IndicesDetail.vue')
    },
    {
      path:'/weeks',
      name:'weeks',
      component:()=>import('../views/WeeksDetail.vue')
    }
  ]
})
router.afterEach((to, from) => {
  let bodySrcollTop = document.body.scrollTop
  if (bodySrcollTop !== 0) {
    document.body.scrollTop = 100
    return
  }
  let docSrcollTop = document.documentElement.scrollTop
  if (docSrcollTop !== 0) {
    document.documentElement.scrollTop = 100
  }
})

export default router
