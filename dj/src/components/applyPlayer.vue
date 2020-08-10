<template>
    <Modal :value="showApply" width="590" class="login" @on-ok="sure" @on-cancel="cancel" :closable="false">
        <div slot="header"></div>
        <div class="content clearfix">
            <div class="line"></div>
            <div class="title">
                申请入驻
                <span>（以下内容全部为必填项）</span>
                <img src="../assets/img/icon-close-2.png" class="close" @click="cancel">
            </div>
            <div class="container">
                <div class="row flex align-items">
                    <div class="name">头像:</div>
                    <div class="head-img-wrap flex align-items">
                        <img :src="headSrc" class="head" />
                        <div class="btn-upload-head">
                            <input
                                type="file"
                                class="filepath"
                                @change="uploadFile($event,1)"
                                accept="image/jpg, image/jpeg, image/png, image/PNG"
                            />
                            上传头像
                        </div>
                    </div>
                </div>
                <div class="row flex align-items">
                    <div class="name">昵称:</div>
                    <input type="text" placeholder="请输入您的昵称" class="input" v-model="nikename" />
                </div>
                <div class="row flex align-items">
                    <div class="name">性别:</div>
                    <el-radio-group v-model="gender">
                        <el-radio :label="0">女</el-radio>
                        <el-radio :label="1">男</el-radio>
                    </el-radio-group>
                </div>
                <div class="row flex align-items">
                    <div class="name">年龄:</div>
                    <el-date-picker v-model="birth" type="date" placeholder="选择日期"></el-date-picker>
                </div>
                <div class="row flex align-items">
                    <div class="name">自我介绍:</div>
                    <textarea class="introduce" placeholder="0/20" v-model="introduce"></textarea>
                </div>
                <div class="row flex align-items">
                    <div class="name fl">上传照片:</div>
                    <div class="img-list fl clearfix mart">
                        <div class="img-box box1 br" :class="{zIndx:index==0}" @click="index=0">
                            <img :src="imgList[0]" class="img" v-show="imgList[0]" />
                            <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event)"></ImgCutter>
                        </div>
                        <div
                            class="img-box box2 pos1 br bb"
                            :class="{zIndx:index==1}"
                            @click="index=1"
                        >
                            <img :src="imgList[1]" class="img" v-show="imgList[1]" />
                            <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event)"></ImgCutter>
                        </div>
                        <div
                            class="img-box box2 pos2 bb"
                            :class="{zIndx:index==2}"
                            @click="index=2"
                        >
                            <img :src="imgList[2]" class="img" v-show="imgList[2]" />
                            <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event)"></ImgCutter>
                        </div>
                        <div
                            class="img-box box2 pos3 br"
                            :class="{zIndx:index==3}"
                            @click="index=3"
                        >
                            <img :src="imgList[3]" class="img" v-show="imgList[3]" />
                            <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event)"></ImgCutter>
                        </div>
                        <div class="img-box box2 pos4" :class="{zIndx:index==4}" @click="index=4">
                            <img :src="imgList[4]" class="img" v-show="imgList[4]" />
                            <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event)"></ImgCutter>
                        </div>
                    </div>
                </div>
                <div class="row flex align-items">
                    <div class="name fl">选择音色:</div>
                    <div class="voice-list fl mart">
                        <p class="tag-type">女生：</p>
                        <ul class="list flex">
                            <li class="item" :class="{active:index==1}" v-for="(item,index) in 3">
                                萝莉音
                                <img src="../assets/img/icon-close.png" class="close" />
                            </li>
                        </ul>
                        <p>男生:</p>
                        <ul class="list flex" style="margin-bottom:0;">
                            <li
                                class="item"
                                :class="{active:index==1}"
                                v-for="(item,index) in 3"
                            >大叔音</li>
                        </ul>
                    </div>
                </div>
                <div class="row flex align-items translateX" >
                    <div class="name fl">段位:</div>
                    <div class="level-list flex align-items mart">
                        <div class="item fl">
                            <p>峡谷段位</p>
                            <Select v-model="model1" style="width:173px" placeholder="选择历史最高段位">
                                <Option
                                    v-for="item in cityList"
                                    :value="item.value"
                                    :key="item.value"
                                >{{ item.label }}</Option>
                            </Select>
                            <div class="upload">
                                <img :src="lolImg" class="img" v-show="lolImg" />
                                <input
                                    type="file"
                                    class="filepath"
                                    @change="uploadFileImg($event,'lolImg')"
                                    accept="image/jpg, image/jpeg, image/png, image/PNG"
                                />
                                <div class="text">选择图片</div>
                            </div>
                        </div>
                        <div class="item fl">
                            <p>云顶之弈段位</p>
                            <Select v-model="model1" style="width:173px" placeholder="选择历史最高段位">
                                <Option
                                    v-for="item in cityList"
                                    :value="item.value"
                                    :key="item.value"
                                >{{ item.label }}</Option>
                            </Select>
                            <div class="upload">
                                <img :src="ydzy" class="img" v-show="ydzy" />
                                <input
                                    type="file"
                                    class="filepath"
                                    @change="uploadFileImg($event,'ydzy')"
                                    accept="image/jpg, image/jpeg, image/png, image/PNG"
                                />
                                <div class="text">选择图片</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row flex align-items">
                    <div class="name fl">主玩位置:</div>
                    <div class="voice-list fl play-pos">
                        <ul class="list flex">
                            <li class="item" :class="{active:index==1}" v-for="(item,index) in 3">
                                上单
                                <img src="../assets/img/icon-close.png" class="close" />
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="row flex align-items">
                    <div class="name fl">主玩英雄:</div>
                    <textarea
                        class="textarea fl mart"
                        v-model="likePlayerText"
                        placeholder="建议输入三个英雄"
                    ></textarea>
                </div>
                <div class="row flex align-items">
                    <div class="name fl mart">上传语音条:</div>
                    <div class="upload-voice fl">
                        <span v-if="!mp3Src">点击修改本地录音</span>
                        <audio :src="mp3Src" ref="audio" class="audio">您的浏览器不支持音频播放</audio>
                        <div class="play-wrap flex align-items space-between" v-if="mp3Src">
                            <Icon type="md-play" v-if="!ispalying" @click="play" />
                            <Icon type="md-pause" v-else @click="stop" />
                            <input
                                type="file"
                                class="reupload"
                                @change="uploadVoice($event)"
                                accept="mp3"
                            />
                            <div class="temp">重新上传</div>
                        </div>
                        <input
                            type="file"
                            class="upvoice"
                            @change="uploadVoice($event)"
                            accept="mp3"
                        />
                    </div>
                </div>
            </div>
            <div class="btn-sure btnclick unselect">确认提交</div>
        </div>
        <div slot="footer"></div>
    </Modal>
