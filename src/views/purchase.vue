<template>
    <div class="container">
        <p class="p1 bold">首页 > <span>下单</span></p>
        <div class="main">
            <p class="p2">下单</p>
            <ul class="tag flex">
                <li class="item bold">陪玩</li>
                <li class="item bold">昵称</li>
                <li class="item bold">服务技能</li>
                <li class="item bold">单价</li>
                <li class="item bold">购买数量</li>
                <li class="item bold">优惠金额</li>
                <li class="item bold">总价</li>
            </ul>
            <ul class="info flex">
                <li class="item item0 pic">
                    <img :src=info.avatar alt="头像">
                </li>
                <li class="item item1">
                    {{info.nickname}}
                </li>
                <li class="item item2">
                    <select v-model="service_id" @change="gameChange('gamechange')">
                        <option v-for="(i, index) in game_list" :key=index :value=i.service_id>{{i.game}}</option>
                    </select>
                </li>
                <li class="item item3">
                    {{price}}/小时
                </li>
                <li class="item item4">
                    <input v-model="number" type="number" min="0" @input="priceChange">
                </li>
                <li class="item item5">
                    {{discount_m}}
                </li>
                <li class="item item6" style="color:#FF4C2E;">
                    ¥{{total_m}}
                </li>
            </ul>
            <div class="pay">
                <div class="remark">
                    <div style="width: 75px; display: inline-block;text-align:left;">
                        备注
                    </div>
                    <textarea v-model="remark" name="remark"></textarea>
                </div>
                <div class="tel">
                    <div class="item">
                        <span>手机号码</span>
                        <input v-model="mobile" type="text"><span style="color:#FF4C2E;margin-left:10px;">(*必填)</span>
                    </div>
                    <div class="item" style="margin-left: 50px;">
                        <span>QQ</span>
                        <input v-model="qq" type="text"><span style="color:#FF4C2E;margin-left:10px;">(*必填)</span>
                    </div>
                    <div class="item" style="margin-left: 50px;">
                        <span>微信</span>
                        <input v-model="weixin" type="text"><span style="color:#CCCCCC;margin-left:10px;">(选填)</span>
                    </div>
                </div>
                <div class="money">
                    <span>支付金额 </span> <span class="span2">¥{{total_m}}</span>
                </div>
                <div class="pay_style">
                    <span>支付方式</span>
                    <span class="item item_ye" :class="{'choose': code==0}" @click="code=0">余额 {{info.balance}}</span>
                    <span class="item" :class="{'choose': code==1}" @click="code=1">
                        <img width=21 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAllBMVEUAAAArm/orm/oqnPkrm/omlvgrm/kqmPoZjtIcj+QrnPoqm/kpmfkrm/krnPorm/komvkrnPkrnPoqmPkrl/crm/orm/krm/orm/krmvcpmvYrm/ornPornPkrm/krnPkpmvgrm/Yrm/krm/grm/oqmvkrmfcpmfIjlO4rmvkrmvgqmfgkmvYrnPorm/krm/kgj+8snPp4PNgRAAAAMXRSTlMA75pU+SLXMAUJ64El0+e3M6uOKx314pZ6QDfNv7KloUo6dWpkTzwSDolvRBvGuFgQ6RGoggAAAeRJREFUOMu9VWl3gjAQDBCjELlEUaoW77vV/f9/rtkIJuGQvn7ovKfP7A7LZDNuyH9hkM1iFlDqsZhng7fUaBqABmuatFL7IdSw7DcL4BSaMHLr3KEPLfCHVe7aglZ4a5P7MYE3sD4MDRa8hacpcZmZm0VRFJq61S5HYGIsYp+Vnrz6C91kKPtdvjG1CxxFcFcuimRYKbwkTTBL2+WSWgVuDTJgKo/Zgk7NCAs9eIXfkSET0Zke2DoIF8/UkUhVjotorJMPPQWs71IAff8MWhCL5AoUmFgHbeSrSOb6DsWattlY5E6GGTXy4j52T8n+PC/WjshtdC59yfBWBCvh123D8Fnx6+EZPhURX+oRht0vKNAvnuC+QqtXc6Nftm5HCC+DX3vsmfgc6t3BQ5kMSAIK8xVBOCjHPJTs2cKLvpUdeeIaa71aSyNJ7XetoVj4uJb0x26hjFRYdEhOwUvEEK2RwgK142OOnaJFX+bPCUmeCtMLVtjI17PLsdBzc87F2PvGPzSOxQ3fygkxxojEJM+qAxHDYV+NUsMBwUgWqIwCZs+2W56nUEOQO64aMj50wHf/Mr4Qh/eDMaqN3G6uUjJv4857DdfEueOa6L6AVPvrdNuQ7k2TjkuTL/1gAh5b8kPt0vwBAczLdTzcaF0AAAAASUVORK5CYII="
                            alt="">
                        <span>支付宝</span>
                    </span>
                    <span class="item" :class="{'choose': code==2}" @click="code=2">
                        <img width=21 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAkFBMVEUAAAAMwjIAty4LwjILwjIAtxMLwjMMwTILwjIMwjILwjIAtSkLwTILwTIKvi8MwjMLwjILwTILwjILwjELwDEHwC8HvS4Jvy4EuzELwjMLwjILwjILwjILwDEIvjALwjILwTIMwjELwjILwjEKwTIKwTAKwDAKwTIAlQAMwjMLwTMMwTILwDIKwTILvzAMwjPwaoBxAAAAL3RSTlMA8BDr3QT7gNLGqAjmsyvYwJuIakElIhsU9uHNXVYfoo6BeG5mSzQyAvHJwZ9/MECJZsYAAAFlSURBVDjLxZTZkoIwEEUbIcgiOyIoLuPubP3/fzdWKiHEJORtPG8dThUNtzvwb8T1PMkcHx9Z9FOTSfW3cHCEW6RGNU1QIdHrpPRRg1/GqrvaoIHNSmlhgUbWS9ldUtfEohm7swwnCWYjOZp2nflI3lpVAfHs6pWn2VvV+IBbJoe2BmoP8ZP9Nos6K2i5o0WFjNDXqHBhEVTyf7te14P6wdR2eBrROuBlBW0iq9C7Ihh6MNThszi5I3WVoMClR6LT9FmR9g6Ms4Nj6JkoD9Js5SjRyW2gG4tUjx3KuPwDOT13bxt1B15HLmcrrtuwPQtFsOTpqpyp3KCg5Omq7JRB6qqjYcG+xOzb4SNKMrsbDFFd7PIFBgqb+w2COLA0EUuXlzflei8XWONNuA280BrXNm9BodSr3ZGASqJT/WgHOjL6yrV01x4a0EJ8xEcPcDvtQ89xvXB/ut3BQIqYs1faqRdneB9/yBy7/c/IMO8AAAAASUVORK5CYII="
                            alt="">
                        <span>微信</span>
                    </span>
                </div>
                <div class="center">
                    <div class="send center" @click="send">
                        立即支付
                    </div>
                    <p class="tips">（*订单在3分钟内未支付，将自动取消）</p>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                number: 0,
                code: 0,
                service_id: '',
                uid_service: '',
                remark: '',
                info: {},
                discount_m: '',
                total_m: '',
                price: 0,
                mobile: '',
                qq: '',
                weixin: '',
                game_list: {

                }
            }
        },
        methods: {
            gameChange() {
                for (var i = 0, l = this.game_list.length; i < l; i++) {
                    if (this.service_id == this.game_list[i].service_id) {
                        this.price = this.game_list[i].price;
                        this.priceChange()
                        return
                    }
                }
            },
            priceChange() {
                this.number = this.number + '';
                if (this.number.indexOf('.') != -1) {
                    this.number = parseInt(this.number.replace('\..*', ''))
                }
                if (this.info.discount_open) {
                    if (this.info.discount_list[2].on_off) {
                        if (this.number >= this.info.discount_list[2].value) {
                            this.total_m = (this.price * this.number * 0.7).toFixed(2);
                            return
                        }
                    }
                    if (this.info.discount_list[1].on_off) {
                        if (this.number >= this.info.discount_list[1].value) {
                            this.total_m = this.price * this.number * 0.8.toFixed(2);
                            return
                        }
                    }
                    if (this.info.discount_list[0].on_off) {
                        if (this.number >= this.info.discount_list[0].value) {
                            this.total_m = this.price * this.number * 0.9.toFixed(2);
                        }
                    }
                } else {
                    this.total_m = this.number * this.price.toFixed(2);
                }
            },
            getOrder() {
                this.$http.get('/v1/Order/getOrder', {
                    params: {
                        service_id: this.service_id,
                        uid_service: this.uid_service
                    }
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.info = d.data;
                        this.game_list = this.info.game_list;
                        this.discount_m = 0;
                        this.total_m = this.price * this.number;
                        for (var i = 0, l = this.game_list.length; i < l; i++) {
                            if (this.service_id == this.game_list[i].service_id) {
                                this.price = this.game_list[i].price;
                                return
                            }
                        }
                    }
                })
            },
            send() {
                if (this.number == 0) {
                    this.$toast.success("请选择购买数量");
                    return
                }
                this.mobile = this.mobile.trim();
                if (!this.mobile) {
                    this.$toast.success("请填写手机号")
                    return
                }
                if (this.mobile.length != 11) {
                    this.$toast.success("手机号为十一位数字")
                    return
                }
                if (!this.qq) {
                    this.$toast.success("请填写qq号")
                    return
                }
            }
        },
        mounted() {
            this.service_id = this.$route.params.service_id;
            this.uid_service = this.$route.params.uid_service;
            this.getOrder()
        }
    }

