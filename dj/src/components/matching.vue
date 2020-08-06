<template>
    <div>
        <Modal
            :value="showMatch"
            width="593"
            class="matching"
            :closable="false"
            @on-ok="sure"
            @on-cancel="cancel"
        >
            <div slot="header"></div>
            <div class="content clearfix">
                <img src="../assets/img/public/wh.jpg" class="head fl" />
                <div class="info fl">
                    <div class="wrap">
                        <span class="name mr">赵梦溪</span>
                        <span class="charge">
                            <span>¥</span>
                            <span class="price">25</span>
                            <span>/局</span>
                        </span>
                    </div>
                    <div class="voice-wrap">
                        <img src="../assets/img/icon-voice-2.png" class="icon" />
                    </div>
                    <div class="introduction fl">
                        <span>陪玩介绍:</span>
                    </div>
                    <div class="btn unselect btnclick" @click="showPayMod=true">立即下单</div>
                </div>
                <div class="specialty fl">
                    <p class="mb">
                        <span>擅长位置:</span> 打野 上单
                    </p>
                    <p>
                        <span>擅长英雄:</span>盲僧 剑圣
                    </p>
                </div>
                <div class="btn-wrap clearfix unselect">
                    <div class="btn fl btnclick">继续匹配</div>
                    <div class="btn talk lr btnclick">聊一聊</div>
                </div>
            </div>
            <div slot="footer"></div>
        </Modal>
        <payMod :showPayMod="showPayMod" @closed="closed"/>
    </div>
</template>

<script>
import payMod from "./payMod"
export default {
    components: {payMod},
    props: {
        showMatch: {
            type: Boolean,
            default: false,
        },
    },
    name: "matching",
    data() {
        return {
            showPayMod:false,
        };
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        sure() {
            console.log("ssss");
        },
        cancel() {
            this.$emit("closed");
        },
        closed(){
            this.showPayMod=false;
        }
    },
};
</script>
<style lang='scss' scoped>
.content {
    padding: 20px;
    height: 394px;
    .head {
        display: inline-block;
        width: 108px;
        height: 108px;
        margin: 21px 20px 0 29px;
        border-radius: 50%;
    }
    .info {
        position: relative;
        display: inline-block;
        width: 71%;
        height: 140px;
        .wrap {
            .name {
                font-size: 16px;
                color: rgba(51, 51, 51, 1);
            }
            .mr {
                margin-right: 20px;
            }
            .charge {
                font-size: 12px;
                color: rgba(153, 153, 153, 1);
                .price {
                    font-size: 18px;
                    color: #f96c9a;
                }
            }
        }
        .voice-wrap {
            cursor: pointer;
            width: 64px;
            height: 21px;
            margin: 10px 0;
            .icon {
                width: 64px;
                height: 21px;
            }
        }
        .introduction {
            width: 360px;
            height: 66px;
            overflow-y: auto;
            border-radius: 6px;
            padding: 4px 10px;
            border: 1px solid rgba(203, 203, 203, 1);
            font-size: 16px;
            color: #333;
            span {
                color: rgba(203, 203, 203, 1);
            }
        }
        .btn {
            position: absolute;
            top: 0;
            right: 0;
            cursor: pointer;
            width: 130px;
            height: 45px;
            line-height: 45px;
            text-align: center;
            font-size: 18px;
            color: rgba(255, 255, 255, 1);
            background: linear-gradient(
                180deg,
                rgba(241, 181, 50, 1) 0%,
                rgba(254, 148, 3, 1) 100%
            );
            border-radius: 6px;
        }
    }
    .specialty {
        width: 100%;
        height: 146px;
        padding: 36px 0 45px 29px;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
    }
    .btn-wrap {
        width: 322px;
        height: 45px;
        margin: auto;
        .btn {
            cursor: pointer;
            width: 130px;
            height: 45px;
            line-height: 45px;
            text-align: center;
            border-radius: 6px;
            border: 1px solid rgba(153, 153, 153, 1);
            font-size: 18px;
            color: rgba(153, 153, 153, 1);
        }
        .talk {
            border: 1px solid rgba(251, 155, 13, 1);
            color: rgba(252, 154, 12, 1);
        }
    }
}
/deep/ .ivu-modal-header,
/deep/ .ivu-modal-footer {
    height: 0;
    padding: 0;
    border: 0;
}
/deep/ .ivu-modal-body {
    padding: 0;
}
.fl {
    float: left;
}
.lr {
    float: right;
}
.mb {
    margin-bottom: 21px;
}
</style>