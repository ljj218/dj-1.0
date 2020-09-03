<template>
  <div class="container">
  
    <div
      class="loading"
      v-loading="showLoading"
      element-loading-text="正在拼命初始化..."
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="chat-wrapper">
        <el-row>
          <el-col :xs="10" :sm="10" :md="8" :lg="8" :xl="7">
            <side-bar />
          </el-col>
          <el-col :xs="14" :sm="14" :md="16" :lg="16" :xl="17">
            <current-conversation />
          </el-col>
        </el-row>
      </div>
      <image-previewer />
    </div>
    <div class="bg"></div>
  </div>
</template>

<script>
import { Notification } from "element-ui";
import { mapGetters, mapMutations, mapActions } from "vuex";
import CurrentConversation from "../components/conversation/current-conversation";
import SideBar from "../components/layout/side-bar";
import ImagePreviewer from "../components/message/image-previewer.vue";
import { translateGroupSystemNotice } from "../utils/common";
import { ACTION } from "../utils/trtcCustomMessageMap";
import MTA from "../utils/mta";

export default {
  title: "TIMSDK DEMO",
  components: {
    SideBar,
    CurrentConversation,
    ImagePreviewer,
  },
  data() {
    return {
      playerId: "",
    };
  },
  computed: {
    ...mapGetters([
      "currentUserProfile",
      "currentConversation",
      "isLogin",
      "isSDKReady",
      "isBusy",
      "userID",
      "userData",
    ]),
    // 是否显示 Loading 状态
    showLoading() {
      return !this.isSDKReady;
    },
  },

  mounted() {
    this.tlakToPlayer = this.$route.query.playerId || "";
    // 初始化监听器
    this.imLogin();

    this.initListener();
  },

  watch: {
    isLogin(next) {
      if (next) {
        MTA.clickStat("link_two", { show: "true" });
      }
    },
  },

  methods: {
    ...mapMutations({
      updateConversationList: "conversation/updateConversationList",
      pushCurrentMessageList: "conversation/pushCurrentMessageList",
      updateGroupList: "group/updateGroupList",
      toggleIsLogin: "imInfo/toggleIsLogin",
      showMessage: "imInfo/showMessage",
      toggleIsSDKReady: "imInfo/toggleIsSDKReady",
      updateCurrentUserProfile: "imInfo/updateCurrentUserProfile",
      getUserInfo: "imInfo/GET_USER_INFO",
      startComputeCurrent: "imInfo/startComputeCurrent",
    }),

    ...mapActions({
      getBlacklist: "blacklist/getBlacklist",
      checkoutConversation: "conversation/checkoutConversation",
    }),
    imLogin() {
      this.loading = true;
      this.tim
        .login({
          userID: this.userData.userCode,
          userSig: window.genTestUserSig(this.userData.userCode).userSig,
        })
        .then(() => {
          this.loading = false;
          // this.toggleIsLogin(true);
          this.startComputeCurrent();
          this.getUserInfo({
            type: "GET_USER_INFO",
            userID: this.userData.userCode,
            userSig: window.genTestUserSig(this.userData.userCode).userSig,
            sdkAppID: window.genTestUserSig("").SDKAppID,
          });
          // this.$store.commit('showMessage', {
          //   type: 'success',
          //   message: 'IM登录成功'
          // })
          //添加聊天对象
          this.tlakToPlayer();
          console.log("IM登录成功");
        })
        .catch((error) => {
          this.loading = false;
          console.log("IM登录失败");
        });
    },
    initListener() {
      // 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
      this.tim.on(this.TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
      // SDK NOT READT
      this.tim.on(this.TIM.EVENT.SDK_NOT_READY, this.onReadyStateUpdate, this);
      // 被踢出
      this.tim.on(this.TIM.EVENT.KICKED_OUT, this.onKickOut);
      // SDK内部出错
      this.tim.on(this.TIM.EVENT.ERROR, this.onError);
      // 收到新消息
      this.tim.on(this.TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
      // 会话列表更新
      this.tim.on(
        this.TIM.EVENT.CONVERSATION_LIST_UPDATED,
        this.onUpdateConversationList
      );
      // 群组列表更新
      this.tim.on(this.TIM.EVENT.GROUP_LIST_UPDATED, this.onUpdateGroupList);
      // 网络监测
      this.tim.on(this.TIM.EVENT.NET_STATE_CHANGE, this.onNetStateChange);
      // 已读回执
      this.tim.on(
        this.TIM.EVENT.MESSAGE_READ_BY_PEER,
        this.onMessageReadByPeer
      );
    },
    tlakToPlayer() {
      if (this.playerId !== "@TIM#SYSTEM") {
        this.checkoutConversation(`C2C${this.playerId}`)
          .then(() => {
            // this.showDialog = false;
          })
          .catch(() => {
            this.showMessage({
              message: "没有找到该用户",
              type: "warning",
            });
          });
      } else {
        this.showMessage({
          message: "没有找到该用户",
          type: "warning",
        });
      }
      // this.playerId = "";
    },
    onReceiveMessage({ data: messageList }) {
      this.handleVideoMessage(messageList);
      this.handleAt(messageList);
      this.handleQuitGroupTip(messageList);
      this.pushCurrentMessageList(messageList);
    },
    onError({ data }) {
      if (data.message !== "Network Error") {
        this.showMessage({
          message: data.message,
          type: "error",
        });
      }
    },
    onMessageReadByPeer() {},
    onReadyStateUpdate({ name }) {
      const isSDKReady = name === this.TIM.EVENT.SDK_READY ? true : false;
      this.toggleIsSDKReady(isSDKReady);

      if (isSDKReady) {
        this.tim
          .getMyProfile()
          .then(({ data }) => {
            this.updateCurrentUserProfile(data);
          })
          .catch((error) => {
            this.showMessage({
              type: "error",
              message: error.message,
            });
          });
        this.getBlacklist();
      }
    },
    kickedOutReason(type) {
      switch (type) {
        case this.TIM.TYPES.KICKED_OUT_MULT_ACCOUNT:
          return "由于多实例登录";
        case this.TIM.TYPES.KICKED_OUT_MULT_DEVICE:
          return "由于多设备登录";
        case this.TIM.TYPES.KICKED_OUT_USERSIG_EXPIRED:
          return "由于 userSig 过期";
        default:
          return "";
      }
    },
    checkoutNetState(state) {
      switch (state) {
        case this.TIM.TYPES.NET_STATE_CONNECTED:
          return { message: "已接入网络", type: "success" };
        case this.TIM.TYPES.NET_STATE_CONNECTING:
          return { message: "当前网络不稳定", type: "warning" };
        case this.TIM.TYPES.NET_STATE_DISCONNECTED:
          return { message: "当前网络不可用", type: "error" };
        default:
          return "";
      }
    },
    onNetStateChange(event) {
      this.showMessage(this.checkoutNetState(event.data.state));
    },
    onKickOut(event) {
      this.showMessage({
        message: `${this.kickedOutReason(event.data.type)}被踢出，请重新登录。`,
        type: "error",
      });
      this.toggleIsLogin(false);
      this.$store.commit("reset");
    },
    onUpdateConversationList(event) {
      this.updateConversationList(event.data);
    },
    onUpdateGroupList(event) {
      this.updateGroupList(event.data);
    },
    onReceiveGroupSystemNotice(event) {
      const isKickedout = event.data.type === 4;
      const isCurrentConversation =
        `GROUP${event.data.message.payload.groupProfile.groupID}` ===
        this.currentConversation.conversationID;
      // 在当前会话被踢，需reset当前会话
      if (isKickedout && isCurrentConversation) {
        this.$store.commit("resetCurrentConversation");
      }
      Notification({
        title: "新系统通知",
        message: translateGroupSystemNotice(event.data.message),
        duration: 3000,
        onClick: () => {
          const SystemConversationID = "@TIM#SYSTEM";
          this.checkoutConversation(SystemConversationID);
        },
      });
    },
    /**
     * 处理 @ 我的消息
     * @param {Message[]} messageList
     */
    handleAt(messageList) {
      // 筛选有 @ 符号的文本消息
      const atTextMessageList = messageList.filter(
        (message) =>
          message.type === this.TIM.TYPES.MSG_TEXT &&
          message.payload.text.includes("@")
      );
      for (let i = 0; i < atTextMessageList.length; i++) {
        const message = atTextMessageList[i];
        const matched = message.payload.text.match(/@\w+/g);
        if (!matched) {
          continue;
        }
        // @ 我的
        if (matched.includes(`@${this.currentUserProfile.userID}`)) {
          // 当前页面不可见时，调用window.Notification接口，系统级别通知。
          if (this.$store.getters.hidden) {
            this.notifyMe(message);
          }
          Notification({
            title: `有人在群${message.conversationID.slice(5)}提到了你`,
            message: message.payload.text,
            duration: 3000,
          });
          this.$bus.$emit("new-messsage-at-me", {
            data: { conversationID: message.conversationID },
          });
        }
      }
    },
    selectConversation(conversationID) {
      if (conversationID !== this.currentConversation.conversationID) {
        this.checkoutConversation(conversationID);
      }
    },
    isJsonStr(str) {
      try {
        JSON.parse(str);
        return true;
      } catch {
        return false;
      }
    },
    handleVideoMessage(messageList) {
      const videoMessageList = messageList.filter(
        (message) =>
          message.type === this.TIM.TYPES.MSG_CUSTOM &&
          this.isJsonStr(message.payload.data)
      );
      if (videoMessageList.length === 0) return;
      const videoPayload = JSON.parse(videoMessageList[0].payload.data);
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_DIALING) {
        if (this.isBusy) {
          this.$bus.$emit("busy", videoPayload, videoMessageList[0]);
          return;
        }

        this.selectConversation(videoMessageList[0].conversationID); // 切换当前会话页
        if (videoMessageList[0].from !== this.userID) {
          this.$bus.$emit("isCalled");
        }
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_SPONSOR_CANCEL) {
        this.$bus.$emit("missCall");
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_REJECT) {
        this.$bus.$emit("isRefused");
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_SPONSOR_TIMEOUT) {
        this.$bus.$emit("missCall");
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_ACCEPTED) {
        this.$bus.$emit("isAccept");
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_HANGUP) {
        this.$bus.$emit("isHungUp");
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_LINE_BUSY) {
        this.$bus.$emit("isRefused");
      }
      if (videoPayload.action === ACTION.VIDEO_CALL_ACTION_ERROR) {
        this.$bus.$emit("isRefused");
      }
    },
    /**
     * 使用 window.Notification 进行全局的系统通知
     * @param {Message} message
     */
    notifyMe(message) {
      // 需检测浏览器支持和用户授权
      if (!("Notification" in window)) {
        return;
      } else if (window.Notification.permission === "granted") {
        this.handleNotify(message);
      } else if (window.Notification.permission !== "denied") {
        window.Notification.requestPermission().then((permission) => {
          // 如果用户同意，就可以向他们发送通知
          if (permission === "granted") {
            this.handleNotify(message);
          }
        });
      }
    },
    handleNotify(message) {
      const notification = new window.Notification("有人提到了你", {
        icon:
          "https://webim-1252463788.file.myqcloud.com/demo/img/logo.dc3be0d4.png",
        body: message.payload.text,
      });
      notification.onclick = () => {
        window.focus();
        this.checkoutConversation(message.conversationID);
        notification.close();
      };
    },
    handleLinkClick() {
      MTA.clickStat("link_two", { click: "true" });
    },
    /**
     * 收到有群成员退群/被踢出的groupTip时，需要将相关群成员从当前会话的群成员列表中移除
     * @param {Message[]} messageList
     */
    handleQuitGroupTip(messageList) {
      // 筛选出当前会话的退群/被踢群的 groupTip
      const groupTips = messageList.filter((message) => {
        return (
          this.currentConversation.conversationID === message.conversationID &&
          message.type === this.TIM.TYPES.MSG_GRP_TIP &&
          (message.payload.operationType === this.TIM.TYPES.GRP_TIP_MBR_QUIT ||
            message.payload.operationType ===
              this.TIM.TYPES.GRP_TIP_MBR_KICKED_OUT)
        );
      });
      // 清理当前会话的群成员列表
      if (groupTips.length > 0) {
        groupTips.forEach((groupTip) => {
          if (
            Array.isArray(groupTip.payload.userIDList) ||
            groupTip.payload.userIDList.length > 0
          ) {
            this.$store.commit(
              "deleteGroupMemberList",
              groupTip.payload.userIDList
            );
          }
        });
      }
    },
  },
};
</script>

<style lang="stylus">
#wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
}

.container {
  position: relative;
  height: 100vh;
}

.container {
  position: relative;
  height: 100vh;
}

// TODO filter mac chrome 会有问题，下次修改可以去掉
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background: url('~@/./assets/image/bg.jpg') no-repeat 0 0;
  background-size: cover;
  // filter blur(67px)
}

.loading {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-wrapper {
  margin-top: 8vh;
  width: 80vw;
  height: 80vh;
  max-width: 1280px;
  box-shadow: 0 11px 20px 0 rgba(0, 0, 0, 0.3);

  .official-link {
    display: flex;
    text-decoration: none;
    color: #38c9ff;
    width: fit-content;
    float: right;
    height: 45px;
    align-items: center;
  }
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
