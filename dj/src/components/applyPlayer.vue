<template>
  <Modal
    :value="showApply"
    width="590"
    class="login"
    @on-ok="sure"
    @on-cancel="cancel"
    :closable="false"
  >
    <div slot="header"></div>
    <div class="content clearfix">
      <div class="line"></div>
      <div class="title">
        申请入驻
        <span>（以下内容全部为必填项）</span>
        <img src="../assets/img/icon-close-2.png" class="close" @click="cancel" />
      </div>
      <div class="container">
        <div class="row flex align-items">
          <div class="name" :class="{red:hint.indexOf('headImg')>-1}">头像:</div>
          <div class="head-img-wrap flex align-items">
            <img :src="headSrc" class="head" v-if="headSrc" />
            <img src="../assets/img/loginu.png" class="head" v-else />
            <div class="temp head" v-if="flag">
              <Icon class="shak" type="md-cloud-upload" color="#111" />
            </div>
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
          <div class="name" :class="{red:hint.indexOf('nickName')>-1}">昵称:</div>
          <input type="text" placeholder="请输入您的昵称" class="input" v-model="nickName" />
        </div>
        <div class="row flex align-items">
          <div class="name" :class="{red:hint.indexOf('sex')>-1}">性别:</div>
          <el-radio-group v-model="sex">
            <el-radio :label="2">女</el-radio>
            <el-radio :label="1">男</el-radio>
          </el-radio-group>
        </div>
        <div class="row flex align-items">
          <div class="name" :class="{red:hint.indexOf('birthDate')>-1}">年龄:</div>
          <el-date-picker v-model="birth" type="date" placeholder="选择日期" @change="slectYear"></el-date-picker>
        </div>
        <div class="row flex align-items">
          <div class="name" :class="{red:hint.indexOf('introduce')>-1}">自我介绍:</div>
          <textarea class="introduce" placeholder="0/20" v-model="introduce"></textarea>
        </div>
        <div class="row flex align-items z9">
          <div class="name fl" :class="{red:hint.indexOf('photos')>-1}">上传照片:</div>
          <div class="img-list fl clearfix mart">
            <div class="img-box box1 br" :class="{zIndx:index==0}" @click="index=0">
              <img :src="imgList[0]" class="img" v-show="imgList[0]" />
              <div class="temp" v-if="imgindexList.indexOf(0)>-1">
                <Icon class="shak" type="md-cloud-upload" color="#111" />
              </div>
              <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event,0)"></ImgCutter>
            </div>
            <div class="img-box box2 pos1 br bb" :class="{zIndx:index==1}" @click="index=1">
              <img :src="imgList[1]" class="img" v-show="imgList[1]" />
              <div class="temp" v-if="imgindexList.indexOf(1)>-1">
                <Icon class="shak" type="md-cloud-upload" color="#111" />
              </div>
              <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event,1)"></ImgCutter>
            </div>
            <div class="img-box box2 pos2 bb" :class="{zIndx:index==2}" @click="index=2">
              <img :src="imgList[2]" class="img" v-show="imgList[2]" />
              <div class="temp" v-if="imgindexList.indexOf(2)>-1">
                <Icon class="shak" type="md-cloud-upload" color="#111" />
              </div>
              <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event,2)"></ImgCutter>
            </div>
            <div class="img-box box2 pos3 br" :class="{zIndx:index==3}" @click="index=3">
              <img :src="imgList[3]" class="img" v-show="imgList[3]" />
              <div class="temp" v-if="imgindexList.indexOf(3)>-1">
                <Icon class="shak" type="md-cloud-upload" color="#111" />
              </div>
              <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event,3)"></ImgCutter>
            </div>
            <div class="img-box box2 pos4" :class="{zIndx:index==4}" @click="index=4">
              <img :src="imgList[4]" class="img" v-show="imgList[4]" />
              <div class="temp" v-if="imgindexList.indexOf(4)>-1">
                <Icon class="shak" type="md-cloud-upload" color="#111" />
              </div>
              <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event,4)"></ImgCutter>
            </div>
          </div>
        </div>
        <div class="row clearfix">
          <div class="name fl">微信名片:</div>
          <div class="wechat fl clearfix mart">
            <div class="upload">
              <img :src="wechatSrc" class="img" v-show="wechatSrc" />
              <div class="temp" v-if="imgindexList.indexOf(5)>-1">
                <Icon class="shak" type="md-cloud-upload" color="#111" />
              </div>
              <input
                type="file"
                class="filepath"
                @change="uploadFileImg($event,'wechatSrc')"
                accept="image/jpg, image/jpeg, image/png, image/PNG"
              />
              <div class="text">选择图片</div>
            </div>
          </div>
        </div>
        <div class="row voice unselect">
          <div class="name fl" :class="{red:hint.indexOf('sound')>-1}">选择音色:</div>
          <div class="voice-list voice-wrap fl mart" v-if="sex">
            <p class="tag-type" v-if="sex==2">女生：</p>
            <ul class="list flex" v-if="sex==2">
              <li
                class="item"
                :class="{active:sound==item.value}"
                v-for="(item,index) in haveSoundList[1].soundList"
                :key="index"
                @click="selectVoice(item.value)"
              >
                {{item.name}}
                <img src="../assets/img/icon-close.png" class="close" />
              </li>
            </ul>
            <p v-if="sex==1">男生:</p>
            <ul class="list flex" v-if="sex==1">
              <li
                class="item"
                :class="{active:sound==item.value}"
                v-for="(item,index) in  haveSoundList[0].soundList"
                :key="index"
                @click="selectVoice(item.value)"
              >
                <img src="../assets/img/icon-close.png" class="close" />
                {{item.name}}
              </li>
            </ul>
          </div>
        </div>
        <div class="row flex align-items translateX z5">
          <div class="name fl" :class="{red:(hint.indexOf('riftRank')>-1)}">段位:</div>
          <div class="level-list flex align-items mart">
            <div class="item fl">
              <p>峡谷段位</p>
              <Select v-model="riftRank" style="width:173px" placeholder="选择历史最高段位">
                <Option v-for="item in level" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <div class="upload">
                <img :src="lolImg" class="img" v-show="lolImg" />
                <div class="temp" v-if="imgindexList.indexOf(6)>-1">
                  <Icon class="shak" type="md-cloud-upload" color="#111" />
                </div>
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
              <Select v-model="tacticsRank" style="width:173px" placeholder="选择历史最高段位">
                <Option v-for="item in level" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <div class="upload">
                <img :src="ydzy" class="img" v-show="ydzy" />
                <div class="temp" v-if="imgindexList.indexOf(7)>-1">
                  <Icon class="shak" type="md-cloud-upload" color="#111" />
                </div>
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
        <div class="row flex align-items z0">
          <div class="name fl" :class="{red:hint.indexOf('playPosition')>-1}">主玩位置:</div>
          <div class="voice-list fl play-pos">
            <ul class="list flex">
              <li
                class="item"
                :class="{active:playPosition.indexOf(item.value)>-1}"
                v-for="(item,index) in posPlayer"
                :key="index"
                @click="slectPlayer(item.value)"
              >
                {{item.label}}
                <img src="../assets/img/icon-close.png" class="close" />
              </li>
            </ul>
          </div>
        </div>
        <div class="row flex align-items z0">
          <div class="name fl" :class="{red:hint.indexOf('playHero')>-1}">主玩英雄:</div>
          <textarea class="textarea fl mart" v-model="playHero" placeholder="建议输入三个英雄"></textarea>
        </div>
        <div class="row flex align-items">
          <div class="name fl mart" :class="{red:hint.indexOf('soundFile')>-1}">上传语音条:</div>
          <div class="upload-voice fl">
            <div class="temp-voice flex align-items justify-content" v-if="voiceFlag">
              <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
              <span>正在上传...</span>
            </div>
            <span v-if="!mp3Src">点击上传本地录音</span>
            <audio :src="mp3Src" ref="audio" class="audio">您的浏览器不支持音频播放</audio>
            <div class="play-wrap flex align-items space-between" v-if="mp3Src">
              <Icon type="md-play" v-if="!ispalying" @click="play" />
              <Icon type="md-pause" v-else @click="stop" />
              <input type="file" class="reupload" @change="uploadVoice($event)" accept="mp3" />
              <div class="temps">重新上传</div>
            </div>
            <input type="file" class="upvoice" @change="uploadVoice($event)" accept="mp3" />
          </div>
        </div>
      </div>
      <Button class="btn-sure" type="default" :loading="loading" @click="toAuth">确认提交</Button>
    </div>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
