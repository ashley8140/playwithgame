<template>
    <div>
        <div class="p1 bold"><span @click="changeCur(0)" :class="{'active': cur==0}">我的订单</span> | <span @click="changeCur(1)"
                v-if="userInfo.stype==1" :class="{'active': cur==1}"> 陪玩订单</span>
            <div class="filter"><span class="all s1" :class="{'choose': type==0}" @click="changeType(0)">全部</span><span
                    class="s2" @click="changeType(1)" :class="{'choose': type==1}">待评价</span><span class="s3" @click="changeType(2)"
                    :class="{'choose': type==2}">已完成</span></div>
        </div>
        <ul class="flex bold nav">
            <li>订单</li>
            <li>服务技能</li>
            <li>数量</li>
            <li>金额</li>
            <li>订单状态</li>
        </ul>
        <div>
            <ul class="list f14">
                <li class="item" v-for="(i, index) in list" :key=index>
                    <div class="header">
                        {{i.addtime}}
                    </div>
                    <div class="detail flex">
                        <div class="d1 d">
                            <img :src=i.avatar alt="">
                            <p>{{i.nickname}}</p>
                        </div>
                        <div class="d2 d">
                            {{i.game}}
                        </div>
                        <div class="d3 d">
                            {{i.number}}
                        </div>
                        <div class="d4 d">
                            {{i.final_price}}
                        </div>
                        <!--
                        $status_arr = [-2=>'撤单',-1=>'拒绝接单',0=>'未支付',1=>'支付完成',2=>'接单完成',3=>'完成'];
                        status=-2时显示“已取消”；
                        status=-1时显示“已拒绝”；
                        status=0时显示“取消订单”按钮；
                        status=1时显示“取消订单”按钮；
                        status=2时 显示“完成订单”按钮；。
                        status=3时 如果is_comment=1代表已评论，is_comment=0显示“评论”按钮。
                        -->
                        <!-- 公共 -->
                        <div class="d5 d" v-show="i.status==-2">
                            已取消
                        </div>
                        <div class="d5 d" v-show="i.status==-1">
                            已拒绝
                        </div>
                        <!-- 用户取消订单 0 || 1-->
                        <div class="d5 d" style="color:#FF4C2E;cursor: pointer;" v-show="i.status==0 || i.status==1"
                            @click="show_cancel(i.id, index)" v-if="cur==0">
                            取消订单
                        </div>
                        <!-- 待评价 3 -->
                        <div class="d5 d" v-show="i.status==3&&i.is_comment==0" style="color:#FF4C2E;cursor: pointer;"
                            @click="show_comment(i.id, i.uid_service, index)" v-if="cur==0">
                            待评价
                        </div>
                        <!-- 用户 完成确认 2 -->
                        <div class="d5 d" v-show="i.status==2" @click="finish(i.id, index)" style="color:#FF4C2E;cursor: pointer;"
                            v-if="cur==0">
                            完成确认
                        </div>
                        <!-- 用户 -->
                        <div class="d5 d" v-show="i.status==3&&i.is_comment==1" style="color:#FF4C2E;cursor: pointer;"
                            @click="show_comment(i.id, i.uid_service, index)" v-if="cur==0">
                            修改评价
                        </div>
                        <!-- 用户 -->
                        <div class="d5 d" v-show="i.status==3&&i.is_comment==2" v-if="cur==0">
                            已完成
                        </div>
                        <!-- 猎人确认接单 1 -->
                        <div class="d5 d" v-if="cur==1&&i.status==1" style="color:#FF4C2E;cursor: pointer;" @click="receive(i.id,index)">
                            确认接单
                        </div>
                        <!-- 猎人 完成确认 2 -->
                        <div class="d5 d" v-show="cur==1&&i.status==2" style="color:#FF4C2E;cursor: pointer;" @click="showContact(index)">
                            联系他
                        </div>
                        <!-- 猎人 -->
                        <div class="d5 d" v-show="cur==1&&i.status==3&&i.is_comment==1">
                            已评价
                        </div>
                        <!-- 猎人 -->
                        <div class="d5 d" v-show="cur==1&&i.status==3&&i.is_comment==0">
                            待评价
                        </div>
                        <!-- 猎人 -->
                        <div class="d5 d" v-show="cur==1&&i.status==3&&i.is_comment==2">
                            已完成
                        </div>
                    </div>
                    <router-link tag=div class="goto" :to="{path: '/userCenter/orderdetail', query: {type: cur,id: i.id}}">
                        <img class="goto" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAPBAMAAADE5vg+AAAAIVBMVEUAAAD/Sy7/SSj/TC3/RCL/TC3/RCv/Sy3/Rif/TC7/TC6zLWLIAAAACnRSTlMA3x/GD8AeqiH2FmP/aAAAACZJREFUCNdjaE1gAIIqIRDpvFABSLJY4eKwzQqAsMHiGEyYORAzAfurCyt7/4GLAAAAAElFTkSuQmCC"
                            alt="">
                    </router-link>
                </li>
            </ul>
        </div>

        <v-pagination :total="total_page" :current_page='page' @pagechange="pagechange">
        </v-pagination>
        <div class="mask" v-show="commentBox">
            <div class="pop"></div>
            <div class="box center_box">
                <p class="center title">评价</p>
                <div style="margin: 23px 0 30px;">
                    <span v-for="(item, index) in star" :key=index class="s" :class="{'active':index <= s_l}" @click="getStar(index)"></span>
                    <span class="s5 fr">{{score}}分</span>
                </div>
                <textarea placeholder="请输入对此服务的评价" v-model="content"></textarea>
                <div class="send" @click="comment">
                    确认提交
                </div>
                <span class="pop_close" @click="closeCommentBox">

                </span>
            </div>
        </div>
        <div class="mask cancelOrderBox" v-show="cancelOrderBox">
            <div class="pop"></div>
            <div class="box center_box">
                <p class="center t2" style="margin-bottom: 70px;">确定要取消该订单吗？</p>
                <div class="yes d d1 fl" @click="cancel">
                    确认
                </div>
                <div class="no d fr" @click="closeCancelBox">
                    取消
                </div>
                <span class="pop_close" @click="closeCancelBox">
                </span>
            </div>
        </div>
        <div class="mask" v-show="contactBox">
            <div class="pop"></div>
            <div class="box center_box f20 center" style="width: 400px; box-sizing: border-box">
                <p style="margin-top: 50px;margin-bottom: 65px;">QQ：{{qq}}</p>
                <div class="send" @click="openQQ">
                    打开QQ
                </div>
                <span class="pop_close" @click="closeContactBox">
                </span>
            </div>
        </div>
    </div>
