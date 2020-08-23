<template>
  <div class="setInfo">
    <div class="flex align-items">
      <img :src="info.headImg" class="head" v-if="info.headImg" />
      <img src="../assets/img/loginu.png" class="head" v-else />
      <div class="info">
        <div class="info-box">
          <div class="nike-name flex align-items">
            <span>{{info.nickName||userData.phone|phone}}</span>
            <img
              src="../assets/img/icon-editor.png"
              class="icon"
              @click="$router.openPage('/modifyUserInfo')"
            />
          </div>
          <p class="num">小熊电竞ID:{{userData.userCode||''}}</p>
          <div class="get-money flex" v-if="info.isPlayer==1">
            <span>我的收益¥: {{(info.income/100).toFixed(2)||0}}元</span>
            <div class="btn btnclick unselect" @click="showGet=true" v-if="info.income>0">去提现</div>
          </div>
        </div>
      </div>
    </div>
    <div class="base-info-wrap">
      <div class="title-wrap">
        <span class="title">基础信息</span>
        <i class="line"></i>
        <div class="editor unselect" @click="$router.openPage('/modifyUserInfo')">
          <img src="../assets/img/icon-editor.png" class="icon" />
          <span>编辑信息</span>
        </div>
      </div>
      <p class="pl age">
        年龄:
        <span v-if="info&&info.birthDate">{{info.birthDate|birthDate}}</span>
      </p>
      <div class="pl clearfix">
        <div class="fl gender">
          性别:
          <span v-if="info&&info.sex">{{info.sex==1?'男':'女'}}</span>
        </div>
        <div class="fl genders">
          个性签名:
          <span class="signature" v-if="info&&info.introduce">{{info.introduce}}</span>
          <span class="signature" v-else>你还没编辑个性签名</span>
        </div>
      </div>
    </div>
    <div class="base-info-wrap set">
      <div class="title-wrap">
        <span class="title">基础信息</span>
        <i class="line"></i>
      </div>
      <div class="set-about clearfix">
        <div class="item pbone fl">
          <div class="info">
            <p class="name">修改绑定手机</p>
            <p class="sub">
              已绑定:
              <span class="red">{{userData.phone|phone}}</span>
            </p>
          </div>
          <img src="../assets/img/icon-md-phone.png" @click="show=true" class="img" />
        </div>
        <div class="item passw fl">
          <div class="info">
            <p class="name">修改密码</p>
            <p class="sub">建议修改密码，保证账号安全</p>
          </div>
          <img src="../assets/img/icon-md-passw.png.png" class="img" @click="showPss=true" />
        </div>
      </div>
    </div>

    <!-- 绑定手机 -->
    <bindPhone :show="show" @close="show=false" />
    <!-- 修改密码 -->
    <modifyPass :showPss="showPss" @close="showPss=false" />
    <!-- 提现 -->
    <getMoney :showGet="showGet" @close="showGet=false" />
    <!-- 修改信息 -->
  </div>
</template>

<script>
import bindPhone from "./bindPhone";
import modifyPass from "./modifyPass";
import getMoney from "./getMoney";
import { mapGetters, mapMutations } from "vuex";
import { getUserInfo } from "../common/api/user";

