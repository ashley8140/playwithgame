<template>
    <div class="wrap">
        <div class="item1">
            <div class="d1">余额 :</div>
            <div class="d2">{{balance}}元</div>
        </div>
        <div class="item2">
            <div class="d1">充值金额 :</div>
            <div class="d2">
                <ul class="m flex">
                    <li v-for="(i, index) in list" :key=index class="item" @click="changeMoney(i.money, index)"
                        :class="{'choose': cur==index}">
                        {{i.money}}元
                    </li>
                </ul>
                <input class="input" type="number" v-model="m" :class="{'choose': cur=='null'}" @focus="cur='null';money= m ? m : ''"
                    @input="changeMoney('input')" placeholder="自定义金额">
            </div>
        </div>
        <div class="pay">
            <div class="d1">
                充值方式 :
            </div>
            <div class="pay_style d2">
                <span class="item" :class="{'choose': pay_id==1}" @click="pay_id=1">
                    <img width=21 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAllBMVEUAAAArm/orm/oqnPkrm/omlvgrm/kqmPoZjtIcj+QrnPoqm/kpmfkrm/krnPorm/komvkrnPkrnPoqmPkrl/crm/orm/krm/orm/krmvcpmvYrm/ornPornPkrm/krnPkpmvgrm/Yrm/krm/grm/oqmvkrmfcpmfIjlO4rmvkrmvgqmfgkmvYrnPorm/krm/kgj+8snPp4PNgRAAAAMXRSTlMA75pU+SLXMAUJ64El0+e3M6uOKx314pZ6QDfNv7KloUo6dWpkTzwSDolvRBvGuFgQ6RGoggAAAeRJREFUOMu9VWl3gjAQDBCjELlEUaoW77vV/f9/rtkIJuGQvn7ovKfP7A7LZDNuyH9hkM1iFlDqsZhng7fUaBqABmuatFL7IdSw7DcL4BSaMHLr3KEPLfCHVe7aglZ4a5P7MYE3sD4MDRa8hacpcZmZm0VRFJq61S5HYGIsYp+Vnrz6C91kKPtdvjG1CxxFcFcuimRYKbwkTTBL2+WSWgVuDTJgKo/Zgk7NCAs9eIXfkSET0Zke2DoIF8/UkUhVjotorJMPPQWs71IAff8MWhCL5AoUmFgHbeSrSOb6DsWattlY5E6GGTXy4j52T8n+PC/WjshtdC59yfBWBCvh123D8Fnx6+EZPhURX+oRht0vKNAvnuC+QqtXc6Nftm5HCC+DX3vsmfgc6t3BQ5kMSAIK8xVBOCjHPJTs2cKLvpUdeeIaa71aSyNJ7XetoVj4uJb0x26hjFRYdEhOwUvEEK2RwgK142OOnaJFX+bPCUmeCtMLVtjI17PLsdBzc87F2PvGPzSOxQ3fygkxxojEJM+qAxHDYV+NUsMBwUgWqIwCZs+2W56nUEOQO64aMj50wHf/Mr4Qh/eDMaqN3G6uUjJv4857DdfEueOa6L6AVPvrdNuQ7k2TjkuTL/1gAh5b8kPt0vwBAczLdTzcaF0AAAAASUVORK5CYII="
                        alt="">
                    <span>支付宝</span>
                </span>
                <span class="item" style="margin-left: 30px;" :class="{'choose': pay_id==2}" @click="pay_id=2">
                    <img width=21 src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAkFBMVEUAAAAMwjIAty4LwjILwjIAtxMLwjMMwTILwjIMwjILwjIAtSkLwTILwTIKvi8MwjMLwjILwTILwjILwjELwDEHwC8HvS4Jvy4EuzELwjMLwjILwjILwjILwDEIvjALwjILwTIMwjELwjILwjEKwTIKwTAKwDAKwTIAlQAMwjMLwTMMwTILwDIKwTILvzAMwjPwaoBxAAAAL3RSTlMA8BDr3QT7gNLGqAjmsyvYwJuIakElIhsU9uHNXVYfoo6BeG5mSzQyAvHJwZ9/MECJZsYAAAFlSURBVDjLxZTZkoIwEEUbIcgiOyIoLuPubP3/fzdWKiHEJORtPG8dThUNtzvwb8T1PMkcHx9Z9FOTSfW3cHCEW6RGNU1QIdHrpPRRg1/GqrvaoIHNSmlhgUbWS9ldUtfEohm7swwnCWYjOZp2nflI3lpVAfHs6pWn2VvV+IBbJoe2BmoP8ZP9Nos6K2i5o0WFjNDXqHBhEVTyf7te14P6wdR2eBrROuBlBW0iq9C7Ihh6MNThszi5I3WVoMClR6LT9FmR9g6Ms4Nj6JkoD9Js5SjRyW2gG4tUjx3KuPwDOT13bxt1B15HLmcrrtuwPQtFsOTpqpyp3KCg5Omq7JRB6qqjYcG+xOzb4SNKMrsbDFFd7PIFBgqb+w2COLA0EUuXlzflei8XWONNuA280BrXNm9BodSr3ZGASqJT/WgHOjL6yrV01x4a0EJ8xEcPcDvtQ89xvXB/ut3BQIqYs1faqRdneB9/yBy7/c/IMO8AAAAASUVORK5CYII="
                        alt="">
                    <span>微信</span>
                </span>
            </div>
            <div>
                <div class="d1">

                </div>
                <div class="send d2" @click="send">
                    立即充值
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex';
    export default {
        data() {
            return {
                pay_id: 1,
                list: {},
                balance: "",
                diamond: "",
                money: '',
                m: '',
                cur: null
            }
        },

        computed: {
            ...mapState(['userInfo'])
        },
        methods: {
            //stype 1是充值余额，2是购买钻石
            chargeRule() {
                this.$http.get('/v1/payment/chargeRule', {
                    params: {
                        stype: 1,
                        qid: 3
                    }
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.balance = d.data.balance
                        this.diamond = d.data.diamond
                        this.list = d.data.lists;
                    } else if (d.code == 401) {

                    } else {
                        this.$toast.error(d.message)
                    }
                })
            },
            changeMoney(item, index) {
                if (item == "input") {
                    this.money = this.m;
                    return
                }
                this.cur = index;
                this.money = item;
                this.m = '';
            },
            send(){
                console.log(this.money);
                if (!this.money) {
                    this.$toast.error("请选择或者填写充值金额！");
                    return
                }
                alert("充值接口还没写")
            }
        },
        mounted() {
            // 获取规则
            console.log("余额充值")
            this.chargeRule()
        }
    }

