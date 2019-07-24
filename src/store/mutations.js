import {
    SHOWLOGIN,
    UPDATETOKEN,
    UPDATEUSERINFOR,
    UPDATEDEFAULTKEY,
    UPDATEACCESSTOKEN,
    UPDATEONLINESTATUS,
    UPDATESEARCHINFO
} from './mutation_type'
import utils from '../utils'

export default {
    [UPDATEDEFAULTKEY](state, v) {
        state.defaultkey = v
    },
    [SHOWLOGIN](state, value) {
        state.showLoginBox = value
    },
    [UPDATETOKEN](state, value) {
        state.showLoginBox = !value;
        state.hasToken = value
        if (!value) {
            state.access_token = ''
            state.userInfo = ''
            utils.removeItem('userInfo')
            utils.removeItem('access_token')
        }
    },
    [UPDATEUSERINFOR](state, userinfo) {
        state.userInfo = userinfo
        utils.setItem('userInfo', JSON.stringify(userinfo))
    },
    [UPDATEONLINESTATUS](state, status) {
        state.userInfo.online_status = status
        utils.setItem('userInfo', JSON.stringify(state.userInfo))
    },
    [UPDATEACCESSTOKEN](state, obj) {
        if (Object.prototype.toString.call(obj).slice(8, -1) == 'Object') {
            state.access_token = 'USERID ' + utils.base64encode('web:' + obj.access_token + ':' + obj.user_id)
            utils.setItem('access_token', state.access_token)
        } else {
            state.access_token = obj
            utils.setItem('access_token', obj)

        }
    },
    [UPDATESEARCHINFO](state, obj) {
        state.searchInfo = obj
    }
}
