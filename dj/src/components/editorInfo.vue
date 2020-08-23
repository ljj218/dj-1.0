<template>
  <div class="editorInfo" ref="editorInfo">
    <div class="row clearfix zindex">
      <div class="name fl">上传照片:</div>
      <div class="img-list fl clearfix mart">
        <div class="img-box box1 br" :class="{zIndx:index==0}" @click="index=0">
          <img :src="imgList[0]" class="img" v-show="imgList[0]" />
          <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event,0)"></ImgCutter>
        </div>
        <div class="img-box box2 pos1 br bb" :class="{zIndx:index==1}" @click="index=1">
          <img :src="imgList[1]" class="img" v-show="imgList[1]" />
          <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event,1)"></ImgCutter>
        </div>
        <div class="img-box box2 pos2 bb" :class="{zIndx:index==2}" @click="index=2">
          <img :src="imgList[2]" class="img" v-show="imgList[2]" />
          <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event,2)"></ImgCutter>
        </div>
        <div class="img-box box2 pos3 br" :class="{zIndx:index==3}" @click="index=3">
          <img :src="imgList[3]" class="img" v-show="imgList[3]" />
          <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event,3)"></ImgCutter>
        </div>
        <div class="img-box box2 pos4" :class="{zIndx:index==4}" @click="index=4">
          <img :src="imgList[4]" class="img" v-show="imgList[4]" />
          <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event,4)"></ImgCutter>
        </div>
      </div>
    </div>
    <div class="row clearfix">
      <div class="name fl">微信名片:</div>
      <div class="wechat fl clearfix mart">
        <div class="upload">
          <img :src="wechatSrc" class="img" v-show="wechatSrc" />
          <input
            type="file"
            class="filepath"
            @change="uploadFile($event,'wechatSrc')"
            accept="image/jpg, image/jpeg, image/png, image/PNG"
          />
          <div class="text">选择图片</div>
        </div>
      </div>
    </div>
    <div class="row clearfix unselect" v-if="haveSoundList">
      <div class="name fl">选择音色:</div>
      <div class="voice-list fl mart">
        <p class="tag-type">女生：</p>
        <ul class="list flex">
          <li
            class="item"
            :class="{active:item.value==sound}"
            v-for="(item,index) in haveSoundList[0].soundList"
            :key="index"
            @click="changeSound(item.value)"
          >
            {{item.name}}
            <img src="../assets/img/icon-close.png" class="close" />
          </li>
        </ul>
        <p>男生:</p>
        <ul class="list flex" style="margin-bottom:0;">
          <li
            class="item"
            :class="{active:item.value==sound}"
            v-for="(item,index) in haveSoundList[1].soundList"
            :key="index"
            @click="changeSound(item.value)"
          >
            {{item.name}}
            <img src="../assets/img/icon-close.png" class="close" />
          </li>
        </ul>
      </div>
    </div>
    <div class="row clearfix">
      <div class="name fl">段位:</div>
      <div class="level-list fl clearfix mart">
        <div class="item fl">
          <p>峡谷段位</p>
          <Select v-model="riftRank" style="width:173px" placeholder="选择历史最高段位">
            <Option
              v-for="item in riftRankList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
          <div class="upload">
            <img :src="lolImg" class="img" v-show="lolImg" />
            <input
              type="file"
              class="filepath"
              @change="uploadFile($event,'lolImg')"
              accept="image/jpg, image/jpeg, image/png, image/PNG"
            />
            <div class="text">选择图片</div>
          </div>
        </div>
        <div class="item fl">
          <p>云顶之弈段位</p>
          <Select v-model="tacticsRank" style="width:173px" placeholder="选择历史最高段位">
            <Option
              v-for="item in tacticsRankList"
              :value="item.value"
              :key="item.value"
            >{{ item.label }}</Option>
          </Select>
          <div class="upload">
            <img :src="ydzy" class="img" v-show="ydzy" />
            <input
              type="file"
              class="filepath"
              @change="uploadFile($event,'ydzy')"
              accept="image/jpg, image/jpeg, image/png, image/PNG"
            />
            <div class="text">选择图片</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row clearfix unselect">
      <div class="name fl">主玩位置:</div>
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
    <div class="row clearfix">
      <div class="name fl">主玩英雄:</div>
      <textarea class="textarea fl mart" v-model="playHero" placeholder="建议输入三个英雄"></textarea>
    </div>
    <div class="row clearfix">
      <div class="name fl mart">上传语音条:</div>
      <div class="upload-voice fl">
        <span v-if="!mp3Src">点击修改本地录音</span>
        <audio :src="mp3Src" ref="audio" class="audio">您的浏览器不支持音频播放</audio>
        <div class="play-wrap flex align-items space-between" v-if="mp3Src">
          <Icon type="md-play" v-if="!ispalying" @click="play" />
          <Icon type="md-pause" v-else @click="stop" />
          <input type="file" class="reupload" @change="uploadVoice($event)" accept="mp3" />
          <div class="temp">重新上传</div>
        </div>
        <input type="file" class="upvoice" @change="uploadVoice($event)" accept="mp3" />
      </div>
    </div>
    <div class="btn btnclick unselect" @click="toAuth">确认提交</div>
  </div>
</template>

<script>
import ImgCutter from "vue-img-cutter";
import { updateInfo } from "../common/api/user";
import { mapMutations, mapGetters } from "vuex";
import { config } from "../common/config";
import { soundList } from "../common/api/common";
import { upload } from "../common/api/user";
import axios from "axios";
import { getUserInfo } from "../common/api/user";

