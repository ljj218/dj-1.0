<template>
  <div class="detail">
    <cpNav />
      <bjImage >
        <img src="../assets/img/public/2.jpeg" alt="">
      </bjImage>
    <div class="container">
      <div class="user-about clearfix">
        <div class="pic-wrap fl">
          <img :src="info.headImg" class="pic" />
          <div class="online">
            <span>在线</span>
          </div>
        </div>
        <div class="status fl">
          <div class="name">
            <span>{{info.nickName}}</span>
            <img src="../assets/img/icon-girl.png" class="icon" />
          </div>
          <p>ID：{{info.userCode}}</p>
          <p class="tag">TA的标签：{{info.signature}}</p>
        </div>
      </div>
      <div class="user-content clearfix">
        <div class="img-wrap fl">
          <el-image style="width: 471px; height: 365px" :src="imgSrc" :preview-src-list="imgList"></el-image>
          <div class="img-zoom-wrap">
            <Icon
              type="ios-arrow-back"
              size="40"
              @click="moveLeft"
              :class="{opacity:imgList.length<5}"
            />
            <div class="list-img-content" ref="content">
              <div class="list-img-wrap" ref="imgWrap" :style="mathWidth(imgList.length)">
                <img
                  :src="n"
                  class="img-zoom"
                  :data-index="index"
                  :class="{active:num==index}"
                  :key="index"
                  @mouseenter="imgEnter"
                  v-for="(n,index) in imgList"
                />
              </div>
            </div>
            <Icon
              type="ios-arrow-forward"
              size="40"
              @click="moveRight"
              :class="{opacity:imgList.length<5}"
            />
          </div>
        </div>
        <div class="gamms lr">
          <div class="nav unselect">
            <div class="nav-item" :class="{active:type==1}" @click="type=1">
              <span>英雄联盟</span>
            </div>
            <div class="nav-item" :class="{active:type==2}" @click="type=2">
              <span>云顶之弈</span>
            </div>
          </div>
          <div class="game-content">
            <div class="game-info clearfix">
              <img :src="info.riftImg" class="game-pic fl" v-if="type==1" />
              <img :src="info.tacticsImg" class="game-pic fl" v-if="type==2" />
              <div class="info fl">
                <p v-if="type==1">
                  <span>¥</span>
                  <span class="num">{{(info.riftPrice/100).toFixed(2)}}</span>
                  <span>/局</span>
                </p>
                <p v-if="type==2">
                  <span>¥</span>
                  <span class="num">{{(info.tacticsPrice/100).toFixed(2)}}</span>
                  <span>/局</span>
                </p>
                <div class="times">接单数量：{{info.orderInNum}}次</div>
                <div class="voice">
                  <img src="../assets/img/icon-voice-2.png" class="voice" @click="play" />
                  <audio :src="info.soundFile" ref="audio" preload="load" class="audio">您的浏览器不支持音频播放</audio>
                </div>
              </div>
              <div class="interaction lr unselect">
                <div class="talk">聊一聊</div>
                <div class="order" @click="toOrder">立即下单</div>
              </div>
            </div>
            <div class="skilled" v-if="type==1">
              <p>
                <span class>主玩英雄:</span>
                {{info.playHero}}
              </p>
              <p>
                <span class>擅长位置:</span>
                {{info.playPosition|posplayer}}
              </p>
            </div>
            <div class="introduce">
              <span>自我介绍/</span>
              {{info.introduce||info.signature}}
            </div>
          </div>
        </div>
      </div>

      <div class="comment">
        <div class="title clearfix">
          <span class="fl">老板评论</span>
          <span class="lr">共2条评论</span>
        </div>
        <div class="info clearfix" v-for="(item,index) in commonList" :key="index">
          <img src="../assets/img/public/wh.jpg" class="head fl" />
          <div class="user fl">
            <p>{{item.nickName}}</p>
            <p class="time">{{item.createTime}}</p>
            <div class="mes">{{item.content}}</div>
          </div>
          <Rate :value="item.level" disabled class="lr start" />
        </div>
        <div class="pages">
          <Page :total="count"  @on-change="changePage"/>
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
import { getUserInfo } from "../common/api/user";
import { getComment } from "../common/api/index";
import { mapMutations, mapGetters } from "vuex";
import bjImage from "../components/bjImage";

