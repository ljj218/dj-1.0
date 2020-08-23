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
          <input type="text" placeholder="请输入真实姓名" class="input" v-model="userName" />
        </div>
        <div class="row flex align-items">
          <div class="name">身份证号</div>
          <input type="text" placeholder="二代身份证号" class="input" v-model="idCard" />
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
          <input type="text" placeholder="请输入手机号码" v-model="phone" maxlength="11" class="phone" />
          <div class="btn btnclick unselect" @click="send">{{word}}</div>
        </div>
        <div class="row flex align-items">
          <div class="name">验证码</div>
          <input type="text" placeholder="请输入验证码" v-model="code" class="input" />
        </div>
      </div>
      <!-- <div  @click="toAuth">确认提交</div> -->
      <Button class="btn-sure" type="default" :loading="loading" @click="toAuth">确认提交</Button>
      <p class="hint">小熊电竞会严格保密您的信息</p>
    </div>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
import { validateMobilePhone, validateMessageCode } from "../common/util/tools";
import { auth } from "../common/api/user";
import { smsCode } from "../common/api/common";
import { config } from "../common/config";
import { mapMutations, mapGetters } from "vuex";
import axios from "axios";

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
      userName: "",
      idCard: "",
      cardImg1: "",
      cardPreImg: "",
      cardImg2: "",
      cardBackImg: "",
      loading: false,
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },
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
      if (file.size / 1024 > 5120) {
        this.$Message.error("请选择小于5M的图片");
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
            this.cardPreImg = file;
          } else {
            this.cardImg2 = reader.result;
            this.cardBackImg = file;
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
      let data = {
        phone: this.phone,
        type: 1, //2 登录确认验证码 4 用户注册验证码
      };
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
    async toAuth() {
      if (!this.userName) {
        this.$Message.warning("请填写真实姓名");
        return;
      }
      this.IdentityCodeValid(this.idCard);
      if (!this.cardImg1 || !this.cardImg2) {
        this.$Message.warning("请上传身份证照片");
        return;
      }
      if (!validateMobilePhone(this.phone)) {
        this.$Message.warning("请填写手机号码");
        return;
      }
      if (!this.code) {
        this.$Message.warning("请填写手机验证码");
        return;
      }
      try {
        this.loading = true;
        let data = new FormData();
        data.append("cardBackImg", this.cardPreImg);
        data.append("cardPreImg", this.cardPreImg);
        data.append("phone", this.phone);
        data.append("code", this.code);
        data.append("userName", this.userName);
        data.append("idCard", this.idCard);
        data.append("userId", this.userData.userId);
        // let res = await auth(data);
        let configs = {
          //添加请求头
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
        axios
          .post(config.baseUrl + "user/auth", data, configs)
          .then((res) => {
            console.log(res);
            if (res.resultCode == "0000") {
              this.loading = false;
              this.submitInfo();
            }
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      } catch (error) {}
    },
    submitInfo() {
      this.cancel();
      this.$emit("submit");
    },
    IdentityCodeValid(code) {
      var city = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外 ",
      };
      var tip = "";
      var pass = true;

      if (
        !code ||
        !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
          code
        )
      ) {
        tip = "身份证号格式错误";
        pass = false;
      } else if (!city[code.substr(0, 2)]) {
        tip = "地址编码错误";
        pass = false;
      } else {
        //18位身份证需要验证最后一位校验位
        if (code.length == 18) {
          code = code.split("");
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
          //校验位
          var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++) {
            ai = code[i];
            wi = factor[i];
            sum += ai * wi;
          }
          var last = parity[sum % 11];
          if (parity[sum % 11] != code[17]) {
            tip = "校验位错误";
            pass = false;
          }
        }
      }
      if (!pass) {
        this.$Message.warning(tip);
        return;
      }
      return pass;
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
@media screen and (max-height: 960px) {
  .content {
    min-height: unset !important;
    height: 700px;
    overflow-y: auto;
  }
}
</style>