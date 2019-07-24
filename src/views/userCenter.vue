<template>
    <div class="container" style="margin-top: 70px;overflow: hidden;margin-bottom: 50px;">
        <div class="left center">
            <div class="title">
                <span class="bold block" style="font-size:24px;">个人中心</span>
                <span class="line"></span>
            </div>

            <ul class="nav">
                <router-link :to="{path: i.link}" v-for="(i,index) in hunterUserCenterNav" tag="li" :key=index>
                    {{i.name}}
                </router-link>
            </ul>
        </div>
        <div class="right">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </div>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {

            }
        },
        computed: {
            ...mapState(['hunterUserCenterNav'])
        },
        created () {
            console.log("用户中心 created")
        },
        mounted () {
            console.log("用户中心 mounted")
        },
        activated () {
            console.log("用户中心 activated")
        },
        destroyed () {
            console.log("用户中心destoryed")
        }
    }

</script>
<style lang='scss' scoped>
    .left {
        overflow: hidden;
        float: left;
        width: 200px;
        box-sizing: border-box;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        margin-bottom: 81px;

        .title {
            padding: 25px 0 10px;
            border-bottom: 1px solid #EBEBEB;
            background: #fff;
        }

        .nav {
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;

            li {
                width: 200px;
                height: 56px;
                line-height: 56px;
                box-sizing: border-box;
                color: #666;
                font-size: 16px;
                border-bottom: 1px solid #EBEBEB;
                cursor: pointer;
                background: #fff;
                &.navIsActive {
                    color: #fff;
                    background: #FF4C2E;
                }

                &:last-child {
                    border-bottom: none;

                }
            }
        }
    }

    .line {
        display: inline-block;
        width: 32px;
        height: 4px;
        background: rgba(255, 76, 46, 1);
        border-radius: 2px;
        position: relative;
        top: -8px;
    }

    .right {
        float: right;
        width: 970px;
        background: #fff;
        border-radius: 20px;
    }

</style>