</script>
<style lang='scss' scoped>
    .wrap {
        font-size: 14px;
        .m.flex {
            justify-content: flex-start;
            
        }
    }

    .d1 {
        width: 183px;
        text-align: right;
        color: #666;
        display: inline-block;
    }

    .d2 {
        margin-left: 60px;
        display: inline-block;
        width: 950px;
    }

    .item1 {
        height: 72px;
        line-height: 72px;
        border-bottom: 1px solid #ebebeb;

        .d2 {}
    }

    .item2 {
        border-bottom: 1px solid #ebebeb;

        .d1 {
            float: left;
            margin-top: 40px;
        }

        .d2 {
            padding: 30px 0;

            .input {
                width: 200px;
                height: 50px;
                border: 1px solid rgba(204, 204, 204, 1);
                border-radius: 10px;
                margin-top: 30px;
                text-align: center;

                &.choose {
                    border: 1px solid #ff4c2e;
                }
            }

            .input::-webkit-input-placeholder {
                color: #CBCBCB;
                font-size: 14px;
            }
        }
    }

    .pay_style {
        margin-top: 30px;


        .item {
            text-align: center;
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
        }
    }

    .send {
        margin-top: 30px;
        width: 114px;
        height: 50px;
        background: rgba(255, 76, 46, 1);
        border-radius: 10px;
        color: #fff;
        line-height: 50px;
        cursor: pointer;
        text-align: center;
        margin-bottom: 116px;
    }

    .m {
        &.flex {
            justify-content: space-between;
        }

        li {
            width: 114px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            border-radius: 10px;
            border: 1px solid #E0E0E0;
            margin-right: 30px;
            margin-top: 20px;
            cursor: pointer;

            &.choose {
                border: 1px solid rgba(255, 76, 46, 1);

            }
        }
    }

</style>