export default {
  components: { ImgCutter },
  name: "editorInfo",
  data() {
    return {
      riftRankList: [],
      riftRank: "", //峡谷段位
      riftImg: "", //峡谷段位图
      tacticsRankList: [],
      tacticsRank: "", //云顶段位
      tacticsImg: "", //云顶段位图
      posPlayer: [
        //1 上单 2 3中路 4.AD 5辅助
        { value: "1", label: "上单" },
        { value: "2", label: "打野" },
        { value: "3", label: "中路" },
        { value: "4", label: "AD" },
        { value: "5", label: "辅助" },
      ],
      haveSoundList: [],
      playPosition: [],
      index: "",
      model1: "",
      imgList: ["", "", "", "", ""],
      photos: ["", "", "", "", ""], //个人介绍图片多张数组
      lolImg: "",
      ydzy: "",
      playHero: "", //个逗号分隔
      mp3Src: "",
      ispalying: false,
      sound: "", //音色
      soundFiles: "", //声音文件
      wechatImg: "",
      wechatSrc: "",
      info: "",
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  created() {},
  mounted() {
    this.riftRankList = config.level;
    this.tacticsRankList = config.level;
    this.getsoundList();
    this.gotUserInfo();
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
    changeSound(val) {
      this.sound = val;
    },
    //上传用户图片
    cutDown: function (res, index) {
      this.imgList[index] = res.dataURL;
      let that = this;
      this.toupload(res.file).then((res) => {
        that.photos[index] = res.data;
      });
      this.$forceUpdate();
      this.index = "";
    },
    //段位图片上传
    uploadFile(event, name) {
      let file = event.target.files[0];
      let that = this;
      if (file.size / 1024 > 5120) {
        this.$Message.error("请选择小于5M的图片");
        return;
      }
      if (file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (name == "lolImg") {
            this.toupload(file).then((res) => {
              this.riftImg = res.data;
            });
            this[name] = reader.result;
          } else if (name == "ydzy") {
            this.toupload(file).then((res) => {
              this.tacticsImg = res.data;
            });
            this[name] = reader.result;
          } else if (name == "wechatSrc") {
            this.toupload(file).then((res) => {
              this.wechatImg = res.data;
            });
            this[name] = reader.result;
          }

          this.$forceUpdate();
        };
      }
    },
    //上传声音
    uploadVoice(event) {
      let file = event.target.files[0];
      if (file.size / 1024 > 10240) {
        this.$Message.error("请选择小于5M");
        return;
      }
      if (file) {
        if (file.type != "audio/mpeg") {
          this.$Message.warning("只支持MP3格式");
          return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.toupload(file).then((res) => {
            this.soundFiles = res.data;
          });
          this.mp3Src = reader.result;
          this.$forceUpdate();
        };
      }
    },
    async toAuth() {
      let must = [
        "photos",
        "playHero",
        "playPosition",
        "riftImg",
        "riftRank",
        "sound",
        "soundFiles",
        "tacticsImg",
        "tacticsRank",
        "wechatImg",
      ];

      try {
        this.loading = true;
        let data = new FormData();
        for (let i = 0; i < must.length; i++) {
          if (must[i] == "photos") {
            data.append("photo", this[must[i]].join("@"));
          } else {
            data.append(must[i], this[must[i]]);
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
          .post(config.baseUrl + "user/updateInfo", data, configs)
          .then((res) => {
            if (res.resultCode == "0000") {
              this.$Message.success("提交成功");
              this.gotUserInfo();
            } else {
              this.$Message.warning("提交失败");
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
    slectPlayer(num) {
      let index = this.playPosition.indexOf(num);
      if (index > -1) {
        this.playPosition.splice(index, 1);
      } else {
        this.playPosition.push(num);
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
    async gotUserInfo() {
      if (!this.userData) return;
      try {
        let res = await getUserInfo({
          userId: this.userData.userId || "",
        });
        if (res.resultCode == "0000") {
          this.info = res.data;
          this.setUserInfo(res.data);
          this.initParams();
        }
      } catch (error) {}
    },
    initParams(){
        if(!this.info)
        console.log(this.info.wechatImg)
        this.imgList=this.info.photo.split('@');
        this.wechatSrc=this.info.wechatImg;
        this.sound=this.info.sound;
        this.riftRank=String(this.info.riftRank);
        this.lolImg=this.info.riftImg;
        this.tacticsRank=String(this.info.tacticsRank);
        this.ydzy=this.info.tacticsImg;
        this.playPosition=this.info.playPosition?this.info.playPosition.split(','):[];
        this.playHero=this.info.playHero;
        this.mp3Src=this.info.soundFile;
        this.$forceUpdate();
    },
  },
};
</script>
<style lang='scss' scoped>
.zindex {
  position: relative;
  z-index: 99;
}
.editorInfo {
  position: relative;
  width: 994px;
  min-height: 500px;
  padding: 40px;
  padding-right: 0;
  overflow: hidden;
  z-index: 0;
  .row {
    margin-bottom: 30px;
    .name {
      width: 85px;
      font-size: 16px;
      margin-right: 22px;
      text-align: right;
      color: rgba(51, 51, 51, 1);
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
  }
  .btn {
    cursor: pointer;
    width: 270px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    font-size: 18px;
    transform: translateX(85px);
    color: rgba(255, 255, 255, 1);
    background: linear-gradient(
      180deg,
      rgba(240, 182, 52, 1) 0%,
      rgba(254, 146, 1, 1) 100%
    );
    border-radius: 21px;
  }
}
.wechat {
  position: relative;
  width: 150px;
  height: 150px;
  line-height: 150px;
  background: #e7e7e7;
  text-align: center;
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
}
.fl {
  float: left;
}
.br {
  border-right: 1px solid #d8d8d8;
}
.bb {
  border-bottom: 1px solid #d8d8d8;
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
.mart {
  margin-top: 4px;
}
</style>