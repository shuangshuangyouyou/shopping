import store from "@/store";
import Vue from "vue";
import VueRouter from "vue-router";
// import categoryGoodsDetail from '../views/categoryGoodsDetail.vue'

// 路由跳转重复点击报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    meta: {
      num: 0,
      tabBarStatus:true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/demo.vue"),
    children: [
      {
        path: "/home/searchPage",
        name: "searchPage",
        component: () => import("../views/searchPage.vue"),
      },
    ],
  },

  {
    path: "/home/typeList",
    name: "typeList",
    component: () => import("../views/typeList.vue"),
  },
  {
    path: "/home/brand/detail",
    name: "brandDetail",
    component: () => import("../views/brand.vue"),
  },
  {
    path: "/home/goods/detail",
    name: "goodsdetail",
    component: () => import("../views/newList.vue"),
  },
  {
    path: "/home/goods/list",
    name: "goodslist",
    component: () => import("../views/goodslist.vue"),
  },
  {
    path: "/label",
    name: "label",
    component: () => import("../views/label.vue"),
    meta:{
      num:1,
      tabBarStatus:true
    }
  },
  {
    path: "/sort",
    name: "sort",
    component: () => import("../views/sort.vue"),
    meta:{
      num:2,
      tabBarStatus:true
    },
    children: [
      {
        path: "/home/searchPage",
        name: "searchPage",
        component: () => import("../views/searchPage.vue"),
      },
    ],
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/cart.vue"),
    meta:{
      num:3,
      tabBarStatus:true,
      requireAuth:true
    }
  },
  {
    path: "/person",
    name: "person",
    component: () => import("../views/person.vue"),
    meta:{
      num:4,
      tabBarStatus:true
    }
  },
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});


// 页面刷新,重新赋值token
if(localStorage.getItem('token')){
  store.commit('setToken',localStorage.getItem('token'))
}


// 路由守卫
router.beforeEach((to,from,next)=>{
  if(to.matched.some(r => r.meta.requireAuth)){
    // let token=false
    if(store.state.token){
      next()
    }else{
      next('/person')
    }
    return
  }
  next()
})

export default router;
