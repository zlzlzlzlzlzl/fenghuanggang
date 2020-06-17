import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index/Index'//主页
import RouterPage from '@/pages/RouterPage/RouterPage'//子页面
import Author from '@/pages/Author/Author'//微信授权页面




Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {
        path: '/index'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        keepAlive: true, title: '主页'
      }
    },
    {
      path: '/routerPage',
      name: 'routerPage',
      component: RouterPage,
      meta: {
        keepAlive: false, title: '子页面'
      }
    },
    {
      path: '/author',
      name: 'author',
      component: Author,
      meta: {
        keepAlive: false,
      }
    },


  ]
})
router.beforeEach(( to, from, next ) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
  // console.log(to+'---'+from+'---'+next)
  // if (to.name != 'author') {//判断当前是否是新建的auth路由空白页面
  //   let member_id = commonFun.getCookie('member_id');
  //   if (!member_id) {//如果没有token,则让它授权
  //     //保存当前路由地址，授权后还会跳到此地址
  //     sessionStorage.setItem('beforeUrl', to.fullPath);
  //     //授权请求,并跳转http://m.water.ui-tech.cn/auth路由页面
  //     window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5092f94c349f3f44&redirect_uri='+encodeURIComponent("http://zhongshan.worldmaipu.com/zs/index.html#/author")+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
});
// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   next()
// })
export default router
