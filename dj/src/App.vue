<template>
  <div id="app">
    <router-view />
    <Login />
  </div>
</template>
<script >
import Login from "./components/login";
import { mapMutations, mapActions } from "vuex";
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
    this.setType(sessionStorage.getItem("type") || 1);
  },
  mounted() {
    this.getBalance(this.userData.userId);
    this.gotUserInfo();
  },
  watch: {
    $route(to, from) {
      // console.log(to)
      // window.scrollTo(0, 0);
    },
  },
  methods: {
    ...mapActions({
      getBalance: "user/getBalance",
    }),
    ...mapMutations({
      setUserData: "user/SET_USER_DATA",
      setType: "user/SET_TYPE",
      setUserInfo: "user/SET_USER_INFO",
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
  },
};
</script>
<style lang="scss">
// #app{
//   background: url("./assets/img/public/bj.jpg") center no-repeat;
//   background-size: cover;
// }
</style>
