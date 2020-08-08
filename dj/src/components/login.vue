<template>
    <Modal
        :value="showLogin"
        width="400"
        class="login"
        :closable="false"
        @on-ok="sure"
        @on-cancel="cancel"
    >
        <div slot="header"></div>
        <div class="content clearfix">
            <ul class="tab unselect">
                <li class="item login" :class="{active:type==1}" @click="changeType(1)">登录</li>
                <li class="line"></li>
                <li class="item registered" :class="{active:type==2}" @click="changeType(2)">注册</li>
            </ul>
            <div class="changeType unselect">
                <p v-if="type==1">
                    <span v-if="loginType==1" @click="changeLoginType(2)">账号密码登录</span>
                    <span v-if="loginType==2" @click="changeLoginType(1)">手机号快捷登录</span>
                </p>
            </div>
            <div class="input-wrap clearfix">
                <img src="../assets/img/icon-phone.png" class="icon icon1" />
                <input
                    type="text"
                    placeholder="请输入手机号"
                    class="phone input"
                    maxlength="11"
                    v-model="phone"
                />
                <img
                    src="../assets/img/icon-clear.png"
                    v-if="phone.length>0"
                    @click="phone=''"
                    class="clear"
                />
            </div>
            <div class="input-wrap clearfix mes-wrap" v-if="type==2||(type==1&&loginType==1)">
                <div class="mes-box fl">
                    <img src="../assets/img/icon-code.png" class="icon icon3" />
                    <input type="text" placeholder="短信验证码" class="code input" v-model="code" />
                </div>
                <div class="btn unselect lr" @click="send">{{word}}</div>
            </div>
            <div class="input-wrap clearfix" v-if="type==1&&loginType==2">
                <img src="../assets/img/icon-code.png" class="icon icon2" />
                <input type="password" placeholder="请输入密码" class="passw input" v-model="passw" />
            </div>
            <div class="input-wrap clearfix" v-if="type==2">
                <img src="../assets/img/icon-lock.png" class="icon icon2" />
                <input type="text" placeholder="请设置6-20位至少两种字符组合密码" class="passw input" v-model="passw" />
            </div>
            <div class="hint clearfix unselect" v-if="type==1">
                <Checkbox v-model="saveInfo" class="fl">记住我</Checkbox>
                <span class="lr find" @click="$router.openPage('/findpass')">忘记密码</span>
            </div>
            <div class="hint read unselect" v-if="type==2">
                <Checkbox v-model="single">阅读并同意</Checkbox>
            </div>
            <div class="btn-login unselect btnclick" @click="login">
                <span v-if="type==2">立即注册</span>
                <span v-else>立即登录</span>
            </div>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>

