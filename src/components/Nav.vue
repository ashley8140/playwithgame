<template>
    <div class="nav_wrap" id="nav" ref="nav">
        <div class="container nav">
            <div class="logo_img_wrap fl">
                <img src="/static/imgs/logo.png" alt="">
            </div>
            <div class="search_wrap fl">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAAe1BMVEUAAADMzMzKysrMzMzMzMzMzMzMzMzLy8vMzMzMzMzNzc3Hx8fHx8fDw8PLy8vMzMzMzMzLy8vLy8vMzMzNzc3KysrLy8vNzc3MzMzLy8vMzMzMzMzLy8vLy8vAwMDNzc3MzMzLy8vLy8vLy8vLy8vKysrMzMzKysrKyspil4h9AAAAKXRSTlMA0B3gyLHqb2liRhQQDAjw3JhTTj8zJOW1q5aPLikEwL+7o56FfXNXOn27g6sAAACfSURBVBjTZY9XEoQgEAUHyWYFs25O9z/hglAu1L6PZmigZoA9pZZCFRAkXxi5z7QLVIebxFX05VXPWvBJEHcFEZZestUuikAQPllOMmpX2e51D2HIx6DKI0eVAU4id9EGYxuqssoMJQ3d+7yf4PSnitpt9LAeL8fGVy0TJ/dxdMuoH227Dg0XD4IlFOiYY+PL/Ezt7RzVVsbJEIJ/mX4BkaQGfu0MZW8AAAAASUVORK5CYII="
                    alt="">
                <input placeholder="昵称" type="text" v-model="content" @input="search">
            </div>
            <ul class="nav_links fl">
                <router-link exact :to="{name: 'home'}">
                    <li class="nav_item center">
                        <span>
                            首页
                        </span>
                    </li>
                </router-link>
                <router-link exact :to="{name: 'findPeople',params:{key: defaultkey}}">
                    <li class="nav_item center">
                        <span>
                            找陪玩
                        </span>
                    </li>
                </router-link>
                <router-link :to="{name: item.link}" v-for="(item, index) in navList" :key="index">
                    <li class="nav_item center">
                        <span>
                            {{item.name}}
                        </span>
                    </li>
                </router-link>
                <router-link v-if="!hasToken" exact to="{name: ''}">
                    <li class="nav_item center" @click="showLogin">
                        <span>登录 | 注册</span>
                    </li>
                </router-link>
            </ul>
            <!-- 用户信息 -->
            <div class="photo_wrap fr" v-if="hasToken" @mouseover="show=true" @mouseout="show=false">
                <img class="photo" :src=userInfo.avatar>
                <img width=15
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAASCAMAAAB7LJ7rAAAATlBMVEUAAADMzMzKysrIyMjExMSurq7MzMzMzMzMzMzLy8vLy8vMzMzMzMzLy8vMzMzIyMjLy8vCwsLLy8vLy8vMzMzLy8vMzMzLy8vHx8fMzMwuKq1mAAAAGXRSTlMA1x4QCga/6OTPysS4saolGBXeo5uUi4QpLR0u9QAAAJBJREFUKM99kFUWgDAMBJcKRYtL7n9RSOG9IoH5qGSqC0BB5BSr81aS1rsVaDKi2gq2JsoapLRTmac1FddTqCT05mHDrkQBbfClvlpdBtvyuMt5XOiLLbiSd9IsrpfOirdJL0F86+sfvdptL/2UU+AcOCUpJ+u57hy3YsoDnQwQGQ874oOJ7YRPZqIZPywLbmxb8g37StmK7gAAAABJRU5ErkJggg=="
                    alt="">
            </div>
            <div class="float_box center" v-if="hasToken" :class="{'show': show}" @mouseover="show=true"
                @mouseout="show=false">
                <div class="photo1">
                    <img class="img1" :src=userInfo.avatar alt="">
                </div>
                <p class="username">{{userInfo.nickname}} <img v-if='userInfo.sex==2'
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAAtFBMVEUAAAD/Sy3/Sy3/Sy3/TC3/TCz/Rij/QiH/Mxr/JQD/Sy7/Sy3/Sy3/Sy3/Syz/Sy7/Sy7/Sy3/Sy3/Sy7/Sy3/Ryv/Riz/TC3/Sy3/TC7/TC7/////4dv/emP/X0T/08z/sKL/nIv/kX7/c1v/UjX/+fj/alH/8O7/7uv/5eH/vbL/pJX/lIL/gWv/TzH//v7/7+z/2NH/19D/zcX/zMT/x77/taj/q53/oZH/WT7/Vzv/TjDpksNwAAAAGnRSTlMA+L3x0YQZDwoD/OXBfHbfyceTi2YkHdupqPkHZksAAADJSURBVBjTbZDXFoJADEQXUbFg77OLUgQbYO///1+SrOCL9y1zJmeSEcyo0msazVK7KnJq/QY0RqWupWoZcB675E1qyWJXGfOFzFARi+QcYKnk2r1v5GpOYluIsQFfqhewPEuXNNMSLWArfRoceQQxFDZpsdZOrM1EB7T7zHYXehddYYIyDjeXM4gJ+b63hAGciH02iMDzkvX1st8BmFIuwWYVcC7dx3ihUirl++gPxonTKPQAtPS/OX7A/+peftjW//6Kns1G0fMHTTYfAIFeKxcAAAAASUVORK5CYII="
                        alt="">
                    <img v-if="userInfo.sex==1"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAAmVBMVEUAAAARev8jgv8igv8ig/8igv8ig/8jgv8igv8ig/8ggP8hff8Yef8jg/8jgv8igv8jgv8hgv8igf8jg/////8lhP9ImP8siP/4+//u9f/j7/+Kvf96tf9co//z+P+s0P+Vw/9WoP8+kv/o8v/m8f/f7f/a6v/M4/+52P+w0/91sv9PnP81jv/T5v/R5f+92v+eyf9rrP9lqP+mm3zdAAAAE3RSTlMACPvIw4/mzoF3IB4V+vnt5ZGQcBXW/wAAANhJREFUGNM1kFeSgzAQREU0YOOw0xIZA85h4/0Pt6Jl94dq5lVrkqKWabhdb8N0qd7yolyc8shzaLV4kaIRWazoChyZhgqdSDA7I5LxG+VXaY0S2fI+2W/dTIdrbSM/U4lQWktzeJadDRMVOmTMs2rldrNxoOIZdUegr7Q8Rpts1Nq+pkR9Alpxom+PvUiLviDasN4Jxr4X/JEF7HvGg273OeF8P7hqKWqMwvm4x9TjMnzirGf28dq3qwAcDat577sU9+HOrrzL7Nz54uTv6KKyNIzzOEwzZv/Doxf+CvtQUwAAAABJRU5ErkJggg=="
                        alt=""></p>
                <p>id: <span>{{userInfo.openid}} </span></p>
                <div v-if="userInfo.stype==0">
                    <ul class="links">
                        <router-link :to="{name:'order'}" tag="li" class="item">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAV1BMVEUAAACWlpb/Siz/Sy2ZmZmZmZmXl5eZmZmZmZmZmZmZmZmYmJiWlpaUlJSSkpKZmZn/ORySkpKZmZn/Sy6ZmZn/TC2YmJiXl5eZmZmVlZX/SSSZmZn/TC5se17xAAAAG3RSTlMAQxEi7sgTuKOTkH4lIBgKCQfl09G8sIBwKRVAF2unAAAAdklEQVQoz7XQWQqAMAxF0Rdt6zzP1v2vUxQbRVsEwfsXDoQQANoW9jSe/UUCQEqm6krbEGgTMTl6p/Hz8aXHlTfqFq65kedz8x8/zIWTSB7EP+wNxclJE22lhyiRuRaGMRyUyMJOKmxzWEhRJKICTJdqOWR4bwW3CwvNvfNMTAAAAABJRU5ErkJggg==">
                            <p>订单中心</p>
                        </router-link>
                        <router-link :to="{name:'join'}" tag="li" class="item">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAllBMVEUAAAD/LhqZmZmQkJCZmZmZmZmYmJiXl5eYmJiZmZmZmZn/TC6ZmZmZmZmZmZmZmZmXl5eZmZmXl5eZmZn/Sy3/SyyYmJiYmJj/Sy3/TC3/Syz/SCz/SCv/TC2YmJj/Si2Xl5f/TC3/Sy6ZmZn/Sy3/Sy7/Sy6YmJj/Syv/SiyYmJj/SiuYmJj/SCiYmJiZmZn/RCKZmZm5l+S6AAAAMXRSTlMABVUQq26tJ+ulWv768NrPUkofsK5V5Liqo3AnEeucWkLz5OPaz7i3UkpDQSUgd0EPssq46AAAAQJJREFUKM+dktl6gjAQRk8SCKjsiyKodV+qtuX9X64IxlYuvPDcne9PvslMBi7ar+vaCyU3ZOg15usL4Li2AsQysAE7WApA2a4D2qYjcRXKTe72pcFX3JnExBMjyocaw2DIcPCw+t3IE0asiMgyIjwIP42MHZyxObgMQQZJlyxSIF10WRJIwHYPlmXpTaoaUelGN3Zwu25VLKWMHDqcqLFY8Zr+reqY5/lpBm2tya3WuK31k62zoij285L/L9RANhWtXbd5r69qbfo673rTOBZGxKg3w4/pw96Mer982huZrXq7MZtf71Zmfxv13W5UuT2L251yXtFkT3uY70YNq6ziFb/OpxJR4aMR0gAAAABJRU5ErkJggg==">
                            <p>成为陪玩</p>
                        </router-link>
                        <router-link :to="{name:'purse'}" tag="li" class="item">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAb1BMVEUAAACWlpaZmZmZmZmYmJiTk5OSkpKZmZmZmZmZmZmZmZmYmJiZmZmUlJSWlpaVlZWZmZmZmZmZmZmZmZmZmZmZmZn/TC6ZmZn/SiyZmZmYmJiXl5eYmJj/Siv/SS7/SymUlJT/Qyj/QCCZmZn/TC7IpPFRAAAAI3RSTlMAM+XMoRAGqlWL4cJvICIY73prOC3UrJGQhH5iXEg4LCgTCO0GJRwAAACeSURBVCjPfdLZDsIgEIXhw7Booaut+y6+/zOKKYmGDvy3X0LIzCAkFPn/SAnMVVQ3Br9MU1M1i9NI0+5rgoIsjQSgNuCqFWAblloCvGHJ+EDgW5CZRCylU7+VsYSOrss8qPsO9xdLo8TtfWDpYfHcXVmCPGc/P1l1WccSgh7UKlaaRnGGts1Mvriv0Wa3jL0z/G2Ehg4Ac1Exmd5huQ8IIwv9A+OOZgAAAABJRU5ErkJggg==">
                            <p>我的钱包</p>
                        </router-link>
                    </ul>
                </div>
                <div v-if="userInfo.stype==1" :class="{'online': userInfo.online_status == 1}">
                    <div class="taking" v-if="userInfo.online_status == 0" @click="onOfflineReceipt(0)">开始接单</div>
                    <div class="taking" v-if="userInfo.online_status == 1" @click="onOfflineReceipt(1)">结束接单</div>
                    <ul class="links">
                        <router-link :to="{path:'/userCenter/order'}" tag="li" class="item">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAS1BMVEUAAAD/Sy3/Siz/SCv/RSf/Sy3/TC3/Mxr/RiL/Sy3/Sy3/Sy3/TC3/Sy3/Sy3/Syv/TC7/TC3/Sy3/TC7/Sy7/Syz/SC7/AAD/TC4QTrdEAAAAGHRSTlMARCIRF5HqCgfx0sq4o35Aw7ywgHApJwJM8INEAAAAdklEQVQoz7XQWQqAMAxF0dfZeR66/5WKYqNog1Dw/oUDIQSAj4Ujj3d/UQ5AirM2u9M+VD4kiJi+aUo+PlOUe1DvqeJBSlI6+VErTzpnqS1Poh8OgUxz0Sz2lrDPSm5hbcBQU7o4qbrQiJAWxhoHolu2GyW+2wCxtAppCX0LHgAAAABJRU5ErkJggg==">
                            <p>订单中心</p>
                        </router-link>
                        <router-link :to="{path:'/userCenter/service'}" tag="li" class="item">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAV1BMVEUAAAD/Si3/Sy3/Sy3/SCz/SCv/LR7/TC3/TC3/Siz/Sy3/Sy3/Sy3/Sy3/Sy7/Syv/SSv/SCj/Sy7/Syz/Sy7/RiL/Sy7/Sy7/SS3/Sy3/TC3/Sin/TC42p8mtAAAAHHRSTlMAV66rJxEF7KVu+vLk2s9SQiC4S5wOt3BJd3Yf4PMx3wAAAMJJREFUKM+cj0sOwyAMBZ8NDgXCLySRKnH/c9YVYV2ps3kajTcGLMcxRsiEL5SDWmQLLc6LzlaT1/GpbjrinTb2mDQnENceezMQBQ9HRz+WSAQGFi8CvbAY/6awLTEFxSzZApDrkt3C7uuwZoBSm+VkAHzO1hIB8O42xvDOl8qlq3a7+a10IioWE1vUuuAX8pkEhi4JiC5OdiEMu4SAduFxIR5/4QkNqoc8vlhGpA1plLQhxYScosSBlDhSisKdDvEBAELbCtI1jSJ8AAAAAElFTkSuQmCC">
                            <p>服务管理</p>
                        </router-link>
                        <router-link :to="{path:'/userCenter/purse'}" tag="li" class="item">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAYFBMVEUAAAD/ORT/Sy3/Sy3/Si3/Sy3/Sy3/SCv/RSf/Sy7/Sy7/Siz/SCn/TC7/TC3/Sy3/SSr/Ryf/TC7/Sy3/Si7/Siz/RCL/TC7/TC7/Syz/Sy3/Syz/Siv/Sij/SSj/TC57ene7AAAAH3RSTlMABsuqoTNVNhHki24h5eHCLBjvkXdkD9HDhH5cSCYfDHge8gAAAKNJREFUKM990lkOhCAQRdFXWjYzzvbc7H+XbQyJBsHzyU0IqQIrwSocKW6wIe2MJezIGqe3A91KpGSrAQi1lbQpAbBBjmFAWeRYBwRCDoU1Ie+UqGuiNL2GexUl6dn2hQuXoUdH2SQqiDBm09dD1p9sQjUXH995ft+iJEFOXEdX07icofsVJ89zcV/CL6UtY3xQ4W+Apj55gTVK0z6HcOBZ4NofEXsLPqT6RhIAAAAASUVORK5CYII=">
                            <p>我的钱包</p>
                        </router-link>
                    </ul>
                </div>
                <div class="footer_link" :class="{'online': userInfo.stype==1 && userInfo.online_status == 1}">
                    <router-link :to="{path:'/userCenter/order'}" tag="li" class="item">
                        <span class="fl">个人中心</span>
                    </router-link>
                    <span @click="out" class="fr">退出登录</span>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    import utils from '../utils.js';
    import {
        mapState,
        mapMutations,
    } from 'vuex'
    export default {
        data() {
            return {
                show: false,
                content: '',
                searchAjax: '',
                searchDebunce: ''
            }
        },
        computed: {
            ...mapState(['hasToken', 'showLoginBox', 'navList', 'userInfo', 'defaultkey'])
        },

        methods: {
            ...mapMutations(['SHOWLOGIN', 'UPDATEONLINESTATUS','UPDATESEARCHINFO','UPDATETOKEN']),
            async search() { //防抖
                var a = await this.searchAjax();
                if (a.code == 200) {
                    this.UPDATESEARCHINFO(a.data);
                    if (this.$route.name != 'search') {
                        this.$router.push({
                            name: 'search',
                        })
                    }
                }

            },
            showLogin() {
                this.SHOWLOGIN(true)
            },
            out() {
                this.UPDATETOKEN(false)
                this.$router.push({
                    name: 'home'
                })
            },
            onOfflineReceipt(status) { //
                var s = status == 0 ? 1 : 0
                this.$http.put('/v1/user/onOfflineReceipt', {
                    online_status: s
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.UPDATEONLINESTATUS(s)
                    } else {

                    }
                })
            }
        },
        created() {
            this.searchAjax = function () {
                return new Promise((resolve, reject) => {
                    this.searchDebunce(resolve)
                })
            }

            this.searchDebunce = utils.debunce((args) => {
                if (args) {
                    var resolve = args[0]
                }
                this.$http.get('/v1/index/search', {
                    params: {
                        keyword: this.content
                    }
                }).then((data) => {
                    var d = data.data;
                    resolve && resolve(d)
                })
            }, 500)

        },
        mounted() {},
        activated() {}
    }