export default {
  components: { cpNav, quickBtn, foot ,bjImage},
  name: "detail",
  data() {
    return {
      imgList: [],
      imgSrc: "",
      type: 1,
      num: 0,
      showPrev: true,
      id: "",
      info: "",
      pageNo: 1,
      commonList: [],
      ispalying: false,
      count:0
    };
  },
  computed: {
    ...mapGetters(["userData","userInfo"]),
  },
  created() {
    this.id = this.$route.query.id || "";
  },
  mounted() {
    this.gotUserInfo();
    this.gotComment();
  },
  methods: {
    ...mapMutations({
      setLoginFlag: "user/SET_LOGIN_FLAG",
    }),
    play() {
      if (!this.ispalying) {
        this.$refs.audio.play();
        this.ispalying = true;
      } else {
        this.$refs.audio.pause();
        this.ispalying = false;
      }
      this.$forceUpdate();
    },
    toOrder() {
      sessionStorage.setItem("_infos", JSON.stringify(this.info));
      if (this.userData) {
        this.$router.openPage("/order?type=" + this.type + "&id=" + this.id);
      } else {
        this.setLoginFlag(true);
      }
    },
    async gotComment() {
      if (!this.id) return;
      try {
        let res = await getComment({
          userId: this.id || "",
          pageNo: this.pageNo,
        });
        if (res.resultCode == "0000") {
          this.commonList = res.data;
          this.count=res.count;
        }
      } catch (error) {}
    },
    changePage(e){
      this.pageNo=e;
      this.gotComment();
    },
    async gotUserInfo() {
      if (!this.id) return;
      try {
        let res = await getUserInfo({
          userId: this.id || "",
        });
        if (res.resultCode == "0000") {
          this.info = res.data;
          this.imgList = res.data.photo ? res.data.photo.split("@") : [];
          this.imgSrc = this.imgList.length > 0 ? this.imgList[0] : "";
        }
      } catch (error) {}
    },
    mathWidth(num) {
      return `width:${num * 80}px`;
    },
    moveLeft() {
      let node = this.$refs.content;
      let clientWidth = this.$refs.imgWrap.clientWidth;
      if (node.scrollLeft > 0) {
        node.scrollLeft = node.scrollLeft - 390;
      }
    },
    moveRight() {
      let node = this.$refs.content;
      let clientWidth = this.$refs.imgWrap.clientWidth;
      if (node.scrollLeft + 390 < clientWidth) {
        node.scrollLeft = node.scrollLeft + 390;
      }
    },
    imgEnter(e) {
      this.num = e.target.dataset.index;
      this.imgSrc = e.target.currentSrc;
    },
  },
};
</script>
<style lang='scss' scoped>
.detail {
  position: relative;
  width: 100%;

  .container {
    position: relative;
    width: 1200px;
    margin: 50px auto 0;
    z-index: 9;
    .user-about {
      width: 1200px;
      height: 110px;
      padding: 6px 0;
      background-color: #fff;
      .pic-wrap {
        width: 120px;
        height: 98px;
        .pic {
          display: block;
          width: 75px;
          height: 75px;
          margin: auto;
          border-radius: 50%;
        }
        .online {
          font-size: 14px;
          text-align: center;
          color: rgba(74, 183, 143, 1);
          span {
            position: relative;
            padding-left: 8px;
          }
          span::after {
            content: "";
            position: absolute;
            top: 50%;
            margin-top: -2px;
            left: 0;
            width: 4px;
            height: 4px;
            background-color: #4ab78f;
            border-radius: 50%;
          }
        }
      }
      .status {
        width: 80%;
        height: 98px;
        font-size: 12px;
        color: rgba(102, 102, 102, 1);
        .name {
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          margin-bottom: 15px;
          .icon {
            display: inline-block;
            width: 19px;
            height: 19px;
            transform: translateY(3px);
          }
        }
        .tag {
          margin-top: 15px;
        }
      }
    }
    .user-content {
      width: 1200px;
      margin: 50px auto 0;
      .img-wrap {
        position: relative;
        width: 471px;
        height: 456px;
        background: rgba(255, 255, 255, 1);
        font-size: 0;
        .md-search {
          position: absolute;
          z-index: 5;
          right: 0;
          top: 346px !important;
          font-size: 25px;
          color: #fff;
          padding: 5px;
          width: 25px;
          height: 25px;
          background: rgba(0, 0, 0, 0.3);
          /deep/ .el-image {
            left: 0;
            top: 0;
            opacity: 0;
          }
        }
        .opacity {
          opacity: 0.2;
        }
        .ivu-icon {
          position: absolute;
          z-index: 3;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
        .ivu-icon-ios-arrow-back {
          left: 0;
        }
        .ivu-icon-ios-arrow-forward {
          right: 0;
        }
        .img {
          width: 471px;
          height: 365px;
        }

        .list-img-content {
          width: 385px;
          margin: auto;
          overflow: hidden;
        }
        .img-zoom-wrap {
          position: relative;
          width: 100%;
          height: 92px;
          padding: 16px 40px;
          overflow: hidden;
          transition: all 0.5s;
          .active {
            border: 1px solid #333;
          }
          .img-zoom {
            display: inline-block;
            width: 60px;
            height: 60px;
            margin-right: 20px;
          }
        }
        /deep/ .swiper-container {
          width: 100%;
          height: 60px;
          padding: 0 40px;
          margin: 15px auto 0;
        }
        /deep/ .swiper-slide {
          width: 60px !important;
          height: 60px !important;
          margin-right: 20px;
        }
        .user-img {
          width: 60px;
          height: 60px;
        }
      }
      .gamms {
        width: 687px;
        height: 456px;
        background: rgba(255, 255, 255, 1);
        .nav {
          padding: 0 40px;
          font-size: 14px;
          color: rgba(153, 153, 153, 1);
          .nav-item {
            display: inline-block;
            height: 77px;
            line-height: 77px;
            margin-right: 30px;
            cursor: pointer;
            span {
              position: relative;
              padding: 3px;
            }
          }
          .active {
            font-size: 18px;
            color: rgba(254, 149, 4, 1);
          }
          .active span::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -25px;
            width: 50px;
            height: 2px;
            background: rgba(254, 149, 4, 1);
          }
        }
        .game-content {
          .game-info {
            padding: 0 40px 25px 40px;
            border-bottom: 1px solid #e0e0e0;
            .game-pic {
              width: 164px;
              height: 142px;
              border-radius: 4px;
              margin-right: 20px;
            }
            .info {
              padding-top: 20px;
              p {
                font-size: 12px;
                color: rgba(153, 153, 153, 1);
                margin-bottom: 15px;
                .num {
                  font-size: 21px;
                  color: #f96c9a;
                }
              }
              .times {
                padding-left: 20px;
                font-size: 12px;
                color: rgba(153, 152, 153, 1);
                background: url("../assets/img/icon-list.png") center left
                  no-repeat;
                background-size: 12px 14px;
              }
              .voice {
                cursor: pointer;
                width: 65px;
                height: 21px;
                margin-top: 10px;
                > img {
                  width: 65px;
                  height: 21px;
                }
              }
            }
            .interaction {
              margin-top: 19px;
              .talk,
              .order {
                cursor: pointer;
                width: 130px;
                height: 45px;
                line-height: 45px;
                border-radius: 6px;
                font-size: 18px;
                text-align: center;
                color: #fe9504;
                border: 1px solid rgba(253, 149, 5, 1);
              }
              .order {
                background: linear-gradient(
                  180deg,
                  rgba(241, 181, 50, 1) 0%,
                  rgba(254, 148, 3, 1) 100%
                );
                color: #fff;
                margin-top: 14px;
              }
            }
          }
          .skilled {
            padding: 10px 40px;
            border-bottom: 1px solid #e0e0e0;
            p {
              margin-bottom: 10px;
            }
            span {
              font-size: 16px;
              color: rgba(51, 51, 51, 1);
              margin-right: 20px;
            }
          }
          .introduce {
            padding: 10px 40px;
            span {
              font-size: 18px;
              color: rgba(51, 51, 51, 1);
            }
          }
        }
      }
    }
    .comment {
      width: 1200px;
      margin: 40px auto 0;
      background-color: #fff;
      .title {
        width: 100%;
        height: 80px;
        line-height: 80px;
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
        padding: 0 40px;
        border-bottom: 1px solid #e0e0e0;
      }
      .info {
        width: 100%;
        min-height: 80px;
        padding: 10px 40px;
        border-bottom: 1px solid #e0e0e0;
        .head {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 15px;
        }
        .user {
          width: 70%;
          font-size: 14px;
          color: rgba(102, 102, 102, 1);
          .time {
            font-size: 12px;
            color: rgba(153, 153, 153, 1);
          }
          .mes {
            font-size: 14px;
            color: rgba(102, 102, 102, 1);
          }
        }
        .start {
          font-size: 40px;
        }
      }
      .pages {
        height: 60px;
        text-align: center;
        /deep/ .ivu-page {
          margin-top: 20px;
        }
      }
    }
  }
}
.fl {
  float: left;
}
.lr {
  float: right;
}
/deep/ [class^="el-icon-"] {
  color: #fff;
}
/deep/ .el-image-viewer__close{
  top: 120px;
}
</style>