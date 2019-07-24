<template>
    <div class="center_box">
        <div class="pop"></div>
        <p v-show="visible" :class="{'error': type==2}">{{message}}</p>
    </div>
</template>

<script>
    export default {
        name: 'toast',
        data() {
            return {}
        },
        props: {
            visible: {
                type: Boolean,
                default: false,
            },
            type: {
                type: Number,
                default: 1,
            },
            message: {
                type: String,
                default: '',
            }
        }
    }

</script>
<style lang="scss" scoped>
    .center_box {
        position: fixed;
        top: 300px;
        z-index: 999;
        .pop {
            border-radius: 10px;
            position: absolute;
            width: 100%;
            height: 100%;
            background: #000;
            opacity: 0.4;
        }

        p {
            padding: 10px 20px;
            color: #fff;
            position: relative;

            &.error {

            }
        }
    }

</style>
