<template>
  <div class="recharge">
    <cpNav />

    <div class="container">
      <div class="title">账号充值</div>
      <div class="row flex align-items">
        <div class="name">账户余额：</div>
        <div class="price">¥50.00</div>
      </div>
      <div class="row flex align-items">
        <div class="name">充值金额：</div>
        <ul class="list flex align-items">
          <li class="item" :class="{active:type==50}" @click="changeType(50)">
            50元
            <img src="../assets/img/icon-select.png" class="icon" />
          </li>
          <li class="item" :class="{active:type==100}" @click="changeType(100)">
            100元
            <img src="../assets/img/icon-select.png" class="icon" />
          </li>
          <li class="item" :class="{active:type==500}" @click="changeType(500)">
            500元
            <img src="../assets/img/icon-select.png" class="icon" />
          </li>
          <li class="item" :class="{active:type==1000}" @click="changeType(1000)">
            1000元
            <img src="../assets/img/icon-select.png" class="icon" />
          </li>
          <li class="item" :class="{active:type==6666}" @click="changeType(6666)">
            6666元
            <img src="../assets/img/icon-select.png" class="icon" />
          </li>
        </ul>
        <input type="text" class="money" v-model="money" placeholder="输入充值金额" />
      </div>
      <div class="row flex align-items">
        <div class="name">充值货币：</div>
        <div class="sure-price">¥{{money||type}}</div>
      </div>
      <div class="row flex align-items">
        <div class="name">充值方式：</div>
        <div class="pay-methods flex align-items justify-content">
          <div
            class="item flex align-items"
            :class="{select:paymethods==1}"
            @click="changePayMethods(1)"
          >
            <img src="../assets/img/icon-wechat-pay.png" class="icon" />
            微信支付
            <img src="../assets/img/icon-select.png" class="icon-r" />
          </div>
          <!-- <div
            class="item flex align-items justify-content"
            :class="{select:paymethods==2}"
            @click="changePayMethods(2)"
          >
            <img src="../assets/img/icon-alipay.png" class="icon" />
            支付宝支付
            <img src="../assets/img/icon-select.png" class="icon-r" />
          </div>-->
        </div>
      </div>
      <div class="row flex align-items">
        <div class="name"></div>
        <div class="code">
          <qriously :value="payInfo.qrCode" :size="180" />
        </div>
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
import { recharge, paySuccess } from "../common/api/user";
import { mapMutations, mapGetters, mapActions } from "vuex";
import bjImage from "../components/bjImage";

export default {
  components: { cpNav, quickBtn, foot, bjImage },
  name: "recharge",
  data() {
    return {
      money: "",
      type: 50,
      paymethods: 1, //1微信 2 支付宝
      timer: null,
      payInfo: {
        qrCode: "",
      },
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  created() {},
  mounted() {
    this.toRecharge();
    if (sessionStorage.getItem("_ref")) {
      setTimeout(() => {
        this.$router.openPage(sessionStorage.getItem("_ref"));
        sessionStorage.removeItem("_ref");
      }, 5000);
    }
  },
  methods: {
    ...mapActions({
      getBalance: "user/getBalance",
    }),
    changeType(num) {
      this.money = "";
      this.type = num;
      this.toRecharge();
    },
    changePayMethods(num) {
      this.paymethods = num;
      this.toRecharge();
    },
    async toRecharge() {
      if (!this.userData) return;
      try {
        let res = await recharge({
          userId: this.userData.userId,
          payType: this.paymethods, //支付类型 1 微信扫码 11 支付宝扫码
          totalMoney: this.type * 100 || Number(this.money) * 100, //充值金额（分）
        });
        if (res.resultCode == "0000") {
          this.payInfo = res;
          clearInterval(this.timer);
          this.timer = setInterval(this.isPay, 2000);
        }
      } catch (error) {}
    },
    async isPay() {
      try {
        let res = await paySuccess({
          orderId: "",
          productId: this.payInfo.productId,
          userId: this.userData.userId,
        });
        if (res.resultCode == "0000") {
          this.$Message.success("充值成功");
          this.toRecharge();
          this.getBalance(this.userData.userId);
          if (sessionStorage.getItem("_ref")) {
            setTimeout(() => {
              this.$router.openPage(sessionStorage.getItem("_ref"));
              sessionStorage.removeItem("_ref");
            }, 500);
          }
          clearInterval(this.timer);
        }
      } catch (error) {
        // clearInterval(this.timer);
      }
    },
  },
  watch: {
    money(val) {
      this.type = "";
      this.money = val.replace(/[^\d]/g, "");
      if (val) {
        this.toRecharge();
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer);
    next();
  },
};
</script>
<style lang='scss' scoped>
.recharge {
  position: relative;
  width: 100%;
  background-attachment: fixed;
  background-image: url("../assets/img/public/bj-3.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  .container {
    width: 1200px;
    height: 768px;
    background: rgba(255, 255, 255, 1);
    margin: 70px auto 0;
    padding: 90px 70px 0;
    .title {
      width: 100%;
      height: 36px;
      font-size: 16px;
      padding-left: 22px;
      color: rgba(51, 51, 51, 1);
      line-height: 36px;
      border-bottom: 1px solid #dbdbdb;
      margin-bottom: 40px;
    }
    .row {
      padding-left: 22px;
      margin-bottom: 20px;
      .name {
        width: 82px;
        font-size: 14px;
        color: rgba(102, 102, 102, 1);
      }
      .price {
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
      }
      .list {
        .item {
          position: relative;
          cursor: pointer;
          width: 56px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 6px;
          font-size: 12px;
          margin-right: 10px;
          color: rgba(153, 153, 153, 1);
          border: 1px solid rgba(216, 216, 216, 1);
          .icon {
            display: none;
            position: absolute;
            bottom: 0;
            right: -1px;
            width: 15px;
          }
        }
        .active {
          border: 1px solid rgba(9, 187, 7, 1);
          .icon {
            display: block;
          }
        }
      }
      .money {
        width: 100px;
        height: 30px;
        text-align: center;
        border-radius: 6px;
        font-size: 12px;
        color: #333;
        border: 1px solid rgba(216, 216, 216, 1);
      }
      .sure-price {
        font-size: 21px;
        color: rgba(255, 66, 66, 1);
      }
      .pay-methods {
        .item {
          cursor: pointer;
          position: relative;
          min-width: 93px;
          height: 30px;
          padding: 0 10px;
          line-height: 30px;
          text-align: center;
          margin-right: 15px;
          border-radius: 6px;
          border: 1px solid rgba(153, 153, 153, 1);
          .icon {
            width: 21px;
            height: 21px;
            margin-right: 5px;
          }
          .icon-r {
            position: absolute;
            display: none;
            right: -1px;
            bottom: 0;
            width: 15px;
            height: 15px;
          }
        }
        .select {
          border: 1px solid rgba(9, 187, 7, 1);
          .icon-r {
            display: block;
          }
        }
      }
      .code {
        position: relative;
        background: rgba(238, 238, 238, 1);
        border: 1px solid rgba(226, 226, 226, 1);
      }
    }
  }
}
</style>