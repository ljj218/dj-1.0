<template>
  <div class="getmoney" :class="{move:!showGet}">
    <div class="md-title flex align-items" @click="back">
      <Icon type="ios-arrow-back" size="25" />
      <span>提现金额</span>
    </div>
    <ul class="list flex flex-wrap space-between">
      <li
        class="item"
        v-for="(item,index) in 9"
        :key="index"
        :class="{active:index==num}"
        @click="changeVal(item*100,index)"
      >{{item*100}}</li>
      <li class="item space"></li>
      <li class="item space"></li>
      <li class="item space"></li>
      <li class="item space"></li>
      <li class="item space"></li>
    </ul>
    <input type="text" placeholder="输入金额" class="money" v-model="money" />
    <div class="btn btnclick unselect" @click="submits">提交</div>
    <Modal
      v-model="show"
      width="400"
      class="code"
      class-name="vertical-center-modal"
      :closable="false"
      @on-ok="sure"
      @on-cancel="cancel"
    >
      <div slot="header"></div>
      <div class="content clearfix">
        <p>请用微信扫描二维码，绑定提现</p>
        <qriously :value="link" :size="180" v-if="link" />
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import { withdraw } from "../common/api/user";

export default {
  props: {
    showGet: {
      type: Boolean,
      default: false,
    },
  },
  name: "getmoney",
  data() {
    return {
      num: 0,
      money: "",
      index: "",
      link: "",
      val: "",
      show: false,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {},
  mounted() {
    this.link = location.origin + "/wechatGetM?userId=" + this.userInfo.userId;
  },
  methods: {
    back() {
      this.$emit("close");
    },
    sure() {
      console.log("ssss");
    },
    cancel() {
      console.log("ssssw3ww");
    },
    changeVal(val, num) {
      if (this.userInfo.income < val * 100) {
        this.$Message.warning("可提取收益不足!");
        return;
      }
      this.money = "";
      this.val = val;
      this.num = num;
    },
    async submits() {
      let money =
        (this.money ? Number(this.money) * 100 : "") ||
        (this.val ? Number(this.val) * 100 : "");
      console.log(money);
      if (this.userInfo.isPlayer == 1) {
        if (this.userInfo.openId) {
          try {
            let res = await withdraw({
              userId: this.userInfo.userId,
              amount: money, //分
            });
            console.log(res);
          } catch (error) {}
        } else {
          this.show = true;
        }
      } else {
        this.$Message.warning("您没有提现权限！");
      }
    },
  },
  watch: {
    show(val) {
      if (val) {
        this.num = 0;
      }
    },
    money(val) {
      if (this.userInfo.income < val * 100) {
        this.$Message.warning("可提取收益不足!");
        this.money = "";
        return;
      }
      this.val = "";
      this.money = val.replace(/[^\d]/g, "");
    },
  },
};
</script>
<style lang='scss' scoped>
.getmoney {
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
  .list {
    width: 80%;
    margin: 70px auto 0;
    .active {
    }
    .item {
      cursor: pointer;
      display: inline-block;
      width: 70px;
      height: 27px;
      line-height: 27px;
      text-align: center;
      font-size: 14px;
      margin: 0 15px 20px;
      color: rgba(153, 153, 153, 1);
      border-radius: 6px;
      border: 1px solid rgba(218, 218, 218, 1);
    }
    .space {
      opacity: 0;
      height: 0;
    }
  }
  .money {
    display: block;
    margin: auto;
    width: 170px;
    height: 27px;
    border-radius: 6px;
    border: 1px solid rgba(218, 218, 218, 1);
    font-size: 14px;
    color: #333;
    text-align: center;
  }
  .btn {
    cursor: pointer;
    width: 139px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: linear-gradient(
      180deg,
      rgba(240, 182, 52, 1) 0%,
      rgba(254, 146, 1, 1) 100%
    );
    margin: 50px auto 0;
    font-size: 18px;
    color: rgba(255, 255, 255, 1);
    border-radius: 21px;
  }
}
.content {
  height: 400px;
  border-radius: 6px;
  padding: 30px;
  background-color: #fff;
  font-size: 18px;
  text-align: center;
  p{
      margin-bottom: 20px;
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
/deep/ .vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>