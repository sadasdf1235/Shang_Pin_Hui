// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import ListContainer from '@/pages/Home/ListContainer'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import Member from '@/pages/Member'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import MyOrder from '@/pages/Center/myOrder'
// import GroupOrder from '@/pages/Center/groupOrder'
export default [
    {
        path: '/member',
        component: () => import("@/pages/Member"),
    },
    {
        path: '/home',
        //路由懒加载
        component: () => import("@/pages/Home"),
        meta: {
            show: true
        },
        children: [
            {
                path: '/listcontainer',
                component: () => import("@/pages/Home/ListContainer")
            }
        ]
    },
    {
        name: 'search',
        // path: '/search',
        // path:'search/:keyword', // params参数占位
        path: '/search/:keyword?', //加上问号 表示可传可不传 不会影响url
        component: () => import("@/pages/Search"),
        meta: {
            show: true
        }
    },
    {
        path: '/login',
        component: () => import("@/pages/Login"),
        meta: {
            show: false
        }
    },
    {
        path: '/register',
        component: () => import("@/pages/Register"),
        meta: {
            show: false
        }
    },
    {
        path: '/detail/:skuId?',
        component: () => import("@/pages/Detail")
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: () => import("@/pages/AddCartSuccess")
    },
    {
        path: '/shopcart',
        component: () => import("@/pages/ShopCart")
    },
    {
        path: "/trade",
        component: () => import("@/pages/Trade"),
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            // ...
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: () => import("@/pages/Pay"),
        beforeEnter: (to, from, next) => {
            // ...
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: () => import("@/pages/PaySuccess"),
    },
    {
        path: '/center',
        component: () => import("@/pages/Center"),
        children: [{
            path: 'myorder',
            component: () => import("@/pages/Center/myOrder")
        },
        {
            path: 'grouporder',
            component: () => import("@/pages/Center/groupOrder")
        },
        {
            path: '/center',
            redirect: '/center/myorder'
        }
        ]

    },
    // 重定向 默认跳转首页
    {
        path: '*',
        redirect: "/home"
    }
]