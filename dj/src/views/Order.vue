<template>
    <div class="detail">
        <cpNav />
        <div class="container">
            <div class="tab">我的订单</div>
            <div class="order-info">
                <div class="title">订单信息</div>
                <div class="wrap">
                    <table class="table">
                        <tr class="thead">
                            <th width="150px">陪玩</th>
                            <th>昵称</th>
                            <th>服务类型</th>
                            <th>单价（元/局)</th>
                            <th>购买数量</th>
                            <th width="200px">总量</th>
                        </tr>
                        <tr class="tbody">
                            <td>
                                <img src="../assets/img/public/wh.jpg" class="head" />
                            </td>
                            <td>今生今世开始</td>
                            <td>排位</td>
                            <td>¥60.00</td>
                            <td>
                                <div class="math">
                                    <img
                                        src="../assets/img/iocn-subtract.png"
                                        class="icon"
                                        :class="{opacity:num<=1}"
                                        @click="subtract"
                                    />
                                    <input type="text" v-model="num" />
                                    <img src="../assets/img/icon-add.png" class="icon" @click="add" />
                                </div>
                            </td>
                            <td>¥{{(num*60).toFixed(2)}}</td>
                        </tr>
                    </table>
                    <textarea id="textarea" placeholder="备注说明:"></textarea>
                </div>
            </div>
            <div class="pay-weap">
                <div class="title">支付方式</div>
                <ul class="list unselect">
                    <li class="item" :class="{active:payMethod==1}" @click="payMethod=1">
                        <img src="../assets/img/icon-alipay.png" class="icon-pay" />
                        <p>支付宝支付</p>
                    </li>
                    <li class="item" :class="{active:payMethod==2}" @click="payMethod=2">
                        <img src="../assets/img/icon-wechat.png" class="icon-pay" />
                        <p>微信支付</p>
                    </li>
                </ul>
            </div>
            <div class="btn-wrap">
                <p>
                    实付金额:
                    <span>
                        <span class="tag">¥</span>{{(num*60).toFixed(2)}}
                    </span>
                </p>
                <button>提交订单</button>
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

export default {
    components: { cpNav, quickBtn, foot },
    name: "Order",
    data() {
        return {
            num: 1,
            payMethod: 1,
        };
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        add() {},
        subtract() {
            if (this.num <= 1) {
                this.num = 1;
                return;
            }
            this.num--;
        },
        add() {
            this.num++;
        },
    },
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
        margin: 50px auto 0;
        .tab {
            width: 1200px;
            height: 60px;
            line-height: 60px;
            padding: 0 40px;
            background: rgba(255, 255, 255, 1);
            font-size: 16px;
            color: rgba(51, 51, 51, 1);
        }
        .order-info {
            width: 1200px;
            height: 414px;
            margin-top: 15px;
            background: rgba(255, 255, 255, 1);
            .title {
                width: 100%;
                height: 45px;
                line-height: 45px;
                padding: 0 40px;
                font-size: 14px;
                color: rgba(51, 51, 51, 1);
                border-bottom: 1px solid #e0e0e0;
            }
            .wrap {
                width: 1040px;
                margin: auto;
                height: 284px;
                margin-top: 35px;
                border: 1px solid rgba(223, 223, 223, 1);
                #textarea {
                    width: 1038px;
                    height: 119px;
                    border: 0;
                    padding: 15px 20px;
                    resize: none;
                }
            }
            .table {
                width: 1040px;
                text-align: center;
                .thead {
                    background: #dfdfdf;
                    font-size: 14px;
                    height: 60px;
                    color: rgba(102, 102, 102, 1);
                }
                th {
                    text-align: center;
                }
                .tbody {
                    height: 102px;
                    border-bottom: 1px solid rgba(223, 223, 223, 1);
                    font-size: 18px;
                    color: rgba(51, 51, 51, 1);
                    .math {
                        .icon {
                            width: 22px;
                            height: 22px;
                            display: inline-block;
                            cursor: pointer;
                            transform: translateY(5px);
                        }
                        input {
                            width: 38px;
                            border: 0;
                            font-size: 16px;
                            color: rgba(141, 141, 141, 1);
                            text-align: center;
                            border-bottom: 1px solid #dfdfdf;
                        }
                        .opacity{
                            opacity: .2;
                        }
                    }
                }
                .head {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                }
            }
        }
        .pay-weap {
            width: 1200px;
            height: 180px;
            margin-top: 15px;
            background: rgba(255, 255, 255, 1);
            .title {
                width: 100%;
                height: 60px;
                line-height: 60px;
                padding: 0 40px;
                font-size: 14px;
                color: rgba(51, 51, 51, 1);
                border-bottom: 1px solid #e0e0e0;
            }
            .list {
                padding: 12px 40px;
                .item {
                    display: inline-block;
                    font-size: 14px;
                    width: 130px;
                    height: 90px;
                    padding-top: 10px;
                    color: rgba(51, 51, 51, 1);
                    text-align: center;
                    margin-right: 10px;
                    border: 1px solid #e0e0e0;
                    border-radius: 4px;
                    cursor: pointer;
                    .icon-pay {
                        display: block;
                        margin: auto;
                        width: 44px;
                        height: 44px;
                        margin-bottom: 12px;
                    }
                }
                .active {
                    background: #f8f4f3;
                    border: solid 1px #ff5d42;
                    color: #ff5d42;
                }
            }
        }
        .btn-wrap {
            width: 1200px;
            height: 125px;
            margin-top: 15px;
            padding: 15px 40px;
            background: rgba(255, 255, 255, 1);
            p {
                text-align: right;
                font-size: 14px;
                color: rgba(51, 51, 51, 1);
                span{
                    color: #F96C9A;
                    font-size: 18px;
                    .tag{
                        font-size: 14px;
                    }
                }
            }
            button {
                float: right;
                width: 150px;
                height: 52px;
                line-height: 52px;
                text-align: center;
                margin-top: 15px;
                background: linear-gradient(
                    180deg,
                    rgba(240, 182, 52, 1) 0%,
                    rgba(254, 146, 1, 1) 100%
                );
                border-radius: 15px;
                font-size: 18px;
                color: rgba(255, 255, 255, 1);
                border: 0;
            }
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