<template>
    <ul class="floatTip">
        <li class="item">
            <img src="../assets/img/public/icon-menber.png" class="icon" />
            <p>申请</p>
            <p>入驻</p>
        </li>
        <li class="item">
            <img src="../assets/img/public/icon-mes.png" class="icon" />
            <p>消息</p>
        </li>
        <li class="item">
            <img src="../assets/img/public/icon-order.png" class="icon" />
            <p>订单</p>
        </li>
        <li class="item">
            <img src="../assets/img/public/icon-server.png" class="icon" />
            <p>客服</p>
        </li>
    </ul>
</template>

<script>
export default {
    components: {},
    name: "floatTip",
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style lang='scss' scoped>
.floatTip {
    position: fixed;
    right: 0;
    bottom: 20%;
    width: 73px;
    height: 394px;
    background: rgba(255, 255, 255, 1);
    border-radius: 15px;
    font-size: 14px;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    z-index: 3;
    .icon {
        width: 45px;
        display: block;
        margin: 0 auto 8px;
    }
    .item{
        cursor: pointer;
        width: 100%;
        height: 25%;
        box-sizing: border-box;
        padding-top: 10px;
    }
}
</style>