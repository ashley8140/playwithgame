const utils = {
/*     getToken() {
        var userInfo = JSON.parse(utils.getItem('userInfo'));
        if (userInfo && userInfo.token){
            return 'USERID ' + utils.base64encode('web:' + userInfo.token.access_token + ':' + userInfo.user_id)
        } else {
            return ''
        }
    }, */
    setItem(name, value) {
        return window.localStorage.setItem(name, value)
    },
    getItem(name) {
        return window.localStorage.getItem(name);
    },
    removeItem(name) {
        window.localStorage.removeItem(name);
    },
    getCookie(Name) {
        var search = Name + "=" //查询检索的值
        var returnvalue = ""; //返回值
        var sd, end;
        if (document.cookie.length > 0) {
            sd = document.cookie.indexOf(search);
            if (sd != -1) {
                sd += search.length;
                end = document.cookie.indexOf(";", sd);
                if (end == -1)
                    end = document.cookie.length;
                //unescape() 函数可对通过 escape() 编码的字符串进行解码。
                returnvalue = unescape(document.cookie.substring(sd, end))
            }
        }
        return returnvalue;
    },
    delete: function (key) {
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = key + "=v; expires =" + date.toGMTString(); //设置cookie
    },
    //防抖
    debunce(callback, delay) {
        let timer;
        let de = delay || 200;
        return function (args) {
            var args = arguments;
            timer && clearTimeout(timer);
            var doNow = !timer;
            timer = setTimeout(() => {
                callback.call(this, args);
            }, de);
            if (doNow) {
                callback.call(this.args);
            }
        }
    },
    dataFormat(fmt) {
        var d = new Date(fmt*1000);
        return d.getFullYear() + '-' + (d.getMonth() + 1) + "-" + d.getDate()
    },
    dataFormatDetail(fmt){
        var d = new Date(fmt*1000);
        return d.getFullYear() + '-' + (d.getMonth() + 1) + "-" + d.getDate() + ' ' + d.getHours() + ":" + d.getMinutes()+":"+ d.getSeconds();

    },
    base64encode(input) {
        // private property  
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

        // public method for encoding  
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }

        function _utf8_encode(utftext) {
            var string = "";
            var i = 0;
            var c = 0;
            var c1 = 0;
            var c2 = 0;
            while (i < utftext.length) {
                c = utftext.charCodeAt(i);
                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                } else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                } else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }
            }
            return string;
        }
        return output;
    }
}
export default utils;
