<template>
    <div class="container">
        <div v-show="hasInfo">
            <p class="p1">首页 > <span>{{title}}</span> > <span style="color:#FF4C2E">ID：{{hunterInfo.openid}}</span></p>
            <div class="header">
                <div class="fl">
                    <img class="userPic fl" width=95 height=95 :src=hunterInfo.avatar alt="">
                    <div class="fl" style="margin-left: 20px;">
                        <p>{{hunterInfo.nickname}} <img width=50 :src=level[hunterInfo.lv_level] alt=""></p>
                        <div><img class="sex" v-show="hunterInfo.sex==1" :src=base64.male alt="">
                            <img v-show="hunterInfo.sex==2" alt="女" class="sex" :src=base64.female>
                            <img width=19 v-for="(item, index) in v_level[hunterInfo.v_level]" :key=index
                                :src="base64[item]" alt="">
                        </div>
                        <div class="address" style="color:#666666;margin-top:15px;">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAVCAMAAACuRUSFAAAAb1BMVEUAAABYWFhkZGRmZmZlZWVlZWVeXl5lZWVlZWVlZWVpaGhkZGRkZGRbW1tmZmZmZmZoaGhqampmZmZnZ2dgYGBmZmZmZmZlZWVmZmZlZWVlZWVsbGxlZWVrampra2tkZGRlZWViYmJmZmZlZWVtbGxF9yxEAAAAJHRSTlMABS/m67kawmhmWVcjC9jOs66jjhT94tLLhoB7dHFiXlAn9qIX3O9GAAAApUlEQVQY002O1xaDIBBEh2oUe+8l8f+/MQsh6n3gnlkOw8IS5bKReYQfcRYYzbQJsthFEfqLl6AB62z0g45hC1xDFVkFG9ROXs/zXMm7gqzJBeWCXEu8GXmhvJBZg4xbT/lk5zxFNeJmrHC07IqsPQB1/x8q+0YkPiaCW5WDz0PppCV35lL7tXtmy/oXPGqmY1b4owWnWo0Lk9apwYOPKPEkKfwSX5/XB08KvdamAAAAAElFTkSuQmCC"
                                alt="">
                            <span>{{hunterInfo.region}} </span> <span v-show="hunterInfo.online_status==1"> 在线 |
                                {{hunterInfo.online_longago}}</span>
                        </div>
                    </div>
                </div>
                <div class="fr" style="color: #666;">
                    <div class="fl" style="margin-top: 14px;" v-if="hunterInfo.isfollow == 0">
                        <div class="focus" @click="follow_add(hunterInfo.user_id)">
                            关注
                        </div>
                        <p style="text-align:center;margin-top: 10px;">粉丝数 {{hunterInfo.fans}}</p>
                    </div>
                    <div v-if="hunterInfo.isfollow == 1" class="fl"
                        style="color:#999; margin-left: 33px;margin-top:23px;font-size:16px;">已关注</div>
                </div>
            </div>
            <div class="main" style="margin-bottom: 80px;">
                <div class="fl mainLeft" style="">
                    <div class="gallery-top-box">
                        <div id="slide1" class="swiper-container gallery-top">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(item, index) in hunterInfo.photos" :key=index>
                                    <img width=100% :src=item>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="gallery-thumbs-box" style="margin-top: 20px;margin-bottom: 50px;">
                        <div class="swiper-container gallery-thumbs">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(item, index) in hunterInfo.photos" :key=index>
                                    <img width=70px height="70px" :src=item>
                                </div>
                            </div>
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
                        </div>
                    </div>
                    <div class="gifts">
                        <div class="title">
                            <span style="font-size: 16px;color:#fff;">礼物</span>

                            <router-link to="/recharge" tag="span" class="span2 fr">
                                充值
                            </router-link>
                            <span class="fr">
                                <img width=15px
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAABC0lEQVQYlX2RMUtCYRhGT0NG0NrU1h/oJ7S3BS1tUVtEQxTBdQj6AzUYDUW0tEhNlt9tCYIQE4wIashIvU6FCRaY9L3f97bcGwrSgbMdnuUBQL/GxqWZPnIfae038NIM9rXDBACqLKnSVZ86c63FDfu2vJ3oWgub6ocLqrRVmcbVCFQpqaLunR0foYmuwUkc3roXVpE8czak6O5ZcRFrrs7xnxF78sy8NZTEMAOAGDIS8u0qHPYu+zqhhLyKIUNCJc+INZTlqj+2RXZtyFMjyyi9dM+ZFEPVVynHq21rKPzkmGIQYpiVG059hMoDFzbP+sAwwV6y5Wt8yjUZYOjf+DFLSu446OTiI3r4BYLpx0f0N7IfAAAAAElFTkSuQmCC"
                                    alt="">
                                <span style="color:#FFD200">{{hunterInfo.diamond}}</span>
                            </span>
                        </div>
                        <div class="swiper-container center slide3">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(item, num) in giftList" :key=num
                                    @click="father_index=num">
                                    <ul class="flex">
                                        <li v-for="(i, index) in item" :key=index
                                            :class="{'choose': (cur_gift==index) && (father_index == num)}"
                                            @click="cur_gift=index;giftid=i.id">
                                            <img width=68 height=50 :src=i.gifticon>
                                            <p style="font-size:12px;">{{i.giftname}} </p>
                                            <div><img
                                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAABC0lEQVQYlX2RMUtCYRhGT0NG0NrU1h/oJ7S3BS1tUVtEQxTBdQj6AzUYDUW0tEhNlt9tCYIQE4wIashIvU6FCRaY9L3f97bcGwrSgbMdnuUBQL/GxqWZPnIfae038NIM9rXDBACqLKnSVZ86c63FDfu2vJ3oWgub6ocLqrRVmcbVCFQpqaLunR0foYmuwUkc3roXVpE8czak6O5ZcRFrrs7xnxF78sy8NZTEMAOAGDIS8u0qHPYu+zqhhLyKIUNCJc+INZTlqj+2RXZtyFMjyyi9dM+ZFEPVVynHq21rKPzkmGIQYpiVG059hMoDFzbP+sAwwV6y5Wt8yjUZYOjf+DFLSu446OTiI3r4BYLpx0f0N7IfAAAAAElFTkSuQmCC"
                                                    alt=""><span> {{i.need_diamond}}</span></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
                            <div class="swiper-pagination"></div>
                        </div>
                        <div class="number">
                            <span class="span1">数量</span>
                            <span v-for="(item, index) in cishu" :key=index class="item"
                                :class="{'choose': cishu_index==index}" @click="cishu_index=index;giftcount=item">
                                {{item}}
                            </span>
                        </div>
                        <div class='buy_gift' @click="send">
                            赠送
                        </div>
                    </div>
                </div>
                <div class="fl mainRight" style="">
                    <ul class="game">
                        <li v-for="(item, index) in gameList" :class="{'active': item.game==key}"
                            @click="changeGame(item.game, index)" :key=index class="item"> {{item.game_title}}
                            <span></span></li>
                    </ul>
                    <div class="all" v-if="hunterInfo.services.length>6" @click="showMoreGame" :class="{'bottom':show}">
                    </div>
                    <div>
                        <div class="detail">
                            <div style="overflow:hidden">
                                <img class="fl" width=125 height=125 :src=currentGame.game_logo alt="">
                                <div class="fl info">
                                    <p class="price" style="color:#FF4C2E">¥ <span style="font-size:24px;">
                                            {{currentGame.price}}/小时</span></p>
                                    <p class="tag" style="color:#FF4C2E">{{currentGame.tags}}</p>
                                    <p class="order">接单数 {{currentGame.order_total}}</p>
                                    <div class="voice">
                                        <div class="play_btn" @click="controlPlay" :class="{'play': audio.playing}">
                                        </div>
                                        <audio ref="audio" @play="onPlay" @pause="onPause" @error="onError"
                                            :src=currentGame.voice>您的浏览器不支持
                                            audio 标签。</audio>
                                        <div class="voice_length">{{currentGame.voice_length}}s</div>
                                    </div>
                                </div>
                                <router-link
                                    :to="{name:'purchase',params:{uid_service:hunterInfo.user_id,service_id:currentGame.service_id}}"
                                    tag="div" class="buy">
                                    立即下单
                                </router-link>
                            </div>
                        </div>
                        <div class="discount">
                            <p class="p2" style="magin-bottom: 8px;"><span> 折扣</span> / DISCOUNT</p>
                            <p v-for="(i, index) in discount_msg" :key="index" class="p3">
                                {{i}}
                            </p>
                        </div>
                        <div class="personalInfo cf">
                            <p class="p2"><span>个人资料 </span> / PERSONAL INFORMATION</p>
                            <div class="fl ">
                                <div>
                                    <span class="span1">ID</span> <span>{{hunterInfo.openid}}</span>
                                </div>
                                <div>
                                    <span class="span1">生日</span> <span>{{hunterInfo.birthday}}</span>
                                </div>
                            </div>
                            <div class="fl" style="margin-left:130px;">
                                <div>
                                    <span class="span1">星座</span> <span>{{hunterInfo.star_sign}}</span>
                                </div>
                                <div>
                                    <span class="span1">兴趣</span> <span>{{hunterInfo.interest}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="intro border_bottom">
                            <p class="p2"><span class="span1">自我介绍 </span> / SELF INTRODUCTION</p>
                            <div style="color: #999;">
                                {{hunterInfo.introduce}}
                            </div>
                        </div>
                        <div class="comment">
                            <p class="p2"><span class="span1">最新评价 </span> /
                                LATEST EVALUATION
                            </p>
                            <div class="box">
                                <ul class="cf">
                                    <li class="item" v-for="(item, index) in comments" :key=index>
                                        <div class="avatar fl">
                                            <img :src=item.avatar alt="">
                                        </div>
                                        <div class="fl ctx">
                                            <p class="name">
                                                {{item.nickname}}
                                            </p>
                                            <p class="time">
                                                {{item.addtime}}
                                            </p>
                                            <div class="content">
                                                {{item.content}}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <v-pagination :total="total_page" :current_page='page' @pagechange="pagechange">
                            </v-pagination>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <div v-show="!hasInfo" class="error_page">
            <p>页面错误 {{time}}</p>
        </div>
    </div>
</template>


<script>
    import pagination from '../components/pagination';
    import utils from '../utils.js'
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                giftid: '',
                giftcount: 1,
                hunterInfo: {
                    services: []
                },
                show: false,
                gameList: [],
                title: '',
                key: '', //游戏英文缩写
                touid: "",
                currentGame: '',
                giftList: {},
                cur_gift: null,
                father_index: 0,
                audio: {
                    playing: false,
                },
                cishu: [1, 10, 99, 520, 999],
                cishu_index: 0,
                comments: [],
                discount_msg: [],
                current: 1,
                total_page: 1,
                page: 1,
                hasInfo: true,
                time: 0,

            }
        },
        components: {
            'v-pagination': pagination
        },
        computed: {
            ...mapState(['level', 'base64', 'v_level'])
        },
        methods: {
            send() {
                if (!this.giftid) {
                    this.$toast.error("请选择要送的礼物");
                    return
                }
                this.$http.post('/v1/gift/sendGift', {
                    touid: this.touid,
                    giftid: this.giftid,
                    giftcount: this.giftcount
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.$toast.success(d.message)
                    } else if (d.code == 401) {

                    } else {
                        this.$toast.error(d.message)
                    }
                })
            },
            pagechange: function (currentPage) {
                this.page = currentPage;
                this.getHunterInfo();
            },
            changeGame(name, index) { //更改游戏
                if (this.key != game) {
                    this.currentGame = this.gameList[index];
                    this.key = name;
                    this.page = 1;
                    this.getHunterInfo();
                }
            },
            follow_add(id) {
                this.$http.post("/v1/user/follow_add", {
                    touid: id
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.hunterInfo.isfollow = 1;
                        this.$toast.success("关注成功！")
                    } else if (d.code == 401) {

                    } else {
                        this.$toast.error(d.message)
                    }
                })
            },
            getHunterInfo() {
                var d = {
                    touid: this.touid,
                    game: this.key,
                    page: this.page
                }
                this.$http.get('/v1/index/personal', {
                    params: d
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.hunterInfo = d.data;
                        this.comments = d.data.comments; //评论
                        for (var i = 0, l = this.comments.length; i < l; i++) {
                            this.comments[i].addtime = utils.dataFormat(this.comments[i].addtime);
                        }
                        this.discount_msg = d.data.discount_msg; //折扣信息
                        this.total_page = d.data.comments_pages; //评论总页数
                        this.title = d.data.game_title; //游戏中文名字
                        if (this.hunterInfo.services.length > 6) {
                            this.gameList = this.hunterInfo.services.slice(0, 6);
                        } else {
                            this.gameList = this.hunterInfo.services;
                        }
                        this.currentGame = this.gameList[0];

                        this.$nextTick(function () {
                            this.initSwiper()
                        });
                        var page = this.hunterInfo.gifts.length / 6;
                        for (var i = 0; i < page; i++) {
                            this.giftList[i] = this.hunterInfo.gifts.slice(i * 6, (i + 1) * 6)
                        }
                    } else if (d.code == 100 || d.code == 1) {
                        this.hasInfo = false;
                        this.time = 4;
                        var timer = setInterval(() => {
                            this.time--;
                            if (this.time < 0) {
                                this.$router.push({
                                    name: "home"
                                });
                                clearInterval(timer)
                            }
                        }, 1000)
                    }
                })
            },
            controlPlay() {
                return this.audio.playing ? this.pause() : this.play()
            },
            play() {
                this.$refs.audio.play();
            },
            onPlay() {
                this.audio.playing = true;
            },
            pause() {
                this.$refs.audio.pause();
            },
            // 当音频暂停
            onPause() {
                this.audio.playing = false
            },
            onError() {
                this.audio.waiting = true
                console.log('有错误')
            },
            showMoreGame() {
                if (this.show == true) {
                    this.gameList = this.hunterInfo.services.slice(0, 6);
                    this.show = false;
                    return
                }
                this.gameList = this.hunterInfo.services;
                if (this.gameList.length > 6) {
                    this.show = true;
                } else {
                    this.show = false;
                }
            },

            initSwiper() {
                var galleryTop = new Swiper('.gallery-top', {
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    observer: true,
                    observeParents: true,
                    autoplay: 5000,
                });
                var galleryThumbs = new Swiper('.gallery-thumbs', {
                    centeredSlides: true,
                    slidesPerView: 2,
                    touchRatio: 0.2,
                    slideToClickedSlide: true,
                    observer: true,
                    observeParents: true,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },

                });
                var swiper3 = new Swiper('.slide3', {
                    observer: true,
                    observeParents: true,
                    spaceBetween: 40,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                })

                galleryTop.params.control = galleryThumbs;
                galleryThumbs.params.control = galleryTop;
            }
        },
        mounted() {
            this.key = this.$route.params.key;
            this.touid = this.$route.params.touid;
            this.getHunterInfo();
        }
    }

