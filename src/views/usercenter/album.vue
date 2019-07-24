<template>
    <div class="box">
        <p class="p1 bold" style="color:#FF4C2E">我的相册 <span style="color:#999;font-size:12px;">（*最多上传8张图片，如需修改，可删除后重新上传）</span></p>
        <div class="wrapper">
            <div class="no_pic" v-show="photolist.length==0">
                <img class="img1" src="/static/imgs/icon.png" alt="">
                <p>你还没有上传图片哦，赶紧去上传吧！</p>
            </div>
            <ul class="flex" v-show="photolist.length > 0">
                <li class="pic" v-for="(i, index) in photolist" :key=index @mouseover="cur=index" @mouseout="cur=null">
                    <img :src=i.pic alt="">
                    <img v-show="cur==index" @click="deletePic(i.id, index)" class="delete point" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUBAMAAAB/pwA+AAAAG1BMVEUAAADv7+85OTnw8PAuLi6RkZEKCgqTk5P///8Vl4lWAAAACHRSTlNN4VzkWIFPgpypZpEAAABQSURBVAjXY8ABUh1AJEsYkIgQAjEVW4GEY6MCAwOThAgDiBQCCoL4YArMhQiDBcHCzRZAQYiwRbMCBhOhAKENYRjCClSLKxDOSYc4sgyHHwCooA+rV/YHZwAAAABJRU5ErkJggg=="
                        alt="">
                    <div class="check" v-show="i.status == 0">
                        <div class="d1"></div>
                        <div class="d2">
                            审核中...
                        </div>
                    </div>
                </li>
            </ul>
            <input type="file" ref="file" @change="uploadPic" class="hidden">
            <div class="submit" v-if="photolist.length < 8" @click="upload">上传照片</div>
        </div>
    </div>
</template>
<script>
    import utils from '../../utils.js'
    export default {
        data() {
            return {
                page: 1,
                photolist: [],
                cur: null,
                total_page: 1,
                pagesize: 8 //相册最多八张，不用做分页
            }
        },
        methods: {
            deletePic: function (id, index) {
                this.$http.delete('/v1/user/deletePrivatePhotos', { //delete传参不能用params,不然后台接受不到参数
                    data: {
                        id: id
                    }
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.photolist.splice(index, 1);
                        this.$toast.success("删除成功!");
                    } else if (d.code == 401) {

                    } else {
                        this.$toast.error("删除失败!");
                    }
                })
            },
            pagechange: function (currentPage) {
                this.page = currentPage;
                this.getPhotoList();
            },
            getPhotoList() {

                this.$http.get('/v1/user/myPhotosLists', {
                    params: {
                        page: this.page,
                        pagesize: this.pagesize
                    }
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.photolist = d.data;
                    } else if (d.code == 401) {

                    } else {

                    }
                })
            },
            upload() {
                this.$refs.file.click()
            },
            uploadPic() {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                var formData = new FormData();
                var files = this.$refs.file.files[0];
                formData.append('files', files);
                this.$http.post('/v1/user/upMyPhotos', formData, config).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.$toast.success("上传成功!");
                        this.photolist.push(...d.data)
                    } else if (d.code == 401) {

                    } else {
                        this.$toast.error(d.message);
                    }
                })
            }
        },
        mounted() {
            console.log("相册")
            this.getPhotoList();
        }
    }

</script>
<style lang='scss' scoped>
    .p1 {
        padding: 20px;
        border-bottom: 1px solid #ebebeb
    }
    .box {
        border-radius: 20px;
        background: #fff;
    }
    .wrapper {
        padding: 0px 50px 40px;
        text-align: center;
        .no_pic {
            .img1 {
                margin-top:150px;
                width: 50px;
            }
            p {
                color:#999898;
                font-size: 14px;
                margin-bottom: 160px;
            }
        }
        .flex {
            justify-content: flex-start;
        }

        .submit {
            width: 120px;
            height: 50px;
            margin-top: 50px;
        }

        .check {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 22px;

            .d1 {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 22px;
                background: #000;
                opacity: 0.3;
            }

            .d2 {
                position: relative;
                text-align: center;
                color: #fff;
                font-size: 14px;
            }
        }

        .pic {
            position: relative;
            margin-top: 30px;
            margin-right: 30px;

            &:nth-child(5n+5) {
                margin-right: 0;
            }

            img {
                width: 150px;
                height: 150px;
            }

            .delete {
                width: 20px;
                height: 20px;
                position: absolute;
                top: 0;
                right: 0;
            }
        }
    }

</style>
