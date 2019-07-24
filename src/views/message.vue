<template>
    <div class="container">
        <p class="p1">首页 > <span style="color:#FF4C2E">消息</span></p>
        <div class="bold p4">
            <span @click="changeCur(1)" :class="{'active': cur == 1}">服务消息</span> |
            <span @click="changeCur(2)" :class="{'active': cur == 2}">官方消息</span>
        </div>
        <div style="overflow:hidden;">
            <ul>
                <li class="item" v-for="(i, index) in list" :key="index">
                    <div class="fl logo" :class="{'show':cur==1}"><img src="/static/imgs/xx@2x.png" alt=""></div>
                    <div class="fl logo" :class="{'show':cur==2}"><img src="/static/imgs/gg@2x.png" alt=""></div>
                    <div class="fl" style="margin-left:20px;">
                        <p class="time">{{i.addtime}}</p>
                        <div class="message" v-html="i.msg"></div>
                    </div>
                </li>
            </ul>
        </div>
        <v-pagination :total="total_page" :current_page='page' @pagechange="pagechange">
        </v-pagination>
    </div>
</template>
<script>
    import pagination from '../components/pagination'
    import utils from '../utils.js';

    export default {
        data() {
            return {
                page: 1,
                cur: 1,
                list: {},
                total_page: 1,
            }
        },
        components: {
            'v-pagination': pagination
        },
        methods: {
            changeCur(v) {
                if (this.cur == v) {
                    return
                }
                this.cur = this.cur == 1 ? 2 : 1;
                this.page = 1;
                this.NoticeMessage();
            },
            pagechange: function (currentPage) {
                this.page = currentPage;
                this.NoticeMessage()
            },
            NoticeMessage() {
                var d = {};
                d.page = 1;
                if (this.cur == 1) {
                    d.type = 0;
                } else {
                    d.type = null;
                }
                this.$http.get('/v1/NoticeMessage/lists', {
                    params: d
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.list = d.data.lists;
                        for (var i = 0, l = this.list.length; i < l; i++) {
                            this.list[i].addtime = utils.dataFormat(this.list[i].addtime);
                        }
                    } else {

                    }
                })
            }
        },
        mounted() {
            this.NoticeMessage()
        }
    }

</script>
<style lang='scss' scoped>
    .logo {
        display: none;

        &.show {
            display: block;
        }
    }

    .message {
        max-width: 1055px;
    }

    .p1 {
        margin-top: 25px;
        font-size: 12px;
    }

    .p4 {
        padding-left: 20px;
        margin-top: 35px;
        padding-bottom: 25px;
        font-size: 18px;
        color: #999999;
        cursor: pointer;

        .active {
            color: #FF4C2E
        }
    }

    .item {
        overflow: hidden;
        padding: 25px 20px;
        border-top: 1px solid #cccccc;
        font-size: 12px;

        .time {
            color: #999;
        }

        .message {
            margin-top: 10px;
            color: #343434;
        }
    }

</style>
