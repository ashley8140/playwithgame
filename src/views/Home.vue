<template>
    <div>
        <div id="slide" class="swiper-container" style="width: 100%;min-width: 1200px;">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in slide" :key=index>
                    <img :src=item.slide_pic>
                </div>
            </div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="white">
            <div class="container">
                <div class="main center">
                    <p class="p1"> <img width=27 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADYAAAA2BAMAAAB+a3fuAAAAMFBMVEUAAAD/Sy3/QiP/Sy3/Siz/Syz/Lyb/Syz/SSn/Sy3/TC7/TC7/Sy3/Sy3/SSv/TC4E2MQsAAAAD3RSTlMA2A75j1IGlSv01L27mCqlOtR5AAAAk0lEQVQ4y2MYCPBE+P9/Qz8UNgyk/weDayhsCGA7D+H/TkBhgwH7fygoQGGDQfP/j0EMDKry/y1Q2GDg/18IRCn+/4LCBgP5/wEgivX/RxQ2GNj/VwBRTP8/o7DB4P9/BI1g00wOYf9PZDaaH34hs/H5HV+Y4QtrfHGEL25hoAWYDmZ5oLCJBqPpczR9jqT0SQYAAMcTjYBs5f+AAAAAAElFTkSuQmCC"
                            alt=""> 精品服务</p>
                    <!--    <p class="p2">BOUTIQUE SERVICE</p>
                    <hr color=#FF4C2E class="line"> -->
                    <ul class="service">
                        <!-- query用path -->
                        <router-link v-for="(item, index) in gameList" :key="index" :to="{name:'findPeople',params:{key: item.key}}"
                            tag="li" class="item point">
                            <img class="img" @mouseover="curIndex=index" :class="{'big': curIndex == index}" :src="item.web_logo1">
                            <p>{{item.title}}</p>
                        </router-link>
                    </ul>
                    <router-link tag="span" class="more" :to="{name:'findPeople',params:{key: defaultkey}}">MORE>></router-link>
                </div>
            </div>
        </div>
        <div class="container center">
            <div class="game_list">
                <ul>
                    <div v-for="(item, index) in gameList" :key="index" v-if="item.lists.length !== 0">
                        <p class="p1"> <img width=27 :src=item.web_logo2 alt=""> {{item.title}}</p>
                        <ul class="game">
                            <li tag="li" class="item" v-for="(i, index) in item.lists" :key=index v-if="index < 4">
                                <router-link :to="{name:'hunterInfo', params:{touid: i.user_id,key:item.key}}"
                                    class="point">
                                    <img class="pic" :src=i.avatar alt="">
                                </router-link>
                                <span class="discounted" v-if="i.discount_open == 1"><img :src=base64.zk alt=""></span>
                                <div class="footer">
                                    <div style="overflow: hidden">
                                        <span class="name fl">{{i.nickname}}</span>
                                        <span class="zs fr v_level">
                                            <img v-for="(item, index) in v_level[i.v_level]" :key=index :src="base64[item]"
                                                alt="">
                                        </span>
                                    </div>
                                    <div style="overflow: hidden;" class="point" @click="controlPlay('v'+i.user_id)"
                                        >
                                        <span class="voice fl"><img v-show="i.sex==1" src="/static/imgs/yy_male.png"
                                                alt=""><img v-show="i.sex==2" src="/static/imgs/yy_female.png" alt=""></span>
                                        <span class="price fr">¥ <span>{{i.min_price}}/小时</span></span>
                                        <audio :src=i.voice :class="'v'+i.user_id">
                                            您的浏览器不支持
                                            audio 标签
                                        </audio>
                                    </div>
                                </div>
                            </li>
                            <router-link tag="span" class="more" :to="{name:'findPeople',params:{key: item.key}}">MORE>></router-link>
                        </ul>
                    </div>
                </ul>
                <div class="game_logo">
                    <router-link tag="img" class="point" width=27 v-for="(item, index) in gameList" :key=index :src=item.web_logo2
                        alt="" :to="{name:'findPeople',params:{key: item.key}}"></router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapState,
        mapMutations
    } from 'vuex';
    import utils from '../utils.js'
    export default {
        data() {
            return {
                count: 0,
                slide: [

                ],
                gameList: [],
                curIndex: 0,
            }
        },
        computed: {
            ...mapState(["hasToken", "v_level", 'base64','defaultkey']),
        },

        methods: {
            ...mapMutations(['UPDATEDEFAULTKEY']),
            controlPlay(classname) {
                var audio = document.querySelector('.' + classname);
                var allAudio = document.querySelectorAll('audio');
                for (var i = 0, l = allAudio.length; i < l; i++) {
                    allAudio[i].pause();
                }
                audio.play();
            },
            getGameList() {
                this.$http.get("/v1/index/index",{
                    auth: false
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        d = d.data
                        this.slide = d.slide
                        this.gameList = d.game;
                        utils.setItem('defaultkey', d.game[0].key)
                        this.UPDATEDEFAULTKEY(this.gameList[0].key);
                        this.$nextTick(function () {
                            this.initSwiper()
                        })
                    }
                })
            },
            initSwiper() {
                var mySwiper = new Swiper('#slide', {
                    autoplay: true,
                    loop: true,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    observer: true, //修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true //修改swiper的父元素时，自动初始化swiper
                })
            }

        },
        created() {
            this.getGameList();
        },
        mounted() {
            console.log("首页")
            var that = this;
        },
    }

