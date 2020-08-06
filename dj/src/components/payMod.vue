<template>
    <Modal :value="showPayMod" width="589" class="pay" @on-ok="sure" @on-cancel="cancel">
        <div slot="header"></div>
        <div class="content clearfix">
            <div class="line"></div>
            <p class="title">订单支付</p>
            <p class="hint">本次订单需要支付</p>
            <div class="price-info">
                <p class="price">
                    <span>¥</span> 100.00
                </p>
                <p class="sub flex align-items justify-content">
                    余额：50
                    <i></i>
                    需充值：50
                </p>
            </div>
            <div class="top-up flex align-items unselect" @click="payFlag=!payFlag">
                充值
                <Icon type="md-arrow-dropup" size="25" />
            </div>
            <div class="pay-content" v-show="payFlag">
                <p class="hint">充值价位：</p>
                <div class="money-wrap flex align-items space-around">
                    <div class="item" @click="money=30" :class="{active:money==30}">30</div>
                    <div class="item" @click="money=50" :class="{active:money==50}">50</div>
                    <div class="item" @click="money=100" :class="{active:money==100}">100</div>
                    <div class="item" @click="money=200" :class="{active:money==200}">200</div>
                </div>
                <input
                    type="text"
                    class="money"
                    placeholder="请输入"
                    v-model="inputMoney"
                    @input="setNum"
                />
                <div class="pay-methods flex align-items">
                    <span>支付方式：</span>
                    <div
                        class="item flex align-items justify-content btnclick"
                        :class="{active:payMethod==1}"
                        @click="changePayMethod(1)"
                    >
                        <img src="../assets/img/icon-alipay.png" class="icon" />
                        支付宝支付
                    </div>
                    <div
                        class="item flex align-items justify-content btnclick"
                        :class="{active:payMethod==2}"
                        @click="changePayMethod(2)"
                    >
                        <img src="../assets/img/icon-wechat.png" class="icon" />
                        微信支付
                    </div>
                </div>
                <div class="code-wrap flex ">
                    <span>二维码:</span>
                    <div class="code-box"></div>
                </div>
            </div>
            <div class="btn-wrap clearfix unselect">
                <div class="btn fl btnclick">取消</div>
                <div class="btn paym lr btnclick">付款</div>
            </div>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>

<script>
export default {
    components: {},
    props: {
        showPayMod: {
            type: Boolean,
            default: false,
        },
    },
    name: "matching",
    data() {
        return {
            money: 30,
            inputMoney: "",
            payMethod: 1,
            payFlag:false
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
        setNum() {
            let scoreZz = /^[0-9]+$/;
            if (!scoreZz.test(this.inputMoney)) {
                this.$Message.info(`请输入数值！`);
                this.inputMoney = "";
                return;
            }
        },
        changePayMethod(num) {
            this.payMethod = num;
        },
    },
    watch: {
        inputMoney(val) {
            if (val) {
                this.money = "";
            } else {
                this.money = 30;
            }
        },
    },
};
</script>
<style lang='scss' scoped>

.content {
    padding: 20px;
    // height: 394px;
    .title {
        padding: 20px 0 36px;
        font-size: 21px;
        color: rgba(51, 51, 51, 1);
        text-align: center;
    }
    .hint {
        font-size: 16px;
        color: rgba(153, 153, 153, 1);
        margin-bottom: 20px;
        padding-left: 14px;
    }
    .price-info {
        width: 520px;
        height: 102px;
        margin: auto;
        background: rgba(244, 244, 244, 1);
        padding: 14px 0;
        text-align: center;
        .price {
            font-size: 36px;
            span {
                font-size: 16px;
            }
        }
        .sub {
            font-size: 18px;
            height: 24px;
            line-height: 24px;
            color: rgba(153, 153, 153, 1);
            i {
                display: inline-block;
                width: 2px;
                height: 24px;
                background-color: rgba(153, 153, 153, 0.5);
                margin: 0 20px;
            }
        }
    }
    .top-up {
        cursor: pointer;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        padding-top: 20px;
        padding-left: 14px;
    }
    .pay-content {
        width: 100%;
        padding: 0 14px;
        .hint {
            padding-left: 0;
            margin-top: 15px;
            // padding-bottom: 20px;
        }
        .money-wrap {
            width: 74%;
            margin: auto;
            .item {
                cursor: pointer;
                width: 56px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 12px;
                color: rgba(153, 153, 153, 1);
                border-radius: 6px;
                border: 1px solid rgba(216, 216, 216, 1);
            }
            .active {
                background-color: #d8d8d8;
            }
        }
        .money {
            display: block;
            width: 100px;
            height: 30px;
            line-height: 30px;
            border-radius: 6px;
            margin: 20px auto 29px;
            text-align: center;
            font-size: 12px;
            color: #333;
            border: 1px solid rgba(216, 216, 216, 1);
        }
        .money::placeholder {
            color: rgba(153, 153, 153, 1);
        }
        .pay-methods {
            font-size: 16px;
            color: rgba(153, 153, 153, 1);
            span {
                margin-right: 10px;
            }
            .item {
                cursor: pointer;
                margin-right: 20px;
                width: 147px;
                height: 55px;
                border: 1px solid rgba(153, 153, 153, 1);
                font-size: 14px;
                color: rgba(51, 51, 51, 1);
                .icon {
                    width: 44px;
                    height: 44px;
                    margin-right: 10px;
                }
            }
            .active {
                border: 1px solid rgba(254, 148, 2, 1);
            }
        }
        .code-wrap {
            align-items: flex-start;
            margin-top: 34px;
            span {
                font-size: 16px;
                color: rgba(153, 153, 153, 1);
                margin-right: 38px;
            }
            .code-box {
                width: 222px;
                height: 222px;
                background: rgba(235, 235, 235, 1);
            }
        }
    }
    .btn-wrap {
        width: 100%;
        padding: 0 14px;
        margin-top: 50px;
        .btn {
            cursor: pointer;
            width: 130px;
            height: 45px;
            line-height: 45px;
            text-align: center;
            font-size: 18px;
            color: rgba(253, 149, 5, 1);
            border-radius: 6px;
            border: 1px solid rgba(253, 149, 5, 1);
        }
        .paym {
            background: linear-gradient(
                180deg,
                rgba(241, 181, 50, 1) 0%,
                rgba(254, 148, 3, 1) 100%
            );
            color: #fff;
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
/deep/ .ivu-icon-ios-close {
    font-size: 40px !important;
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