<template>
  <div class="orderList">
    <cpNav />
    <floatTip />
    <bjImage>
      <img src="../assets/img/public/1.jpeg" alt />
    </bjImage>
    <div class="container">
      <div class="page-title">我的订单</div>
      <div class="content">
        <div class="thead clearfix" v-if="list.length>0">全部订单</div>
        <div class="table" v-if="list.length>0">
          <div class="tbodys" v-for="(item,index) in list " :key="index">
            <div class="td">
              <div class="order-info">
                <span>{{item.createTime}}</span>
                <span>订单编号：{{item.orderId}}</span>
              </div>
              <div class="detail clearfix">
                <div class="host fl">
                  <img src="../assets/img/public/wh.jpg" class="head fl" />
                  <div class="about fl">
                    <p>陪玩昵称:{{item.nickName}}</p>
                    <p>服务名称:{{item.orderType==1?'英雄联盟':'云顶之弈'}}</p>
                  </div>
                </div>
                <div class="num fl">{{(item.orderPrice/100).toFixed(2)}}元/局 x {{item.orderNum}}</div>
                <div class="price fl">
                  <div id="cell">
                    <p v-if="item.orderStatus==1">待付款</p>
                    <p v-if="item.orderStatus==2||item.orderStatus==3">已付款</p>
                    <p>{{(item.orderMoney/100).toFixed(2)}}元</p>
                  </div>
                </div>
                <div class="status fl">
                  <span v-if="item.serviceStatus==0">待服务</span>
                  <span v-if="item.serviceStatus==1">服务中</span>
                  <span v-if="item.serviceStatus==2">已完成</span>
                </div>
                <div class="do fl unselect">
                  <div class="type type1">
                    <!-- <div class="refund btn btnclick" v-if="item.orderStatus==0">去付款</div> -->
                    <div
                      class="refund btn btnclick"
                      v-if="item.serviceStatus==2&&item.serviceStatus==1"
                      @click="tocomOrder(item.orderId)"
                    >完成订单</div>
                    <div class="contact btn btnclick" @click="contact(item.wechatImg)">联系陪玩</div>
                    <div
                      class="contact btn btnclick"
                      v-if="item.serviceStatus==2&&item.serviceStatus==2"
                      @click="$router.openPage('/refund?orderId='+item.orderId)"
                    >申请退款</div>

                    <!-- <div class="contact btn btnclick" v-if="item.orderStatus==1||item.orderStatus==2">取消订单</div> -->
                    <div
                      class="contact btn btnclick"
                      v-if="item.orderStatus==3"
                      @click="$router.openPage('/comments?orderId='+item.orderId)"
                    >立即评论</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="nothing animated fadeIn" v-else>
          <img src="../assets/img/public/empty.jpg" class="empty" />
          <span>暂无订单</span>
        </div>
      </div>
    </div>
    <quickBtn />
    <foot />

    <Modal
      v-model="showCode"
      width="300"
      class="login"
      class-name="vertical-center-modal"
      :closable="false"
    >
      <div slot="header"></div>
      <div class="content clearfix">
        
        <img :src="wechatImg" alt="陪玩微信码" class="wechatImg">
        <p>打开微信扫一扫，联系您的陪玩吧</p>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import cpNav from "../components/cp-nav";
import quickBtn from "../components/quickBtn";
import foot from "../components/foot";
import { orderList, comOrder } from "../common/api/index";
import { mapMutations, mapGetters } from "vuex";
import floatTip from "../components/floatTip";
import bjImage from "../components/bjImage";

