<template>
    <div class="wrap">
        <div v-if="!rz">
            <p class="p1 bold">领取工资 <span style="color:#FF4C2E">> 实名认证</span></p>
            <div class="main center">
                <div class="cf">
                    <div class="fl">
                        <div class="pic" @click="upload('front_view')">
                            <input type="file" ref="front_view" @change="uploadPic($event,'front_view')" class="hidden">
                            <img v-show="!front_view" class="img center_box" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbBAMAAAB/+ulmAAAAD1BMVEUAAADMzMzMzMzMzMzMzMywq4YJAAAABHRSTlMA7vF/3fInYQAAADFJREFUGNNjgAAjAwZkICKAwlVRGFxcQ0EQcHEEUwYMKi5IQAFNdrC4GcbFHc6IWAAAPlsM8dIyoN4AAAAASUVORK5CYII="
                                alt="">
                            <img v-show="front_view" class="pic1" :src=front_view alt="正面照">
                        </div>
                        <p class="p2">上传身份证正面照</p>
                    </div>
                    <div class="fr">
                        <div class="pic" @click="upload('back_view')">
                            <input type="file" ref="back_view" @change="uploadPic($event,'back_view')" class="hidden">
                            <img v-show="!back_view" class="img center_box" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbBAMAAAB/+ulmAAAAD1BMVEUAAADMzMzMzMzMzMzMzMywq4YJAAAABHRSTlMA7vF/3fInYQAAADFJREFUGNNjgAAjAwZkICKAwlVRGFxcQ0EQcHEEUwYMKi5IQAFNdrC4GcbFHc6IWAAAPlsM8dIyoN4AAAAASUVORK5CYII="
                                alt="">
                            <img v-show="back_view" class="pic2" :src=back_view alt="反面照">
                        </div>
                        <p class="p2">上传身份证反面照</p>
                    </div>
                </div>

                <div class="form">
                    <div class="item">
                        <span class="s1">姓名</span>
                        <input type="text" v-model='real_name'>
                    </div>
                    <div class="item">
                        <span class="s1">身份证号</span>
                        <input type="text" v-model="cer_no">
                    </div>
                    <div class="item">
                        <span class="s1">支付宝</span>
                        <input type="text" v-model="alipay">
                    </div>
                    <div class="item">
                        <span class="s1">手机号码</span>
                        <input type="text" v-model="mobile">
                    </div>
                    <div class="item item4">
                        <span class="s1">验证码</span>
                        <input class="yzm" type="text" v-model="yzm">
                        <span class="sendyzm" v-if="!counting" @click="sendyzm">获取验证码</span>
                        <span class="sendyzm" v-else>
                            重新发送({{time}})
                        </span>
                    </div>
                    <div class="submit" @click="realname">确认提交</div>
                </div>
            </div>
        </div>
        <div v-if="rz">
            <p class="p1 bold" style="color:#FF4C2E">领取工资</p>
            <div class="main center">
                <img width=50 style="margin-top:30px;" src="/static/imgs/icon.png" alt="">
                <p class="p3" v-show="rzAjax">
                    实名认证正在审核中
                </p>
                <div v-show="!rzAjax">
                    <p class="p3">
                        请前往APP领取工资哦~
                    </p>
                    <div class="code">
                        <div class="fl">
                            <img src="/static/imgs/timg.jpg" alt="">
                            <p>ios下载</p>
                        </div>
                        <div class="fr">
                            <img src="/static/imgs/timg.jpg" alt="">
                            <p>Android下载</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapState,
        mapMutations,

    } from 'vuex';
    import utils from '../../utils.js'
    export default {
        data() {
            return {
                counting: false,
                time: 0,
                rz: false,
                rzAjax: false,

                /*    real_name: '',
                yzm: '',
                cer_no: '',
                mobile: '',
                alipay: '',
                front_view: '', //身份证正面图片链接
                back_view: '' ,//反面链接 */

                real_name: '李晓',
                yzm: '123456',
                cer_no: '132132123213123x',
                mobile: '18672795231',
                alipay: 'lixiaocosa@163.com',
                front_view: 'https://pwgyy.gz.bcebos.com/498a3ae559ec455398a8fb9972028a32jpg', //身份证正面图片链接
                back_view: 'https://pwgyy.gz.bcebos.com/498a3ae559ec455398a8fb9972028a32jpg' //反面链接
            }
        },
        computed: {
            ...mapState(['userInfo'])
        },
        methods: {
            ...mapMutations(['SHOWLOGIN']),
            realname() {
                var mobile = this.mobile.trim();
                var yzm = this.yzm.trim();
                var real_name = this.real_name.trim();
                var cer_no = this.cer_no.trim();
                var alipay = this.alipay.trim();
                // 验证图片
                /* if(!this.front_view) {
                    this.$toast.error("请上传身份证正面照!");
                    return
                }
                if(!this.back_view) {
                    this.$toast.error("请上传身份证反面照!");
                    return
                }
                if(!this.real_name) {
                    this.$toast.error('请填写姓名!')
                    return
                }
                if(!this.cer_no) {
                    this.$toast.error("请填写身份证号码!");
                    return
                }
                if(!this.alipay){
                    this.$toast.error("请填写支付宝账号!");
                    return
                }
                if(!this.mobile){
                    this.$toast.error("请填写手机号!");
                    return
                }
                if(!this.yzm){
                    this.$toast.error("请填写验证码!");
                    return
                } */
                var d = {
                    front_view: this.front_view,
                    back_view: this.back_view,
                    real_name: real_name,
                    cer_no: cer_no,
                    alipay: alipay,
                    mobile: mobile,
                    yzm: yzm
                }
                this.$http.post('/v1/user/identityAuth', d).then((data) => {
                    var d = data.data;
                    if (d.code == 200) { //认证需要时间，所以需要一个中间状态
                        this.$toast.success("提交成功!");
                        this.rzAjax = true;
                    } else if (d.code == 401) {

                    } else {
                        this.$toast.error(d.message)
                    }
                })
            },
            sendyzm() {
                var mobile = this.mobile.trim();
                if (!mobile) {
                    this.$toast.error("请填写手机号!");
                    return
                }
                if (mobile.length != 11) {
                    this.$toast.error("手机号为11位数字!");
                    return
                }
                if (this.counting) {
                    return
                }
           
                this.time = 60;
                this.counting = true;
                var that = this;
                var timer = setInterval(() => {
                    if (that.time-- <= 0) {
                        that.counting = false;
                        that.time = 60;
                        clearInterval(timer)
                    }
                }, 1000);
                var d = {
                    mobile: mobile,
                    op: 'auth' //写死的
                }
                this.$http.post('/v1/user/sendCode', d).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.$toast.success('发送成功!');
                    } else if (d.code == 401) { //重新登录
                        this.time = 0;
                        this.counting = false;
                    } else {
                        this.time = 0;
                        this.counting = false;
                        this.$toast.error(d.message)
                    }
                }).catch((error) => {
                    this.counting = false;
                    this.time = 0;
                    this.$toast.error(error)
                })
            },
            uploadPic(e, ref) {
                if (!e.target.value) return;
                var file = e.target.files[0];
                var fileData = file.type.split("/");
                if (fileData[0] !== 'image') {
                    util.toast("你应该上传一个image文件")
                    return;
                }
                var reader = new FileReader(file);
                reader.onload = (e) => {
                    var img = new Image();
                    img.onerror = () => {
                        util.toast('图片上传出现错误');
                    }
                    img.onload = () => {
                        var cvs = document.createElement('canvas');
                        var width = img.naturalWidth;
                        var height = img.naturalHeight;
                        cvs.width = width;
                        cvs.height = height;
                        var ctx = cvs.getContext("2d");
                        ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, width,
                            height);
                        var quality = width >= 2000 ? 0.6 : width > 600 ? 0.6 : 1;
                        var fileType = file.type.split("/")[1] === 'jpeg' ? 'jpeg' : 'png';
                        var newImageData = cvs.toDataURL('image/' + fileType, quality);
                        var resultImg = new Image();
                        resultImg.src = newImageData;
                        this[ref] = resultImg.src;
                        alert("图片上传还没写")
                    }
                    img.src = e.target.result;
                    // 然后上传到服务器
                }
                reader.readAsDataURL(file);
            },
            upload(ref) {
                this.$refs[ref].click();
            },

            beforeDoCash() {
                this.$http.get('/v1/payment/beforeDoCash').then((data) => {
                    var d = data.data;
                    if (d.code == 200) { //已经认证
                        this.rz = true;
                        this.rz = false;
                    } else if (d.code == 1051) { //未认证
                        this.rz = false;
                    }
                    /* else if(d.code == ){
                                           this.rz = false;
                                           this.rzAjax = true;
                                       } */
                })
            },

        },
        mounted() {
            console.log("领取工资")
            //验证有没有认证
            if (this.userInfo.isauth != 1) { //认证过了就不用认证了 1 认证 2等待认证 0 未认证
                this.beforeDoCash();
            } else {
                this.rz = true;
                this.rzAjax = false;
            }
            this.beforeDoCash()
        },
    }

