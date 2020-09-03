<template>
  <div class="profile-user">
    <avatar :title="userProfile.userID" :src="userProfile.avatar" />
    <div class="nick-name text-ellipsis">
      <span v-if="userProfile.nick" :title="userProfile.nick">{{ userProfile.nick }}</span>
      <span v-else class="anonymous" title="该用户未设置昵称">[Anonymous]</span>
    </div>
    <div class="gender" v-if="genderClass">
      <span :title="gender" class="iconfont" :class="genderClass"></span>
    </div>
    <el-button
      title="将该用户加入黑名单"
      type="text"
      @click="addToBlackList"
      v-if="!isInBlacklist && userProfile.userID !== myUserID"
      class="btn-add-blacklist"
    >加入黑名单</el-button>
    <el-button
      title="将该用户移出黑名单"
      type="text"
      @click="removeFromBlacklist"
      v-else-if="isInBlacklist"
    >移出黑名单</el-button>
    <!-- 拉黑 和 反拉黑 -->
  </div>
</template>

<script>
import { mapGetters ,mapMutations} from "vuex";
export default {
  props: {
    userProfile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["blacklist", "myUserID", "currentUserProfile"]),
    isInBlacklist() {
      return (
        this.blacklist.findIndex(
          (item) => item.userID === this.userProfile.userID
        ) >= 0
      );
    },
    gender() {
      switch (this.userProfile.gender) {
        case this.TIM.TYPES.GENDER_MALE:
          return "男";
        case this.TIM.TYPES.GENDER_FEMALE:
          return "女";
        default:
          return "未设置";
      }
    },
    genderClass() {
      switch (this.userProfile.gender) {
        case this.TIM.TYPES.GENDER_MALE:
          return "icon-male";
        case this.TIM.TYPES.GENDER_FEMALE:
          return "icon-female";
        default:
          return "";
      }
    },
  },
  methods: {
       ...mapMutations({
       showMessage: "imInfo/showMessage",
    }),
    addToBlackList() {
      this.tim
        .addToBlacklist({ userIDList: [this.userProfile.userID] })
        .then(() => {
          this.$store.dispatch("getBlacklist");
        })
        .catch((imError) => {
          this.showMessage( {
            message: imError.message,
            type: "error",
          });
        });
    },
    removeFromBlacklist() {
      this.tim
        .removeFromBlacklist({ userIDList: [this.userProfile.userID] })
        .then(() => {
          this.$store.commit("removeFromBlacklist", this.userProfile.userID);
        })
        .catch((error) => {
          this.showMessage( {
            type: "error",
            message: error.message,
          });
          
        });
    },
  },
};
</script>

<style lang="stylus" scoped>
.profile-user {
  width: 100%;
  text-align: center;
  padding: 0 20px;

  .avatar {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    margin: 30px auto;
  }

  .nick-name {
    width: 100%;
    color: #1c2438;
    font-size: 20px;
    font-weight: bold;
    text-shadow: #76828c 0 0 0.1em;

    .anonymous {
      color: #a5b5c1;
      text-shadow: none;
    }
  }

  .gender {
    padding: 5px 0 10px 0;
    border-bottom: 1px solid #e7e7e7;
  }

  .btn-add-blacklist {
    color: #f35f5f;
  }
}
</style>
