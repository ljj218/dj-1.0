<template>
    <div class="chat">
         <bjImage>
        <img src="../assets/img/public/3.jpeg" alt />
      </bjImage>
        <div class="container flex align-items clearfix">
            <div class="nav-left fl">
                <img src="../assets/img/public/wh.jpg" class="head" />
                <div class="info">
                    <p>赵梦溪</p>
                    <p>性别：女</p>
                    <p>擅长位置：打野,打野,打野</p>
                    <p>主玩英雄：剑圣 盲僧</p>
                </div>
            </div>
            <div class="content-right fl">
                
            </div>
        </div>
    </div>
</template>

<script>
import bjImage from "../components/bjImage";

export default {
    components: {bjImage},
    name: "chat",
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
.chat {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    .container {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        width: 1106px;
        height: 585px;
        margin: auto;
        background: rgba(255, 255, 255, 1);
        border: 1px solid #dddddd;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        .nav-left {
            width: 261px;
            height: 585px;
            background: rgba(244, 194, 212, 1);
            .head {
                width: 100%;
                height: 293px;
            }
            .info {
                width: 100%;
                height: 292px;
                padding:  40px 40px 0 40px;
                color: #fff;
                font-size: 18px;
                p{
                    margin-bottom: 10px;
                }
            }
        }
        .content-right {
            width: 845px;
            height: 585px;
            background: #fff;
        }
    }
}
</style>