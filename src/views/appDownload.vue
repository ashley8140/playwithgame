<template>
    <div class="download">
        <div class="container" >
            <p class="p1">首页 > <span style="color:#FF4C2E;">APP下载</span></p>
            <div style="margin-top: 100px;">
                <img width=485 src="/static/imgs/e.png" alt="">
            </div>
            <div class="code" style="margin-top: 93px;">
                <div style="margin-right:60px;"><img src="/static/imgs/timg.jpg" width=236 height=236 alt=""></div>
                <div><img src="/static/imgs/timg.jpg" width=236 height=236 alt=""></div>
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

            }
        },
        computed: {
            ...mapState(['showLoginBox'])
        },
        methods: {

        },
        mounted() {

        },
        activated() {

        }
    }

</script>
<style lang='scss' scoped>
    .container {
        overflow: hidden;
    }
    .p1 {
        margin-top: 25px;
        font-size: 12px;
        margin-bottom: 20px;
    }

    .download {
        height: 828px;
        background: url('/static/imgs/bg.png') no-repeat top left;
        background-size: 100%;
    }
    .code > div {
        display: inline-block;
        cursor: pointer;
    }
</style>