</script>
<style lang="scss">
    .error_page {
        text-align: center;
        height: 300px;
        line-height: 300px;
        font-size: 28px;
        color: #FF4C2E;
    }

    .slide3 {
        color: #fff;
        padding: 0px 30px 20px;

        .swiper-button-prev {
            width: 11px;
            height: 19px;
            top: 115px;
            background-size: cover;
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAATCAYAAABGKffQAAAArElEQVQokY3SMQ5BQRSF4fuaV1iKaNE/C0AjNkBiB8IOqFiBiEYs5O2ERKVRSMSvcIopOGbq79yZ3DkR5gAlcAT6zgVQAAc+5wI0HN4I3oCOgwvBB1A5OBN8AkMHR0IvYOpgpWsB5g52gbvg2sEmcBXcA4XDteAZKH9C4VYyeWcnf3nzymIFelnbSALjZM+TnED6g75tCiyzupEEtknr2v9wfp8VKIETMIiIeAMonBjnCzZnZwAAAABJRU5ErkJggg==')
        }

        .swiper-button-next {
            width: 11px;
            height: 19px;
            top: 115px;
            background-size: cover;
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAATCAYAAABGKffQAAAAkElEQVQokZXTMQ6CQBCFYSov4ZmkobAhbIIFSgMJdtrQeRkrT0cC/hROMSFh8pxku/dtJjuzGXAAUqYU8OZXLyWcA5OBUQEFMBt4KODswKCABCwGOgVcgK+dRgGtA7UCemtnBkoFfAxMwDEKdu7mKgrepJ43r3GNgskNZv+dNxO8R0G/G88oeJK37t99ln/KCu5hAB9Cz1KcAAAAAElFTkSuQmCC')
        }

        .swiper-pagination-bullet {
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 1);
            opacity: 0.3;
            border-radius: 50%;


        }

        .swiper-pagination-bullet-active {
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 1);
            border-radius: 50%;
            opacity: 1;
        }

        .swiper-container-horizontal>.swiper-pagination-bullets {
            bottom: 2px;
        }
    }

