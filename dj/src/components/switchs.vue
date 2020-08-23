<template>
  <div class="switchs">
    <div class="line flex align-items">
      <div class="mr">速配厅匹配</div>
      <i-switch
        size="large"
        v-model="switch1"
        false-color="#BEBEBE"
        true-color="#5DE376"
        class="animated fadeIn"
        @on-change="changeSpeed"
      />
    </div>
    <div class="line flex align-items">
      <div class="mr">陪玩厅推荐</div>
      <i-switch
        size="large"
        v-model="switch2"
        false-color="#BEBEBE"
        true-color="#5DE376"
         class="animated fadeIn"
        @on-change="changePlay"
      />
    </div>
    <div class="line flex align-items">
      <div class="mr">新人专区</div>
      <i-switch
        size="large"
        v-model="switch3"
        false-color="#BEBEBE"
        true-color="#5DE376"
         class="animated fadeIn"
        @on-change="changeNew"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { playerSet, getPlayerSet } from "../common/api/user";
export default {
  components: {},
  name: "switchs",
  data() {
    return {
      switch1: false,
      switch2: false,
      switch3: false,
    };
  },
  computed: { ...mapGetters(["userData"]) },
  created() {},
  mounted() {
    this.togetPlayerSet();
  },
  methods: {
    changeSpeed(status) {
      this.toPlayerSet({
        openSpeed: this.switch1 ? 1 : 0,
      });
    },
    changePlay(status) {
      this.toPlayerSet({
        openPlay: this.switch2 ? 1 : 0,
      });
    },
    changeNew(status) {
      this.toPlayerSet({
        openNew: this.switch3 ? 1 : 0,
      });
    },
    async toPlayerSet(obj) {
      if (!this.userData) return;
      let data = {
        userId: this.userData.userId || "",
      };

      Object.assign(data, obj);
      try {
        let res = await playerSet(data);
        console.log(res);
      } catch (error) {}
    },
    async togetPlayerSet() {
      if (!this.userData) return;
      try {
        let res = await getPlayerSet(this.userData.userId);
        if(res.resultCode=="0000"){
            this.switch1=res.data.openSpeed==1?true:false;
            this.switch2=res.data.openPlay==1?true:false;
            this.switch3=res.data.openNew==1?true:false;
        }

      } catch (error) {}
    },
  },
};
</script>
<style lang='scss' scoped>
.switchs {
  position: relative;
  width: 994px;
  height: auto;
  padding: 40px;
  padding-right: 0;
  overflow: hidden;
  .line {
    margin-bottom: 20px;
  }
  .mr {
    width: 100px;
    text-align: left;
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
  }
}
</style>