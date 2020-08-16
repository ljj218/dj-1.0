<template>
    <Modal
        :value="show"
        width="590"
        class="login"
        :closable="false"
        @on-ok="sure"
        @on-cancel="cancel"
    >
        <div slot="header"></div>
        <div class="content clearfix">
            <div class="line"></div>
            <div class="title">
                实名认证
                <img src="../assets/img/icon-close-2.png" class="close" @click="cancel" />
            </div>

            <div class="container">
                <div class="row flex align-items">
                    <div class="name">姓名</div>
                    <input type="text" placeholder="请输入真实姓名" class="input" v-model="name" />
                </div>
                <div class="row flex align-items">
                    <div class="name">身份证号</div>
                    <input type="text" placeholder="二代身份证号" class="input" v-model="cardNum" />
                </div>
                <div class="row flex align-items">
                    <div class="name">身份证正面</div>
                    <div class="img-wrap">
                        <img :src="cardImg1" class="img" v-show="cardImg1" />
                        <input
                            type="file"
                            class="filepath"
                            @change="uploadFile($event,1)"
                            accept="image/jpg, image/jpeg, image/png, image/PNG"
                        />
                        <div class="text">
                            <img src="../assets/img/icon-camera.png" class="icon" />

                            <p>上传身份证正面</p>
                        </div>
                    </div>
                </div>
                <div class="row flex align-items">
                    <div class="name">身份证反面</div>
                    <div class="img-wrap">
                        <img :src="cardImg2" class="img" v-show="cardImg2" />
                        <input
                            type="file"
                            class="filepath"
                            @change="uploadFile($event,2)"
                            accept="image/jpg, image/jpeg, image/png, image/PNG"
                        />
                        <div class="text">
                            <img src="../assets/img/icon-camera.png" class="icon" />
                            <p>上传身份证反面</p>
                        </div>
                    </div>
                </div>
                <div class="row flex align-items">
                    <div class="name">手机</div>
                    <input type="text" placeholder="请输入手机号码" v-model="phone" class="phone" />
                    <div class="btn btnclick unselect">{{word}}</div>
                </div>
                <div class="row flex align-items">
                    <div class="name">验证码</div>
                    <input type="text" placeholder="请输入验证码" v-model="code" class="input" />
                </div>
            </div>
            <div class="btn-sure btnclick unselect" @click="submitInfo">确认提交</div>
            <p class="hint">小熊电竞会严格保密您的信息</p>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>

<script>
import { validateMobilePhone, validateMessageCode } from "../common/util/tools";
export default {
    components: {},
    props: {
        show: {
            type: Boolean,
            default: true,
        },
    },
    name: "attestation",
    data() {
        return {
            phone: "",
            code: "",
            word: "获取验证码",
            sendTimer: null,
            time: 60,
            sendMsgDisabled: false,
            name: "",
            cardNum: "",
            cardImg1: "",
            cardImg2: "",
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
        uploadFile(event, num) {
            let file = event.target.files[0];
            let that = this;
            if (file.size / 1024 > 1024) {
                this.$Message.error("请选择小于1M的图片");
                return;
            }
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                let formData = new FormData();
                formData.append("file", file);
                reader.onload = () => {
                    if (num == 1) {
                        this.cardImg1 = reader.result;
                    } else {
                        this.cardImg2 = reader.result;
                    }
                    this.$forceUpdate();
                };
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
        submitInfo() {
            this.cancel();
            this.$emit("submit");
        },
    },
};
</script>
<style lang='scss' scoped>
.content {
    // padding: 25px 33px;
    min-height: 350px;
    .line {
        width: 100%;
        height: 13px;
        background: rgba(254, 148, 2, 1);
    }
    .title {
        position: relative;
        width: 100%;
        padding: 40px 0 30px;
        font-size: 21px;
        color: rgba(51, 51, 51, 1);
        text-align: center;
    }
    .row {
        width: 75%;
        margin: 0 auto 30px;
        .name {
            width: 110px;
            padding-right: 30px;
            font-size: 16px;
            text-align: right;
            color: rgba(51, 51, 51, 1);
        }
        .input {
            width: 332px;
            height: 42px;
            line-height: 42px;
            padding: 0 20px;
            font-size: 14px;
            background: rgba(247, 247, 247, 1);
            border-radius: 6px;
            border: 1px solid rgba(216, 216, 216, 1);
        }
        .img-wrap {
            position: relative;
            width: 328px;
            height: 152px;
            border: 1px solid rgba(216, 216, 216, 1);
            .img {
                position: absolute;
                left: 0;
                top: 0;
                width: 328px;
                height: 152px;
                z-index: 0;
            }
            .filepath {
                cursor: pointer;
                position: absolute;
                left: 0;
                top: 0;
                width: 328px;
                height: 152px;
                display: block;
                z-index: 3;
                opacity: 0;
            }
            .text {
                position: absolute;
                left: 0;
                top: 0;
                width: 328px;
                height: 152px;
                z-index: 1;
                overflow: hidden;
                .icon {
                    display: block;
                    width: 32px;
                    height: 28px;
                    margin: 40px auto 10px;
                }
                p {
                    font-size: 14px;
                    text-align: center;
                    color: rgba(153, 153, 153, 1);
                }
            }
        }
        .phone {
            width: 217px;
            height: 42px;
            padding: 0 20px;
            line-height: 42px;
            font-size: 14px;
            margin-right: 13px;
            background: rgba(247, 247, 247, 1);
            border-radius: 6px;
            border: 1px solid rgba(216, 216, 216, 1);
        }
        .btn {
            cursor: pointer;
            width: 98px;
            height: 42px;
            line-height: 42px;
            text-align: center;
            font-size: 14px;
            color: rgba(255, 152, 0, 1);
            border-radius: 6px;
            border: 1px solid rgba(250, 157, 17, 1);
        }
    }
    .btn-sure {
        cursor: pointer;
        width: 270px;
        height: 42px;
        line-height: 42px;
        text-align: center;
        font-size: 18px;
        margin: 0 auto 16px;
        color: rgba(255, 255, 255, 1);
        background: linear-gradient(
            180deg,
            rgba(240, 182, 52, 1) 0%,
            rgba(254, 146, 1, 1) 100%
        );
        border-radius: 21px;
    }
    .hint {
        text-align: center;
        font-size: 12px;
        color: rgba(153, 153, 153, 1);
        padding-bottom: 30px;
    }
}
/deep/ .ivu-modal-header,
/deep/ .ivu-modal-footer {
    height: 0;
    padding: 0;
    border: 0;
}
/deep/ .ivu-modal-content {
    border-radius: 0;
}
/deep/ .ivu-modal-body {
    padding: 0;
}
/deep/ .ivu-modal-close {
    right: 10px;
    top: 20px;
    font-size: 30px;
}
/deep/ .ivu-icon-ios-close {
    font-size: 35px !important;
    font-weight: bold !important;
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
.close {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}
@media screen and (max-height: 860px) {
    .content {
        min-height: unset !important;
        height: 700px;
        overflow-y: auto;
    }
}
</style>