</script>
<style lang="scss">
    #slide {
        position: relative;

        .swiper-slide {
            img {
                width: 100%;
            }
        }

        .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 1);
            opacity: 0.5;
            border-radius: 50%;

        }

        .swiper-pagination-bullet-active {
            width: 30px;
            height: 6px;
            background: rgba(255, 255, 255, 1);
            border-radius: 3px;
            opacity: 1;
        }

    }

</style>

<style lang="scss" scoped>
    .white {
        margin-bottom: 20px;
    }

    .more {
        position: absolute;
        right: 26px;
        top: 124px;
        color: #FF4C2E;
        font-size: 14px;
        cursor: pointer;
    }

    .game_list {
        position: relative;
        margin-bottom: 50px;

        .more {
            top: -50px;
        }
    }

    .game_logo {
        position: absolute;
        right: -151px;
        top: 0px;

        img {
            width: 27px;
        }
    }

    .game {
        display: flex;
        justify-content: space-between;
        position: relative;

        .item {
            position: relative;
            overflow: hidden;
            width: 250px;
            box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.18);
            border-radius: 20px;
            margin-right: 67px;

            .level_logo {
                position: absolute;
                left: 20px;
                top: 15px;
            }

            &:nth-child(4) {
                margin-right: 0;
            }

            .pic {
                width: 250px;
                height: 260px;

                &:hover {
                    animation: move .5s;
                }
            }

            .discounted {
                position: absolute;
                top: 0;
                right: 20px;

                img {
                    width: 28px;
                }
            }

            .footer {
                overflow: hidden;
                padding: 8px 13px 4px;
                box-sizing: border-box;

                .voice {
                    width: 50%;
                    text-align: left;

                    img {
                        width: 46px;
                    }
                }

                .name {
                    font-size: 14px;
                    text-align: left;
                }

                .zs {

                    text-align: right;

                    img {
                        width: 25px;
                        height: 19px;
                        margin-right: 2px;
                    }
                }

                .price {
                    width: 50%;
                    font-size: 24px;
                    text-align: right;
                }
            }

        }
    }

    .p1 {
        font-size: 30px;
        color: #333;
        margin-top: 75px;
        margin-bottom: 40px;
    }

    .p2 {
        font-size: 12px;
        color: #999;
    }

    .line {
        width: 74px;
        display: inline-block;
        position: relative;
        top: -12px;
    }

    .main {
        overflow: hidden;
        padding-bottom: 45px;
        position: relative;
        width: 100%;

        .service {
            display: flex;
            justify-content: space-between;

            .item {

                .img {
                    height: 125px;
                    width: 125px;

                    &:hover {
                        animation: move .5s;
                    }
                }

                p {
                    color: #666;
                }
            }
        }
    }

</style>
