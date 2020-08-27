<template>
  <div class="wrap">
    <ul class="floatTip">
      <li class="item" @click="join">
        <img src="../assets/img/public/icon-menber.png" class="icon" />
        <p>申请</p>
        <p>入驻</p>
      </li>
      <li class="item">
        <img src="../assets/img/public/icon-mes.png" class="icon" />
        <p>消息</p>
      </li>
      <li class="item" @click="toOrder">
        <img src="../assets/img/public/icon-order.png" class="icon" />
        <p>订单</p>
      </li>
      <li class="item">
        <img src="../assets/img/public/icon-server.png" class="icon" />
        <p>客服</p>
      </li>
    </ul>
    <attestation :show="show" @closed="closed" @submit="showApply=true" />
    <applyPlayer :showApply="showApply" @closed="closedApply" />
  </div>
</template>

<script>
import attestation from "./attestation";
import applyPlayer from "./applyPlayer";
import { mapMutations, mapGetters } from "vuex";

export default {
  components: { attestation, applyPlayer },
  name: "floatTip",
  data() {
    return {
      show: false,
      showApply: false,
    };
  },
  computed: {
    ...mapGetters(["userData", "balance", "userInfo"]),
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations({
      setLoginFlag: "user/SET_LOGIN_FLAG",
      setUserData: "user/SET_USER_DATA",
    }),
    join(){
      if(this.userInfo.isPlayer==1){
         this.$Message.warning("已经是陪玩");
         return
      }
      if (this.userData) {
        this.show = true;
      } else {
        this.setLoginFlag(true);
      }
    },
    closed() {
      this.show = false;
    },
    closedApply() {
      this.showApply = false;
    },
    toOrder() {
      if (this.userData) {
        this.$router.openPage("/orderList");
      } else {
        this.setLoginFlag(true);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.floatTip {
  position: fixed;
  right: 0;
  bottom: 20%;
  width: 73px;
  height: 394px;
  background: rgba(255, 255, 255, 1);
  border-radius: 15px;
  font-size: 14px;
  color: rgba(51, 51, 51, 1);
  text-align: center;
  z-index: 3;
  .icon {
    width: 45px;
    display: block;
    margin: 0 auto 8px;
  }
  .item {
    cursor: pointer;
    width: 100%;
    height: 25%;
    box-sizing: border-box;
    padding-top: 10px;
  }
}
</style>
