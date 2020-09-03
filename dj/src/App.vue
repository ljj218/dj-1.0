<template>
  <div id="app">
    <router-view />
    <Login />
  </div>
</template>
<script >
import Login from "./components/login";
import { mapMutations, mapActions, mapGetters } from "vuex";
import { getUserInfo } from "./common/api/user";

export default {
  components: { Login },
  name: "",
  data() {
    return {
      userData: "",
    };
  },
  created() {
    this.userData = this.cookies.get("userData")
      ? JSON.parse(this.cookies.get("userData"))
      : "";
    this.setUserData(this.userData);
    this.setType(sessionStorage.getItem("gametype") || 1);
  },
  computed: {
    ...mapGetters({
      current: "current",
    }),
  },
  mounted() {
    this.getBalance(this.userData.userId);
    this.gotUserInfo();
    setTimeout(() => {
      if (this.$route.query.tgCode) {
        localStorage.setItem("tgCode", this.$route.query.tgCode);
      }
      if (this.$route.query.ghCode) {
        localStorage.setItem("ghCode", this.$route.query.ghCode);
      }
      if (this.$route.query.hzCode) {
        localStorage.setItem("hzCode", this.$route.query.hzCode);
      }
      if (this.userData) {
        this.imLogin();
      }
    }, 1000);
  },
  watch: {
    $route(to, from) {},
  },
  methods: {
    ...mapActions({
      getBalance: "user/getBalance",
    }),
    ...mapMutations({
      setUserData: "user/SET_USER_DATA",
      setType: "user/SET_TYPE",
      setUserInfo: "user/SET_USER_INFO",
      startComputeCurrent: "user/startComputeCurrent",
      getuserInfo: "user/GET_USER_INFO",
    }),
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
    imLogin() {
      this.loading = true;
      this.tim
        .login({
          userID:  this.userData.userCode,
          userSig: window.genTestUserSig( this.userData.userCode).userSig,
        })
        .then(() => {
          this.loading = false;
          // this.$store.commit("toggleIsLogin", true);
          // this.toggleIsLogin(true);
          this.startComputeCurrent();
          this.getuserInfo({
            type: "GET_USER_INFO",
            userID:  this.userData.userCode,
            userSig: window.genTestUserSig(  this.userData.userCode)
              .userSig,
            sdkAppID: window.genTestUserSig("").SDKAppID,
          });
          // this.$store.commit('showMessage', {
          //   type: 'success',
          //   message: 'IM登录成功'
          // })
          console.log("IM登录成功");
        })
        .catch((error) => {
          this.loading = false;
          // this.$store.commit('showMessage', {
          //   message: 'IM登录失败：' + error.message,
          //   type: 'error'
          // })
          console.log("IM登录失败");
        });
    },
  },
};
</script>
<style lang="scss">
// #app{
//   background: url("./assets/img/public/bj.jpg") center no-repeat;
//   background-size: cover;
// }
</style>
