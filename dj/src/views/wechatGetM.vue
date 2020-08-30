<template>
  <div class="wechat">稍等</div>
</template>

<script>
import { bindWx, wxUserInfo, getUserInfo } from "../common/api/user";
import { config } from "../common/config";
import { mapMutations, mapGetters } from "vuex";

export default {
  components: {},
  name: "get",
  data() {
    return {
      userId: "",
      code: "",
      userInfo: "",
    };
  },
  computed: {},
  created() {},
  mounted() {
    this.userId = this.$route.query.userId || "";
    this.code = this.$route.query.code || "";

    setTimeout(() => {
      if (!this.code) {
        console.log("ssss")
        console.log(config.appid)
        console.log(encodeURIComponent(window.location.href))
        // window.location.href =
        //   "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        //   config.appid +
        //   "&redirect_uri=" +
        //   encodeURIComponent(window.location.href) +
        //   "&response_type=code&scope=snsapi_userinfo&state=getmoney#wechat_redirect";
      } else {
        this.gotUserInfo();
      }
    }, 500);
  },
  methods: {
    //获取用户微信信息
    async getWxUserInfo() {
      try {
        let res = await wxUserInfo({
          appId: config.appid || "", //2、微信公众号支付；3、微信小程序支付；11、支付宝h5支付
          code: this.code,
        });
        if (res.resultCode == "0000") {
          this.bindConsumer();
        }
      } catch (error) {
        console.log(error);
      }
    },
    async bindConsumer(data) {
      try {
        let res = await bindWx({
          userId: this.userInfo.userId,
          appId: config.appid,
          openId: data.openId,
          nickName: data.nickName,
          headImg: data.headImg,
        });
        if (res.resultCode == "0000") {
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async gotUserInfo(userId) {
      try {
        let res = await getUserInfo({
          userId: this.userId || "",
        });
        if (res.resultCode == "0000") {
          this.userInfo = res.data;
          this.getWxUserInfo();
        }
      } catch (error) {}
    },
  },
};
</script>
<style lang='scss' scoped>
</style>