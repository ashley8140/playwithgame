<template>
    <div class="container">
        <p class="p1">首页 > <span style="color:#FF4C2E">{{title}}</span></p>
        <ul class="search">
            <p class="restart point" @click="restart">重置</p>
            <li class="first">
                <span class="title fl">游戏类型:</span>
                <ul class="list fl point" :class="{'moregame': moregame}">
                    <li v-for="(item, index) in gamelist" :key=index @click="changeGame(item.title, item.key)"
                        @mouseover="show=index" @mouseleave="show=null">
                        <img class="logo" v-show="item.key == key || show == index" :src=item.web_logo2>
                        <img class="logo" v-show="item.key != key && show !=index" :src=item.web_logo3>
                        <p class="game_name" :class="{'active': item.key == key || show == index}">{{item.title}}
                        </p>
                    </li>
                </ul>
                <div class="more point" @click="more('moregame')" :class="{'up': moregame}">
                </div>
            </li>
            <li v-for="(item, index) in taglist" :key=index class="tags">
                <span class="title fl">{{item.title}}:</span>
                <ul class="list fl" :ref="item.key">
                    <!-- 控制more -->
                    <li @click="changeTag(item.key)" :class="{'active': !tag[item.key]}">不限</li>
                    <li v-for="(i, n) in item.lists" :key=n @click="changeTag(item.key, i.id)"
                        :class="{'active': tag[item.key] == i.id}">
                        {{i.value}}
                    </li>
                </ul>
                <div class="more point" :ref="item.key+'more'" @click="more(item.key, item.key+'more')">
                </div>
            </li>
            <li class="tags">
                <span class="title fl">性别: </span>
                <ul class="list fl">
                    <li :class="{'active': !sex}" @click="changeTag('sex')">不限</li>
                    <li @click="changeTag('sex', 1)" :class="{'active':sex==1}">男</li>
                    <li @click="changeTag('sex', 2)" :class="{'active':sex==2}">女</li>
                </ul>
            </li>
        </ul>
        <section class="choose">
            <div class="multiple item point" :class="{'active': orderby == 0}" @click="changeOrderby('mutiple')">
                综合排序
            </div>
            <div class="number item point" :class="{'active': orderby == 1 || orderby == 2}"
                @click="changeOrderby('number')">
                接单数
                <div class="btn">
                    <img v-show='orderby !=1'
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAMAAAA7+k+nAAAAOVBMVEUAAADS0tLU1NTU1NTS0tLOzs7V1dXV1dXV1dXT09PV1dXR0dGqqqrU1NTV1dXU1NTV1dXS0tLV1dUtUgytAAAAEnRSTlMAEeOwLgrxyYlpTRwD9dKUckQWNXfoAAAAXElEQVQY03XORxLAIAxDUWJ6SdP9D5syTLAJvKW0+YqJhxpKQBrtxgGr+e+ZcKPc79bjtVm5F41KF3EEfHYRCia2/YSQWKjgavRC6FBuoZJ/ojUYFh0wFNQyoWYurGULwl0VdqIAAAAASUVORK5CYII="
                        alt="">
                    <img v-show='orderby==1'
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAMAAAA7+k+nAAAAP1BMVEUAAAD/0yz/3i3/zhn/3i3/3i3/3i3/3yz/3Sz/3i3/3S3/2yv/qgD/3y7/3i7/3i3/3i3/3S3/3S7/2y7/3y6I9NG9AAAAFHRSTlMAEa8K8ePJiGlNLRsD9eDSk3JDMp7Zsq4AAABcSURBVBjTdc5HEsAgEANBTE7O+v9bHcvsYujj6CJB+FU0BSC0etTAuP97MjiZVHdlcZsV71niJTMbHD4LOwrCl76BCeQoo+PThwkVk8pRzl6nJQhy2qHJiaFD9ByEEQ0Gu2HBNAAAAABJRU5ErkJggg=="
                        alt="">
                    <img v-show='orderby!=2'
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAOCAMAAAACJixMAAAAQlBMVEUAAADU1NTR0dHV1dXU1NTV1dXV1dXV1dXV1dXT09PV1dXV1dXR0dHMzMzQ0NDU1NTU1NTU1NTT09PR0dHV1dXV1dWjFKyGAAAAFXRSTlMA3Td49ejSsJZpXUocDwj5xL2GLCQcqSJ5AAAAWElEQVQY03XPSRLAEAAAwUH2hKz+/9VQSiGkj3MbfknRJGG2DTPOVXcF3vTtEwRj2Ucic+T9NBDpIfVBk9lE7GKjcPeh90812vneSSqr6/tKw2LtQpNSJC9nwAqeKX34BgAAAABJRU5ErkJggg=="
                        alt="">
                    <img v-show='orderby==2'
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAOCAMAAAACJixMAAAARVBMVEUAAAD/3y3/3iv/3S3/3y7/3i7/3i7/3i3/3y7/3y3/3y7/3Sz/3i3/3yz/2y7/3SL/0CD/3i3/3i3/3y7/3Cn/3Cv/3y6nOoROAAAAFnRSTlMA3Td49era0sGwlmldShwPCPnjhiwkGR0TKgAAAFpJREFUGNN1z0kSwBAAAMEJ2Tey+f9TQymFkD7Obfgl+qaiF7CYigXrKrsEZ/72Gbwp7xOBHtM+agjUEPugSOxn6M1O5u58755itHW9FRQ224+NitWYlSopiV7lNAtA7Hl9cQAAAABJRU5ErkJggg=="
                        alt="">
                </div>
            </div>
            <div class="price item point" :class="{'active': orderby == 3 || orderby == 4}"
                @click="changeOrderby('price')">
                价格
                <div class="btn">
                    <img v-show='orderby!=3'
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAMAAAA7+k+nAAAAOVBMVEUAAADS0tLU1NTU1NTS0tLOzs7V1dXV1dXV1dXT09PV1dXR0dGqqqrU1NTV1dXU1NTV1dXS0tLV1dUtUgytAAAAEnRSTlMAEeOwLgrxyYlpTRwD9dKUckQWNXfoAAAAXElEQVQY03XORxLAIAxDUWJ6SdP9D5syTLAJvKW0+YqJhxpKQBrtxgGr+e+ZcKPc79bjtVm5F41KF3EEfHYRCia2/YSQWKjgavRC6FBuoZJ/ojUYFh0wFNQyoWYurGULwl0VdqIAAAAASUVORK5CYII="
                        alt="">
                    <img v-show='orderby==3'
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAMAAAA7+k+nAAAAP1BMVEUAAAD/0yz/3i3/zhn/3i3/3i3/3i3/3yz/3Sz/3i3/3S3/2yv/qgD/3y7/3i7/3i3/3i3/3S3/3S7/2y7/3y6I9NG9AAAAFHRSTlMAEa8K8ePJiGlNLRsD9eDSk3JDMp7Zsq4AAABcSURBVBjTdc5HEsAgEANBTE7O+v9bHcvsYujj6CJB+FU0BSC0etTAuP97MjiZVHdlcZsV71niJTMbHD4LOwrCl76BCeQoo+PThwkVk8pRzl6nJQhy2qHJiaFD9ByEEQ0Gu2HBNAAAAABJRU5ErkJggg=="
                        alt="">
                    <img v-show='orderby!=4'
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAOCAMAAAACJixMAAAAQlBMVEUAAADU1NTR0dHV1dXU1NTV1dXV1dXV1dXV1dXT09PV1dXV1dXR0dHMzMzQ0NDU1NTU1NTU1NTT09PR0dHV1dXV1dWjFKyGAAAAFXRSTlMA3Td49ejSsJZpXUocDwj5xL2GLCQcqSJ5AAAAWElEQVQY03XPSRLAEAAAwUH2hKz+/9VQSiGkj3MbfknRJGG2DTPOVXcF3vTtEwRj2Ucic+T9NBDpIfVBk9lE7GKjcPeh90812vneSSqr6/tKw2LtQpNSJC9nwAqeKX34BgAAAABJRU5ErkJggg=="
                        alt="">
                    <img v-show='orderby==4'
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAOCAMAAAACJixMAAAARVBMVEUAAAD/3y3/3iv/3S3/3y7/3i7/3i7/3i3/3y7/3y3/3y7/3Sz/3i3/3yz/2y7/3SL/0CD/3i3/3i3/3y7/3Cn/3Cv/3y6nOoROAAAAFnRSTlMA3Td49era0sGwlmldShwPCPnjhiwkGR0TKgAAAFpJREFUGNN1z0kSwBAAAMEJ2Tey+f9TQymFkD7Obfgl+qaiF7CYigXrKrsEZ/72Gbwp7xOBHtM+agjUEPugSOxn6M1O5u58755itHW9FRQ224+NitWYlSopiV7lNAtA7Hl9cQAAAABJRU5ErkJggg=="
                        alt="">
                </div>
            </div>
        </section>

        <div class="game_list">
            <div class="notFound" v-show="gameinfo.length == 0">
                没有找到符合条件的人哦！
            </div>
            <GameList :gameinfo="gameinfo" :game_key="key" v-if="gameinfo.length > 0"></GameList>
        </div>
        <v-pagination v-show="total_page>1" :total="total_page" :current_page='page' @pagechange="pagechange">
        </v-pagination>
    </div>