</style>


<style lang='scss' scoped>
    .comment {
        .item {
            overflow: hidden;
            padding: 20px 0;
            border-bottom: 1px solid #ebebeb;

            .ctx {
                margin-left: 20px;
            }
        }

        .avatar {
            img {
                width: 66px;
                height: 66px;
                border-radius: 100%;
            }

        }

        .name {
            color: #333;
        }

        .time {
            font-size: 12px;
            color: #9A9999;
        }

        .content {
            margin-top: 15px;

            color: #999;
        }
    }

    .border_bottom {
        border-bottom: 1px solid #EBEBEB;
    }

    .gifts {
        background: #1C1230;
        width: 350px;
        color: #fff;
        overflow: hidden;
        text-align: center;

        .span2 {
            margin-left: 20px;
            margin-top: -1px;
            color: #FF4C2E;
            font-size: 16px;
            cursor: pointer;
        }

        .number {
            padding-left: 18px;
            text-align: left;

            .span1 {
                display: inline-block;
                margin-right: 20px;
            }

            .item {
                display: inline-block;
                margin-right: 10px;
                width: 30px;
                height: 16px;
                background: #554D64;
                border-radius: 8px;
                text-align: center;
                line-height: 16px;
                font-size: 12px;
                cursor: pointer;

                &.choose {
                    background: #FF4C2E;
                }
            }
        }

        .buy_gift {
            display: inline-block;
            width: 200px;
            height: 50px;
            background: #FF4C2E;
            border-radius: 10px;
            margin-top: 40px;
            margin-bottom: 40px;
            line-height: 50px;
            font-size: 16px;
            cursor: pointer;
        }

        .title {
            padding: 10px 18px;
            text-align: left;
        }

        .flex {
            li {
                width: 90px;
                height: 90px;
                box-sizing: border-box;
            }

            li:nth-child(4) {
                margin-top: 20px;
            }

            li:nth-child(5) {
                margin-top: 20px;
            }

            li:nth-child(6) {
                margin-top: 20px;
            }

            .choose {
                border: 1px solid #FF4C2E;
                border-radius: 10px;
            }
        }
    }

    #slide1 {
        width: 350px;
        height: 350px;
    }

    .gallery-thumbs {
        .swiper-slide {
            width: 70px !important;
            height: 70px !important;
        }

        .swiper-button-prev {
            width: 17px;
            height: 29px;
            top: 44px;
            background-size: cover;
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAdCAMAAAB7cXezAAAAbFBMVEUAAADMzMzIyMi0tLTMzMzMzMzMzMzLy8vMzMzMzMzLy8vMzMzKysrHx8fGxsbMzMzJycnMzMzMzMzLy8vLy8vMzMzLy8vMzMzLy8vLy8vMzMzKysrLy8vKysrJycnHx8fIyMi5ubnGxsbMzMz0ZwLOAAAAI3RSTlMA+xkE9evh29SygD4uJA/DKPDmzsq9p6GYj4dWTkczIBULCStCVt4AAAB3SURBVCjPZdFHFoMwEANQTOgJofeO7n9HtiPknf/z8xR5fLLsBTPcj2CCWwhGuNXePwOCjaBH8CVIURHcKcLdwtUhpLL/AnVJ0CLKLZwN4sOCnyD2LeQREgKvgCsJ9I3+o7W0H+1Z59LZdT+6Q92zZqF5aaaa+wOGvQlWM1tEMQAAAABJRU5ErkJggg==')
        }

        .swiper-button-next {
            width: 17px;
            height: 29px;
            top: 44px;
            background-size: cover;
            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAhCAMAAADj/gtmAAAAPFBMVEUAAADExMTJycnMzMzMzMzKysrMzMzMzMzMzMzMzMzMzMzLy8vKysrIyMjLy8vMzMzMzMzKysrMzMzMzMy8agbKAAAAE3RSTlMACSjruC/w58S/sDQjDuOr4TuWAD1tBQAAAFtJREFUKM+d0ksOgDAIRdFa+1GrrZX979U5l0QiwxNCCLwQYtA1y9DUioyFdsBWWrYt/bVYTdtd1mlnl+3y2E2bIs9XF4XTuVesLklKcK/sEH6oUQqEmWByjHy9xhQFh5GPAHkAAAAASUVORK5CYII=')
        }


    }

    .main {
        overflow: hidden;
        font-size: 14px;
        position: relative;
        margin-top: 30px;

        .p3 {
            color: #666;
        }

        .all {
            position: absolute;
            transform: translateX(-50%);
            border: 6px solid transparent;
            border-top-color: #fff;
            top: 21px;
            right: 16px;
            cursor: pointer;

            &.bottom {
                border-top-color: transparent;
                border-bottom-color: #fff;
            }
        }

        .mainLeft {
            width: 350px;
        }

        .mainRight {
            margin-left: 30px;
            width: 820px;
            color: #666;

            .detail {
                padding: 30px;
                border-bottom: 1px solid #EBEBEB;

                .info {
                    margin-left: 5px;
                }

                .voice {
                    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAAAnCAMAAADuMIAcAAAA0lBMVEX/OgAAAAD/AAD/SCP/RRf/LR7/ORz/emL/XUL/Ykn/hG//kX//aVD/fWj/loX/WDz/dmD/gGr/j3v/gmz/kX3/hXb/ZlX/clr/eWT/loP/loT/lYP/////TC7/WDz/8/H/9fT/Wz//+vn/+/v/8O7/aVD//v3/19D/ppf/e2X/5uL/0sr/s6b/bVX/UDP/3df/uKz/qpz/lIL/gmz/d2H/VDf/6uf/4Nv/wbb/jXr/iXX/YUb/9/X/497/zMT/xr3/r6L/nYz/hnD/cVn/Zkz/UDIetnh4AAAAHHRSTlMDAAEHCgUJF/z6y5H22kv+5dWb0JchD+7hYVVUmvVrEgAAAgtJREFUWMPNmNlyqkAQQOEODO7GLPfeJE3CIogLGtdEzb78/y8FBuKoeUm1XUzOA1UUVXCqe+jpaU2X/FGBvoO2paKpQCjt6wgXZUghTcqYpskKJ/noto/2ZZOocKN4OGe5kNQRMpcn5aFdNPPy/6rFUp9cJ7exWu741oOi8Xs33XKVMzP30USqmPXv1QFF9IPKX5anS8uC03oNQRnOrMJFeHIdduE6oBAnqIp0ZTomO4lAKZ2SleukueLlEaile8zMjY4x9ADJ4/s1EHBzxDc6zLAByf3bnKQ69EpiMR+oE06Xs0eS+jM02OE6k67/PAEKbAKdcewkYQ7zv5VOZ+gDgrv1IrnGHXHTvhqT6TTbmOLu3kJC9JLlbRUvPRIdk9c68DO86w0jtw8po3dRyNaOt4wf5GMPpSOqMq8P4GcEV5I7yFgnQfKD9G7QlE8DvA47nQKelwhg/P0FaB2Nnc3bgKb/Bj13QaeTZisCNKG76D5TlUFdZKvhHhCeySwOqTYJPQtPZQVonuwR2Raq591pbQBYvIiqwZAniYb7hF89dO2X/uVzXkLEh7I5lTpZfGorxHqmbt2lj1VxIwVC/aC1dbDZ8uGN+nw66LR9KIr7h/1j38ZHCJ2d1mvND7soPkpHx7uH4h2fdHDADQRkIwMBdqxCP1CRKBqASRupg5/J0Q/j9pQQ0I0qfxWfE2CeDWy+bnwAAAAASUVORK5CYII=') no-repeat center center;
                    width: 130px;
                    height: 35px;
                    background-size: cover;
                    position: relative;


                }

                .tag {
                    max-width: 390px;
                }

                .play_btn {
                    position: absolute;
                    width: 17px;
                    height: 17px;
                    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAV1BMVEUAAAD/Sy3/QCf/Sy3/Sy3/Sy3/Siz/Si3/TC3/TC3/Siz/TC3/Sy3/TC7/////Ujb/UDP/+Pf/aVD/7uv/5uL/497/2tT/z8b/xbz/vLH/sKP/p5n/nItZCz2XAAAADXRSTlMA5w3tWrp/cWzAXPnBxO0thAAAAHhJREFUGNNlUNkOgDAIY5vzBu/b//9Ow5HMaF8gTaEFYPiiChiqwoMhc6hwmRI5JuSiwDdqAC8j89krEzyUXDuidVSqhCiViIZbughOGcYuftAkZuOuSZrh6lUTbfNim6N64XR0aF6Whwcszy/z767v7ayw/7TpPw/lvQuJ8uELVQAAAABJRU5ErkJggg==') no-repeat center center;
                    background-size: cover;
                    top: 10px;
                    left: 13px;
                    cursor: pointer;

                    &.play {
                        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAAWlBMVEUAAAD/Syz/Sy3/QCv/Sy3/TC3/Sy3/Siz/Si3/TC3/Sy3/TC3/TC3/QCD/TC7/TC7/////wbb/Vzr/ysL/i3j/cFj/6OT/0cn/qJn/nIv/koD/emP/XkP/UjUwHDA7AAAAD3RSTlMAW+gM7cG6f3Fs5vnsEOU+a0LvAAAAb0lEQVQY02WQVw6AMAxDA2W1BVzKXve/Jh1IoOb9xXISJ+QRTVmgKBtBL1mOSJ5FocZHHRz441zCt+wrcCwzgLYjCcdoLAYzwSGpSpSK+kRRpBNFk2IePsfvctWNzZxhV8xz+SgWIQ/PzO/it/P/PAYRDWukO8N9AAAAAElFTkSuQmCC');

                    }
                }

                .voice_length {
                    position: absolute;
                    top: 8px;
                    right: 13px;
                    color: #FF4C2E;
                }
            }

            .buy {
                width: 200px;
                height: 50px;
                background: rgba(255, 76, 46, 1);
                border-radius: 10px;
                float: right;
                font-size: 16px;
                line-height: 50px;
                color: #fff;
                text-align: center;
                cursor: pointer;
                margin-top: 30px;
            }

            .header {
                padding: 38px;
            }

            .p2 {
                margin-bottom: 10px;
                color: #999;

                span {
                    font-size: 24px;
                    color: #FF4C2E;
                }
            }

            .discount {
                color: #999;
                border-bottom: 1px solid #EBEBEB;
                padding: 12px 28px;
            }

            .personalInfo {
                padding: 12px 28px;
                border-bottom: 1px solid #EBEBEB;
                color: #999;

                .span1 {
                    font-size: 18px;
                    color: #666;
                    width: 60px;
                    display: inline-block;
                }
            }

            .intro {
                padding: 12px 28px;

            }

            .comment {
                padding: 12px 28px;
            }

            .game {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                background: #F97A83;
                color: #fff;

                li {
                    position: relative;
                    height: 52px;
                    line-height: 52px;
                    margin-left: 70px;
                    cursor: pointer;

                    &.active {
                        font-family: MicrosoftYaHei-Bold;
                        font-weight: bold;

                        span {
                            display: block;
                        }
                    }

                    span {
                        display: none;
                        position: absolute;
                        bottom: 0;
                        left: 50%;
                        transform: translateX(-50%);
                        border: 5px solid transparent;
                        border-bottom-color: #fff;
                    }
                }
            }
        }
    }

    .p1 {
        margin-top: 25px;
        font-size: 12px;
        margin-bottom: 20px;
    }

    .header {
        padding: 30px 20px 30px 30px;
        overflow: hidden;
        font-size: 14px;
    }

    .userPic {
        border-radius: 100%;
    }

    .focus {
        width: 80px;
        height: 40px;
        border: 1px solid #FF4C2E;
        border-radius: 10px;
        text-align: center;
        line-height: 40px;
        color: #FF4C2E;
        font-size: 16px;
        cursor: pointer;
    }

</style>
