<template>
    <div class="page center">
        <span class="last" :class="{'disabled': current == 1, 'active': current == 1}" @click="setCurrent(current- 1)">
            <img :src=base64.last alt="">
        </span>
        <span :class="{'disabled': current == 1,'active': current == 1}" @click="setCurrent(1)">
            首页
        </span>
        <span v-for="(i, index) in grouplist" :key=index :class="{'active':current==i.val}" @click="setCurrent(i.val)"
            class="item">
            {{i.text}}
        </span>
        <span :class="{'disabled': current == total,'active': current == total}" @click="setCurrent(total)">
            尾页
        </span>
        <span class="next" :class="{'disabled':current==total,'active': current == total}" @click="setCurrent(current+1)"><img
                :src=base64.next alt=""></span>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    export default {
        data() {
            return {
                current: this.currentPage,
            }
        },
        props: {
            //子组件中的data数据，不是通过父组件传递的是子组件私有的，是可读可写的。
            //子组件中的所有 props中的数据，都是通过父组件传递给子组件的，是只读的。
            total: { // 总页数
                default: 0
            },
            currentPage: { // 当前页码
                type: Number,
                default: 1
            },
            pagegroup: { //分页条数
                type: Number,
                default: 5,
                coerce: function (v) {
                    v = v > 0 ? v : 5;
                    return v % 2 === 1 ? v : v + 1;
                }
            }
        },
        computed: {
            ...mapState(['base64']),
            grouplist: function () {
                var len = this.total,
                    temp = [],
                    list = [],
                    count = Math.floor(this.pagegroup / 2),
                    center = this.current;
                if (len <= this.pagegroup) {
                    while (len--) {
                        temp.push({
                            text: this.total - len,
                            val: this.total - len
                        });
                    }
                    return temp;
                }
                while (len--) {
                    temp.push(this.total - len);
                }
                var idx = temp.indexOf(center);
                (idx < count) && (center = center + count - idx);
                (this.current > this.total - count) && (center = this.total - count);
                temp = temp.splice(center - count - 1, this.pagegroup);
                do {
                    var t = temp.shift();
                    list.push({
                        text: t,
                        val: t
                    });
                } while (temp.length);
                if (this.total > this.pagegroup) {
                    (this.current > count + 1) && list.unshift({
                        text: '...',
                        val: list[0].val - 1
                    });
                    (this.current < this.total - count) && list.push({
                        text: '...',
                        val: list[list.length - 1].val + 1
                    });
                }
                return list;
            }
        },
        methods: {
            setCurrent(idx) {
                if (this.current != idx && idx > 0 && idx < this.total + 1) {
                    this.current = idx;
                    this.$emit('pagechange', this.current);
                }
            },
        },
        mounted() {}
    }

</script>
<style lang="scss" scoped>
    .page {
        overflow: hidden;
        margin: 40px 0;

        .disabled {
            opacity: 0.3;
            cursor: auto;
        }

        span {
            margin-left: 5px;
            cursor: pointer;
            font-size: 12px;
            vertical-align: middle;
        }

        .next {
            img {
                width: 24px;
            }
        }

        .last {
            img {
                width: 24px;
            }
        }

        .item {
            color: #999898;
            width: 24px;
            height: 24px;
            line-height: 24px;
            display: inline-block;
            text-align: center;
            border-radius: 100%;

            &:hover {
                background: #D4D2D2;
            }

            &.active {
                background: #FF4C2E;
                color: #fff;
            }
        }
    }

</style>
