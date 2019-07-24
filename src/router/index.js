const Home = r => require.ensure([], () => r(require("../views/Home")))
const findPeople = r => require.ensure([], () => r(require("../views/findPeople")))
const recharge = r => require.ensure([], () => r(require("../views/recharge")))
const join = r => require.ensure([], () => r(require("../views/join")))
const message = r => require.ensure([], () => r(require("../views/message")))
const appDownload = r => require.ensure([], () => r(require("../views/appDownload")))
const userCenter = r => require.ensure([], () => r(require("../views/userCenter")));
const hunterInfo = r => require.ensure([], () => r(require("../views/hunterInfo")));
const purchase = r => require.ensure([], () => r(require("../views/purchase")));
const hunterTips = r => require.ensure([], () => r(require("../views/hunterTips")));
const rechargeTips = r => require.ensure([], () => r(require("../views/rechargeTips")));
const Search = r => require.ensure([], ()=>r(require("../views/navSearch")))

const yeRecharge = r => require.ensure([], () => r(require("../views/recharge/yeRecharge.vue")));
const diamondRecharge = r => require.ensure([], () => r(require("../views/recharge/diamondRecharge.vue")));
const orderdetail = r => require.ensure([], () => r(require("../views/usercenter/orderdetail.vue")));

const order = r => require.ensure([], () => r(require("../views/usercenter/order.vue")))
const getMoney = r => require.ensure([], () => r(require("../views/usercenter/getMoney.vue")))
const album = r => require.ensure([], () => r(require("../views/usercenter/album.vue")))
const popularize = r => require.ensure([], () => r(require("../views/usercenter/popularize.vue")))
const purse = r => require.ensure([], () => r(require("../views/usercenter/purse.vue")))
const editInfo = r => require.ensure([], () => r(require("../views/usercenter/editInfo.vue")))
const service = r => require.ensure([], () => r(require("../views/usercenter/service.vue")))
const gift = r => require.ensure([], () => r(require("../views/usercenter/gift.vue")))
const fans = r => require.ensure([], () => r(require("../views/usercenter/fans.vue")))

export default new VueRouter({
    mode: 'history',
    routes: [{
            path: '*',
            redirect: {
                name: 'home'
            }
        }, {
            path: '/',
            name: 'home',
            component: Home,
            meta: {
                keepAlive: true,
                auth: false
            },
        },{
            path: '/search',
            name: 'search',
            component: Search,
            meta: {
                auth: false,
                keepAlive: false
            }
        },
        {
            path: '/findPeople/:key', //找陪玩
            name: 'findPeople',
            component: findPeople,
            meta: {
                keepAlive: true,
                auth: false,
            },
        },
        {
            path: '/hunterInfo/:touid/:key', //猎人touid,游戏key
            name: 'hunterInfo',
            component: hunterInfo,
            meta: {
                keepAlive: false,
                auth: false
            }
        },
        {
            path: '/recharge', //充值
            name: 'recharge',
            component: recharge,
            meta: {
                //keepAlive: true,
                auth: true
            },
            children: [{
                    path: '/recharge/yeRecharge', //余额充值
                    component: yeRecharge,
                    meta: {
                        keepAlive: true
                    }
                }, {
                    path: '/recharge/diamondRecharge', //钻石充值
                    component: diamondRecharge,
                    meta: {
                        keepAlive: true
                    }
                },

            ],
            redirect: '/recharge/yeRecharge'
        },
        {
            path: '/join/:key/:service_id', //申请入驻
            name: 'join',
            component: join,
            meta: {
                keepAlive: false,
                auth: true
            },
        },
        { //下单
            path: '/purchase/:uid_service/:service_id',
            name: 'purchase',
            component: purchase,
            meta: {
                keepAlive: false,
                auth: true
            },
        },
        {
            path: '/message', //消息
            name: 'message',
            component: message,
            meta: {
                keepAlive: false,
                auth: true
            },
        }, {
            path: '/appDownload', //app下载
            name: 'appDownload',
            component: appDownload,
            meta: {
                keepAlive: true,
                auth: false
            },
        }, { //充值等级说明
            path: '/rechargeTips',
            name: 'rechargeTips',
            component: rechargeTips,
            meta: {
                keepAlive: true,
                auth: false
            },
        }, { //猎人等级说明
            path: '/hunterTips',
            name: 'hunterTips',
            component: hunterTips,
            meta: {
                keepAlive: true,
                auth: false
            },
        }, {
            path: '/userCenter', //个人中心
            name: 'userCenter',
            component: userCenter,
            meta: {
               // keepAlive: true,
                auth: true
            },
            children: [{
                    path: '/userCenter/order', //订单中心
                    name: 'order',
                    component: order,
                    meta: {
                        keepAlive: false
                    }
                },
                {
                    path: '/userCenter/orderdetail', //订单详情,
                    name: 'orderdetail',
                    component: orderdetail,
                    meta: {
                        keepAlive: false
                    }
                },
                {
                    path: '/userCenter/getMoney', //领取工资
                    name: 'getMoney',
                    component: getMoney,
                    meta: {
                        keepAlive: false
                    }
                },
                {
                    path: '/userCenter/album',
                    name: 'album',
                    component: album, //相册
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/userCenter/popularize', //自我推广
                    name: 'popularize',
                    component: popularize,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/userCenter/purse', //我的钱包
                    name: 'purse',
                    component: purse,
                    meta: {
                        keepAlive: false
                    }
                },
                {
                    path: '/userCenter/editInfo', //编辑资料,
                    name: 'editInfo',
                    component: editInfo,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/userCenter/service', //服务管理
                    name: 'service',
                    component: service,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/userCenter/gift', //礼物
                    name: 'gift',
                    component: gift,
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/userCenter/fans', //粉丝
                    name: 'fans',
                    component: fans,
                    meta: {
                        keepAlive: true
                    }
                },

            ]
        }
    ],
    linkActiveClass: 'navIsActive'
})
