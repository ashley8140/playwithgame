<template>
    <div>
        <p class="p1 bold"><span @click="change_cur(0)" :class="{'active': cur==0}">我的礼物&nbsp;&nbsp;</span> | <span @click="change_cur(1)"
                :class="{'active': cur==1}">&nbsp;&nbsp;礼物明细</span>
            <span class="giftToBalance fr" v-if="cur==0" @click="show=true">兑换余额</span>
            <span class="fr" v-if="cur==1">
                <span class="s4" :class="{'active': type==0}" @click="change_type(0)">全部</span>
                <span class="s4" :class="{'active': type==1}" @click="change_type(1)">收入</span>
                <span class="s4" :class="{'active': type==2}" @click="change_type(2)">支出</span>
            </span>
        </p>
        <div class="wrapper">
            <ul class="list center">
                <li class="item bold item0 flex" v-show="cur==0">
                    <span class="s">礼物</span>
                    <span class="s">名称</span>
                    <span class="s">数量</span>
                    <span class="s">钻石</span>
                </li>
                <li class="item bold item0 flex" v-show="cur==1">
                    <span class="s">礼物</span>
                    <span class="s">玩家名称</span>
                    <span class="s">时间</span>
                    <span class="s">数量</span>
                </li>
                <li class="item flex" v-for="(i,index) in list" :key=index v-show="cur==0">
                    <span class="s0">
                        <img :src=i.gifticon alt="">
                    </span>
                    <span>{{i.giftname}}</span>
                    <span>{{i.num}}</span>
                    <span>{{i.need_diamond}}</span>
                </li>
                <li class="item flex" v-for="(i,index) in list" :key=index v-show="cur==1">
                    <span>
                        {{i.giftname}}
                    </span>
                    <span>{{i.nickname}}</span>
                    <span>{{i.time}}</span>
                    <span :class="{'add':i.touid == userInfo.user_id}">
                        <span v-show="i.touid == userInfo.user_id">+</span>
                        <span v-show="i.touid != userInfo.user_id">-</span>
                        <span>{{i.giftcount}}</span>
                    </span>
                </li>
            </ul>
            <v-pagination v-show="cur==1" :total="total_page" :current_page='page' @pagechange="pagechange">
            </v-pagination>
            <div class="tanbox" :class="{'show': show}">
                <div class="pop"></div>
                <div class="pop_box center_box">
                    <p class="title" style="margin-top: 35px;">
                        礼物总价值
                    </p>
                    <p class="p2">{{diamond}} 钻石</p>
                    <div class="line"></div>
                    <p class="title">可兑换余额</p>
                    <p class="p3">{{balance}} 元</p>
                    <div class="line"></div>
                    <div class="submit" @click="giftToBalance">
                        立即兑换
                    </div>
                    <p style="color:#FF3333;font-size: 12px;margin: 15px auto 35px;">*礼物抽成30%</p>
                    <div class="pop_close" @click="close">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import pagination from '../../components/pagination'
    import utils from '../../utils.js';
    import {
        mapState
    } from 'vuex';
    export default {
        data() {
            return {
                cur: 0,
                page: 1,
                total_page: 1,
                list: [],
                type: 0,
                balance: '',
                diamond: '',
                show: false,
            }
        },
        components: {
            'v-pagination': pagination
        },
        computed: {
            ...mapState(['userInfo'])
        },
        methods: {
            close() {
                this.show = false;
            },
            change_type(value) {
                if (this.type == value) {
                    return
                }
                this.type = value;
                this.page = 1;
                this.myGiftDetails(); //只有礼物详情才有type切换
            },
            change_cur(v) {
                if (this.cur==v){
                    return
                }
                this.type = 0
                this.cur = this.cur == 0 ? 1 : 0;
                this.page = 1;
                if (this.cur == 0) {
                    this.myGiftList();
                } else {
                    this.myGiftDetails();
                }
            },
            pagechange: function (currentPage) {
                this.page = currentPage;
                if (this.cur == 0) {
                    this.myGiftList();
                } else {
                    this.myGiftDetails();
                }
            },
            myGiftList() { //礼物列表
                this.$http.get('/v1/gift/myGiftList').then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.list = d.data.lists;
                        this.balance = d.data.balance
                        this.diamond = d.data.diamond
                    } else if (d.code == 401) {

                    }
                })
            },
            myGiftDetails() { //礼物明细 0全部 1收到的 2 送出的
                this.$http.get('/v1/gift/myGiftDetails', {
                    params: {
                        page: this.page,
                        type: this.type
                    }
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.total_page = d.data.lists_pages;
                        this.list = d.data.lists;
                        for (var i = 0, l = this.list.length; i < l; i++) {
                            this.list[i].time = utils.dataFormat(this.list[i].addtime)
                        }

                    } else if (d.code == 401) {

                    }
                })
            },
            giftToBalance() {
                if (Number(this.balance==0)) {
                    this.$toast.success("您没有礼物可兑换!");
                    return
                }
                this.$http.post('/v1/gift/giftToBalance').then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.list = [];
                        this.balance = 0;
                        this.diamond = 0;
                        this.show = false;
                    } else if (d.code == 401) {

                    } else if (d.code == 100) {
                        this.show = false;
                        this.$toast.success(d.message);
                    }
                })
            }
        },
        created ()  {
            console.log("礼物 created")
            this.myGiftList();
        },
        mounted () {
            console.log("礼物 mounted")
        },
        activated () {
            console.log("礼物 actived")
        },
        beforeDestroy(){
            console.log("礼物 beforedestory")
        }
    }

</script>
<style lang='scss' scoped>
    .p1 {
        padding: 20px;
        border-bottom: 1px solid #ebebeb;
        font-size: 16px;
        color: #999999;
        background: #fff;

        .s4 {
            margin-left: 30px;
            text-align: center;
            width: 58px;
            height: 34px;
            background: rgba(246, 246, 246, 1);
            border-radius: 10px;
            display: inline-block;
            color: #666;
            line-height: 34px;
            box-sizing: border-box;
            font-size: 14px;

            &.active {
                background: #FF4C2E;
                color: #fff;
            }
        }

        span {
            cursor: pointer;

            &.active {
                color: #FF4C2E;
            }
        }
    }

    .giftToBalance {
        width: 100px;
        height: 30px;
        background: rgba(255, 76, 46, 1);
        border-radius: 10px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        color: #fff;
    }

    .list {
        font-size: 14px;

        .item {
            line-height: 70px;
            border-bottom: 1px solid #ebebeb;

            &:last-child {
                border-bottom: none;
            }

            span {
                width: 25%;

                &.add {
                    color: #FF4C2E;
                }
            }

            .s0 {
                img {
                    width: 76px;
                    height: 50px;
                }
            }
        }

        .item0 {
            color: #999;
            line-height: 52px;
        }


    }

    .tanbox {
        text-align: center;
        .pop_box {
        border-radius: 20px;
            width: 513px;
            .p2 {
                color: #FCB800;
                font-size: 24px;
            }
            .p3 {
                color: #FF4C2E;
                font-size: 24px;
            }
        }

        .title {
            font-size: 18px;
            color: #333;
        }
    }

</style>
