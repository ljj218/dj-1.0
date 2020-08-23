<template>
  <div class="orderList">
    <cpNav />
    <div class="container">
      <div class="page-title">
        <span>评论</span>
      </div>
      <div class="content">
        <ul class="list clearfix unselect">
          <li
            class="item fl"
            v-for="(item,index) in labelList"
            :class="{active:label==item.value}"
            :key="index"
            @click="select(item.value)"
          >{{item.label}}</li>
        </ul>
        <div class="clear-wrap clearfix unselect">
          <div class="btn lr" :class="{active:label}" @click="clearAll">全部清除</div>
        </div>
        <p class="other">其他</p>
        <textarea class="textarea" placeholder="0/99" v-model="text"></textarea>
        <div class="btn-wrap clearfix unselect">
          <div class="btn submit lr btnclick" @click="submitInfo">提交</div>
          <div class="btn lr btnclick">取消</div>
        </div>
      </div>
    </div>
    <quickBtn />
    <foot />
    <Modal v-model="modal2" width="590" :closable="false" :mask-closable="false">
      <p slot="header"></p>
      <div class="modal-content">
        <p class="title">满意度</p>
        <div class="wrap clearfix">
          <div class="btn fl" @click="noSatisfied">不满意</div>
          <div class="fl start">
            <Rate v-model="value" @on-change="changeScore" />
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import cpNav from "../components/cp-nav";
import quickBtn from "../components/quickBtn";
import foot from "../components/foot";
import { mapMutations, mapGetters } from "vuex";
import { orderComment, getLabelList } from "../common/api/index";

export default {
  components: { cpNav, quickBtn, foot },
  name: "orderAbout",
  data() {
    return {
      label: '',
      text: "",
      modal2: false,
      value: 0,
      labelList: [],
      orderId: "",
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  created() {
    this.orderId = this.$route.query.orderId || "";
  },
  mounted() {
    this.getLabelList();
  },
  methods: {
    select(n) {
     this.label=n
    },
    clearAll() {
      this.label ='';
    },
    submitInfo() {
      this.modal2 = true;
    },
    changeScore() {
      this.orderComments();
      this.modal2 = false;
    },
    noSatisfied() {
      this.value = 0;
      this.modal2 = false;
    },
    async getLabelList() {
      try {
        let res = await getLabelList(1);
        if ((res.resultCode = "0000")) {
          this.labelList = res.data;
        }
      } catch (error) {}
    },
    async orderComments() {
        console.log('sssss')
      try {
        let res = await orderComment({
          content: this.text, //
          label: this.label, //
          level: this.value, //
          orderId: this.orderId, //
          userId: this.userData.userId, //
        });
        if ((res.resultCode = "0000")) {
          this.$Message.success("评论成功");
          history.go(-1);
        } else {
          this.$Message.warning(res.message);
        }
      } catch (error) {}
    },
  },
  watch: {
    text(val) {
      if (val.length > 99) {
        this.$Message.warning("最多输入99字");
        this.text = val.slice(0, 99);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.orderList {
  position: relative;
  width: 100%;
  background-attachment: fixed;
  background-image: url("../assets/img/public/bj.jpg");
  background-size: 100% 100%;
  .container {
    width: 1200px;
    // height: 529px;
    margin: auto;
    padding-top: 40px;
    .page-title {
      width: 1200px;
      height: 60px;
      line-height: 60px;
      padding: 0 40px;
      font-size: 18px;
      color: rgba(51, 51, 51, 1);
      background: rgba(255, 255, 255, 1);
    }
    .content {
      width: 1200px;
      height: 529px;
      padding: 35px 20px;
      background: rgba(255, 255, 255, 1);
      margin: 15px auto 0;
      .list {
        .item {
          cursor: pointer;
          width: 130px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          font-size: 18px;
          color: rgba(251, 177, 201, 1);
          border-radius: 6px;
          margin-bottom: 20px;
          border: 1px solid rgba(251, 177, 201, 1);
          margin-right: 127px;
        }
        .item:nth-child(5n) {
          margin-right: 0;
        }
      }
      .active {
        background: rgba(251, 177, 201, 1) !important;
        color: #fff !important;
      }
      .clear-wrap {
        width: 100%;
        height: 45px;
        .btn {
          cursor: pointer;
          width: 130px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          font-size: 18px;
          color: rgba(181, 181, 181, 1);
          background: rgba(239, 239, 239, 1);
          border-radius: 6px;
        }
      }
      .other {
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
      }
      .textarea {
        width: 1160px;
        height: 191px;
        background: rgba(239, 239, 239, 1);
        border-radius: 10px;
        resize: none;
        margin-top: 20px;
        padding: 20px;
        border: 0;
        font-size: 16px;
        margin-bottom: 15px;
      }
      .btn-wrap {
        width: 100%;
        height: 45px;
        .btn {
          cursor: pointer;
          width: 130px;
          height: 45px;
          line-height: 45px;
          text-align: center;
          font-size: 18px;
          color: rgba(254, 149, 4, 1);
          border-radius: 6px;
          border: 1px solid rgba(253, 149, 5, 1);
        }
        .submit {
          background: linear-gradient(
            180deg,
            rgba(241, 181, 50, 1) 0%,
            rgba(254, 148, 3, 1) 100%
          );
          color: #fff;
          margin-left: 15px;
        }
      }
    }
  }
}
.modal-content {
  height: 330px;
  padding: 104px 0 0 126px;
  .title {
    font-size: 18px;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 45px;
  }
  .wrap {
    overflow: hidden;
    .btn {
      cursor: pointer;
      width: 68px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: rgba(216, 216, 216, 1);
      border-radius: 16px;
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      margin-right: 20px;
      margin-top: 10px;
    }
  }
}
.start {
  font-size: 30px;
  /deep/ .ivu-rate {
    font-size: 30px;
  }
}
/dee/ .ivu-rate {
  font-size: 30px;
}
.fl {
  float: left;
}
.lr {
  float: right;
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
</style>