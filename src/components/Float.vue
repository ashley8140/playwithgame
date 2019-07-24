<template>
    <div>
        <div class="help_float">
            <ul>
                <li @mouseover="cur=0" @mouseout="cur=null">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAA/FBMVEUAAABmZmZmZmZmZmZlZWVRUVFlZWVmZmb/RSNnWlf/Sy5lZWVlZWVmZmZmZmZlZWVkZGRlZWX+TC5mZmZmZmZlZWVlZWViYmJhYWFhYWH/TC1mZmb/Sy1lZWVmZmZlZWVlZWVlZWViYmJjY2P/RSphYWFfX19fX19mZmZlZWX/TC1mZmZlZWVmZmZkZGT/SSz2Si3/QiHvTjT/TC1lZWX/Sy1lZWVlZWX/SyxkZGT/Siy2V0T/SC6lWk7zTjL/Sy7/TC3/Sy1lZWVlZWX/Syz/Sy5lZWVlZWX/Si3/SSyUW1RkZGRjY2NkZGShWU7/RylmZmb/TC6XXlTlUDdtW+mrAAAAUHRSTlMA+uH38QcsHg8F8emwbd2rUjz47dJ2YhcTD+jWwcC7t6VKJiIeHBEK/fzhlVZGMCwjCvvPyqCOiHhoRjg1/vLgtqudnJWMgXlhV0NCNi4uGYNKH7IAAAG/SURBVDjLtZRnc9pAEIZ1SAhkdQkJRC+mBTAQd6f3nryb/P//Ek5yApk5ldjj/XBb7hlt0c5J95LyZNQo52MV07bmAOaWYY6ywEF3BoD5ls8AoNNIA9UOINuhypNrw7Av42sKGTDoQXQQmA5TerGBRVSo6x6UgfBmdTH9N9CHfiL+iAFDO/RNKN9S8o10fDhwhzKc1NpWYAcJu3id0ccFOn9tF34jA410rPaVv88cT4DurVVnrJ6JRvJsnFghejlTt2H+mamZg4awE6OFzx+vPlVTsKkThC5Ksa2xZx4RNW+EpKsDYPNZvOuTn0Qv352Stxb9KwVnlwaAuK/KL7raqXN6JUDfwNid14DKve/k8X3YUFOAthKGIV67J/SYqyodCdASKlzJcP4T3dDzXNSHy9UxPcpFa1AfDt2St92pNb0QoLW4yLKPZPfadL6Vqm16K0AvcTaRtAVqifvUo2b7iJo/BOjEgtItgbnSLXtKRO2NcF3GPQDWl31gfXOctquapThSMQnQ0oqRJzIGxUhVxyLrfv8oXCvolTPIsWI4nB6aLaCfRUpLGYCi87O0zCmwbnYUztnLQr1H9al0d/kNREhCMGEpa7QAAAAASUVORK5CYII="
                        alt="">
                    <p>联系客服</p>
                </li>
                <li @mouseover="cur=1" @mouseout="cur=null">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqBAMAAAA37dRoAAAAJ1BMVEUAAABlZWVmZmZiYmL/Sy1mZmZmZmZlZWX/Si1gYGD/Sy5mZmb/TC7f2WhGAAAAC3RSTlMA8a0m5xnEtkkY5NgB09IAAABfSURBVCjPYwABZsXdMCBkwAADhrsRQBguql0KZ4ZvgjOlA+BM1o1w5m4Qkb17G5hNUBQCRkVHRcEsJIBdlALbOFwasIiynHEgWpTDC2YCZg7gROQA7Uqk3II/Z2HmQgDMdW1diQEiHgAAAABJRU5ErkJggg=="
                        alt="">
                    <p>APP下载</p>
                </li>
                <li @click="gotoTop">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAqCAMAAADyHTlpAAAANlBMVEUAAAAAAABDQ0NUVFRmZmZlZWVTU1NlZWVlZWVERERmZmZVVVVmZmZlZWVlZWVmZmZlZWVmZmYl15KlAAAAEXRSTlMBBRch3Mgl380Uzh7iwNa3sSPx9M8AAACgSURBVDjL7dPLCsMgEEBRJ0ltTGpb//9niw96sZpxVwjkulIOsxDGXP0nMRIzMpZCQ0maK3L2doSlyCU8sJq0SwjYwczV3rC6nGTCii4l2vuRrWRtFZlz2L7cktTm/kjsDO1IctiK7sjWQpEHFors2oru/FJ5ry00SWBeAewyQ7evjC4Fdmt4Qt9+YmKq6Gz9yzSJciVJp6l91Dfu6oR9AKBjBoSgFr09AAAAAElFTkSuQmCC"
                        alt="">
                    <p>返回顶部</p>
                </li>
            </ul>
        </div>
        <div class="f f1" v-show="cur==0">
            <p>
                QQ: 125265994
            </p>
            <p style="margin-top: 10px;">
                电: 254646461
            </p>
        </div>
        <div class="f f2 center c_34" v-show="cur==1">
            <div class="fl">
                <img src="/static/imgs/timg.jpg" alt="">
                <p>ios下载</p>
            </div>
            <div class="fl" style="margin-left: 16px;">
                <img src="/static/imgs/timg.jpg" alt="">
                <p>android下载</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                cur: null
            }
        },
        methods: {
            gotoTop() {
                console.log(this.$refs.nav)
            }
        }
    }

</script>

<style lang="scss" scoped>
    .f {
        position: fixed;
        right: 190px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 8px 0px rgba(255, 76, 46, 0.2);
        border-radius: 20px;
        font-size: 12px;

        &.f1 {
            color: #666;
            top: 300px;
            padding: 35px;
        }

        &.f2 {
            padding: 31px 21px;
            top: 382px;

            img {
                width: 72px;
                height: 72px;
            }

            p {
                margin-top: 8px;
            }
        }
    }

    .help_float {
        z-index: 99;
        position: fixed;
        top: 300px;
        right: 100px;
        background: #fff;
        text-align: center;
        width: 80px;
        box-shadow: 0px 0px 8px 0px rgba(255, 76, 46, 0.2);
        border-radius: 20px;
        padding: 0 0 20px;

        ul {
            li {
                margin-top: 20px;
                cursor: pointer;

                img {
                    width: 42px;
                }

                p {
                    color: #343434;
                    font-size: 12px;
                }
            }
        }
    }

</style>
