<template>
    <div style="background: #fff;border-radius:20px;overflow: hidden;">
        <p class="p1 bold" style="color:#FF4C2E">自我推广</p>
        <div class="wrapper">
            <p><span>折扣活动</span> <span style="color: #999;font-size: 12px">（多选，24小时内不能修改）</span> <span class="discount_open"
                    @click="change_discount_open(discount_open)" :class="{'active':discount_open}">
                    <i class="circle"></i>
                </span></p>
            <p>
                <span class="s1" :class="{'active':cur0==1}"></span> <span>折扣一：老板下单数量 ≥ </span> <input class="input"
                    v-model=v0 type="number" min=0 @input='change(0)'>
                <span>
                    ，老板享受 <span style="color:#FF4C2E">9</span>
                    折优惠；（建议3个小时起）
                </span>
            </p>
            <p>
                <span class="s1" :class="{'active':cur1==1}"></span> <span>折扣二：老板下单数量 ≥ </span> <input class="input"
                    v-model=v1 type="number" min=0 @input='change(1)'> <span>
                    ，老板享受 <span style="color:#FF4C2E">8</span>
                    折优惠；
                </span>
            </p>
            <p>
                <span class="s1" :class="{'active':cur2==1}"></span> <span>折扣三：老板下单数量 ≥ </span> <input class="input"
                    v-model=v2 type="number" min=0 @input='change(2)'> <span>
                    ，老板享受 <span style="color:#FF4C2E">7</span>
                    折优惠；
                </span>
            </p>
            <div class="center" style="margin-bottom: 50px;">
                <div class="submit" @click="promotionSave">确认提交</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                discount_open: 0,
                discount: '', //1:1|1:2|1:3,
                lists: [],
                v0: 0,
                v1: 0,
                v2: 0,
                cur0: 0,
                cur1: 0,
                cur2: 0
            }
        },
        methods: {
            change(index) {
                this['cur' + index] = this['v' + index] > 0 ? 1 : 0;
                if (this['v' + index] > 0){
                    this.discount_open == 0 && (this.discount_open = 1)
                } else {
                    this.v0 == 0 && this.v1 == 0 && this.v2 == 0 && (this.discount_open=0)
                }
            },
            change_discount_open(value) {
                this.discount_open = value == 0 ? 1 : 0;
                if (this.discount_open == 0) {
                    this.v0 = 0;
                    this.v1 = 0;
                    this.v2 = 0;
                    this.cur0 = 0;
                    this.cur1 = 0;
                    this.cur2 = 0;
                }
            },
            promotion() {
                this.$http.get('/v1/user/promotion').then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.discount_open = d.data.discount_open;
                        this.lists = d.data.lists;
                        this.discount_uptime = this.discount_uptime;
                        this.v0 = this.lists[0].value;
                        this.v1 = this.lists[1].value;
                        this.v2 = this.lists[2].value;
                        this.cur0 = this.lists[0].on_off;
                        this.cur1 = this.lists[1].on_off;
                        this.cur2 = this.lists[2].on_off;
                    }
                })
            },
            promotionSave() {
                this.discount = this.cur0 + ':' + this.v0 + '|' + this.cur1 + ':' + this.v2 + '|' + this.cur2 + ':' +
                    this.v2
                var d = {
                    discount_open: this.discount_open,
                    discount: this.discount,
                    discount_uptime: Math.round(new Date().getTime() / 1000)
                }
                this.$http.put('/v1/user/promotionSave', d).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.$toast.success("提交成功");
                    } else if (d.code == 401) {

                    } else {
                        this.$toast.error(d.message);
                    }
                })
            }
        },
        mounted() {
            console.log("自我推广")
            //获取自我推广详情
            this.promotion()
        }
    }

</script>
<style lang='scss' scoped>
    .p1 {
        padding: 20px;
        border-bottom: 1px solid #ebebeb
    }

    .wrapper {
        font-size: 14px;
        color: #666;
        background: #fff;

        .input {
            width: 60px;
            height: 40px;
            border: 1px solid rgba(204, 204, 204, 1);
            border-radius: 10px;
            box-sizing: border-box;
            text-align: center;
        }

        p {
            padding-left: 30px;
            line-height: 72px;
            border-bottom: 1px solid #ebebeb;
        }

        .s1 {
            width: 19px;
            height: 19px;
            display: inline-block;
            border-radius: 100%;
            border: 1px solid #CFCFCF;
            margin-right: 10px;
            position: relative;
            top: 7px;
            box-sizing: border-box;

            &.active {
                background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAMAAABFjsb+AAAAeFBMVEUAAAD/Sy7/Sy3/Ryn/Sy3/TC7/Sy3/Sy7/Sy3/Sy3/Si3/SST/NBr/Oyf/TC3/Sy3/TC7/////UTT/+ff/8/H/c1z/aE7/7ev/3tn/0Mj/uq7/l4b/iHP/bVX/YUf/Wj//VTn/6eX/5N//1s//ycD/xr3/wrj/sqXsuz1BAAAAEHRSTlMA+5Af5s7IxMKBdxUJBvnt7gHdsgAAAKBJREFUGNN1kFcSgzAQQ10IvWjpLYH0+98w2KYOE/3Y87wjr8S0pO9aseX6ki0KBYcRF6FBwQWbLoFCkY297GhiAkeJyZ4fSAoumXdAbVbAY85+6ENZCYdZ07W7GfSivAASFgM9VVcAY0O5OqHnGvU+PqkqFUq0X/qmrK/prhGc+d+WiB7GFd6y35fqYc4s1xzdsOU45/3Ty7m/rWe+9vwDvMcSqNi2a+AAAAAASUVORK5CYII=') no-repeat center center;
                background-size: cover;
                border: none;
            }
        }

        .discount_open {
            display: inline-block;
            box-sizing: border-box;
            width: 50px;
            height: 30px;
            border-radius: 15px;
            position: relative;
            top: 10px;
            margin-left: 120px;
            background: #ebebeb;
            border: 1px solid #ebebeb;

            .circle {
                position: absolute;
                left: 1px;
                top: 1px;
                width: 26px;
                height: 26px;
                background: rgba(255, 255, 255, 1);
                border-radius: 50%;
                cursor: pointer;
            }

            &.active {
                background: rgba(255, 76, 46, 1);
                border: none;

                .circle {
                    left: auto;
                    right: 1px;
                }
            }


        }
    }

</style>
