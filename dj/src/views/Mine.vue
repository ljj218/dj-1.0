<template>
    <div class="detail">
        <cpNav />
        <div class="container clearfix">
            <div class="nav fl">
                <div class="item" :class="{active:type==1}" @click="type=1">陪玩管理</div>
                <div class="item" :class="{active:type==2}" @click="type=2">个人中心</div>
                <div class="item" :class="{active:type==3}" @click="type=3">编辑资料卡</div>
            </div>
            <div class="content lr">
                <main v-if="type==1" />
            </div>
        </div>
        <quickBtn />
        <foot />
    </div>
</template>

<script>
import cpNav from "../components/cp-nav";
import quickBtn from "../components/quickBtn";
import foot from "../components/foot";
import main from "../components/main";

export default {
    components: { cpNav, quickBtn, foot, main },
    name: "mine",
    data() {
        return {
            type: 2,
        };
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style lang='scss' scoped>
.detail {
    position: relative;
    width: 100%;
    background-attachment: fixed;
    background-image: url("../assets/img/public/bj.jpg");
    background-size: 100% 100%;
    .container {
        width: 1200px;
        height: 670px;
        margin: 50px auto 0;
        background-color: #fff;
        .nav {
            width: 205px;
            height: 100%;
            background-color: #f2f2f2;
            .item {
                cursor: pointer;
                width: 205px;
                height: 64px;
                line-height: 64px;
                text-align: center;
                font-size: 16px;
                color: rgba(51, 51, 51, 1);
            }
            .active {
                background: rgba(230, 230, 230, 1);
            }
        }
        .content {
            width: 996px;
            height: 100%;
        }
    }
}
.fl {
    float: left;
}
.lr {
    float: right;
}
</style>