</template>
<script>
    import pagination from '../../components/pagination'

    import {
        mapState
    } from 'vuex'
    import utils from '../../utils';

    export default {

        /* 
            comment_num代表第几次评论
            comment_num=1 后面可以修改评论
            order_expire是订单过期时间，倒计时直接按这个字段就可以 
        */
        data() {
            return {
                cur: 0, //0我的订单 1陪玩订单
                type: 0,
                score: 0,
                content: '',
                star: [0, 1, 2, 3, 4],
                s_l: -1,
                old_index: null,
                commentBox: false,
                cancelOrderBox: false,
                contactBox: false,
                page: 1,
                total_page: 1,
                list: {},
                uid: '',
                id: '',
                qq: '',
                index:''
            }
        },
        components: {
            'v-pagination': pagination
        },
        computed: {
            ...mapState(['userInfo'])
        },
        methods: {
            openQQ() {
                location.href = 'tencent://message/?uin=' + this.qq;
            },
            showContact(index) {
                this.qq = this.list[index].qq;
                this.contactBox = true;
            },
            receive(id,index){
                this.$http.post('/v1/Order/receive', {
                    oid: id
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.list[index].status=2;
                        this.$toast.success(d.message)
                    }
                })
            },
            finish(id, index) {
                this.$http.post('/v1/Order/finish', {
                    oid: id
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.list[index].status=3;
                        this.list[index].is_comment = 0;
                        this.$toast.success(d.message)
                    }
                })
            },
            show_comment(oid, service_id, index) {
                this.index = index;
                this.oid = oid;
                this.service_id = service_id;
                this.score = this.list[index].comment_star;
                this.s_l = this.score - 1;
                this.content = this.list[index].content;
                this.commentBox = true;
            },
            show_cancel(id, index) {
                this.cancelOrderBox = true;
                this.id = id;
                this.index = index;
            },
            cancel() {
                this.$http.post('/v1/order/cancel', {
                    order_id: this.id
                }).then((data) => {
                    var d = data.data;
                    if (d.data == 200) {
                        this.list[i].status = -2;
                        this.$toast.success(d.message);
                    } else if (d.code == 401) {

                    } else {
                        this.$toast.error(d.message)
                    }
                })
            },
            comment() {
                this.$http.post('/v1/Order/comment', {
                    oid: this.oid,
                    service_id: this.service_id,
                    star: this.score,
                    content: this.content
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        if (this.status == 3 && this.list[i].is_comment == 0) {
                            this.list[i].is_comment == 1
                        } else if (this.status == 3 && this.list[i].is_comment == 0) {
                            this.list[i].is_comment == 2
                        }
                        this.$toast.success(d.message)
                    } else if (d.code == 401) {

                    } else {
                        this.$toast.error(d.message)
                    }
                })
            },
            changeType(v) {
                if (this.type == v) {
                    return;
                }
                this.type = v;
                this.page = 1;
                if (this.cur == 0) {
                    this.myOrder();
                } else {
                    this.myPlayOrder();
                }

            },
            changeCur(v) {
                if (this.cur == v) {
                    return
                }
                this.type = 0;
                this.cur = this.cur == 0 ? 1 : 0;
                this.page = 1;
                if (this.cur == 0) {
                    this.myOrder();
                } else {
                    this.myPlayOrder();
                }

            },
            pagechange: function (currentPage) {
                this.page = currentPage;
                if (this.cur == 0) {
                    this.myOrder();
                } else {
                    this.myPlayOrder();
                }
            },
            getStar(index) {
                if (this.old_index == index) {
                    this.s_l = index - 1;
                    this.score--;
                    this.old_index--;
                    return
                }
                this.s_l = index;
                this.score = index + 1;
                this.old_index = index;
            },
            closeCommentBox() {
                this.commentBox = false;
            },
            closeCancelBox() {
                this.cancelOrderBox = false;
            },
            closeContactBox() {
                this.contactBox = false;
            },
            myOrder() {
                this.$http.get('/v1/Order/lists', {
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
                            this.list[i].addtime = utils.dataFormatDetail(this.list[i].addtime);
                        }
                    } else {

                    }
                })
            },
            myPlayOrder() {
                this.$http.get('/v1/Order/pwlists', {
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
                            this.list[i].addtime = utils.dataFormatDetail(this.list[i].addtime);
                        }
                    } else {}
                })
            }
        },
        mounted() {
            console.log("订单中心 true");
            if (this.cur == 0) {
                //我的订单
                this.myOrder();
            } else {
                //我的陪玩订单，猎人才有
                this.myPlayOrder()
            }
        }

    }