<script>
import { validateMobilePhone, validateMessageCode } from "../common/util/tools";
export default {
    components: {},
    props: {
        showLogin: {
            type: Boolean,
            default: true,
        },
    },
    name: "login",
    data() {
        return {
            type: 1, //1登录2注册
            loginType: 2, // 2密码登录 1短信登录
            phone: "",
            passw: "",
            code: "",
            single: false, //阅读协议
            saveInfo: false, //用户信息保存更长  有点奇怪的设定
            word: "获取验证码",
            sendTimer: null,
            time: 60,
            sendMsgDisabled: false,
        };
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        changeType(num) {
            this.type = num;
            this.passw = "";
            this.code = "";
            this.word = "获取验证码";
            this.wordsendTimer = null;
            this.wordtime = 60;
            this.wordsendMsgDisabled = false;
            this.single = false;
            this.saveInfo = false;
        },
        changeLoginType(num) {
            this.loginType = num;
        },
        sure() {
            console.log("ssss");
        },
        cancel() {
            // this.$emit("closed");
        },
        closed() {
            this.showPayMod = false;
        },
        login() {
            if (!validateMobilePhone(this.phone)) {
                this.$Message.warning("请正确填写手机号码");
                return;
            }
            if (this.type == 2) {
                //注册登录
                var reg = /^bai[0-9a-zA-Z]+$/;
                if (this.code == "" || !validateMessageCode(this.code)) {
                    this.$Message.warning("请正确填写手机验证码");
                    return;
                }
                if (this.passw.length < 6) {
                    this.$Message.warning("密码长度必须大于6");
                    return;
                }
                if (this.CheckPassWord(this.passw)) {
                    this.$Message.warning("请设置6-20位至少两种字符组合密码");
                    return;
                }
            } else {
                //登录
                if (this.loginType == 1) {
                    if (this.code == "" || !validateMessageCode(this.code)) {
                        this.$Message.warning("请正确填写手机验证码");
                        return;
                    }
                } else {
                    if (this.passw.length < 6) {
                        this.$Message.warning("请正确填写手机验证码");
                        return;
                    }
                }
            }
        },
        async send() {
            if (!validateMobilePhone(this.phone)) {
                this.$Message.warning("请正确填写手机号码");
                return;
            }
            if (this.sendMsgDisabled) {
                return false;
            }

            try {
                this.sendMsgDisabled = true;
                let res = await smsCode(data);
                if (res.resultCode == "9999") {
                    this.word = "获取验证码";
                    clearInterval(this.sendTimer);
                    this.time = 60;
                    this.sendMsgDisabled = false;
                } else {
                    this.sendTimer = setInterval(() => {
                        this.sendMsgDisabled = true;
                        this.time--;
                        this.word = this.time;
                        if (this.time <= 0) {
                            this.sendMsgDisabled = false;
                            clearInterval(this.sendTimer);
                            this.word = "获取验证码";
                            this.time = 60;
                        }
                    }, 1000);
                }
                this.$Message.warning(res.message);
            } catch (err) {
                console.log(err);
            }
        },
        CheckPassWord(password) {
            //必须为字母加数字且长度不小于20位
            var str = password;
            if (str == '' || str.length > 20) {
                return false;
            }
            var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
            if (!reg1.test(str)) {
                return false;
            }
            var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
            if (reg.test(str)) {
                return true;
            } else {
                return false;
            }
        },
    },
};
</script>
<style lang='scss' scoped>
.content {
    padding: 25px 33px;
    min-height: 350px;
    .tab {
        font-size: 18px;
        color: rgba(153, 153, 153, 1);
        line-height: 24px;
        .item {
            cursor: pointer;
            display: inline-block;
            vertical-align: middle;
            width: 75px;
            height: 24px;
        }
        .line {
            display: inline-block;
            vertical-align: middle;
            width: 2px;
            height: 24px;
            background: #979797;
            opacity: 0.5;
        }
        .active {
            font-size: 18px;
            color: rgba(51, 51, 51, 1);
        }
        .login {
            text-align: left;
        }
        .registered {
            text-align: right;
        }
    }
    .changeType {
        height: 40px;
        line-height: 40px;
        text-align: right;
        font-size: 14px;
        color: rgba(125, 209, 255, 1);
        span {
            cursor: pointer;
        }
    }
    .input-wrap {
        width: 332px;
        height: 42px;
        line-height: 41px;
        border-radius: 6px;
        margin: 0 auto 20px;
        border: 1px solid rgba(216, 216, 216, 1);
        .clear {
            cursor: pointer;
            display: inline-block;
            vertical-align: middle;
            width: 15px;
            height: 16px;
            // padding: 4px;
        }
        .input {
            display: inline-block;
            vertical-align: middle;
            height: 20px;
            border: 0;
            font-size: 14px;
            color: #333;
        }
        .input::placeholder {
            color: #999999;
        }
        .icon {
            display: inline-block;
            vertical-align: middle;
            margin-left: 20px;
        }
        .icon1 {
            width: 17px;
            height: 22px;
            margin-right: 20px;
        }
        .icon2 {
            width: 21px;
            height: 19px;
            margin-left: 20px;
            margin-right: 16px;
        }
        .phone,
        .passw {
            width: 70%;
        }
    }
    .mes-wrap {
        border: 0;
        .mes-box {
            width: 226px;
            height: 42px;
            line-height: 41px;
            border-radius: 6px;
            border: 1px solid rgba(216, 216, 216, 1);
            .icon3 {
                width: 21px;
                height: 19px;
                margin-left: 20px;
                margin-right: 16px;
            }
        }
        .btn {
            cursor: pointer;
            width: 98px;
            height: 42px;
            line-height: 42px;
            text-align: center;
            border-radius: 6px;
            border: 1px solid rgba(250, 157, 17, 1);
            font-size: 14px;
            color: rgba(255, 152, 0, 1);
        }
        .btn:hover {
            box-shadow: 0 0 5px rgba(250, 157, 17, 0.5);
        }
        .btn:active {
            box-shadow: 0 0 5px rgba(250, 157, 17, 0.5) inset;
        }
    }
    .hint {
        color: #d8d8d8;
        /deep/ .ivu-checkbox-checked /deep/ .ivu-checkbox-inner {
            border-color: #ff9800;
            background-color: #ff9800;
        }
        /deep/ .ivu-checkbox {
            margin-top: -1px;
        }
        .find {
            cursor: pointer;
        }
    }
    .read {
    }
    .btn-login {
        width: 333px;
        height: 42px;
        line-height: 42px;
        cursor: pointer;
        margin-top: 30px;
        text-align: center;
        background: linear-gradient(
            180deg,
            rgba(240, 182, 52, 1) 0%,
            rgba(254, 146, 1, 1) 100%
        );
        border-radius: 21px;
        color: #fff;
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
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