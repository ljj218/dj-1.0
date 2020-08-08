<template>
    <div class="setpass bind-phone" :class="{move:!showPss}">
        <div class="md-title flex align-items" @click="back">
            <Icon type="ios-arrow-back" size="25" />
            <span>修改密码</span>
        </div>

        <div class="input-wrap flex align-items">
            <div class="mr">手机号</div>
            <div class="user-phone">138873737</div>
        </div>
        <div class="input-wrap flex align-items">
            <div class="mr">验证码</div>
            <div class="code-wrap">
                <input type="text" class="code" v-model="code" placeholder="请输入验证码" />
            </div>
            <div class="btn btnclick unselect">{{word}}</div>
        </div>
        <div class="input-wrap flex align-items">
            <div class="mr"></div>
            <div class="input-box">
                <input
                    type="text"
                    class="phone"
                    v-model="passw"
                    maxlength="20"
                    placeholder="请设置6-20位至少两种字符组合密码"
                />
            </div>
        </div>
        <div class="next btnclick unselect" @click="next">下一步</div>
    </div>
</template>

<script>
export default {
    props: {
        showPss: {
            type: Boolean,
            default: false,
        },
    },
    name: "modifyPass",
    data() {
        return {
            code: "",
            word: "获取验证码",
            sendTimer: null,
            time: 60,
            sendMsgDisabled: false,
            passw: "",
        };
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        back() {
            this.code = '';
            this.word = '获取验证码';
            this.sendTimer = null;
            this.time = 60;
            this.sendMsgDisabled = false;
            this.passw = '';
            this.$emit("close");
        },

        //绑定手机 下一步
        next() {
            console.log("ssss")
            if (this.code == "") {
                this.$Message.warning("请正确填写手机验证码");
                return;
            }
            if (!this.CheckPassWord(this.passw)) {
                this.$Message.warning("请设置6-20位至少两种字符组合密码");
                return;
            }

        this.back();

        },
        CheckPassWord(password) {
            //必须为字母加数字且长度不小于20位
            var str = password;
            if (str == '' || str.length > 20) {
                return false;
            }
            var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
            if (!reg1.test(str)) {
                console.log("111")
                return false;
            }
            var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
            if (reg.test(str)) {
                console.log("222")

                return true;
            } else {
                console.log("33")

                return false;
            }
        },
        //发送短信
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
                    clearInterval(that.sendTimer);
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
    },
    watch: {
        passw(val) {
            this.passw = val.slice(0, 20);
        },
    },
};
</script>
<style lang='scss' scoped>
.bind-phone {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 994px;
    min-height: 626px;
    background-color: #fff;
    padding: 40px;
    transition: transform 0.5s ease;
    .md-title {
        cursor: pointer;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 160px;
    }

    .input-wrap {
        width: 400px;
        height: 42px;
        margin: 0 auto 30px;
        .user-phone {
            height: 42px;
            line-height: 42px;
            font-size: 14px;
            color: rgba(250, 157, 17, 1);
        }
        .mr {
            width: 70px;
            height: 42px;
            line-height: 42px;
            padding-right: 20px;
            text-align: right;
            font-size: 16px;
            color: rgba(51, 51, 51, 1);
        }
        .input-box {
            width: 328px;
            height: 42px;
            background: rgba(247, 247, 247, 1);
            border-radius: 6px;
            border: 1px solid rgba(216, 216, 216, 1);
        }
        input {
            display: block;
            width: 90%;
            height: 39px;
            margin: auto;
            color: #333;
            font-size: 14px;
            border: 0;
            background: rgba(247, 247, 247, 1);
            text-align: center;
        }
        .code-wrap {
            width: 217px;
            height: 42px;
            background: rgba(247, 247, 247, 1);
            border-radius: 6px;
            border: 1px solid rgba(216, 216, 216, 1);
        }
        .btn {
            cursor: pointer;
            width: 98px;
            height: 42px;
            line-height: 42px;
            margin-left: 13px;
            text-align: center;
            border-radius: 6px;
            border: 1px solid rgba(250, 157, 17, 1);
            font-size: 14px;
            color: rgba(255, 152, 0, 1);
        }
    }
    .next {
        cursor: pointer;
        width: 328px;
        height: 42px;
        margin: auto;
        transform: translateX(35px);
        line-height: 42px;
        text-align: center;
        background: linear-gradient(
            180deg,
            rgba(240, 182, 52, 1) 0%,
            rgba(254, 146, 1, 1) 100%
        );
        border-radius: 21px;
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
    }
}
</style>