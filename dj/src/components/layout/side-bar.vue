<template>
  <div class="side-bar-wrapper">
    <div class="bar-left">
      <!-- <my-profile /> -->
      <div class="tab-items" @click="handleClick">
        <div
          id="conversation-list"
          class="iconfont icon-conversation"
          :class="{ active: showConversationList }"
          title="会话列表"
        >
          <sup class="unread" v-if="totalUnreadCount !== 0">
            <template v-if="totalUnreadCount > 99">99+</template>
            <template v-else>{{totalUnreadCount}}</template>
          </sup>
        </div>
      </div>
    </div>
    <div class="bar-right">
      <conversation-list v-show="showConversationList" />
    </div>
  </div>
</template>

<script>
import { mapGetters,mapMutations } from "vuex";
import MyProfile from "../my-profile";
import ConversationList from "../conversation/conversation-list";

const activeName = {
  CONVERSATION_LIST: "conversation-list",
};
export default {
  name: "SideBar",
  components: {
    MyProfile,
    ConversationList,
  },
  data() {
    return {
      active: activeName.CONVERSATION_LIST,
      activeName: activeName,
    };
  },
  computed: {
    ...mapGetters(["totalUnreadCount"]),
    showConversationList() {
      return this.active === activeName.CONVERSATION_LIST;
    },
  },
  methods: {
     ...mapMutations({
      showMessage: "user/showMessage",
    }),
    checkoutActive(name) {
      this.active = name;
    },
    handleClick(event) {
      switch (event.target.id) {
        case activeName.CONVERSATION_LIST:
          this.checkoutActive(activeName.CONVERSATION_LIST);
          break;
      }
    },
    handleRefresh() {
      switch (this.active) {
        case activeName.CONVERSATION_LIST:
          this.tim.getConversationList().catch((error) => {
            this.showMessage({
              type: "error",
              message: error.message,
            });
          });
          break;
      }
    },
    getGroupList() {
      this.tim
        .getGroupList()
        .then(({ data: groupList }) => {
          this.$store.dispatch("updateGroupList", groupList);
        })
        .catch((error) => {
         this.showMessage({
              type: "error",
              message: error.message,
            });
        });
    },
    getFriendList() {
      this.tim
        .getFriendList()
        .then(({ data: friendList }) => {
          this.$store.commit("upadteFriendList", friendList);
        })
        .catch((error) => {
         this.showMessage({
              type: "error",
              message: error.message,
            });
        })
        .catch((error) => {
         this.showMessage({
              type: "error",
              message: error.message,
            });
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
.side-bar-wrapper {
  height: 100%;
  color: $black;
  display: flex;
  width: 100%;
  overflow: hidden;

  .bar-left {
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    width: 80px;
    height: $height;
    background-color: $background-deep-dark;

    .tab-items {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      .iconfont {
        position: relative;
        margin: 0;
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 30px;
        cursor: pointer;
        color: $first;
        user-select: none;
        -moz-user-select: none;
      }

      .active {
        color: $white;
        background-color: $background-dark;

        &::after {
          content: ' ';
          display: block;
          position: absolute;
          top: 0;
          z-index: 0;
          height: 70px;
          // border-left 4px solid $border-highlight
          border-left: 4px solid $light-primary;
        }
      }

      .unread {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 999;
        display: inline-block;
        height: 18px;
        padding: 0 6px;
        font-size: 12px;
        color: #FFF;
        line-height: 18px;
        text-align: center;
        white-space: nowrap;
        border-radius: 10px;
        background-color: $danger;
      }
    }

    .bottom {
      height: 70px;

      &>span {
        display: block;
      }

      .btn-more {
        width: 100%;
        height: 70px;
        line-height: 70px;
        font-size: 30px;
        color: $first;
        text-align: center;
        cursor: pointer;
      }

      .iconfont {
        height: 70px;
        line-height: 70px;
        text-align: center;
        font-size: 30px;
        cursor: pointer;
        color: $first;
        user-select: none;
        -moz-user-select: none;
      }

      .iconfont:hover {
        color: white;
      }
    }

    .btn-more:hover {
      color: $white;
    }
  }

  .bar-right {
    // flex 1
    flex: 1 1 auto;
    width: 100%;
    min-width: 0;
    height: $height;
    position: relative;
    background-color: $background-dark;
  }
}
</style>
