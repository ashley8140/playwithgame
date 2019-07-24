<template>
    <div>
        <p class="p1 bold">{{type}} <span style="color:#FF4C2E"> > 订单详情</span></p>
        <ul class="detail  f14">
            <li class="item item0">
                <div class="left">
                    <span class="s1">玩家信息：</span>
                    <div class="d1">
                        <img width=67px height=67px :src=info.avatar alt="">
                        <div class="inline" style="margin-left: 15px;vertical-align:middle">
                            <p class="nickname">{{info.nickname}}</p>
                            <p class="id">ID:{{info.openid}}</p>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <span>订单状态：</span>
                    <!-- 公共 -->
                    <div class="d2 status" v-show="info.status==-2">
                        已取消
                    </div>
                    <div class="d2 status" v-show="info.status==-1">
                        已拒绝
                    </div>
                    <!-- 用户取消订单 0 || 1-->
                    <div class="d2 status" style="color:#FF4C2E;cursor: pointer;" v-show="info.status==0 || info.status==1"
                        @click="show_cancel(info.id, index)" v-if="cur==0">

                        <span class="status_btn">取消订单</span>

                    </div>
                    <!-- 待评价 3 -->
                    <div class="d2 status" v-show="info.status==3&&info.is_comment==0" style="color:#FF4C2E;cursor: pointer;"
                        @click="show_comment(info.id, info.uid_service, index)" v-if="cur==0">
                        <span class="status_btn">待评价</span>
                    </div>
                    <!-- 用户 完成确认 2 -->
                    <div class="d2 status" v-show="info.status==2" @click="finish(info.id, index)" style="color:#FF4C2E;cursor: pointer;"
                        v-if="cur==0">
                        <span class="status_btn">完成确认</span>
                    </div>
                    <!-- 用户 -->
                    <div class="d2 status" v-show="info.status==3&&info.is_comment==1" style="color:#FF4C2E;cursor: pointer;"
                        @click="show_comment(info.id, info.uid_service, index)" v-if="cur==0">
                        <span class="status_btn">修改评价</span>
                    </div>
                    <!-- 用户 -->
                    <div class="d2 status" v-show="info.status==3&&info.is_comment==2" v-if="cur==0">
                        已完成
                    </div>
                    <!-- 猎人确认接单 1 -->
                    <div class="d2 status" v-if="cur==1&&info.status==1" style="color:#FF4C2E;cursor: pointer;" @click="receive(info.id,index)">
                        <span class="status_btn">确认接单</span>
                    </div>
                    <!-- 猎人 完成确认 2 -->
                    <div class="d2 status" v-show="cur==1&&info.status==2" style="color:#FF4C2E;cursor: pointer;"
                        @click="showContact(index)">
                        <span class="status_btn">联系他</span>
                    </div>
                    <!-- 猎人 -->
                    <div class="d2 status" v-show="cur==1&&info.status==3&&info.is_comment==1">
                        已评价
                    </div>
                    <!-- 猎人 -->
                    <div class="d2 status" v-show="cur==1&&info.status==3&&info.is_comment==0">
                        待评价
                    </div>
                    <!-- 猎人 -->
                    <div class="d2 status" v-show="cur==1&&info.status==3&&info.is_comment==2">
                        已完成
                    </div>
                    <p style="margin-top: 10px; color: #999;margin-left:71px;">剩余时间：08:00</p>
                </div>
            </li>
            <li class="item item1">
                <div class="left">
                    <span class="s1">服务技能：</span>
                    <div class="d1">
                        {{info.game}}
                    </div>
                </div>
                <div class="right">
                    <span>单&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价：</span>
                    <div class="d2">
                        {{info.price}}/小时
                    </div>
                </div>
            </li>
            <li class="item item2">
                <div class="left">
                    <span class="s1">购买数量：</span>
                    <div class="d1">
                        {{info.number}}
                    </div>
                </div>
                <div class="right">
                    <span>优惠金额：</span>
                    <div class="d2">
                        {{info.discount}}
                    </div>
                </div>
            </li>
            <li class="item item3">
                <div class="left">
                    <span class="s1">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                    <div class="d1">
                        {{info.remark}}
                    </div>
                </div>
                <div class="right">
                    <span>实付金额：</span>
                    <div class="d2">
                        {{info.final_price}}
                    </div>
                </div>
            </li>
            <li class="item item4">
                <div class="left">
                    <span class="s1" style="vertical-align: top">订单信息：</span>
                    <div class="d1">
                        <ul>
                            <li>订单编号：{{info.trade_no}}</li>
                            <li v-show="info.addtime!=0">下单时间：{{info.addtime}}</li>
                            <li v-show="info.paytime!=0">支付时间：{{info.paytime}}</li>
                            <li v-show="info.receivetime!=0">接单时间：{{info.receivetime}}</li>
                            <li v-show="info.confirmtime!=0">完成确认：{{info.confirmtime}}</li>
                            <li v-show="info.commenttime!=0">评论时间：{{info.commenttime}}</li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
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
    import utils from '../../utils.js';
    export default {
        data() {
            return {
                type: '',
                id: '',
                cur: 0,
                info: {
                },
                commentBox: false,
                cancelOrderBox: false,
                contactBox: false,
                content: '',
                star: [0, 1, 2, 3, 4],
                s_l: -1,
                qq: '',
                score: 0,
            }
        },
        methods: {
            openQQ() {
                location.href = 'tencent://message/?uin=' + this.qq;
            },
            showContact(index) {
                this.qq = this.list[index].qq;
                this.contactBox = true;
            },
            receive(id, index) {
                this.$http.post('/v1/Order/receive', {
                    oid: id
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.list[index].status = 2;
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
                        this.list[index].status = 3;
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
            orderDetail() {
                this.$http.get('/v1/order/orderDetail', {
                    params: {
                        id: this.id,
                    }
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.info = d.data;
                        this.info.addtime = utils.dataFormatDetail(this.info.addtime);
                        if (this.info.paytime != 0) {
                            this.info.paytime = utils.dataFormatDetail(this.info.paytime);
                        }
                        if (this.info.receivetime != 0) {
                            this.info.receivetime = utils.dataFormatDetail(this.info.receivetime);
                        }
                        if (this.info.confirmtime != 0) {
                            this.info.confirmtime = utils.dataFormatDetail(this.info.confirmtime);
                        }
                        if (this.info.commenttime != 0) {
                            this.info.commenttime = utils.dataFormatDetail(this.info.commenttime);
                        }
                    } else {

                    }
                })
            }
        },
        mounted() {
            console.log("订单详情")
            if (this.$route.query.type == 0) {
                this.cur = 0;
                this.type = '我的订单'
            } else if (this.$route.query.type == 1) {
                this.type = '陪玩订单'
                this.cur = 1;
            }
            this.id = this.$route.query.id;
            this.orderDetail()
        }
    }

</script>
<style lang='scss' scoped>
    .p1 {
        color: #676666;
        padding: 20px;
        border-bottom: 1px solid #E5E5E5;
    }

    .detail {


        .item0 {
            img {
                border-radius: 100%;
            }
        }

        .item {
            overflow: hidden;
            padding: 15px 0px 15px 190px;
            box-sizing: border-box;
            border-bottom: 1px solid #E5E5E5;

            .left {
                float: left;
                width: 50%;

                .s1 {}

                .d1 {
                    display: inline-block;
                    color: #999;
                }
            }

            .right {
                float: left;

                .d2 {
                    color: #999;
                    display: inline-block;

                }
            }
        }

        .status_btn {
            display: inline-block;
            width: 80px;
            height: 40px;
            background: rgba(255, 76, 46, 1);
            border-radius: 10px;
            color: #fff;
            line-height: 40px;
            text-align: center;
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
