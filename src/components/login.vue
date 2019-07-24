<template>
    <div class="login">
        <div class="mask"></div>
        <div class="container center center_box">
            <div class="pop_close" @click="close"></div>
            <div class="download">
                <div class="fl item ">
                    <img class="img1" src="/static/imgs/e.png" alt="">
                    <div class="code_wrap">
                        <div class="code fl">
                            <img src="/static/imgs/timg.jpg" alt="">
                            <p>ios下载</p>
                        </div>
                        <div class="code fr">
                            <img src="/static/imgs/timg.jpg" alt="">
                            <p>Android下载</p>
                        </div>
                    </div>
                </div>
                <div class="fl item item2">
                    <div class="item2_wrap">
                        <p class="title">手机号登陆</p>
                        <input v-model="mobile" placeholder="请输入手机号" class="input">
                        <div class="input_wrap">
                            <input v-model="yzm" placeholder="请输入验证码" class="input">
                            <span class="sendyzm" v-if="!counting" @click="sendyzm">获取验证码</span>
                            <span class="sendyzm" v-else>
                                重新发送({{time}})
                            </span>
                        </div>
                        <div class="remember_wrap">
                            <label for="remember">
                                <input type="checkbox" id="remember"> 下次自动登陆
                            </label>
                        </div>
                        <div class="send" @click='login'>登陆</div>
                        <div class="else">
                            <p class="p1">其他登陆方式</p>
                            <div>
                                <div class="item fl">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAgVBMVEUAAAAoqOonqOonp+ogougnqOogoeUnqOknp+onqOkmp+kgn98nqOompukAeLsnp+onqOonp+kmp+onp+knp+kmp+gmpucZmeYop+knqOonp+kmp+onqOklpugnouglo+QnqOkop+onqOkmpekoqOknp+onqOkopuklqOklpeYoqOqW+eGpAAAAKnRSTlMA+vLlF5wT9uzHbRCzRQPcvayAeWJMNAq6p5eQdS8hG9LAZVzTy2lTUj7GxbX5AAABPUlEQVRIx+XVyXKCQBSFYbobmkFAFFCDDA4Zz/s/YGShBebevmSb/As21FdFj3j/JXvZrEPAFNtuKekDhUdv2SLThpiV+iLZp3jO7CRzxs+0oDaginqXSUAX57wZQjAlPArAFe054yuwJfyI+GIOFXDk0yYPXeiDRj1cbWn05UQBjWoneiHNKsbvv6+FO5UTaAuhlbC0i1EpIUvMg5HQkTp+YtWzuUJOD3PjR1hQQBw/MWWF4yeP6h1E0gZMF6L1FEULkZoi3NLge7yfIgXoWkBdBOgpioHSe3Wag1eNj0mZKnLv04mycTGz+XbNhTlMvVuWumENP9eWvZZjHmWM6QwctYSQT+GOQhXcNRS6COhMoUHPN/QxCIUrYqyeqFM9zmajcE81zL/QloUJtTltyvug/eRggCgOrtb7430DfwXRhkgt+MwAAAAASUVORK5CYII="
                                        alt="">
                                    <span class="block">QQ</span>
                                </div>
                                <div class="item fl">
                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAk1BMVEUAAAAJu1gJulgAtVIJu1gIulcAnkcJulkJu1kIulgJu1gJu1gJu1gIuFcJu1gKulkHulcGuVYAtFMJu1kKu1kJu1kJu1gJu1gIulgJuVYIulcFuVYHuVQIt1QGuFUJu1gKu1gJu1gJulgJulcJu1kKu1kKu1gJu1gJu1gKulkIuVYHt1YIulgJu1gIulgAsU4Ku1nUF5K5AAAAMHRSTlMA/I8P+H0F9eJb28lxQt6eSioV8/DXzb6YUTswJBwZ6NLDbGZW7bSupIQzIWCJeA2YwjknAAAB6UlEQVRIx+2U23aqMBBAB0K4yU1QuaMi3m2b//+6I5ggh5DQvnZ1P5FkbTOZGQf+mAA1auwZhCherKbhdwy9iRUyQDmls45lE461JVXuezJJfBc7wYoIWAXC0BQiRBGEmFJHYE3etTTocbTTSI/RL4wCeBb08PIF1YI5JwRhTL/3vPOgRxoCgILF1Ja2YmHzz2L1sbsVjcnsFkdWr7GT9Q+uhquifSxhZCNJ7U82ue6afTPcwPX6I5VLgxRjn+C6HnfhUWKsErcKHNX3VZyWQ0msHJ3K2b/rvruW89Llfo1GveEzTdCq2sE1+d3oIEuEFtTTDZnoLOU8jUME+K3kTp2oARGCW8vj983ySKNUnTUrfZ28Albyp3TgpZrF7ACg7et3EACmI+Ap6RuuCyr2D7sBwLl/yo3utlfl2kg6W+zrs79p+76JfHQjYiQ5/ruc2GYdjC+sCAsA/lnpTBOvoKMxhpuuTeSw4WIPpZ3cUYAyTOHjJJdM6hTDzY+rXDpT6bOdVFn5SBbbZ3YyuXSg0o5s2CDVEYK1zIkQy4MFQxqZhOFFqMP/SFJh6yAg9ITBLUFIYQq6wQUJ5WayRDeQol81ztFCmOOeGGMrg3mQdfFoXGcHb7mhLg6zyPNll+YvHHnwc0J1Cb+Ufxe+9RP+MWR4AAAAAElFTkSuQmCC"
                                        alt="">
                                    <span class="block">微信</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import {
        mapMutations,
        mapState
    } from 'vuex';
    import utils from '../utils.js'
    export default {
        data() {
            return {
                yzm: '123456',
                mobile: '18672795231',
                counting: false,
                time: 0
            }
        },
        computed: {
            ...mapState(['showLoginBox'])
        },
        methods: {
            ...mapMutations(['SHOWLOGIN', 'UPDATETOKEN', 'UPDATEUSERINFOR', 'UPDATEACCESSTOKEN']),

            sendyzm() {
                var mobile = this.mobile.trim();
                if (!mobile) {
                    this.$toast.error("请填写手机号!");
                    return
                }
                if (mobile.length != 11) {
                    this.$toast.error("手机号为11位数字!");
                    return
                }
                if (this.counting) {
                    return
                }
                this.time = 60;
                this.counting = true;
                var that = this;
                var timer = setInterval(() => {
                    if (that.time-- <= 0) {
                        that.counting = false;
                        that.time = 60;
                        clearInterval(timer)
                    }
                }, 1000);
                var d = {
                    mobile: mobile,
                }
                this.$http.post('/v1/Auth/sendPhoneCode', d).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.$toast.success('发送成功!');
                    } else if (d.code == 401) { //重新登录
                        this.time = 0;
                        this.counting = false;
                    } else {
                        this.time = 0;
                        this.counting = false;
                        this.$toast.error(d.message)
                    }
                }).catch((error) => {
                    this.counting = false;
                    this.time = 0;
                    this.$toast.error(error)
                })
            },
            login() {
                var d = "mobile=" + this.mobile + "&yzm=" + this.yzm;
                this.$http.post('/v1/Auth/phoneLogin', d, {}).then((data) => {
                    /*      
                        d.stype, //1猎人，0普通用户，2待审核
                        d.sex, //2为女，1为男
                        d.online_status //0为下线，1为在线
                    */
                    var d = data.data;
                    if (d.code == 200) {
                        this.UPDATEACCESSTOKEN({
                            access_token: d.data.token.access_token,
                            user_id: d.data.user_id
                        });
                        this.UPDATETOKEN(true);
                        this.UPDATEUSERINFOR(d.data)
                    } else {
                        this.$toast.error(d.message);
                    }
                })
            },
            close() {
                this.SHOWLOGIN(false);
            }
        },
        mounted() {}
    }

