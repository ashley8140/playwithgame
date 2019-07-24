<template>
    <div class="container" style="margin-bottom: 70px;">
        <p class="p bold">首页 <span>> 申请入驻</span><span style="color:#FF4C2E">> {{title}}</span></p>
        <div class="wrapper">
            <p class="p p1">
                *更新个人头像
            </p>
            <div class="avatar_box cf">
                <div class="d d1">
                    <img src="/static/imgs/sl@2x.png" alt="">
                    <p class="t1">头像示例</p>
                    <p style="font-size: 12px;color: #999;margin-top:5px;">必须是本人正面清晰照</p>
                </div>
                <div class="d d2">
                    <div class="pic" @click="upload('avatar')">
                        <input type="file" ref="avatar" @change="uploadPic($event,'avatar')" class="hidden">
                        <img v-show="!avatar" class="img center_box" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbBAMAAAB/+ulmAAAAD1BMVEUAAADMzMzMzMzMzMzMzMywq4YJAAAABHRSTlMA7vF/3fInYQAAADFJREFUGNNjgAAjAwZkICKAwlVRGFxcQ0EQcHEEUwYMKi5IQAFNdrC4GcbFHc6IWAAAPlsM8dIyoN4AAAAASUVORK5CYII="
                            alt="">
                        <img v-show="avatar" class="avatar" :src=avatar alt="头像">
                    </div>
                    <p class="t1">上传照片</p>
                </div>
            </div>
            <p class="p p1">
                *语音介绍 <span style="font-size: 12px;color:#999;">（限制20s）</span>
            </p>

            <div class="voice_box">
                <div class="voice" @click="upload('voice')">
                    上传文件
                    <img class="yy" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAkCAMAAABCOMFYAAAAqFBMVEUAAADNzc3R0dHMzMzMzMzNzc3MzMzMzMzNzc3Nzc3MzMzMzMzOzs7Nzc3IyMi4uLjLy8vNzc3Nzc3KysrV1dXMzMzS0tLMzMzR0dHS0tLMzMzMzMzS0tLS0tLMzMzMzMzR0dHMzMzMzMzPz8/R0dHS0tLLy8vR0dHR0dHLy8vLy8vR0dHOzs7KysrR0dHR0dHR0dHR0dHR0dHR0dHR0dHLy8vR0dHMzMyZkjIKAAAANnRSTlMADpb9fFLDiD0eumhgEgkDxo9CMQb68vHhzLGWj3he9OXb1sW9s55zbmxONxoY+fbwoZpZOCyW9UZwAAABD0lEQVQ4y83R13KDMBCF4WPTMd004wS3uMZOj/b93ywIzIA0ym0m/x3zMWhZYSg47XJWvn9B1XPJuj5SBb6yvn0oY7BmQ4+yHtmot0DSBRtnSPoiqPTpgAk9iDoRdfrf1bko1ftu1aW5QufktmqSrVCbzF4Vu+q1IgPI5T0bVLUakw48CZoAOsWtGhQ1E46xDIGIjO5fV83Q4fiCP/nIqwnalnx4Zy3cn0tLdN0KOgPX+9H5CcCZihvu1aTxQ5LpbrE/+nwUjephmRZpeoi+UNfIwqjmeVv74PnetnkXQsmGKDMP8cHMiDYJpFIv0oinRV4KRb49y2Lbx285NAP+Wi+W1WzcsnTlyBV1FVf0/QA03FKajwrQgQAAAABJRU5ErkJggg=="
                        alt="">
                </div>
                <audio :src=voice></audio>
                <input type="file" @change="uploadPic($event,'voice')" ref="voice" class="hidden">
                <span class="s1">（上传的录音可供游客试听，请上传正确的MP3文件）</span>
            </div>
            <p class="p p1">
                *自我介绍
            </p>
            <div class="intro_box">
                <div>
                    <span class="s1"> QQ </span>
                    <input type="text" class="qq" v-model=qq>
                </div>
                <div style="margin-top: 30px;">
                    <span class="s1">自我介绍</span>
                    <textarea class="introduce" v-model=introduce placeholder="自我介绍20字以上">

                    </textarea>
                </div>
            </div>
            <p class="p p1">
                *技能水平
            </p>
            <div class="path_box cf">
                <div class="d" v-for="(i, index) in list" :key=index>
                    <span>{{i.title}}</span>
                    <select @change="tagChange($event, i.key)" :ref=i.key>
                        <option v-if v-for="(item, n) in i.lists" :key=n :value=item.id>
                            {{item.value}}
                        </option>
                    </select>
                </div>
            </div>
            <p class="p p1">
                *服务类型
            </p>
            <div class="type_box flex">
                <div class="item" @click="fl=i.id" :class="{'active': i.id==fl}" v-for="(i, index) in fenlei.lists"
                    :key=index>
                    <div class="title">
                        <span>
                            {{i.value}}
                        </span>
                        <div class="tangle">

                        </div>
                    </div>
                    <div class="bz">
                        {{i.beizhu}}
                    </div>
                </div>
            </div>
            <p class="p p1">
                *技术水平证明截图
            </p>
            <div class="pic_box">
                <div class="cf center">
                    <div class="fl">
                        <div>
                            <img class="pic" src="/static/imgs/jt@2x.png" alt="截图示例">
                        </div>
                        <p class="p2">截图示例</p>
                        <p class="p3">
                            请参照示例正确上传截图
                        </p>
                        <p class="p3">
                            否则7天内将无法再次申请
                        </p>
                    </div>
                    <div class="fl" style="margin-left: 100px;">
                        <div class="pic" @click="upload('pic')">
                            <input type="file" ref="pic" @change="uploadPic($event,'pic')" class="hidden">
                            <img v-show="!pic" class="img center_box" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAbBAMAAAB/+ulmAAAAD1BMVEUAAADMzMzMzMzMzMzMzMywq4YJAAAABHRSTlMA7vF/3fInYQAAADFJREFUGNNjgAAjAwZkICKAwlVRGFxcQ0EQcHEEUwYMKi5IQAFNdrC4GcbFHc6IWAAAPlsM8dIyoN4AAAAASUVORK5CYII="
                                alt="">
                            <img v-show="pic" class="pic" :src=pic alt="截图">
                        </div>
                        <p class="p2">上传截图</p>
                    </div>
                </div>
            </div>
            <div class="center">
                <div class="submit" @click="addApply">
                    提交入驻申请
                </div>
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
                qq: '',
                avatar: '',
                introduce: '',
                voice: '',
                voice_length: '',
                pic: '',

                key: '',
                title: '',
                service_id: '',
                list: {},
                fenlei: {

                },
                fl: '',
                tag: {},
            }
        },
        computed: {
            ...mapState(['showLoginBox'])
        },
        methods: {
            upload(ref) {
                this.$refs[ref].click();
            },
            uploadPic(e, ref) {
                console.log(e.target)
                if (!e.target.value) return;
                var file = e.target.files[0];
                var fileData = file.type.split("/");
                console.log(ref)
                if (ref == 'voice') {
                    //上传MP3
                    alert("上传MP3还没写")
                    return
                } else if (fileData[0] !== 'image') {
                    util.toast("请上传image文件")
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
            tagChange(e, key) {
                this.tag[key] = e.target.value;
            },
            addApply() { //填好提交
                if (!this.avatar) {
                    this.$toast.error("请上传头像！");
                    return
                }
                if (!this.voice) {
                    this.$toast.error("请上传语音！");
                    return
                }
                if (!this.qq) {
                    this.$toast.error("请填写qq！");
                    return
                }
                if (!this.introduce) {
                    this.$toast.error("请填写自我介绍！");
                    return
                }
                if (!this.qq) {
                    this.$toast.error("请填写qq！");
                    return
                }
                for (var i = 0, l = this.list.length; i < l - 1; i++) { //排除fl
                    if (!this.tag[this.list[i].key]) {
                        this.$toast.error('请选择' + this.list[i].title);
                        return
                    }
                }
                if (!this.fl) {
                    this.$toast.error("请选择分类！");
                    return
                }
                if (!this.pic) {
                    this.$toast.error("请上传截图！");
                    return
                }
                var d = {}
                var path = '';
                for (var i in this.tag) {
                    if (this.tag[i]) {
                        path += i + ":" + this.tag[i] + '|'
                    }
                }
                if (this.fl) {
                    path += 'fl:' + this.fl;
                }

                //isupdate 1 表示是修改 
                if (this.service_id != 'null') {
                    d.isupdate = 1
                    d.service_id = this.service_id
                }
                d.game = this.key
                d.qq = this.qq
                d.avatar = this.avatar
                d.introduce = this.introduce
                d.voice = this.voice
                d.voice_length = this.voice_length
                d.path = path //不用this
                d.pic = this.pic

                this.$http.post('/v1/Gamer/addApply', d).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.$toast.success(d.message);
                    } else if (d.code == 401) {

                    } else {
                        this.$toast.error(d.message)
                    }
                })
            },
            applyGame() { //获取服务详情 key 入驻
                this.$http.get('/v1/Gamer/applyGame', {
                    params: {
                        game: this.key
                    }
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.list = d.data.lists;
                        //把分类单独拎出来
                        var l = this.list.length;
                        this.fenlei = this.list.splice(l - 1, 1)[0];
                        this.title = d.data.title;
                        for (var i = 0, l = l - 1; i < l; i++) {
                            var key = this.list[i].key
                            this.$set(this.tag, key, '');

                        }

                    } else if (d.code == 401) {

                    } else {
                        this.$toast.error(d.message)
                    }
                })
            },
            editApply() { //获取已经填写的信息 service_id 修改
                this.$http.get('/v1/Gamer/editApply', {
                    params: {
                        game: this.key,
                        service_id: this.service_id
                    }
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.list = d.data.lists;
                        //把分类单独拎出来
                        var l = this.list.length;
                        this.fenlei = this.list.splice(l - 1, 1)[0];
                        this.fl = this.fenlei.select.id;
                        this.title = d.data.title;
                        for (var i = 0, l = l - 1; i < l; i++) {
                            var key = this.list[i].key
                            this.$set(this.tag, this.list[i].key, this.list[i].select.id);
                            this.$nextTick(() => {
                                this.$refs[key].value = this.list[i].select.id;
                            })
                        }

                    } else if (d.code == 401) {

                    } else {
                        this.$toast.error(d.message);
                        this.$router.push({
                            name: 'service'
                        })
                    }
                })
            }

        },
        mounted() {
            this.key = this.$route.params.key;
            this.service_id = this.$route.params.service_id;
            if (this.service_id == 'null') {
                this.applyGame(); //入驻的话执行这个
            } else {
                this.editApply() // 是从服务管理的修改过来的
            }
        },

    }

