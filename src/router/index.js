import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 解决 vue-Robert push报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const router = new Router({
    /**
     * history  去掉#号
     * hash 默认#号
     */
    mode: 'hash',
    routes: [
        {     //根目录登录页面
            path: '/',
            redirect: '/login',
            meta: {
                keepAlive: true,
            }
        },
        {  // 登陆
            path: '/login',
            name: "Login",
            meta: {
                title: '登陆'
            },
            component: () => import('../views/login'),
        },
        {   //404
            path: '/err',
            name: "Err",
            component: () => import('../views/err'),
            meta: {
                title: '404'
            },
        },
        {   //没有权限
            path: '/roles',
            name: "Roles",
            component: () => import('../views/roles'),
            meta: {
                title: '权限不够'
            },
        },
        {   //pc端首页
            path: '/pc_index',
            name: "pc_Index",
            component: () => import('../views/pc/pc_index'),
            meta: {
                title: '首页',
                roles: ['admin']
            },
            children: [
                {   //pc端约车
                    path: '/pc_pactCar',
                    name: "pc_pactCar",
                    component: () => import('../views/pc/pc_pactCar'),
                    meta: {
                        title: '约车',
                        roles: ['admin']
                    },
                },
                {   //pc端未派车
                    path: '/pc_did_not_car',
                    name: "pc_did_not_car",
                    component: () => import('../views/pc/pc_did_not_car'),
                    meta: {
                        title: '未派车',
                        roles: ['admin']
                    },
                },
                {   //pc端已派车
                    path: '/pc_have_sent_car',
                    name: "pc_have_sent_car",
                    component: () => import('../views/pc/pc_have_sent_car'),
                    meta: {
                        title: '已派车',
                        roles: ['admin']
                    },
                },
                {   //pc端车辆管理
                    path: '/pc_setCar',
                    name: "pc_setCar",
                    component: () => import('../views/pc/pc_setCar'),
                    meta: {
                        title: '车辆管理车',
                        roles: ['admin']
                    },
                },
                {   //pc首页图表
                    path: '/pc_char',
                    name: "pc_char",
                    component: () => import('../views/pc/pc_char'),
                    meta: {
                        title: '首页',
                        roles: ['admin']
                    },
                },
            ]
        },

        {   //移动端首页
            path: '/h5_index',
            name: "h5_Index",
            component: () => import('../views/h5/h5_index'),
            meta: {
                title: '首页',
                roles: ['admin', 'user', 'SJ']
            },
        },
    ]
})


export default router



// // 路由守卫 
router.beforeEach((to,from,next)=>{
   document.title = to.meta.title
  const outerPaths = ['/login','/err','/roles'];   //白名单
  let per = sessionStorage.getItem('per');  //根据用户访问路由权限
  if(!outerPaths.includes(to.path)){     //  过滤登陆页面  防止出现死循环 内存溢出
          if(to.meta.roles == undefined){   //地址栏访问不到的路由全部404
            next({path:"/err"})	//跳到404页面
          }else{
              if(to.meta.roles.includes(per)){   //登陆后 防止用户用地址栏跳转没有权限的路由
                 next();
              }else{
                 if(per == 'admin'){
                      next();
                 }else{
                   next({path:"/"})	//跳到拦截页面

                 }
              }
          }
  }else{   
      next();
  }

})
