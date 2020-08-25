<template>
  <div class="Index">
    <div class="container">
      <cpNav />
      <floatTip />
      <div class="main">
        <ul class="tab clearfix unselect">
          <li class="tab-item" :class="{active:type==1}" @click="setType(1)">英雄联盟</li>
          <li class="tab-item" :class="{active:type==2}" @click="setType(2)">云顶之弈</li>
        </ul>
        <div class="content">
          <div class="icon">
            <img src="../assets/img/public/log-1.png" class="img" alt="小熊陪玩"/>
            <p>小熊陪玩</p>
          </div>
          <ul class="list" :class="{iswidth:type==2}">
            <li class="item">
              <Select v-model="sound" style="width:103px" placeholder="陪玩音色">
                <Option
                  v-for="item in newSoundList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.name }}</Option>
              </Select>
            </li>
            <li class="item">
              <Select v-model="rank" style="width:103px" placeholder="陪玩段位">
                <Option
                  v-for="item in rankList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </li>
            <li class="item" v-if="type==1">
              <Select v-model="position" style="width:103px" placeholder="位置选择">
                <Option
                  v-for="item in posPlayer"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </li>
            <li class="item">
              <Select v-model="priceOrderBy" style="width:103px" placeholder="陪玩价格">
                <Option
                  v-for="item in privceList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </li>
          </ul>
          <!-- <div class="start unselect" @click="start">开始陪玩</div> -->
          <Button class="start" type="default" :loading="loading" @click="toQuerPlayerSpeed">开始陪玩</Button>
        </div>
      </div>
    </div>

    <matching :showMatch="showMatch" @closed="closed" @load="load" :info="info" />
  </div>
</template>

<script>
import cpNav from "../components/cp-nav";
import floatTip from "../components/floatTip";
import matching from "../components/matching";
import { mapMutations, mapGetters } from "vuex";
import { config } from "../common/config";
import { soundList } from "../common/api/common";
import { querPlayerSpeed } from "../common/api/index";

export default {
  components: { cpNav, floatTip, matching },
  name: "Index",
  data() {
    return {
      privceList: [
        {
          value: 1,
          label: "从高到低",
        },
        {
          value: 2,
          label: "从低到高",
        },
        {
          value: "",
          label: "不限",
        },
      ],
      rankList: [],
      posPlayer: [
        //1 上单 2 3中路 4.AD 5辅助
        { value: "1", label: "上单" },
        { value: "2", label: "打野" },
        { value: "3", label: "中路" },
        { value: "4", label: "AD" },
        { value: "5", label: "辅助" },
        { value: "", label: "不限" },
      ],
      position: "",
      rank: "",
      showMatch: false,
      priceOrderBy: "",
      sound: "",
      haveSoundList: [],
      loading: false,
      info: {},
      loadflag: true,
    };
  },
  computed: {
    ...mapGetters(["type"]),
    newSoundList() {
      let arr = [];
      if (this.haveSoundList.length > 0) {
        arr = [
          ...this.haveSoundList[0].soundList,
          ...this.haveSoundList[1].soundList,
        ];
        arr.push({ value: "", name: "不限" });
        return arr;
      }
    },
  },
  created() {},
  mounted() {
    this.getsoundList();
    this.rankList = config.level;
  },
  methods: {
    ...mapMutations({
      setType: "user/SET_TYPE",
    }),
    start() {
      this.showMatch = true;
    },
    closed() {
      this.showMatch = false;
    },
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
    async toQuerPlayerSpeed() {
      let data = {
        type: this.type,
        pageNo: 1,
        pageSize: 100,
        position: this.position,
        priceOrderBy: this.priceOrderBy, //价格排序 1 从高到低 2 从低到高
        rank: this.rank,
        sound: this.sound,
      };
      try {
        this.loading = true;
        this.loadflag=false;
        let res = await querPlayerSpeed(data);
        if (res.resultCode == "0000") {
          this.info = res.data;
          if(res.data.length>0){
              this.showMatch = true;
          }else{
            this.$Message.warning("没有匹配到合适陪玩");
          }
         
        }
        this.loading = false;
        this.loadflag=true;
      } catch (error) {
        this.loading = false;
        this.loadflag=true;
      }
    },
    load() {
      if (this.loadflag) {
        this.pageNo++;
        this.toQuerPlayerSpeed();
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.Index {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-attachment: fixed;
  background-image: url("../assets/img/public/bj.jpg");
  // background-size: 100% auto;
  background-repeat: no-repeat;
  background-size: cover;
  .bj {
    position: absolute;
    width: 100%;
    height: 100%;
    min-width: 1500px;
    z-index: 0;
  }
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .main {
    position: relative;
    width: 1200px;
    min-height: 766px;
    height: 100%;
    margin: auto;
    // overflow: hidden;
  }
  .tab {
    position: absolute;
    left: 53px;
    top: 26px;
    height: 28px;
    width: 190px;
    line-height: 28px;
    border: 1px solid rgba(254, 149, 4, 1);
    font-size: 18px;
    color: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    z-index: 2;
    .tab-item {
      width: 50%;
      float: left;
      text-align: center;
      cursor: pointer;
      height: 26px;
    }
    .active {
      color: #fff;
      background-color: #fe9504;
    }
  }
  .content {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 568px;
    height: 450px;
    margin: auto;
    .icon {
      width: 108px;
      margin: auto;
      font-size: 24px;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      .img {
        width: 108px;
        height: 106px;
        margin-bottom: 22px;
      }
    }
    .iswidth {
      width: 410px;
    }
    .list {
      margin: 60px auto 0;
      .item {
        display: inline-block;
        /deep/ .ivu-select-placeholder {
          font-size: 16px;
          color: rgba(127, 127, 127, 1);
        }
        /deep/ .ivu-select-arrow {
          font-size: 20px;
        }
        /deep/ .ivu-select-item {
          position: relative;
          text-align: center;
          font-size: 12px;
        }
        /deep/ .ivu-select-item-selected {
          color: rgba(251, 153, 10, 1);
        }
      }
      .item:not(:last-child) {
        margin-right: 50px;
      }
    }
    .start {
      display: block;
      margin: 83px auto 0;
      cursor: pointer;
      width: 402px;
      height: 101px;
      line-height: 101px;
      text-align: center;
      background: linear-gradient(
        180deg,
        rgba(240, 182, 52, 1) 0%,
        rgba(254, 146, 1, 1) 100%
      );
      border-radius: 47px;
      font-size: 48px;
      color: rgba(255, 255, 255, 1);
      border: 0;
    }
    .start:hover {
      box-shadow: 0 0 10px rgba(254, 146, 1, 1);
    }
  }
}
</style>