<template>
    <div>
        <p class="p1 bold" style="color:#FF4C2E">我的钱包</p>
        <div class="d1">
            <span>余额 </span>
            <span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAASFBMVEUAAAD/Sy3/Sy3/RCT/Sy3/Syz/Sy3/TC7/Syz/Sy3/SSz/SSv/TC7/Syz/TC3/SS3/Sy7/Sy3/TC3/Sy3/Syv/Sy3/SST/TC7BVfSUAAAAF3RSTlMA8vkV0VSD9WywRjTqnIc75MK8qkciDki/NgUAAAB0SURBVBjTbU9ZFoQwCJtC7eoyMy7c/6aGiv7U/ASS5jV8XsHBE/nA9z44aXCD7fKgKQz/SyJxxBtNzXDSFl1NGAIED6al1IUweAgOnDWb1QGrMa6l5KiCRX6Vj/1vkVkUKTUK17fANLVq3Bfrq9tx0Y7rcQIqggnlyr/5TgAAAABJRU5ErkJggg=="
                    alt=""></span>
            <span class="s2">{{money}}</span>
            <span style="margin-left: 45px;">钻石</span>
            <span><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABqUlEQVQ4jc2SMWsUURSFPwioYG1jY+FPENKIpjGNjUW2UCwUAunsxGJEIgRFJYggmC7aZmyUJTMPo0ksBDcWiWAgZKPLTBBTzEDEhMS5d9612V12zRLWzgtf8zjnwLv3wH8zW1s3j0sWPCnzICvz29aTLPhe5sGdev3G0S6zGSNmvNKd4SuaBW/KPCgOBgSqeRCVe4OBGR/NONMyT5phTbwZTyXlnKZcb9PgsnzjvBlTHdpdM4bRz1TMeNZ8MDOmfMKaT7EuEgorGGtqdqzkvn6ggs4yIo5ascA1K7ll+1zwCZ98ysrf6CajZkxojVGJWZWIIQAk4qE6TB11+cLZMuFFD2Y05ZI4InWYxIy3lxiGDIhjXh0mjns+4ceBL6SYvudq07wYhgx0XeJXxAmN2VTHdrnBox4BCxLzVh3Z7mtO9uxCUWVQY37LHI99inYGyDJ31WEac/HQQhUxY+rY9l+pdlzgpziq4pjsq5XqmNZFptsBa4QSs7QacqSvgMZzjkmM8w3WfYrJO17uR5zuy9yavVlOaY0Zv8G6RlT+ydwamWdIVnhwmOYP4VSGJNwKnqoAAAAASUVORK5CYII="
                    alt=""></span>
            <span class="s2">{{diamond}}</span>
            <router-link tag="div" class="send" to="/recharge">
                充值
            </router-link>
        </div>

        <div class="d2">
            <div class="nav border_bottom">
                <span @click="changeCur" :class="{'active': cur==0}">余额明细</span> <span> | </span>
                <span @click="changeCur" :class="{'active': cur==1}">钻石明细</span>
                <div class="fr">
                    <span class="s4" :class="{'active': type==0}" @click="change_type(0)">全部</span>
                    <span class="s4" :class="{'active': type==1}" @click="change_type(1)">收入</span>
                    <span class="s4" :class="{'active': type==2}" @click="change_type(2)">支出</span>
                </div>
            </div>
            <ul class="center">
                <li class="item cf item0 bold">
                    <span class="s0">交易类型</span>
                    <span class="s1">时间</span>
                    <span class="s2">金额</span>
                </li>
                <li class="item cf" v-for="(i, index) in list" :key=index>
                    <span v-show="i.type==1" class="s0">
                        收入
                    </span>
                    <span v-show="i.type==2" class="s0">
                        支出
                    </span>
                    <span class="s1">
                        {{i.time}}
                    </span>
                    <span :class="{'add':i.type==1}" class="s2 center">
                        <span v-show="i.type==1">+</span>
                        <span v-show="i.type==2">-</span>
                        <span>

                        {{i.money}}
                        </span>
                    </span>
                </li>
            </ul>
            <v-pagination :total="total_page" :current_page='page' @pagechange="pagechange">
            </v-pagination>
        </div>

    </div>
