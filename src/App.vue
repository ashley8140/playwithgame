<template>
    <div id="app">
        <NavBar></NavBar>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <FooterBar></FooterBar>
        <Login :class="{'show': showLoginBox}"></Login>
        <Float></Float>
    </div>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    const NavBar = r => require.ensure([], () => r(require("./components/Nav")));
    const FooterBar= r => require.ensure([], () => r(require("./components/Footer")));
    const Login= r=> require.ensure([], () => r(require("./components/login")));
    const Float = r=> require.ensure([], () => r(require("./components/Float")))

    export default {
        components: {
            NavBar,
            FooterBar,
            Login,
            Float
        },
        computed: {
            ...mapState(['showLoginBox'])
        },
        mounted () {
        }
    }

</script>

<style lang="scss" scoped>

</style>