</template>

<script>
import ImgCutter from "vue-img-cutter";
import { validateMobilePhone, validateMessageCode } from "../common/util/tools";
export default {
    components: { ImgCutter },
    props: {
        showApply: {
            type: Boolean,
            default: true,
        },
    },
    name: "applyPlayer",
    data() {
        return {
            phone: "",
            code: "",
            word: "获取验证码",
            sendTimer: null,
            time: 60,
            sendMsgDisabled: false,
            nikename: "", //昵称
            headSrc: "", //头像
            gender: "", //性别
            birth: "",
            introduce: "", //自我介绍
            cityList: [
                {
                    value: "1",
                    label: "青铜",
                },
                {
                    value: "2",
                    label: "白银",
                },
                {
                    value: "3",
                    label: "黄金",
                },
                {
                    value: "4",
                    label: "钻石",
                },
                {
                    value: "5",
                    label: "大师",
                },
                {
                    value: "6",
                    label: "王者",
                },
            ],
            index: "",
            model1: "",
            imgList: ["", "", "", "", ""],
            lolImg: "",
            ydzy: "",
            likePlayerText: "",
            mp3Src: "",
            ispalying: false,
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
                reader.onload = () => {
                    if (num == 1) {
                        this.headSrc = reader.result;
                    } else {
                        this.cardImg2 = reader.result;
                    }
                    this.$forceUpdate();
                };
            }
        },
        cutDown: function (res) {
            console.log(res);
            this.imgList[this.index] = res.dataURL;
            this.$forceUpdate();
            this.index = "";
        },
        uploadFileImg(event, name) {
            let file = event.target.files[0];
            let that = this;
            // if (file.size / 1024 > 1024) {
            //     this.$Message.error("请选择小于1M的图片");
            //     return;
            // }

            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                    // this.imgList.push(reader.result);
                    this[name] = reader.result;
                    this.$forceUpdate();
                    // updata();
                };
            }
        },
        uploadVoice(event) {
            let file = event.target.files[0];
            if (file) {
                if (file.type != "audio/mpeg") {
                    this.$Message.warning("只支持MP3格式");
                    return;
                }
                let reader = new FileReader();
                reader.readAsDataURL(file);
                // reader.readAsArrayBuffer(file);
                reader.onload = () => {
                    console.log(reader);
                    this.mp3Src = reader.result;
                    // this[name] = reader.result;
                    this.$forceUpdate();
                    // updata();
                };
            }
            console.log(event);
        },
        play() {
            if (!this.ispalying) {
                this.$refs.audio.play();
                this.ispalying = true;
            }
            this.$forceUpdate();
        },
        stop() {
            if (this.ispalying) {
                this.$refs.audio.pause();
                this.ispalying = false;
            }
            this.$forceUpdate();
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
        padding: 27px 0 11px;
        font-size: 21px;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        border-bottom: 1px solid #efefef;
        margin-bottom: 10px;
        span {
            font-size: 12px;
            color: rgba(255, 127, 127, 1);
        }
        .close{
            cursor: pointer;
            position: absolute;
            top: 20px;
            right: 20px;
            width: 20px;
            height: 20px;
        }
    }
    .row {
        width: 80%;
        margin: 0 auto 30px;
        .name {
            width: 110px;
            padding-right: 20px;
            font-size: 16px;
            text-align: right;
            color: rgba(51, 51, 51, 1);
        }
        .head-img-wrap {
            .head {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 20px;
            }
            .btn-upload-head {
                cursor: pointer;
                position: relative;
                width: 69px;
                height: 27px;
                background: rgba(247, 247, 247, 1);
                border-radius: 6px;
                border: 1px solid rgba(216, 216, 216, 1);
                line-height: 27px;
                text-align: center;
                font-size: 14px;
                color: rgba(153, 153, 153, 1);
            }
            .filepath {
                cursor: pointer;
                position: absolute;
                left: 0;
                top: 0;
                width: 69px;
                height: 27px;
                opacity: 0;
                z-index: 2;
            }
        }
        .introduce {
            width: 332px;
            height: 95px;
            background: rgba(247, 247, 247, 1);
            border-radius: 6px;
            padding: 10px 20px;
            resize: none;
            font-size: 14px;
            border: 1px solid rgba(216, 216, 216, 1);
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
        .img-list {
            position: relative;
            width: 330px;
            height: 148px;
            background: rgba(247, 247, 247, 1);
            border: 1px solid rgba(216, 216, 216, 1);
            .zIndx {
                z-index: 99 !important;
            }
            .img-box {
                position: relative;
                img {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                }
            }
            .box1 {
                width: 170px;
                height: 148px;
            }
            .box2 {
                position: absolute;
                width: 80px;
                height: 74px;
                z-index: 0;
            }
            .pos1 {
                top: 0;
                left: 170px;
            }
            .pos2 {
                top: 0;
                right: 0;
            }
            .pos3 {
                top: 74px;
                left: 170px;
            }
            .pos4 {
                top: 74px;
                right: 0;
            }
        }
        .level-list {
            .item {
                // position: relative;
                z-index: 0;
            }
        }
        .voice-list {
            .tag-type {
                font-size: 14px;
                color: rgba(102, 102, 102, 1);
            }
            .list {
                margin-top: 10px;
                margin-bottom: 26px;
                .item {
                    cursor: pointer;
                    display: inline-block;
                    position: relative;
                    width: 70px;
                    height: 27px;
                    line-height: 27px;
                    text-align: center;
                    margin-right: 10px;
                    border-radius: 6px;
                    border: 1px solid rgba(218, 218, 218, 1);
                    .close {
                        cursor: pointer;
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 12px;
                        height: 12px;
                    }
                }
                .active {
                    background: rgba(244, 172, 38, 1);
                    border: 1px solid rgba(244, 172, 38, 1);
                    color: #fff;
                }
            }
        }
        .level-list {
            .item {
                margin-right: 20px;
                p {
                    font-size: 14px;
                    margin-bottom: 5px;
                    color: rgba(102, 102, 102, 1);
                }
                .upload {
                    cursor: pointer;
                    position: relative;
                    width: 173px;
                    height: 110px;
                    margin-top: 10px;
                    background: rgba(231, 231, 231, 1);
                    cursor: pointer;
                    .img {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 173px;
                        height: 110px;
                        z-index: 0;
                    }
                    .filepath {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 173px;
                        height: 110px;
                        z-index: 3;
                        opacity: 0;
                    }
                    .text {
                        position: absolute;
                        top: 50%;
                        width: 100%;
                        text-align: center;
                        transform: translateY(-50%);
                        z-index: 1;
                    }
                }
            }
            .item:last-child {
                margin-right: 0;
            }
        }
        .play-pos {
            .list {
                margin-top: 0;
                margin-bottom: 0;
            }
        }
        .textarea {
            width: 332px;
            height: 95px;
            background: rgba(247, 247, 247, 1);
            border-radius: 6px;
            padding: 10px 20px;
            font-size: 14px;
            border: 1px solid rgba(216, 216, 216, 1);
            resize: none;
        }
        .upload-voice {
            position: relative;
            cursor: pointer;
            width: 148px;
            height: 33px;
            line-height: 33px;
            text-align: center;
            font-size: 14px;
            color: rgba(153, 153, 153, 1);
            background: rgba(232, 232, 232, 1);
            border-radius: 6px;
            .audio {
                opacity: 0;
                width: 1px;
                height: 0;
            }
            .upvoice {
                position: absolute;
                top: 0;
                left: 0;
                width: 148px;
                height: 33px;
                z-index: 1;
                opacity: 0;
                cursor: pointer;
            }
            .play-wrap {
                position: absolute;
                top: 0;
                left: 0;
                padding: 0 30px;
                width: 148px;
                height: 33px;
                z-index: 9;
                .reupload {
                    cursor: pointer;
                    position: relative;
                    width: 60px;
                    height: 33px;
                    opacity: 0;
                    z-index: 3;
                }
                .temp {
                    position: absolute;
                    top: 0;
                    right: 30px;
                    width: 60px;
                    height: 33px;
                    line-height: 33px;
                    text-align: center;
                    font-size: 14px;
                    z-index: 0;
                }
            }
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
.br {
    border-right: 1px solid #d8d8d8;
}
.bb {
    border-bottom: 1px solid #d8d8d8;
}
.translateX{
    transform: translateX(15px);
}
/deep/ .upImg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    > .btn.btn-primary {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0);
        border: 0;
        padding: 0;
        text-align: center;
        color: #999;
        z-index: 0;
    }
}
@media screen and (max-height: 860px) {
    .content {
        min-height: unset !important;
        height: 700px;
        overflow-y: auto;
    }
}
</style>