export default {
  components: { bindPhone, modifyPass, getMoney },
  name: "setInfo",
  data() {
    return {
      step: 1,
      phone: "",
      code: "",
      show: false, //修改手机号码
      showPss: false, //修改密码
      showGet: false, //提现
      showInfo: false,
      word: "获取验证码",
      sendTimer: null,
      time: 60,
      sendMsgDisabled: false,
      info: "",
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  created() {},
  mounted() {
    this.gotUserInfo();
  },
  methods: {
    ...mapMutations({
      setUserInfo: "user/SET_USER_INFO",
    }),
    async gotUserInfo() {
      if (!this.userData) return;
      try {
        let res = await getUserInfo({
          userId: this.userData.userId || "",
        });
        if (res.resultCode == "0000") {
          this.info = res.data;
          this.setUserInfo(res.data);
        }
      } catch (error) {}
    },
  },
  watch: {
    show(val) {
      if (val) {
        this.step = 1;
      }
    },
    showPss(val) {},
  },
};
</script>
<style lang='scss' scoped>
.setInfo {
  position: relative;
  width: 994px;
  height: auto;
  padding: 40px;
  padding-right: 0;
  overflow: hidden;
  .head {
    width: 92px;
    height: 92px;
    border-radius: 50%;
    margin-right: 30px;
  }
  .info {
    width: 100%;
    height: 92px;
    display: table;
    .info-box {
      width: 60%;
      display: table-cell;
      vertical-align: middle;
    }
    .nike-name {
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      .icon {
        width: 12px;
        height: 12px;
        margin-left: 8px;
        cursor: pointer;
      }
    }
    .num {
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      margin-top: 10px;
    }
    .get-money {
      margin-top: 10px;
      font-size: 16px;
      color: rgba(51, 51, 51, 1);
      .btn {
        cursor: pointer;
        width: 70px;
        height: 21px;
        line-height: 21px;
        text-align: center;
        background: linear-gradient(
          180deg,
          rgba(241, 181, 50, 1) 0%,
          rgba(254, 148, 3, 1) 100%
        );
        border-radius: 6px;
        font-size: 14px;
        color: rgba(255, 255, 255, 1);
        margin-left: 10px;
      }
    }
  }
  .base-info-wrap {
    margin-top: 50px;
    padding: 40px 0;
    .title-wrap {
      height: 21px;
      width: 100%;
      display: table;
      margin-bottom: 40px;
      .title {
        width: 80px;
        display: table-cell;
        vertical-align: middle;
        font-size: 16px;
        color: rgba(102, 102, 102, 1);
      }
      .line {
        position: relative;
        display: table-cell;
        vertical-align: middle;
        width: 624px;
        height: 2px;
        background-color: rgba(0, 0, 0, 0);
        margin: 0 20px;
        // opacity: 0;
      }
      .line::after {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -1px;
        width: 624px;
        height: 2px;
        background-color: #e0e0e0;
        z-index: 2;
      }
      .editor {
        cursor: pointer;
        display: table-cell;
        vertical-align: middle;
        padding-left: 20px;
        .icon {
          width: 12px;
          height: 12px;
          margin-right: 10px;
        }
        font-size: 16px;
        color: rgba(102, 102, 102, 1);
      }
    }
    .age {
      margin-bottom: 20px;
    }
    .gender {
      width: 50%;
    }
    .genders {
      width: 50%;
      .signature {
        color: #333333;
      }
    }
    .pl {
      padding-left: 20px;
    }
  }
  .set {
    margin-top: 0 !important;
    padding-top: 0 !important;
    .line {
      // width: 700px !important;
      width: 92% !important;
    }
    .line::after {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: -1px;
      width: 100% !important;
      height: 2px;
      background-color: #e0e0e0;
      z-index: 2;
    }
    .set-about {
      .item {
        position: relative;
        width: 50%;
        height: 50px;
        padding-left: 80px;
        padding-right: 100px;
        display: table;
        .img {
          position: absolute;
          right: 100px;
          top: 50%;
          margin-top: -14px;
          width: 83px;
          height: 27px;
          cursor: pointer;
        }
        .info {
          display: table-cell;
          vertical-align: middle;
          .name {
            font-size: 16px;
            color: rgba(102, 102, 102, 1);
          }
          .sub {
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
            .red {
              color: #ff7f7f;
            }
          }
        }
      }
      .pbone {
        background: url("../assets/img/icon-phone 2.png") 20px center no-repeat;
        background-size: 41px 50px;
      }
      .passw {
        background: url("../assets/img/icon-lock-2.png") 20px center no-repeat;
        background-size: 41px 50px;
      }
    }
  }
  .move {
    transform: translateX(100%);
  }

  .setpass {
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