</script>
<style lang='scss' scoped>
    .p1 {
        color: #999;
        padding: 20px 70px 20px 20px;
        border-bottom: 1px solid #EBEBEB;
        background: #fff;

        span {
            cursor: pointer;
        }

        .active {
            color: #FF4C2E;
        }
    }

    .filter {
        font-size: 14px;
        font-weight: normal;
        float: right;

        span {
            text-align: center;
            display: inline-block;
            width: 58px;
            height: 34px;
            background: rgba(246, 246, 246, 1);
            border-radius: 10px;
            line-height: 34px;
            color: #666;
            margin-left: 30px;

            &.choose {
                background: rgba(255, 76, 46, 1);
                color: #fff;
            }
        }
    }

    .nav {
        padding: 20px 0;
        font-size: 14px;
        color: #999;
        background: #fff;

        li {
            width: 20%;
            text-align: center;
        }
    }

    .list {
        .d5 {
            &.active {
                color: #FF4C2E;
                cursor: pointer;
            }
        }

        .item {
            margin-top: 30px;
            position: relative;

            .goto {
                position: absolute;
                right: 25px;
                top: 41px;
                cursor: pointer;
            }

            .header {
                padding: 3px 10px;
                background: #FF7945;
                font-size: 12px;
                color: #fff;
            }

            .detail {
                height: 130px;
                text-align: center;
                background: #fff;

                .d {
                    width: 20%;
                    line-height: 130px;
                }

                .d1 {
                    line-height: 1.5;

                    img {
                        margin-top: 16px;
                        width: 67px;
                        height: 67px;
                        border-radius: 100%;
                    }
                }
            }
        }
    }

    .mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        .pop {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: #000;
            opacity: 0.3;
        }

        .box {
            color: #333;
            background: #fff;
            padding: 27px 70px;
            border-radius: 20px;

            .title {
                font-size: 24px;
            }

            .t2 {
                font-size: 20px;
            }

            .s {

                display: inline-block;
                width: 35px;
                height: 35px;
                margin-right: 10px;
                background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAiCAMAAAAAh4u3AAAAk1BMVEUAAAAcHBwyMjIyMjIyMjIqKiozMzMzMzMyMjIyMjIxMTEzMzMyMjIyMjIyMjIyMjIxMTExMTEyMjIyMjIyMjIyMjIyMjIwMDAwMDAyMjIyMjIyMjIwMDAxMTEwMDAyMjIyMjIxMTExMTExMTEyMjIvLy8zMzMyMjIyMjIxMTEyMjIxMTEtLS0yMjIzMzMyMjIzMzO5DYebAAAAMHRSTlMABOvcRAro2J9eFOLMr5ZOPjf1v7akcyIQiINqMSkZxql4Y1QtJh6akH5XUxzu0qiSBX7YAAABLUlEQVQ4y42TB5KDMAxFbUNsOpjeW0L6lvufboHsboJtTDTDCMMbSXx9ABsJ0SDYiiCO8i3GU6CBjA1Ii8erkzNzldKUT3U5zXPpMqbGyZQoTiWQEz/yOZQ03P2+g2G7A5sBNaKC7bgqVkz/y6W9Ywck5IupjuX7mNg9BIPiFDevgitD1tWeeOMeUnnfgzkC50a6KordKWXKYZ1xkfu40dHq5+rPAuoatTeT50HFtYg5ovL1mH+JoOiy1ANXokLMAjOBsQuN9bYl6Kazvv3gocZjn3zzkFWym/R5KGTVGxQeOhWstjYP9ZH4F6B5QExL02eBEpOBPum0ckvJ1CqhhY2yyWXmsIR8CO4hcf8MenfQKJJ9XRoaGR3uXj1cBs3NZtRsfe3I+i1qa/B+/AC1NQ9C0gGBsAAAAABJRU5ErkJggg==') no-repeat center center;
                background-size: cover;
                cursor: pointer;

                &.active {
                    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAiCAMAAADiW5DOAAAAgVBMVEUAAAD/Sy3/Sy3/Sy3/OiP/TC3/Si3/TCz/SCz/Sy3/Sy3/Syz/SSj/RiX/Sy3/Sy3/Sy3/Sy3/Sy7/Sy3/Sy3/Syz/Si3/Siv/Sin/SSv/OR3/Sy3/Sy3/Sy7/Sy3/Sy3/Syz/Sy3/Syz/Syz/Sy7/Sy3/Siz/TC7/TCz/QCb/TC45n2HWAAAAKnRSTlMA+ee/C/SiijTfzV4bD+zU0ci4pZSDTSwnIQf8rZeOd2dkUlCcmW5UQBQ7h2dZAAAA6klEQVQ4y42T2RKCMAxFUypQFnFhE0RUcM3/f6DAoEgM1PPWmdNOe3sDlKvxAA0VorHUOGtEPM4rChucecfClnpO8UXnbDTHdJynlRP2mCnw7CR+MBRnLGyBX4h4AZS7g4QgSvz3/sq2tq6JLCJwpO03weqQsNI6MShTo2xzAGXMKlbefcD0lYYOLOWkchvyc5EngoGMv7gzytpGAvP9GZsyKTaJkq1awTghcQ6Mc2FaSimIw8W4Ik7AOPvxu1LkSLiJMENPZWlS9lUof58l4me/zL3OkiMnbMu0G43JnoboCbem4xa5HvzNC59iXI+UN5RRAAAAAElFTkSuQmCC');
                }
            }

            .s5 {
                font-size: 24px;

            }

            textarea {
                width: 370px;
                height: 140px;
                padding: 19px;
                border: 1px solid #cccccc;
                border-radius: 20px;
                resize: none;
            }
        }

        .send {
            width: 200px;
            height: 50px;
            background: rgba(255, 76, 46, 1);
            border-radius: 10px;
            text-align: center;
            line-height: 50px;
            cursor: pointer;
            font-size: 16px;
            color: #fff;
            margin: 30px auto 0;
        }

        .pop_close {
            cursor: pointer;
            position: absolute;
            right: 20px;
            top: 20px;
            width: 20px;
            height: 20px;
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAJFBMVEUAAABlZWVlZWVlZWVmZmZmZmZlZWVmZmZlZWVmZmZmZmZlZWXzs26aAAAAC3RSTlMAbGF29+1omnGjj6ZGDUoAAABoSURBVAjXLc2hDYBAEETRISQEicfQBwUgrgMUHk0VWBo5ksNsc2RmZ9XmiT94DujGDaXmuzacMfHr40UXVRgLMJOJIBvFwmQjmWgWZlPtbDLiIbY9pLZQ7US1jck3kfyhEMkNl4eG/QfLaityGdozKgAAAABJRU5ErkJggg==') no-repeat center center;
            background-size: cover;
        }
    }

    .cancelOrderBox {
        font-size: 20px;

        .box {
            width: 410px;
            padding: 30px 50px;
            box-sizing: border-box;
        }

        .d {
            display: inline-block;
            width: 100px;
            height: 50px;
            border: 1px solid #cccccc;
            border-radius: 10px;
            text-align: center;
            line-height: 50px;
            cursor: pointer;
        }

        .d1 {
            background: rgba(255, 76, 46, 1);
            color: #fff;
        }
    }

</style>
