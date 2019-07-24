<template>
    <div>
        <p class="p1 bold"><span @click="change_cur" :class="{'active': cur==0}">关注</span> | <span @click="change_cur"
                :class="{'active': cur==1}">粉丝</span></p>
        <div class="wrapper center">
            <ul class="flex">
                <li class="item" v-for="(i, index) in list" :key=index :class="{'male': i.sex==1,'female': i.sex==2}">
                    <div class="avatar">
                        <img :src=i.avatar alt="头像">
                    </div>
                    <p class="nickname">{{i.nickname}}<img v-show="i.sex==2" class="sex" :src=base64.female alt="女"><img
                            class="sex" v-show='i.sex==1' :src=base64.male alt="男"></p>
                    <span class="s1" @click="follow_cancel(i.user_id, index)" v-if="i.isfollow==1">已关注</span>
                    <span class="s1 active" @click="follow_add(i.user_id, index)" v-if="i.isfollow==0">+关注</span>
                </li>
            </ul>
            <v-pagination :total="total_page" :current_page='page' @pagechange="pagechange">
            </v-pagination>
        </div>
    </div>
</template>
<script>
    import pagination from '../../components/pagination'
    import {
        mapState
    } from 'vuex';
    export default {
        data() {
            return {
                cur: 0,
                page: 1,
                total_page: 1,
                list: []
            }
        },
        computed: {
            ...mapState(['base64'])
        },
        components: {
            'v-pagination': pagination
        },
        methods: {
            pagechange: function (currentPage) {
                this.page = currentPage;
                if (this.cur == 0) {
                    this.getFollows();
                } else {
                    this.getFans();
                }
            },
            change_cur() {
                this.cur = this.cur == 0 ? 1 : 0;
                this.page = 1;
                if (this.cur == 0) {
                    this.getFollows();
                } else {
                    this.getFans();
                }
            },
            getFans() { //我的粉丝
                this.$http.get('/v1/user/myFuns', {
                    params: {
                        page: this.page
                    }
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.total_page = d.data.lists_pages;
                        this.list = d.data.lists;
                    } else if (d.code == 401) {

                    }
                })
            },
            getFollows() {
                this.$http.get('/v1/user/myFollows', {
                    params: {
                        page: this.page
                    }
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.total_page = d.data.lists_pages;
                        this.list = d.data.lists;
                    } else if (d.code == 401) {

                    }
                })
            },

            follow_add(id, index) {
                this.$http.post("/v1/user/follow_add", {
                    touid: id
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.list[index].isfollow = 1;
                        this.$toast.success("关注成功！")
                    } else if (d.code == 401) {

                    } else {
                        this.$toast.success(d.message)
                    }
                })
            },
            follow_cancel(id, index) {
                this.$http.delete("/v1/user/follow_cancel", {
                    data: {
                        touid: id
                    }
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.list.splice(index, 1);
                        this.$toast.success("取消关注成功！")
                    } else if (d.code == 401) {

                    } else {
                        this.$toast.success(d.message)
                    }
                })
            }
        },
        created () {
          console.log("粉丝 created")  
        },
        mounted() {
            console.log("粉丝 mounted")
            this.getFollows() //获取关注列表
        },
        activated () {
            console.log("粉丝 activated")  
        },
        beforeDestroy() {
            console.log("粉丝 beforedestory")
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

        span {
            cursor: pointer;

            &.active {
                color: #FF4C2E;
            }
        }
    }

    .wrapper {
        background: #fff;

        .item {
            padding: 30px 25px 16px;

            .sex {
                margin-left: 10px;
            }

            .s1 {
                margin-top: 10px;
                width: 100px;
                height: 30px;
                border: 1px solid rgba(204, 204, 204, 1);
                border-radius: 4px;
                cursor: pointer;
                display: inline-block;
                line-height: 30px;
                color: #999;

                &.active {
                    background: #FF4C2E;
                    color: #fff;
                    border: none;
                }
            }

        }



        .avatar {
            width: 70px;
            height: 70px;
            border-radius: 100%;
            overflow: hidden;
            display: inline-block;

            img {
                width: 70px;
                height: 70px;

            }
        }

        .female {
            .avatar {
                border: 3px solid #FF4C2E;
            }
        }

        .male {
            .avatar {
                border: 3px solid rgba(35, 131, 255, 1);
            }
        }
    }

</style>
