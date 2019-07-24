<template>
    <div class="container">
        <p class="p1 bold">编辑信息</p>
        <div class="main">
            <div class="cf">
                <div class="fl d0">
                    <img class="userPic fl" width=95 height=95 :src=userInfo.avatar alt="">
                </div>
                <div class="fl d1" style="margin-top: 20px;">
                    <span class="pic_btn" @click="upload('avatar')">更换头像</span> <span
                        style="font-size:12px; color:#999;">（支持jpg/gif/png格式的图片，文件小于2M）</span>
                    <input type="file" ref="avatar" @change="uploadPic($event,'avatar')" class="hidden">
                    <p style="font-size:12px;color:#FF4C2E;margin-top:10px;">*陪玩更换头像需审核，审核通过即完成更换</p>
                </div>
            </div>
            <div class="cf">
                <div class="fl d0">昵称</div>
                <div class="fl d1">
                    <input type="text" v-model="userInfo.nickname" style="width: 260px;">
                </div>
            </div>
            <div class="cf">
                <div class="fl d0">性别</div>
                <div class="fl d1">
                    <img @click="userInfo.sex=1" v-show="userInfo.sex==2"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAMAAADX9CSSAAAAS1BMVEUAAADHxMTIxMTIw8PIxMTGw8PHw8OqqqrIw8PHxMTHw8PIxMT////9/f3c2dnPy8vk4uLU0dH29vbv7u7s6uro5ubg3t7z8/PX1NRAeZuNAAAAC3RSTlMAl/DW0ExEBrebnBS3hUIAAADESURBVCjPfZJLAoMgDEQBUWuZ8BHU3v+kFQhUF3YWKi84GSOCNUmtjNJyEleNg2kaxk5naa6SM+OXuetVC8uPuOjybSnenX4SIZan3KO1tCso0lqbnwFN44c1a0Qoi0lcs1hyMdVMQjcYgiOfS3mhharUE0CU3ylLJSregeMAtm7J+wk228MxVtU/oOTb4JlrIS9870aS8xM+5zVhZz7x9+4gbxOI/Yc+nw2nyPL28TfP4JNvad6P86+F5Ybf85//+3QevpnoEy2hYwIrAAAAAElFTkSuQmCC"
                        alt="">
                    <img @click="userInfo.sex=1" v-show="userInfo.sex==1"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAMAAADX9CSSAAAAbFBMVEUAAAAig/8igv8jgv8ig/8hgP8AgP8igv8igv8ig/8jg/8jg//////4+/+z1f/d7P9zsf9Snf85kP8riP+cx/+Uw/+Gu/99tv9srP9Xof9Clf/v9v/X6P/O5P+82f+kzP+Kvf9jp/8yjP/C3f/i2tE7AAAAC3RSTlMAl/DWTEQGm9DPt4JmlYIAAADbSURBVCjPfZLblsMgCEXVNrdyMGluk/Temf//x4mCrvRh5rwgGxcgYlSFbRy5xhZmr+OBkg7HTEtLe9lS8Yk+dZLA7nb/uARTxdyZrp7h4ynUSCW7FvxAK8W3Bkn1de+G1mONTiHZU4j7H0lkTa1sWM/9daKFv4PXGCf4xQAH1kXXGcEzcL8BIyXJ/YGxEL0ZF8VO8p9xC+aJl/LGWOFt7AdP5Vb6H654b8ZjVl7oe2fw1Hlwr8PO8xmxiRcSxT+oKJYY/ZS6qf6cvwSqD1yV//1v3ofakavzPvwCBqYUd4URtNMAAAAASUVORK5CYII="
                        alt="">
                    <img @click="userInfo.sex=2" v-show="userInfo.sex==1"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAMAAADX9CSSAAAAPFBMVEUAAADR0dHQ0NDR0dHQ0NDQ0NDPz8+qqqrQ0NDQ0NDR0dH////V1dX5+fn29vbz8/Pa2tro6Ojg4ODv7++tHpIGAAAACnRSTlMAmfDW0ExEBre40xbXRgAAAK5JREFUKM99UlkShSAMYxN90ELR+9/1KY2OjKP5AKYkpAsGiDa45IKN5o7JpxN+uqKzTXfYGeEljVj0QtmDor/dj9SYuREuDg/fw5wPMMHcmNgPNRch2VcIor5OO1NVcjqEY5NcIFs1Howb+TBwRvct8ypryTUByk9UznwI/ABCq1yZadNUw1Ct5FzU2CJ/lHz5Rq0XHo2KGnv054LULpg++vns/29+mdfHfN/+wx9cihEBgVjz1wAAAABJRU5ErkJggg=="
                        alt="">
                    <img @click="userInfo.sex=2" v-show="userInfo.sex==2"
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAMAAADX9CSSAAAAY1BMVEUAAAD/Sy7/Sy3/Sy3/Siz/Siz/Kyv/Syz/Sy3/Sy7/Sy7/TC7/////WT3/5uL/9fP/39r/0sv/dFz/Uzb/zsb/alH/Zkz/YUb/7uv/p5n/mIf/h3L/gGr/2NL/xr3/vrT/r6JgumwYAAAAC3RSTlMAl/DWTEQGm9DPt4JmlYIAAADOSURBVCjPfZLZEoMwCEWTtG6FLMZdu/3/V9YAOjqd9jxIBOQCRgmZrgyYSmfqyPUCG5fr7s01HNG5uG9w5sYByj5RUG062sl597YSSBokOThMjL2Irw3SocYQbVyfwGRcfUCfSjQjdtKTKpOJ+KDXFu/sr5QhVfRDMn7LN4rtE93SLQFrEDgfbMCEs2Alv+R4M9eudq5/eQpUp2kjYmBhTf3LJ5P32Ev/PK9ozE1oZV7Zz0Zs7bYfVXzv8+f+OVCcs/P//1fuQ2nAlPt9+ABJqxO3eiDFMQAAAABJRU5ErkJggg=="
                        alt="">
                </div>
            </div>
            <div class="cf">
                <div class="fl d0">
                    生日
                </div>
                <div class="fl d1">
                    <datepicker :value=userInfo.birthday format="yyyy-MM-dd" :language="cn" name="birthday">
                    </datepicker>
                </div>
            </div>
            <div class="cf">
                <div class="fl d0">职业</div>
                <div class="fl d1">
                    <select v-model="professional" style="width: 200px;">
                        <option v-for="(item,index) in professionalList" :value=item.id :key=index>
                            {{item.professional}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="cf">
                <div class="fl d0">位置</div>
                <div class="fl d1">
                    <select v-model="province" @change="positionChange('1')" style="width:110px;margin-right: 30px;">
                        <option v-for="(item,index) in provinceList" :value=item.name :key=index>
                            {{item.name}}
                        </option>
                    </select>
                    <select v-model="city" style="width:110px;" @change="positionChange">
                        <option v-for="(item,index) in cityList" :value=item.name :key=index>
                            {{item.name}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="cf">
                <div class="fl d0">兴趣</div>
                <div class="fl d1">
                    <textarea v-model="userInfo.interest"></textarea>
                </div>
            </div>
            <div class="cf">
                <div class="fl d0">
                    个人介绍
                </div>
                <div class="fl d1">
                    <textarea v-model="userInfo.introduce"></textarea>
                </div>
            </div>
            <div class="submit" style="margin-left: 150px;" @click="send">确认保存</div>
        </div>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex';
    import Datepicker from 'vuejs-datepicker';
    import {
        zh
    } from 'vuejs-datepicker/dist/locale'
    export default {
        data() {
            return {
                professional: '',
                province: '',
                city: '',
                professionalList: [],
                provinceList: [],
                cityList: [],
                userInfo: {},
                cn: zh,
                flag: false
            }
        },
        computed: {
            ...mapState([''])
        },
        components: {
            Datepicker
        },
        methods: {
            positionChange(status) {
                this.flag = true;
                if (status == 1) {
                    for (var i = 0, l = this.provinceList.length; i < l; i++) {
                        if (this.province == this.provinceList[i].name) {
                            //获取对应城市
                            this.getCityList(this.provinceList[i].linkageid);
                            break;
                        }
                    }
                }
            },
            upload(ref) {
                this.$refs[ref].click();
            },
            uploadPic(e, ref) {
                if (!e.target.value) return;
                var file = e.target.files[0];
                var fileData = file.type.split("/");
                if (fileData[0] !== 'image') {
                    util.toast("你应该上传一个image文件")
                    return;
                }
                //上传头像 接口无效
              /*   this.$http.post('/v1/user/edit',{
                    avatar: file
                }).then((data)=> {
                    var d = data.data;
                    if (d.code == 200) {
                        this.$toast.success(d.message);
                    } else {
                        this.$toast.error(d.message);
                    }
                }); */
                
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
                        this.userInfo[ref] = resultImg.src;
                        alert("图片上传还没写")
                    }
                    img.src = e.target.result;
                    // 然后上传到服务器
                }
                reader.readAsDataURL(file);
            },
            getProfessionalList() {
                this.$http.get('/v1/user/professionalList').then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.professionalList = d.data;
                        for (var i = 0, l = this.professionalList.length; i < l; i++) {
                            if (this.professionalList[i].professional == this.userInfo.professional) {
                                this.professional = this.professionalList[i].id;
                                break;
                            }
                        }
                    } else if (d.code == 401) {

                    } else {

                    }
                })
            },
            getUserInfo() {
                return new Promise((resolve, reject) => {
                    this.$http.get('/v1/User/userInfo').then((data) => {
                        var d = data.data;
                        if (d.code == 200) {
                            this.userInfo = d.data;
                            var a = this.userInfo.birthday;
                            a = a.split("-");
                            this.userInfo.birthday = new Date(parseInt(a[0]), parseInt(a[1]),
                                parseInt(a[2]));
                            this.city = this.userInfo.region[1];
                        } else if (d.code == 401) {

                        } else {

                        }
                        resolve()
                    })
                })
            },
            getProvinceList() {
                this.$http.get('/v1/user/provinceList').then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.provinceList = d.data;
                        this.province = this.userInfo.region[0];
                        for (var i = 0, l = this.provinceList.length; i < l; i++) {
                            if (this.provinceList[i].name == this.userInfo.region[0]) {
                                //获取对应城市
                                this.getCityList(this.provinceList[i].linkageid);
                                break;
                            }
                        }
                    } else if (d.code == 401) {

                    } else {

                    }
                })
            },
            getCityList(id) {
                this.$http.get('/v1/user/provinceList', {
                    params: {
                        parentid: id
                    }
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.cityList = d.data;
                        if (this.flag) {
                            this.city = this.cityList[0].name;
                        }
                    } else if (d.code == 401) {

                    } else {

                    }
                })
            },
            async init() {
                var re = await this.getUserInfo();
                this.getProfessionalList();
                this.getProvinceList()
            },
            send() {
                this.userInfo.birthday = document.querySelector("input[name=birthday]").value;
                var d = {
                    nickname: this.userInfo.nickname,
                    sex: this.userInfo.sex,
                    birthday: this.userInfo.birthday,
                    introduce: this.userInfo.introduce,
                    interest: this.userInfo.interest,
                    professional: this.professional,
                    province: this.province,
                    city: this.city,
                }
                console.log(this.userInfo.nickname)
                this.$http.post('/v1/User/saveUserInfo', d).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.$toast.success(d.message)
                    } else if (d.code == 401) {

                    } else {
                        this.$toast.error(d.message)
                    }
                })
            }
        },
        created() {
            console.log("编辑资料 created")
        },
        mounted() {
            console.log("编辑资料 mounted")
            this.init();
        },
        destroyed() {
            console.log("编辑资料 destroyed")
        },
        activated() {
            console.log("编辑资料 activated")
        }
    }

</script>
<style lang='scss' scoped>
    .p1 {
        padding: 25px 0 20px 20px;
        color: #FF4C2E;
        border-bottom: 1px solid #ebebeb;
        font-size: 16px;
    }

    .main {
        margin: 20px 240px;

        >div {
            margin: 20px 0;
        }

        textarea {
            resize: none;
            border: 1px solid #cccccc;
            border-radius: 4px;
            width: 380px;
            height: 100px;
            padding: 10px;
        }

        .userPic {
            border-radius: 100%;
        }

        .pic_btn {
            display: inline-block;
            width: 100px;
            height: 30px;
            border: 1px solid #FF4C2E;
            border-radius: 10px;
            font-size: 14px;
            text-align: center;
            line-height: 30px;
            color: #FF4C2E;
            cursor: pointer;
        }

        .d1 {
            margin-left: 30px;

            input,
            select {
                border: 1px solid #ccc;
                border-radius: 4px;
                height: 40px;
                box-sizing: border-box;
                padding-left: 10px;

            }
        }

        .d0 {
            font-size: 14px;
            color: #666;
            text-align: center;
            width: 95px;
            line-height: 40px;
        }
    }

</style>
