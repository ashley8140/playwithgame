<template>
    <div>
        <ul class="game">
            <li class="item" v-for="(item,index) in gameinfo" :key=index>
                <router-link :to="{name:'hunterInfo', params:{touid: item.user_id,key:game_key}}">
                    <img class="pic point" :src=item.auth_avatar alt="">
                </router-link>

                <span class="discounted"><img src="/static/imgs/zk@2x.png" alt=""></span>
                <span class="voice fl point" @click="controlPlay('v'+item.user_id)">
                    <audio :src=item.voice :class="'v'+item.user_id">
                        您的浏览器不支持
                        audio 标签
                    </audio>
                    <img v-show="item.sex==1" src="/static/imgs/yy_male.png" alt="">
                    <img v-show="item.sex==2" src="/static/imgs/yy_female.png" alt="">
                </span>
                <div class="footer">
                    <div style="overflow:hidden">
                        <span class="name fl">
                            <p>{{item.nickname}}</p>
                        </span>
                        <span class="fl" style="margin-left: 2px;">
                            <img :src=level[item.lv_level] alt="">
                        </span>
                        <span class="price fr">¥ <span>{{item.min_price}}/小时</span></span>
                    </div>
                    <div style="overflow:hidden">
                        <span class="zs fl"><img v-show="item.sex==2" class="sex" :src=base64.female alt="女"><img
                                class="sex" v-show='item.sex==1' :src=base64.male alt="">
                            <img v-for="(item, index) in v_level[item.v_level]" :key=index :src="base64[item]" alt="">
                        </span>
                        <span v-show="item.online_status==1" class="status fl">在线</span>
                        <span v-show="item.online_status==0" class="status fl">下线</span>
                    </div>

                    <p class="ctx1 ctx">接单{{item.order_total}}次 评价{{item.comments_total}}条</p>
                    <p class="ctx2 ctx female">{{item.tags}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    export default {
        computed: {
            ...mapState(['level', 'base64', 'v_level'])
        },
        data() {
            return {
               
            }
        },
        props: {
            gameinfo: {
                type: Array,
                default: []
            },
            game_key: {
                type: String
            }
        },
        methods: {
            controlPlay(classname) {
                var audio = document.querySelector('.' + classname);
                var allAudio = document.querySelectorAll('audio');
                for (var i = 0, l = allAudio.length; i < l; i++) {
                    allAudio[i].pause();
                }
                audio.play();
            },
        },
        created() {
        },
        mounted() {}
    }

</script>
<style lang="scss" scoped>
    .game {
        font-size: 14px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .item {
            position: relative;
            overflow: hidden;
            width: 270px;
            box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.18);
            border-radius: 20px;
            margin-right: 30px;
            margin-top: 40px;

            .level_logo {
                position: absolute;
                left: 20px;
                top: 15px;
            }

            .pic {
                width: 270px;
                height: 220px;

                &:hover {
                    animation: move .5s;
                }
            }

            .voice {
                position: absolute;
                right: 2px;
                top: 175px;

                img {
                    width: 46px;
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
                padding: 8px 13px 20px;
                box-sizing: border-box;


                .name {
                    text-align: left;
                    color: #333;
                    line-height: 30px;
                    max-width: 85px;

                    p {
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }

                .zs {
                    width: 80%;
                    text-align: left;

                    .sex {
                        width: 19px;
                    }

                    img {
                        width: 25px;
                        height: 19px;
                        margin-right: 2px;
                    }
                }

                .status {
                    width: 20%;
                    font-size: 16px;
                    color: #666;
                }

                .price {
                    font-size: 20px;
                    text-align: right;
                    color: #FF4C2E;
                }

                .ctx {
                    text-align: left;

                    &.female {
                        color: #FF4C2E;
                    }

                    &.male {
                        color: #2383FF;
                    }
                }

            }

        }
    }

</style>