export default {
  components: { cpNav, quickBtn, foot, floatTip, bjImage },
  name: "orderList",
  data() {
    return {
      type: 1,
      // list: [{ type: 1 }, { type: 2 }, { type: 3 }],
      list: [],
      showCode: false,
      wechatImg:''
    };
  },
  computed: {
    ...mapGetters(["userData"]),
  },
  created() {},
  mounted() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      if (!this.userData) return;
      try {
        let res = await orderList(this.userData.userId);
        if (res.resultCode == "0000") {
          this.list = res.data;
        }
      } catch (error) {}
    },
    sure() {
      console.log("ssss");
    },
    cancel() {
      // this.$emit("closed");
    },
    //完成订单
    async tocomOrder(orderId) {
      try {
        let res = await comOrder(orderId);
        if (res.resultCode == "0000") {
          this.$Message.success("操作成功");
          this.getOrderList();
        } else {
          this.$Message.warning(res.message);
        }
      } catch (error) {}
    },
    contact(src) {
      this.wechatImg=src;
      this.showCode = true;
    },
  },
};
</script>
<style lang='scss' scoped>
.orderList {
  position: relative;
  width: 100%;
  // background-attachment: fixed;
  // background-image: url("../assets/img/public/bj.jpg");
  //  background-repeat: no-repeat;
  // background-size: cover;
  .container {
    position: relative;
    width: 1200px;
    margin: auto;
    padding-top: 50px;
    z-index: 9;
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
      margin: 15px auto 0;
      background-color: #fff;
      .tab {
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding: 0 40px;
        margin-bottom: 15px;
        .item {
          float: left;
          cursor: pointer;
          margin-right: 100px;
          display: inline-block;
          span {
            position: relative;
            padding: 10px 0;
            font-size: 16px;
            color: rgba(51, 51, 51, 1);
          }
        }
        .active {
          span {
            color: rgba(253, 151, 7, 1);
          }
        }
        .active span::after {
          content: "";
          position: absolute;
          left: 50%;
          margin-left: -19px;
          bottom: 0;
          width: 38px;
          height: 2px;
          background: rgba(253, 151, 7, 1);
        }
      }
      .thead {
        width: 100%;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        background-color: #efefef;
        text-align: center;
        margin-bottom: 30px;
        div {
          display: inline-block;
          width: 20%;
        }
      }
      .table {
        width: 1166px;
        height: auto;
        margin: auto;
        padding-bottom: 25px;

        .host {
          width: 30% !important;
        }
        .num {
          width: 15% !important;
        }
        .price {
          width: 12.5% !important;
        }
        .status {
          width: 12.5% !important;
        }
        .do {
          width: 30% !important;
        }

        .tbodys {
          width: 100%;
          height: auto;
          margin: auto;

          .order-status {
            width: 100%;
            height: 62px;
            line-height: 62px;
            font-size: 16px;
            padding: 0 25px;
            color: rgba(51, 51, 51, 1);
          }
          .td {
            width: 1166px;
            height: 161px;
            border: 1px solid rgba(255, 239, 121, 1);
            margin-bottom: 62px;
            .order-info {
              width: 100%;
              height: 41px;
              line-height: 41px;
              padding: 0 42px;
              font-size: 14px;
              color: rgba(51, 51, 51, 1);
              background: rgba(255, 242, 153, 0.37);
              span {
                margin-right: 30px;
              }
            }
            .detail {
              width: 100%;
              height: 120px;
              .num,
              .price,
              .status,
              .do {
                line-height: 120px;
              }
              .price {
                display: table;
                #cell {
                  display: table-cell;
                  vertical-align: middle;
                  line-height: 20px;
                }
              }
              div {
                display: inline-block;
                height: 120px;
                text-align: center;
              }
              .host {
                text-align: center;
                .head {
                  width: 80px;
                  height: 80px;
                  border-radius: 50%;
                  transform: translateY(18px);
                  margin-right: 20px;
                  margin-left: 40px;
                }
                .about {
                  display: inline-block;
                  width: 200px;
                  height: 120px;
                  padding-top: 30px;
                  text-align: left;
                  p:first-child {
                    margin-bottom: 15px;
                  }
                }
              }
            }
            .do {
              .type1 {
                width: 295px !important;
              }
              .type {
                .btn {
                  display: inline-block;
                  width: 85px;
                  height: 35px;
                  line-height: 35px;
                  text-align: center;
                  border-radius: 15px;
                  cursor: pointer;
                }
                .btn:not(:last-child) {
                  margin-right: 20px;
                }
                .refund {
                  background: linear-gradient(
                    180deg,
                    rgba(240, 182, 52, 1) 0%,
                    rgba(254, 146, 1, 1) 100%
                  );
                  color: #fff;
                }
                .contact {
                  border: 1px solid rgba(250, 157, 17, 1);
                  color: #fa9d11;
                }
                .mr {
                  margin-right: 20px;
                }
              }
            }
          }
        }
      }
      .nothing {
        width: 1166px;
        height: 400px;
        margin: auto;
        overflow: hidden;
        text-align: center;
        font-size: 20px;
        color: #999;
        .empty {
          display: block;
          margin: 60px auto 0;
        }
      }
    }
  }
}
.fl {
  float: left;
}
/deep/ .ivu-modal-header,
/deep/ .ivu-modal-footer {
  height: 0;
  padding: 0;
  border: 0;
}
/deep/ .ivu-modal-content {
  border-radius: 4px;
}
/deep/ .ivu-modal-body {
  padding: 0;
}
/deep/ .ivu-modal-close {
  right: 10px;
  top: 20px;
  font-size: 30px;
}
.login .content {
  height: 300px;
  padding: 20px;
  border-radius: 6px;
  background-color: #fff;
  p{
    text-align: center;
    font-size: 14px;
    margin-top: 10px;
  }
  .wechatImg{
    display: block;
    width: 220px;
    height: 220px;
    margin:10px auto 0;
  }
}
/deep/ .vertical-center-modal {
  display: flex;
  align-items: center;
  // justify-content: center;
  -webkit-justify-content: center;
  .ivu-modal {
    top: 0;
  }
}
</style>