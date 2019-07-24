<template>
    <div class="footer_wrap">
        <div class="container">
            <ul class="footerNav center">
                <li class="item">
                    <p class="p1 bold">友情链接</p>
                    <div class="p2">
                        <a class="p3" href="javascript:;">新浪</a>
                        <a class="p3" href="javascript:;">百度</a>
                    </div>
                </li>
                <li class="item">
                    <p class="p1 bold">客服信息</p>
                    <div class="p2">
                        <span class="p3">QQ：125265994</span>
                        <span class="p3">电话：254646461</span>
                    </div>
                </li>
                <li class="item item2">
                    <p class="p1 bold">帮助中心</p>
                    <div class="p2">
                        <router-link class="p3" to="/hunterTips">
                            猎人等级说明
                        </router-link>
                        <router-link class="p3" to="/rechargeTips">
                            充值等级说明
                        </router-link>
                    </div>
                </li>
                <li class="item">
                    <p class="p1 bold">全球支付</p>
                    <div class="p2">
                        <p class="p3">支付宝</p>
                        <p class="p3">微信</p>
                    </div>
                </li>
            </ul>
            <div class="copyright center">
                <p>
                    Copyright© 2018 17369.com. All Rights Reserved 渝ICP备16006465号-9
                </p>
                <p>温馨提示：抵制不良游戏 拒绝盗版游戏 注意自我保护 谨防受骗上当 适度游戏益 沉迷游戏伤身 合理安排时间 享受健康生活
                </p>
            </div>
        </div>
    </div>

</template>
<script>
    export default {

    }

</script>
<style lang='scss' scoped>
    .footer_wrap {
        position: absolute;
        bottom: 0;
        border-top: 1px solid #CCCCCC;
        padding-top: 50px;
        padding-bottom: 20px;
        width: 100%;
    }
    .footerNav {
        overflow: hidden;
        .item {
            float: left;
            width: 25%;
            &.item2 {
              .navIsActive {
                  padding-bottom: 2px;
                  border-bottom: 1px solid #FF4C2E;
              }  
            }
            .p1 {
                margin-bottom: 5px;
                color: #343434;
                font-size: 14px;
            }

            .p2 {
                color: #666666;
                font-size: 12px;
                display: inline-block;
                
                a {
                    color: #666666;

                }

                .p3 {
                    display: block;
                    margin-top: 15px;
                }
            }
        }
    }

    .copyright {
        margin-top: 70px;
        color: #999;
        font-size: 12px;
    }

</style>
