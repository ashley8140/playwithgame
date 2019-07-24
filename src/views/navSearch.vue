<template>
    <div class="container">
        <p class="p1">搜索结果如下</p>
        <div class="notFound" v-show="searchInfo.length == 0">
            没有找到符合条件的人哦！
        </div>
        <GameList :gameinfo="searchInfo" :game_key="key" v-if="searchInfo.length > 0"></GameList>
    </div>
</template>
<script>
    import GameList from '../components/gameList'
    import pagination from '../components/pagination'
    import {
        mapState
    } from 'vuex'
    export default {
        computed: {
            ...mapState(['searchInfo'])
        },
        components: {
            GameList
        },
        data() {
            return {
                key: 'wzry'
            }
        },
        created() {
            console.log(this.searchInfo)
        }
    }

</script>
<style lang="scss" scoped>
    .p1 {
        margin-top: 25px;
        font-size: 18px;
        color: #FF4C2E;
    }

    .notFound {
        min-height: 400px;
        margin-top: 200px;
        font-size: 20px;
        text-align: center;
    }

</style>