</script>
<style lang='scss' scoped>
    .p1 {
        padding: 20px;
        border-bottom: 1px solid #ebebeb
    }

    .wrap {
        border-radius: 20px;
        background: #fff;
    }

    .main {
        overflow: hidden;
        margin-top: 30px;
        padding: 0 210px;

        .code {
            margin-top: 30px;
            width: 306px;
            display: inline-block;

            p {
                color: #FF4C2E;
                font-size: 14px;
                margin-top: 10px;
            }

            img {
                width: 130px;
            }
        }

        .form {
            margin-top: 30px;
            clear: both;



            .item {
                margin-top: 20px;
                display: inline-block;

                .s1 {
                    display: inline-block;
                    width: 80px;
                    text-align: right;
                    color: #666;
                    font-size: 14px;
                }

                input {
                    margin-left: 15px;
                    width: 260px;
                    height: 40px;
                    border: 1px solid rgba(204, 204, 204, 1);
                    border-radius: 4px;
                    box-sizing: border-box;
                    padding: 0 20px;

                    &.yzm {
                        width: 148px;
                        height: 40px;
                    }
                }

                .sendyzm {
                    color: #FF4C2E;
                    cursor: pointer;
                    font-size: 18px;
                    margin-left: 10px;
                }
            }
        }

        .p2 {
            margin-top: 10px;
            color: #666;
            font-size: 14px;
        }

        .p3 {
            color: #999;
            font-size: 14px;
            margin-top: 5px;
        }

        .pic {
            position: relative;
            overflow: hidden;
            border: 1px solid #EBEBEB;
            width: 200px;
            height: 140px;
            border-radius: 20px;
            cursor: pointer;

            .pic1,
            .pic2 {
                width: 200px;
                height: 140px;
            }

            .img {
                width: 27px;
                height: 27px;
            }
        }
    }

</style>