</script>
<style lang='scss' scoped>
    .main {
        background: #fff;
        font-size: 14px;

        .pay {
            padding-left: 50px;

        }

        .send {
            margin-top: 30px;
            display: inline-block;
            width: 200px;
            height: 50px;
            background: rgba(255, 76, 46, 1);
            border-radius: 10px;
            font-size: 16px;
            line-height: 50px;
            color: #fff;
            cursor: pointer;
        }

        .tips {
            margin-bottom: 110px;
            font-size: 12px;
            color: rgba(255, 76, 46, 1);

        }

        .pay_style {
            margin-top: 30px;

            .item {
                text-align: center;
                margin-left: 30px;
                width: 114px;
                height: 50px;
                border: 1px solid rgba(204, 204, 204, 1);
                border-radius: 10px;
                display: inline-block;
                line-height: 50px;
                font-size: 16px;
                cursor: pointer;

                &.choose {
                    border: 1px solid rgba(255, 76, 46, 1);
                }

                &.item_ye {
                    width: auto;
                    padding: 0 10px;
                }
            }
        }

        .money {
            margin-top: 30px;

            .span2 {
                font-size: 20px;
                color: #FF4C2E;
                margin-left: 20px;
            }
        }

        .tel {
            margin-top: 30px;

            .item {
                display: inline-block;


                input {
                    width: 200px;
                    height: 40px;
                    border: 1px solid rgba(204, 204, 204, 1);
                    border-radius: 4px;
                    margin-left: 20px;
                    box-sizing: border-box;
                    padding-left: 20px;
                }
            }
        }

        .remark {
            padding-top: 20px;
            color: #666;

            textarea {
                resize: none;
                border: 1px solid #cccccc;
                border-radius: 4px;
                width: 680px;
                height: 100px;
                padding: 10px;
            }
        }

        .p2 {
            color: #FF4C2E;
            padding: 18px 20px;
            border-bottom: 1px solid #ebebeb;
            font-size: 18px;
        }

        .tag {
            padding: 18px 0;
            color: #999;
            border-bottom: 1px solid #ebebeb;

            li {
                width: 14.2%;
                text-align: center;
            }

        }

        .info {

            height: 104px;
            border-bottom: 1px solid #ebebeb;

            .item {
                width: 14.2%;
                text-align: center;
            }

            .item1,
            .item0,
            .item3,
            .item5,
            .item6,
            .item4 {
                line-height: 104px;
            }

            .item4 {
                span {
                    font-size: 20px;
                }

                input {
                    text-align: center;
                    width: 40px;
                    padding-left: 10px;
                    border-bottom: 1px solid #9C9696;
                }
            }

            .item2 {
                select {
                    margin-top: 37px;
                    width: 110px;
                    height: 34px;
                    border: 1px solid rgba(204, 204, 204, 1);
                    border-radius: 4px;
                    padding-left: 10px;

                }
            }
        }

        .pic {
            img {
                width: 67px;
                height: 67px;
                border-radius: 100%;
            }
        }
    }

    .p1 {
        margin-top: 25px;
        font-size: 12px;
        margin-bottom: 20px;
    }

</style>