</template>
<script>
    import GameList from '../components/gameList'
    import pagination from '../components/pagination'
    import utils from '../utils.js';
    import {
        mapState
    } from 'vuex'

    export default {
        data() {
            return {
                gamelist: [], //游戏名字列表
                taglist: [],
                gameinfo: [],
                title: '',
                m1: false, //游戏名列表显示更多
                path: '', //标签组合，必须有|
                sex: '', //1男2女
                orderby: 0, //0综合排序,1接单数从高到低 ,2价格从低到高, 3价格从高到低
                search: '',
                page: 1,
                show: 0,
                getHunterDebunce: null,
                moregame: false, //游戏名字 more状态
                cur: null,
                restart_key: '',
                tag: { //jnsp: 1
                },
                total_page: 1,
            }
        },
        components: {
            'v-pagination': pagination,
            GameList
        },
        computed: {},
        methods: {
            pagechange: function (currentPage) {
                this.page = currentPage;
                this.getHunterDebunce()
            },

            changeOrderby(type) {
                if (type == 'number') {
                    if (this.orderby != 1 && this.orderby != 2) {
                        this.orderby = 1;
                    } else if (this.orderby == 1) {
                        this.orderby = 2
                    } else if (this.orderby == 2) {
                        this.orderby = 1;
                    }
                }
                if (type == 'price') {
                    if (this.orderby != 3 && this.orderby != 4) {
                        this.orderby = 3;
                    } else if (this.orderby == 3) {
                        this.orderby = 4
                    } else if (this.orderby == 4) {
                        this.orderby = 3;
                    }
                }
                if (type == 'mutiple') {
                    if (this.orderby == 0) {
                        return
                    }
                    this.orderby = 0;
                }
                // 防抖
                this.getHunterDebunce();
            },
            getHunterList(args) {
                var action;
                if (args) {
                    action = args[0]
                }
                //params game=wzry&path=&sex=2&orderby=0&search=&page=1
                var d = {
                    game: this.key,
                    sex: this.sex,
                    orderby: this.orderby,
                    search: this.search,
                    page: this.page,
                    path: this.path
                }

                this.$http.get('/v1/index/lists', {
                    params: d
                }).then((data) => {
                    var d = data.data;
                    if (d.code == 200) {
                        this.gamelist = d.data.game;
                        this.restart_key = this.gamelist[Object.keys(this.gamelist)[0]].key;
                        this.taglist = d.data.tags.lists;
                        this.gameinfo = d.data.info;
                        this.title = d.data.tags.title;
                        this.total_page = d.data.info_pages;
                        if (action == 'changegame') {
                            this.path = '';
                            this.tag = {};
                            this.sex = null;
                        }
                        //this.total_page = this.info_pages;
                    } else if (d.code == 100) { //游戏名异常
                        this.$router.push({
                            name: 'home'
                        })
                    }
                })
            },
            changeGame(title, key) { //游戏名字变了
                this.title = title;
                this.key = key;
                this.getHunterDebunce('changegame')

                /*   this.$router.push({
                      name: 'findPeople',
                      params: {
                          key: this.key
                      }
                  }) */

            },
            changeTag(tagname, id) {
                if (tagname == 'sex') {
                    this.sex = id;
                    this.getHunterList();
                    return
                }
                var n = id ? id : '';
                var keys = Object.keys(this.tag);
                if (keys.indexOf(tagname) == -1) {
                    this.$set(this.tag, tagname, n)
                }
                this.tag[tagname] = n;
                var path = ''
                for (var i in this.tag) {
                    if (this.tag[i]) {
                        path += i + ':' + this.tag[i] + '|'
                    }
                }
                this.path = path;

                this.getHunterDebunce()
            },
            more(tag, more) {
                //console.log(tag)
                if (tag == 'moregame') {
                    this.moregame = this.moregame ? false : true;
                } else {
                    this.$refs[tag][0].className = this.$refs[tag][0].className == 'list fl' ? 'list fl moretag' :
                        'list fl';
                    this.$refs[more][0].className = this.$refs[more][0].className == 'more point' ? 'more point up' :
                        'more point'
                }
            },

            getHunterAjax() { //防抖
                return utils.debunce(this.getHunterList, 200)
            },
            restart() {
                this.sex = '';
                this.orderby = 0;
                this.path = '';
                this.page = 1;
                this.search = '';
                this.tag = {}
                this.key = this.restart_key;
                /*              this.$router.push({ //相同路由不会重新走生命周期，这里是为了改变url对应的游戏名字
                                 name: 'findPeople',
                                 params: {
                                     key: this.restart_key
                                 }
                             }) */
                this.getHunterDebunce()
            }
        },
        created() {
            this.key = this.$route.params.key;
            //是从首页游戏tag或者刷新
            this.getHunterDebunce = this.getHunterAjax();
            this.getHunterList();
        },
        mounted() {},
    }

