//引入vue-router
import { createRouter, createWebHashHistory } from 'vue-router'
//ES6  import输入  export 输出
// 模块化 默认私有，如何被别人使用？
// 通过export 输出
// 如何使用
// export default 默认输出
import Index from '@/views/static/index.vue'
import LayoutAdmin from '@/layout/admin/index.vue'
//白名单
const whiteList = [
    "/",
    "/login"
]
import { useUserStore } from '../store/user'

import home from "@/views/admin/pms/home/home.vue"
import brand from "@/views/admin/pms/brand/brandManage.vue"
import feightTemplate from "@/views/admin/pms/feight-template/feight-template.vue"
import product from "@/views/admin/pms/product/product.vue"
import productAttribute from "@/views/admin/pms/productAttribute/productAttribure.vue"
import productAttributeCategory from "@/views/admin/pms/productAttributeCategory/productAttributeCategory.vue"
import productAttributeValue from "@/views/admin/pms/productAttributeValue/productAttributeValue.vue"
import productCategory from "@/views/admin/pms/productCategory/productCategory.vue"
import relation from "@/views/admin/pms/relation/relation.vue"
import vertify from "@/views/admin/pms/vertify/vertify.vue"
import sku from "@/views/admin/pms/sku/sku.vue"

//路由表
const routes = [
    {
        path: '/',
        name: 'shop',
        component: Index,
        component: () => import('../views/admin/pms/shop/shop.vue')// 懒加载
    },
    {
        path: '/home',
        name: 'home',
        component: home,
        children: [
            { path: 'brand', name: 'brand', component: brand },
            { path: 'feightTemplate', name: 'feightTemplate', component: feightTemplate },
            { path: 'product', name: 'product', component: product },
            { path: 'productAttribute', name: 'productAttribute', component: productAttribute },
            { path: 'productAttributeCategory', name: 'productAttributeCategory', component: productAttributeCategory },
            { path: 'productAttributeValue', name: 'productAttributeValue', component: productAttributeValue },
            { path: 'productCategory', name: 'productCategory', component: productCategory },
            { path: 'relation', name: 'relation', component: relation },
            { path: 'vertify', name: 'vertify', component: vertify },
            { path: 'sku', name: 'sku', component: sku },
            // { path: 'shop', name: 'shop', component: shop },
        ]
    },
    {
        path: '/adcate',
        name: 'adCate',
        component: () => import('../views/static/adCate.vue')// 懒加载
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/static/login.vue')// 懒加载
    },
    
    {
        path: '/oms',
        name: 'oms',
        component: import('../views/admin/oms.vue')
    },
    {
        path: '/admin',
        name: 'admin',
        component: LayoutAdmin,
        children: [
            {
                path: '',
                name: 'admin-index',
                component: () => import('@/views/admin/index.vue')
            },
            {
                path: 'info',
                name: 'admin-info',
                component: () => import('@/views/admin/info.vue')
            },
            {
                path: 'logout',
                name: 'admin-logout',
                component: () => import('@/views/admin/logout.vue')
            }, {
                path: 'changepassword',
                name: 'admin-changepassword',
                component: () => import('@/views/admin/changepassword.vue')
            },
            {
                path: 'forgetpassword',
                name: 'admin-forgetpassword',
                component: () => import('@/views/admin/forgetpassword.vue')
            },
            {
                path: 'resourceCategory',
                name: 'admin-resourceCategory',
                component: () => import('@/views/admin/resourceCategory.vue')
            },
            {
                path: 'cmshelpcategory',
                name: 'admin-cmshelpcategory',
                component: () => import('@/views/admin/cmshelpcategory.vue')
            },

        ]
    },

    {
        path: '/subject',
        name: 'subject',
        component: () => import('@/views/admin/subject.vue')
    },

    {
        path: '/sms',
        name: 'sms',
        component: () => import('@/views/admin/sms.vue')
    },
    {
        path: '/homeAdvertise',
        name: 'admin-homeAdvertise',
        component: () => import('@/views/admin/homeAdvertise.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('../views/404.vue')// 懒加载  
    }

]
const router = createRouter({
    //模式
    history: createWebHashHistory(),
    routes
})
//前置路由守卫
//用户状态 user.js
router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    if (whiteList.includes(to.path)) {
        next();
    }
    else {
        next()
        // if (userStore.token && userStore.token.length > 0) {
        //     next()
        // }
        // else {
        //     next({ name: "login" })
        // }

    }


})
export default router;