// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App';
import axios from 'axios';
import router from "./router";
import store from "./store";
import './css/init.scss';
import utils from './utils';
import toast from './components/toast';

Vue.use(toast)

Vue.config.productionTip = false
axios.defaults.baseURL = config.hosturl;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.timeout = 30000; //超时时间
axios.defaults.loading = false;
axios.defaults.auth = true;
var access_token = utils.getItem('access_token');
console.log('access_token', access_token)

!!access_token && (axios.defaults.headers.common['authentication'] = access_token);

Vue.prototype.$http = axios;

let pending = [];
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    for (let p in pending) {
        if (pending[p].u === config.url + '&' + config.method + '&' + config.data) {
            pending[p].f(); //取消
            pending.splice(p, 1); //移除
        }
    }
}

axios.interceptors.request.use((config) => {
    removePending(config);
    config.cancelToken = new cancelToken((c) => {
        //用请求地址&请求方式拼接的字符串
        pending.push({
            u: config.url + '&' + config.method + '&' + config.data,
            f: c
        });
    });
    if (config.loading) {

    }
    return config;
}, (err) => {

    return Promise.reject(err);
});
axios.interceptors.response.use((res) => {
    removePending(res.config); //在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
    if (res.config.auth && (res.data.code == 401)) { //token过期
        store.commit('UPDATETOKEN', false);
    }
    return res
}, (err) => {
    var config = err.config;
    if (!config || !config.retry) {
        const errorMsg = err.toString();
        if (errorMsg.includes('timeout')) {
            toast('请求超时')
        }
        return Promise.reject(err)
    };
    return Promise.reject(err);
})

router.beforeEach((to, from, next) => {
    if (to.name != 'home' && !store.state.defaultkey && utils.getItem('defaultkey')) {
        store.commit('UPDATEDEFAULTKEY', utils.getItem('defaultkey'))
    }
    var a = utils.getItem('access_token');
    if (Vue1) {
        //刷新页面时第一次进页面Vue1还没初始化，这里是判断从一个页面到另一个页面前,人为修改了localstorage里的token
        if (store.state.access_token && (a != store.state.access_token)) {
            a = store.state.access_token;
            store.commit('UPDATEACCESSTOKEN', a);
        }
    }
    if (a != access_token) {
        access_token = a
        axios.defaults.headers.common['authentication'] = a;
    }
    if (a) {
        store.commit('UPDATETOKEN', true);
        if (!store.state.userInfo.openid) { //刷新了页面
            var userInfo = JSON.parse(utils.getItem('userInfo'));
            if (userInfo.openid) { //有缓存
                store.commit('UPDATEUSERINFOR', userInfo)
            } else {
                //根据token获取用户信息，还没有接口
            }
        }
        next()
    } else {
        //登陆界面
        store.commit('UPDATETOKEN', false);
        //有些页面不需要登录也可以访问
        if (to.matched.some(record => record.meta.auth)) {
            store.commit('SHOWLOGIN', true);
        } else {
            store.commit('SHOWLOGIN', false);
            next();
        }
    }
});
/* eslint-disable no-new */
var Vue1 = new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})