</script>
<style lang='scss' scoped>
    .more {
        position: absolute;
        right: 10px;
        top: 52px;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAASCAMAAAB7LJ7rAAAATlBMVEUAAADMzMzKysrIyMjExMSurq7MzMzMzMzMzMzLy8vLy8vMzMzMzMzLy8vMzMzIyMjLy8vCwsLLy8vLy8vMzMzLy8vMzMzLy8vHx8fMzMwuKq1mAAAAGXRSTlMA1x4QCga/6OTPysS4saolGBXeo5uUi4QpLR0u9QAAAJBJREFUKM99kFUWgDAMBJcKRYtL7n9RSOG9IoH5qGSqC0BB5BSr81aS1rsVaDKi2gq2JsoapLRTmac1FddTqCT05mHDrkQBbfClvlpdBtvyuMt5XOiLLbiSd9IsrpfOirdJL0F86+sfvdptL/2UU+AcOCUpJ+u57hy3YsoDnQwQGQ874oOJ7YRPZqIZPywLbmxb8g37StmK7gAAAABJRU5ErkJggg==') no-repeat center center;
        width: 15px;
        height: 9px;
        background-size: cover;
    }


    .p1 {
        margin-top: 25px;
        font-size: 12px;
        margin-bottom: 20px;
    }

    .game_list {
        margin-bottom: 50px;
        text-align: center;
    }

    .restart {
        width: 70px;
        height: 30px;
        background: #FF4C2E;
        border-radius: 6px;
        font-size: 14px;
        line-height: 14px;
        color: #fff;
        text-align: center;
        position: absolute;
        padding-top: 8px;
        box-sizing: border-box;
        top: -35px;
        right: -10px;
    }

    .notFound {
        min-height: 200px;
        margin-top: 100px;
        font-size: 20px;
    }


    .choose {
        overflow: hidden;
        margin: 30px 0 0;

        .item {
            text-align: center;
            width: 130px;
            height: 50px;
            line-height: 50px;
            font-size: 18px;
            border-radius: 10px;
            float: left;
            margin-right: 40px;
            background: #fff;
            color: #333;
            position: relative;

            .btn {
                position: absolute;
                width: 12px;
                line-height: 0.6;
                right: 16px;
                top: 14px;

                img {
                    width: 12px;
                }
            }
        }

        .active {
            background: #FF4C2E;
            color: #fff;
        }
    }

    .search {
        color: #666;
        font-size: 14px;
        background: #fff;
        position: relative;

        >li {
            overflow: hidden;
            border-bottom: 1px solid #ccc;
        }

        >li:last-child {
            border: none;
        }

        li {
            position: relative;

            .title {
                width: 105px;
                height: 60px;
                padding-left: 30px;
                margin-right: 30px;
                box-sizing: border-box;
                line-height: 60px;
            }
        }

        li.first {
            .title {
                height: 144px;
                line-height: 144px;
                margin-right: 0;
            }

            li {
                margin: 0 52px;
                height: 144px;

                .game_name {
                    line-height: 1;
                }
            }

            .list {
                height: 114px;


                &.moregame {
                    height: auto;
                }

                li {
                    height: 144px;

                    p {
                        text-align: center;

                        &:hover {
                            color: #FF4C2E;
                        }
                    }
                }


            }

            .more.up {
                background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAASBAMAAAC+3HPqAAAAHlBMVEUAAADMzMzMzMzLy8vLy8vKysrMzMzJycnMzMzMzMzfJ/5pAAAACXRSTlMA8X56OzqHOTzavWfOAAAAdUlEQVQY01XKPQ5GUBSE4cn3I1oJkduJik6rYwfsQKtU6e0AiWR26+Y6cXKmmzwvZCXMPizMr3lYJgvD5GE4kUB4X50GXzLHQjbyW+4D/o7nyxmA0QfKCIGyBp678H8+CJziWe8DYQ3mhyW4EL0MxG4CKug23EdkKKm5xuSdAAAAAElFTkSuQmCC')
            }

        }

        li.tags {
            .list {
                height: 60px;

                li {
                    cursor: pointer;

                    &.active {
                        color: #FF4C2E;
                    }
                }

                &.moretag {
                    height: auto;
                }
            }

            .more {
                top: 25px;
            }

            .more.up {
                background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAASBAMAAAC+3HPqAAAAHlBMVEUAAADMzMzMzMzLy8vLy8vKysrMzMzJycnMzMzMzMzfJ/5pAAAACXRSTlMA8X56OzqHOTzavWfOAAAAdUlEQVQY01XKPQ5GUBSE4cn3I1oJkduJik6rYwfsQKtU6e0AiWR26+Y6cXKmmzwvZCXMPizMr3lYJgvD5GE4kUB4X50GXzLHQjbyW+4D/o7nyxmA0QfKCIGyBp678H8+CJziWe8DYQ3mhyW4EL0MxG4CKug23EdkKKm5xuSdAAAAAElFTkSuQmCC')
            }
        }


        .list {
            width: 1065px;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;

            li {
                height: 60px;
                line-height: 60px;
                margin: 0 30px;

                img {
                    margin-top: 23px;
                }

                &:hover {
                    color: #FF4C2E;
                }
            }

            .active {
                color: #FF4C2E;
            }

        }

        .logo {
            width: 68px;
            height: 68px;
        }
    }

</style>