</template>
<script>
    import pagination from '../../components/pagination'
    import utils from '../../utils.js'
    export default {
        data() {
            return {
                cur: 0, //0余额明细 1钻石明细
                page: 1,
                type: 0, //0全部 1收入 2支出
                money: 0,
                diamond: 0,
                total_page: 1,
                list: {

                }
            }
        },
        components: {
            'v-pagination': pagination
        },
        methods: {
            change_type(value) {
                this.type = value;
                if (this.cur == 0) {
                    this.myBalanceLists();
                } else {
                    this.myDiamondLists();
                }
            },
            pagechange: function (currentPage) {
                this.page = currentPage;
                if (this.cur == 0) {
                    this.myBalanceLists();
                } else {
                    this.myDiamondLists();
                }
            },
            changeCur() {
                this.cur = this.cur == 0 ? 1 : 0;
                this.page = 1;
                this.type = 0;
                if (this.cur == 0) {
                    this.myBalanceLists();
                } else {
                    this.myDiamondLists();
                }

            },
            myBalanceLists() {
                this.$http.get('/v1/payment/myBalanceLists', {
                    params: {
                        page: this.page,
                        type: this.type
                    }
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.money = d.data.info.balance;
                        this.diamond = d.data.info.diamond;
                        this.total_page = d.data.list_pages;
                        this.list = d.data.list;
                        for (var i = 0, l = this.list.length; i < l; i++) {
                            this.list[i].time = utils.dataFormat(this.list[i].addtime)
                        }
                    } else if (d.code == 401) {

                    }
                })
            },
            // type 0全部，1收入，2支出
            myDiamondLists() {
                this.$http.get('/v1/payment/myDiamondLists', {
                    params: {
                        page: this.page,
                        type: this.type
                    }
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.money = d.data.info.balance;
                        this.diamond = d.data.info.diamond;
                        this.total_page = d.data.list_pages;
                        this.list = d.data.list;
                        for (var i = 0, l = this.list.length; i < l; i++) {
                            this.list[i].time = utils.dataFormat(this.list[i].addtime)
                        }
                    } else if (d.code == 401) {

                    }
                })
            }
        },
        mounted() {
            console.log("我的钱包")
            this.myBalanceLists();
        }
    }

</script>
<style lang='scss' scoped>
    .p1 {
        padding: 20px;
        border-bottom: 1px solid #ebebeb
    }

    .d1,
    .d2 {
        background: #fff;
        font-size: 14px;
        box-sizing: border-box;
    }

    .d1 {
        padding: 20px 50px 20px 20px;

        .s2 {
            color: #FF4C2E;
            font-size: 24px;
        }

        .send {
            cursor: pointer;
            float: right;
            width: 80px;
            height: 40px;
            background: rgba(255, 76, 46, 1);
            border-radius: 10px;
            color: #fff;
            line-height: 40px;
            text-align: center;
            font-size: 16px;
        }
    }

    .d2 {
        .nav {
            font-size: 16px;
            color: #999;
            padding: 20px 50px 20px 20px;
            span{
                cursor: pointer;
            }
            .active {
                color: #FF4C2E;
            }
        }

        .item0 {
            color: #999999;
        }

        .item {
            line-height: 53px;
            border-bottom: 1px solid #ebebeb;
            span {
               &.add {
                    color: #FF4C2E;
                }
            }
            .s0, .s1,.s2{
                float:left;
            }
        }

        .s0 {
            width: 25%;
        }

        .s1 {
            width: 50%;
        }

        .s2 {
            width: 25%;
        }

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

            &.active {
                background: #FF4C2E;
                color: #fff;
            }
        }
    }

</style>
