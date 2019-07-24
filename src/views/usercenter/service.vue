<template>
    <div class="service">
        <p class="p1 bold">
            服务管理
        </p>
        <ul class="serviceList">
            <li class="item0 flex bold">
                <span class="s">服务名称</span>
                <span class="s">状态</span>
                <span class="s">单价</span>
                <span class="s">操作</span>
            </li>
            <li v-for="(item, index) in list" :key=index class="flex item center">
                <span class="s s1">{{item.title}}</span>
                <span class="s s1">
                    <span v-show="item.status==2" :class="{'c_999': item.status!=1}">审核未通过</span>
                    <span v-show="item.status==1">审核通过</span>
                    <span v-show="item.status==0" :class="{'c_999': item.status!=1}">审核中...</span>
                </span>
                <span class="s s1">
                    <span v-show="item.status==1">{{item.price}}/小时</span>
                </span>
                <span class="s">
                    <span class="btn" v-if="item.status==1 && item.on_off==1" @click="upDownService(index)">下架</span>
                    <span class="btn btn1" v-if="item.status==1 && item.on_off==0" @click="upDownService(index)">上架</span>
                    <div v-if="(item.on_off==0 && item.status==1)||(item.status==2)" :class="{'middle': item.status==2}">
                        <router-link tag="span" exact class="operate" :to="{'name':'join', params: {key: item.key, service_id: item.service_id}}">
                                修改
                        </router-link>
                         | <span class="operate" @click="delService(index)">
                            删除</span>
                    </div>
                    <router-link tag="span" class="point" style="color: #FF4C2E; line-height: 95px;" exact :to="{'name':'join', params: {key: item.key, service_id: 'null'}}" v-if="item.status!=1 && item.status!=2&&item.status!=0">
                        入驻
                    </router-link>
                </span>
            </li>
        </ul>
    </div>
</template>
<script>
    import {
        mapMutations
    } from 'vuex'
    export default {
        /* status 1通过 2拒绝 0审核中 
          on_off上架下架按钮状态  */
        data() {
            return {
                list: [],
            }
        },

        methods: {
            delService(index) { //删掉服务 之后显示入驻
                this.$http.delete('v1/Gamer/delService', { //delete传参不能用params,不然后台接受不到参数
                    data: {
                        service_id: this.list[index].service_id
                    }
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.list[index].status = null;
                        this.$toast.success(d.dmessage);
                    } else if (d.code == 401) {

                    } else {
                        this.$toast.error(d.message);
                    }
                })
            },
            upDownService(index) { //上架 up_down 1 下架 0
                var id = this.list[index].service_id;
                this.$http.post('/v1/Gamer/upDownService', {
                    service_id: id,
                    up_down: status
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.list[index].on_off = this.list[index].on_off == 0 ? 1 : 0;
                        this.$toast.success(d.message)
                    } else if (d.code == 401) {

                    } else {
                        this.$toast.error(d.message)
                    }
                })
            },
            getServiceList() { //获取服务列表
                var that = this;
                this.$http.get('/v1/Gamer/pwApply').then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        that.list = d.data;

                    } else if (d.code == 401) {

                    } else {

                    }
                })
            }
        },
        mounted() {
            console.log("服务管理")
            this.getServiceList();
        }
    }

</script>
<style lang='scss' scoped>
    .service {
        background: #fff;
        .middle {
            line-height: 96px;
        }
        .p1 {
            padding: 20px 70px 20px 20px;
        }

        .serviceList {
            .item0 {
                color: #999;
                padding: 18px 0;
            }

            li {
                border-bottom: 1px solid #EBEBEB;
                font-size: 14px;

                .s {
                    width: 25%;
                    text-align: center;

                    .btn {
                        margin-top: 34px;
                        margin-bottom: 5px;
                        width: 70px;
                        height: 30px;
                        background: #FF4C2E;
                        border-radius: 15px;
                        display: inline-block;
                        line-height: 30px;
                        color: #fff;
                        cursor: pointer;

                        &.btn1 {
                            margin-top: 15px;
                        }
                    }

                    .operate {
                        cursor: pointer;
                    }
                }

            }

            .item {
                height: 95px;

                .s1 {
                    line-height: 95px;
                }
            }
        }
    }

</style>