</script>
<style lang='scss' scoped>
    .login {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;
        z-index: 100;

        .mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            opacity: 0.3;
        }

        &.show {
            display: block;
        }

        .container {
            overflow: hidden;
            width: 740px;
            border-radius: 20px;
            background: url("/static/imgs/c@2x.png") no-repeat left bottom;
            background-color: #fff;
            padding: 49px 0 35px 0;

            .download {
                margin: 0 40px;

            }

            .img1 {
                width: 196px;
            }

            .code_wrap {
                overflow: hidden;
                margin-top: 120px;
                width: 245px;
            }

            .item {


                &.item2 {
                    margin-left: 80px;
                    width: 300px;

                    .title {
                        margin: 0px 0 30px 0;
                        color: #FF4C2E;
                        font-size: 20px;
                    }

                    .item2_wrap {
                        display: inline-block;
                    }
                }
            }
        }

        .code {
            p {
                margin-top: 15px;
                color: #fff;
                font-size: 12px;
            }

            img {
                width: 105px;
                height: 105px;
            }
        }

        .input {
            box-sizing: border-box;
            width: 100%;
            height: 50px;
            border: 2px solid #f7aa9d;
            border-radius: 30px;
            color: #333;
            padding-left: 25px;
        }

        .input_wrap {
            position: relative;
            margin-top: 26px;

            .sendyzm {
                position: absolute;
                right: 25px;
                top: 12px;
                color: #FF4C2E;
                cursor: pointer;
            }
        }

        .remember_wrap {
            margin-top: 10px;

            color: #FF4C2E;
            font-size: 12px;
            cursor: pointer;
            text-align: left;
            margin-left: 31px;
            margin-bottom: 35px;
        }

        .send {

            height: 50px;
            line-height: 50px;
            background: linear-gradient(93deg, rgba(255, 119, 49, 1) 0%, rgba(254, 64, 6, 1) 100%);
            border-radius: 25px;
            font-size: 20px;
            color: #fff;
            cursor: pointer;
        }

        .else {
            display: inline-block;
            width: 260px;

            .p1 {
                color: #999;
                font-size: 12px;
                margin-top: 35px;
                margin-bottom: 10px;
            }

            .item {
                width: 50%;
                display: inline-block;
            }
        }

        .pop_close {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 20px;
            height: 20px;
            cursor: pointer;
            background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAJFBMVEUAAABlZWVlZWVlZWVmZmZmZmZlZWVmZmZlZWVmZmZmZmZlZWXzs26aAAAAC3RSTlMAbGF29+1omnGjj6ZGDUoAAABoSURBVAjXLc2hDYBAEETRISQEicfQBwUgrgMUHk0VWBo5ksNsc2RmZ9XmiT94DujGDaXmuzacMfHr40UXVRgLMJOJIBvFwmQjmWgWZlPtbDLiIbY9pLZQ7US1jck3kfyhEMkNl4eG/QfLaityGdozKgAAAABJRU5ErkJggg==") no-repeat center center;
        }
    }

</style>