</script>
<style lang='scss' scoped>
    .taking {
        width: 200px;
        height: 40px;
        background: rgba(246, 246, 246, 1);
        border-radius: 10px;
        line-height: 40px;
        text-align: center;
        margin: 10px auto;
        cursor: pointer;
    }

    .online .taking {
        background: #FF4C2E;
        color: #fff;
    }

    .nav_wrap {
        background: #fff;
        box-shadow: 0px 0px 8px 0px rgba(255, 76, 46, 0.2);
    }

    .nav {
        height: 100px;
        position: relative;

        .logo_img_wrap {
            margin-top: 22px;
        }

        .search_wrap {
            position: relative;
            width: 140px;
            height: 34px;
            border-radius: 50px;
            border: 1px solid #cccccc;
            margin-left: 50px;
            margin-top: 32px;

            img {
                position: absolute;
                left: 9px;
                top: 8px;
                cursor: pointer;
            }

            input {
                float: left;
                width: 106px;
                height: 34px;
                padding-left: 33px;
                line-height: 24px;
                border: none;
                outline: none;
                background: none;
            }

        }

        .nav_links {
            line-height: 100px;
            margin-left: 30px;

            .nav_item {
                display: inline-block;
                width: 100px;

                span {
                    display: inline-block;
                    padding-bottom: 4px;
                    line-height: 1.5;
                }

                :hover {
                    color: #FF4C2E
                }
            }
        }
    }

    .photo_wrap {
        cursor: pointer;
        margin-top: 20px;
        height: 80px;
    }

    .photo {
        width: 50px;
        height: 50px;
        border-radius: 100%;
    }

    .float_box {
        display: none;
        position: absolute;
        width: 320px;
        box-shadow: 0px 0px 8px 0px rgba(255, 76, 46, 0.2);
        border-radius: 20px;
        right: -140px;
        top: 80px;
        background: #fff;
        z-index: 99;

        &.show {
            display: block;
        }

        .photo1 {
            display: inline-block;
            width: 76px;
            height: 76px;
            border: 3px solid rgba(255, 76, 46, 1);
            border-radius: 50%;
            overflow: hidden;
            margin-top: 20px;

            .img1 {
                width: 76px;
                height: 76px;

            }
        }

        .online .links .item p {
            color: #FF4C2E;
        }

        .links {
            overflow: hidden;
            margin-top: 20px;

            .item {
                float: left;
                margin-left: 48px;
                cursor: pointer;

                p {
                    color: #999;
                    font-size: 12px;
                }
            }
        }
    }

    .username {
        margin-top: 5px;
    }

    .footer_link {
        overflow: hidden;
        margin: 28px 20px 19px;
        color: #666;
        font-size: 14px;

        span {
            cursor: pointer;
        }

        &.online {

            color: #FF4C2E
        }
    }

</style>