import ImgCutter from "vue-img-cutter";
import { validateMobilePhone, validateMessageCode } from "../common/util/tools";
import { soundList } from "../common/api/common";
import { upload, getUserInfo } from "../common/api/user";
import { config } from "../common/config";
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";

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
      posPlayer: [],
      nickName: "", //昵称
      headSrc: "", //头像
      sex: "", //性别
      birth: "",
      introduce: "", //自我介绍
      level: [],
      index: "",
      riftRank: "",
      tacticsRank: "",
      imgList: ["", "", "", "", ""],
      photos: ["", "", "", "", ""],
      lolImg: "",
      ydzy: "",
      playHero: "",
      mp3Src: "",
      ispalying: false,
      haveSoundList: [],
      headImg: "",
      birthDate: "",
      sound: "",
      riftImg: "",
      tacticsImg: "",
      playPosition: [],
      hint: [],
      soundFile: "",
      loading: false,
      wechatImg: "",
      wechatSrc: "",
      imgindexList: [],
      flag: false,
      voiceFlag: false,
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  created() {},
  mounted() {
    this.level = config.level;
    this.posPlayer = config.posPlayer;
    this.getsoundList();
  },
  methods: {
    ...mapMutations({
      setUserInfo: "user/SET_USER_INFO",
    }),
    async getsoundList() {
      if (localStorage.getItem("haveSoundList")) {
        this.haveSoundList = JSON.parse(localStorage.getItem("haveSoundList"));
        return;
      }
      try {
        let res = await soundList();
        if (res.resultCode == "0000") {
          this.haveSoundList = res.data || [];
          localStorage.setItem(
            "haveSoundList",
            JSON.stringify(this.haveSoundList)
          );
        }
      } catch (error) {}
    },
    slectPlayer(num) {
      let index = this.playPosition.indexOf(num);
      if (index > -1) {
        this.playPosition.splice(index, 1);
      } else {
        if (this.playPosition.length >= 2) {
          this.$Message.warning("只能添加两个位置");
          return;
        }
        this.playPosition.push(num);
      }
    },
    sure() {
      console.log("ssss");
    },
    cancel() {
      this.$emit("closed");
    },
    selectVoice(value) {
      this.sound = value;
    },
    uploadFile(event, num) {
      let file = event.target.files[0];
      let that = this;
      if (file.size / 1024 > 5120) {
        this.$Message.error("请选择小于5M的图片");
        return;
      }
      if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        this.flag = true;
        reader.onload = () => {
          this.headSrc = reader.result;
          this.toupload(file)
            .then((res) => {
              this.headImg = res.data;
              this.flag = false;
            })
            .catch((err) => {
              this.headSrc = "";
              this.flag = false;
            });
          this.$forceUpdate();
        };
      }
    },
    slectYear(e) {
      let time = new Date(e);
      let m =
        time.getMonth() + 1 > 9
          ? time.getMonth() + 1
          : "0" + (time.getMonth() + 1);
      let d = time.getDate() > 9 ? time.getDate() : "0" + time.getDate();
      this.birthDate = `${time.getFullYear()}-${m}-${d}`;
    },
    cutDown: function (res, index) {
      let that = this;
      this.toupload(res.file).then((res) => {
        that.photos[index] = res.data;
      });
      this.imgList[index] = res.dataURL;
      this.$forceUpdate();
      this.index = "";
    },
    uploadFileImg(event, name) {
      let file = event.target.files[0];
      let that = this;
      if (file.size / 1024 > 5120) {
        this.$Message.error("请选择小于1M的图片");
        return;
      }
      if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (name == "lolImg") {
            this[name] = reader.result;
            this.delIndex(6);
            this.imgindexList.push(6);
            this.toupload(file)
              .then((res) => {
                this.riftImg = res.data;
                this.delIndex(6);
              })
              .catch((err) => {
                this[name] = "";
                this.delIndex(6);
              });
          } else if (name == "ydzy") {
            this[name] = reader.result;
            this.delIndex(7);
            this.imgindexList.push(7);
            this.toupload(file)
              .then((res) => {
                this.tacticsImg = res.data;
                this.delIndex(7);
              })
              .catch((err) => {
                this[name] = "";
                this.delIndex(7);
              });
          } else if (name == "wechatSrc") {
            this[name] = reader.result;
            this.delIndex(5);
            this.imgindexList.push(5);
            this.toupload(file)
              .then((res) => {
                this.wechatImg = res.data;
                this.delIndex(5);
              })
              .catch((err) => {
                this[name] = "";
                this.delIndex(5);
              });
          }

          this.$forceUpdate();
        };
      }
    },
    delIndex(index) {
      if (this.imgindexList.indexOf(index) > -1) {
        this.imgindexList.splice(this.imgindexList.indexOf(index), 1);
      }
    },
    uploadVoice(event) {
      let file = event.target.files[0];
      if (file.size / 1024 > 2048) {
        this.$Message.error("请选择小于2M");
        return;
      }
      if (file) {
        if (file.type != "audio/mpeg") {
          this.$Message.warning("只支持MP3格式");
          return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        this.voiceFlag = true;
        reader.onload = () => {
          this.toupload(file)
            .then((res) => {
              this.soundFile = res.data;
              this.voiceFlag = false;
            })
            .catch((res) => {
              this.$Message.warning("上传失败！");
              this.voiceFlag = false;
              this.soundFile = "";
            });
          this.mp3Src = reader.result;
          this.$forceUpdate();
        };
      }
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
    async toAuth() {
      if (this.imgindexList.length > 0) {
        this.$Message.warning("图片正在上传，请稍等");
        return;
      }

      if (this.voiceFlag) {
        this.$Message.warning("音频正在上传，请稍等");
        return;
      }
      this.hint = [];
      let num = 0;
      let must = [
        "headImg",
        "birthDate",
        "introduce",
        "nickName",
        "sex",
        "photos",
        "playHero",
        "playPosition",
        "riftImg",
        "riftRank",
        "sound",
        "soundFile",
        "tacticsImg",
        "tacticsRank",
        "wechatImg",
      ];
      for (let i = 0; i < must.length; i++) {
        if (must[i] == "photos") {
          for (let j = 0; j < this.photos.length; j++) {
            if (this.photos[j]) {
              num++;
            }
          }
          if (num < 1) {
            this.$Message.warning("至少上传一张个人相片");
            this.hint.push("photos");
          }
        } else if (
          (must[i] == "riftImg" ||
            must[i] == "riftRank" ||
            must[i] == "tacticsImg" ||
            must[i] == "tacticsRank") &&
          !this[must[i]]
        ) {
          this.hint.push("riftRank");
        } else {
          if (!this[must[i]] || this[must[i]].length <= 0) {
            this.hint.push(must[i]);
          }
        }
      }
      if (
        (this.riftImg && this.riftRank) ||
        (this.tacticsImg && this.tacticsRank)
      ) {
        for (let j = this.hint.length; j > -1; j--) {
          if (this.hint[j] == "riftRank") {
            this.hint.splice(j, 1);
          }
        }
      }
      if (this.hint.length > 0) {
        this.$Message.warning("请填写完整");
        return;
      }

      try {
        this.loading = true;
        let data = new FormData();
        for (let i = 0; i < must.length; i++) {
          if (must[i] == "photos") {
            console.log("s1")

            data.append("photo", this[must[i]].join("@"));
          } else {
            data.append(must[i], this[must[i]]);
            console.log("s2")
          }
        }
        data.append("userId", this.userData.userId);
        let configs = {
          //添加请求头
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        axios
          .post(config.baseUrl + "user/playerApply", data, configs)
          .then((res) => {
            if (res.resultCode == "0000") {
              this.$Message.success("提交成功");
              this.gotUserInfo();
              this.cancel();
            } else {
              this.$Message.warning(res.message);
            }
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.$Message.warning("提交失败");
            this.loading = false;
          });
      } catch (error) {}
    },
    async gotUserInfo() {
      if (!this.userData) return;
      try {
        let res = await getUserInfo({
          userId: this.userData.userId || "",
        });
        if (res.resultCode == "0000") {
          this.setUserInfo(res.data);
        }
      } catch (error) {}
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
    toupload(file, name) {
      let data = new FormData();
      data.append("file", file);
      let das = "";
      let configs = {
        //添加请求头
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      return axios.post(config.baseUrl + "user/upload", data, configs);
    },
  },
};
</script>
<style lang='scss' scoped>
.content {
  // padding: 25px 33px;
  min-height: 350px;
  padding-bottom: 20px;
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
    .close {
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
      position: relative;
      .head {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 20px;
      }
      .temp {
        width: 50px;
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        text-align: center;
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
        text-align: center;
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
        line-height: 148px;
        font-size: 35px;
      }
      .box2 {
        position: absolute;
        width: 80px;
        height: 74px;
        line-height: 74px;
        z-index: 0;
        font-size: 25px;
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
    .voice-wrap {
      width: 340px !important;
    }
    .voice-list {
      width: 360px;
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
          line-height: 110px;
          text-align: center;
          margin-top: 10px;
          font-size: 26px;
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
            font-size: 14px;
            color: #999;
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
      .temp-voice {
        position: absolute;
        top: 0;
        left: 0;
        width: 148px;
        height: 33px;
        z-index: 999;
        background-color: rgba(0, 0, 0, 0.5);
        color: #fff;
        border-radius: 6px;
      }
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
        .temps {
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
    display: block;
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
.wechat {
  position: relative;
  width: 150px;
  height: 150px;
  line-height: 150px;
  background: #e7e7e7;
  text-align: center;
  font-size: 30px;
  .filepath {
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 0;
    width: 150px;
    height: 150px;
    z-index: 9;
    opacity: 0;
  }
  .img {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    width: 150px;
    height: 150px;
  }
  .text {
    width: 100%;
    position: absolute;
    z-index: 8;
    font-size: 14px;
    color: #999;
    text-align: center;
  }
}
.temp {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: inherit;
  // border-radius: 50%;
  background-color: rgba(153, 153, 153, 0.5);
  z-index: 4;
  .shak {
    animation: show 1s infinite linear;
  }
  @keyframes show {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
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
.translateX {
  transform: translateX(4px);
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
    width: 100%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0);
    border: 0;
    padding: 0;
    text-align: center;
    color: #999;
    z-index: 0;
  }
}
.red {
  color: red !important;
}
@media screen and (max-height: 960px) {
  .content {
    min-height: unset !important;
    height: 700px;
    overflow-y: auto;
  }
}
.z0 {
  position: relative;
  z-index: 0;
}
.z5 {
  position: relative;
  z-index: 5;
}
.z9 {
  position: relative;
  z-index: 19;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>