</script>
<style lang='scss' scoped>
    .wrapper {
        background: #fff;
        font-size: 14px;
        color: #666;

        .p1 {
            font-size: 14px;
            color: #FF4C2E;
        }

        .avatar_box {
            margin: 40px 0px 90px 109px;

            .d {
                float: left;
                text-align: center;

                .t1 {
                    margin-top: 15px;
                    font-size: 14px;
                    color: #323232;
                }
            }

            .d2 {
                margin-left: 100px;
            }

        }

        .pic {
            position: relative;
            overflow: hidden;
            border: 1px solid #EBEBEB;
            width: 117px;
            height: 117px;
            cursor: pointer;

            .avatar {
                width: 117px;
                height: 117px;
            }

            .img {
                width: 27px;
                height: 27px;
            }
        }

        .voice_box {
            padding: 20px 0 20px 109px;

            .s1 {
                position: relative;
                color: #999;
                font-size: 12px;
            }

            .voice {
                cursor: pointer;
                display: inline-block;
                width: 260px;
                height: 60px;
                border: 1px solid rgba(204, 204, 204, 1);
                border-radius: 10px;
                font-size: 14px;
                color: #666666;
                text-align: center;
                line-height: 60px;
                position: relative;

                .yy {
                    position: absolute;
                    left: 20px;
                    top: 10px;

                }
            }

        }

        .intro_box {
            padding: 20px 0px 20px 80px;

            .s1 {
                display: inline-block;
                width: 80px;
                text-align: right;
            }

            .qq {
                width: 260px;
                height: 40px;
                border: 1px solid rgba(204, 204, 204, 1);
                border-radius: 4px;
                text-align: center;
                margin-left: 20px;
            }

            .introduce {
                margin-left: 20px;
                width: 300px;
                height: 140px;
                padding: 10px;
                box-sizing: border-box;
                resize: none;

                border: 1px solid rgba(204, 204, 204, 1);
                border-radius: 4px;

            }
        }

        .path_box {
            padding: 20px 0px 20px 109px;

            select {
                width: 200px;
                height: 40px;
                border: 1px solid rgba(204, 204, 204, 1);
                border-radius: 4px;
                margin-left: 10px;
                text-align: center;
                text-align-last: center;
                color: #666;
            }

            .d {
                float: left;
                margin-top: 30px;

                span {
                    display: inline-block;
                    width: 80px;
                    text-align: right;
                }

                &:nth-child(2n+2) {
                    margin-left: 95px;
                }

                &:nth-child(2n+3) {
                    clear: both;
                }
            }
        }

        .type_box {
            padding: 20px 0px 20px 109px;

            &.flex {
                justify-content: flex-start;
            }

            .title {
                padding: 30px;
                text-align: center;
                border-bottom: 1px solid rgba(204, 204, 204, 1);
                position: relative;

                .tangle {
                    position: absolute;
                    width: 28px;
                    height: 22px;
                    right: 0;
                    bottom: 0;
                    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAMAAADkSAzAAAAAb1BMVEUAAADMzMy2trbMzMzMzMzMzMzLy8vMzMzLy8vMzMzLy8vMzMzMzMzLy8vKysrLy8vKysrMzMzCwsLGxsbLy8vMzMzMzMz////7+/vY2Nj39/fQ0NDt7e3k5OTg4ODe3t7a2trT09Px8fHo6OjU1NQ252i+AAAAFnRSTlMA+gXz6tfLva2cindlU0M1KB4VDeLhpidG1gAAAIRJREFUKM910EkOwjAQBVESxjCFsdp2gDDd/4wgS3SEpV/bt6uRrm607WdI206QuKpQeFyAwt0UiZsxCuslKDzMkdiekbiuUFg3/FUM866pg2KYmwVHH8Y7281CBIph0S6DUQzr0ld7szsAxTAeyZ4/w4e5BrMexzxsKIYXju0JVR6m+gC+8BsKoBh00AAAAABJRU5ErkJggg==) no-repeat center center;
                    background-size: cover;
                }
            }

            .item {
                margin-right: 100px;
                margin-top: 30px;
                width: 180px;
                border: 1px solid rgba(204, 204, 204, 1);
                border-radius: 20px;
                box-sizing: border-box;
                cursor: pointer;

                &.active {
                    border-color: #FF4C2E;

                    .title {
                        border-color: #FF4C2E;

                        .tangle {
                            background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAWCAMAAADkSAzAAAAAilBMVEUAAAD/TS//Sy3/TC3/Sy7/TC3/TC3/Sy3/Sy7/TCz/Sy3/Si3/Siv/SC7/SCz/RCv/SST/QiX/RCL/TC7/TC3/Sy7/TCz/TCv/SCv/TC7/////+/v/9/b/ZEr/5N//opL/i3f/gmz/eGH/c1z/WDz/8O3/6+f/zsb/w7n/vLH/r6H/mYj/koD/Wj51OsURAAAAGXRSTlMA/vjz6uLXy62Kd2VTQygeFQ0HvbycmzY1cTeXcwAAAI5JREFUKM910MkOgkAURFEnnAfE8T4aRMBZ///3NCR2tJOqRW3O7rb0kq22xQBpsx4Sx20ULoegcN5H4rSLxBEojNdI3EdInHRQmGz4WxDM75DXEATzZu4FQTCy5h/mKiAIVtn1o09zJUAQrM7t1i7S9AhAEIzsbJev4YN5PZkVeIxX/K50dzzuItSaYGpvwEMepqcI9U4AAAAASUVORK5CYII=');
                        }
                    }

                }

                .bz {
                    color: #999;
                    font-size: 12px;
                    padding: 13px;
                }
            }
        }

        .pic_box {
            padding: 44px 0 44px 99px;

            .pic {
                position: relative;
                overflow: hidden;
                border: 1px solid #EBEBEB;
                width: 280px;
                height: 180px;
                border-radius: 20px;
                cursor: pointer;

                .pic {
                    width: 280px;
                    height: 180px;
                }

                .img {
                    width: 27px;
                    height: 27px;
                }

            }

            .p2 {
                margin-top: 15px;
            }

            .p3 {
                font-size: 12px;
                color: #999;
            }
        }
    }

</style>
