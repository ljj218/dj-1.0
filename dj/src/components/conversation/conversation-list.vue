<template>
  <div class="list-container">
    <div class="header-bar">
      <button title="刷新列表" @click="handleRefresh">
        <i class="tim-icon-refresh"></i>
      </button>
      <!-- <button title="创建会话" @click="handleAddButtonClick">
        <i class="tim-icon-add"></i>
      </button> -->
    </div>
    <div class="scroll-container">
      <conversation-item
        :conversation="item"
        v-for="item in conversationList"
        :key="item.conversationID"
      />
    </div>
    <!-- <el-dialog title="快速发起会话" :visible.sync="showDialog" width="30%">
      <el-input placeholder="请输入用户ID" v-model="userID" @keydown.enter.native="handleConfirm"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import ConversationItem from './conversation-item'
import { mapState ,mapActions,mapMutations} from 'vuex'
export default {
  name: 'ConversationList',
  components: { ConversationItem },
  data() {
    return {
      showDialog: false,
      userID: '',
      isCheckouting: false, // 是否正在切换会话
      timeout: null
    }
  },
  computed: {
    ...mapState({
      conversationList: state => state.conversation.conversationList,
      currentConversation: state => state.conversation.currentConversation
    })
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeydown)
  },
  destroyed() {
    window.removeEventListener('keydown', this.handleKeydown)
  },
  methods: {
        ...mapMutations({
       showMessage: "imInfo/showMessage",
    }),
    ...mapActions({
      checkoutConversation: "conversation/checkoutConversation",
    }),
    handleRefresh() {
      this.refreshConversation()()
    },
    refreshConversation() {
      let that = this
      return function () {
        if (!that.timeout) {
          that.timeout = setTimeout(() =>{
            that.timeout = null
            that.tim.getConversationList().then(() => {
              that.showMessage( {
                message: '刷新成功',
                type: 'success'
              })
            })
          }, 1000)
        }
      }
    },
    handleAddButtonClick() {
      this.showDialog = true
    },
    handleConfirm() {
      if (this.userID !== '@TIM#SYSTEM') {
        this.checkoutConversation(`C2C${this.userID}`)
          .then(() => {
            this.showDialog = false
          }).catch(() => {
          this.showMessage( {
            message: '没有找到该用户',
            type: 'warning'
          })
        })
      } else {
        this.showMessage( {
          message: '没有找到该用户',
          type: 'warning'
        })
      }
      this.userID = ''
    },
    handleKeydown(event) {
      if (event.keyCode !== 38 && event.keyCode !== 40 || this.isCheckouting) {
        return
      }
      const currentIndex = this.conversationList.findIndex(
        item => item.conversationID === this.currentConversation.conversationID
      )
      if (event.keyCode === 38 && currentIndex - 1 >= 0) {
        this.checkoutPrev(currentIndex)
      }
      if (
        event.keyCode === 40 &&
        currentIndex + 1 < this.conversationList.length
      ) {
        this.checkoutNext(currentIndex)
      }
    },
    checkoutPrev(currentIndex) {
      this.isCheckouting = true
      this.$checkoutConversation(
          this.conversationList[currentIndex - 1].conversationID
        )
        .then(() => {
          this.isCheckouting = false
        })
        .catch(() => {
          this.isCheckouting = false
        })
    },
    checkoutNext(currentIndex) {
      this.isCheckouting = true
      this.checkoutConversation(
          this.conversationList[currentIndex + 1].conversationID
        )
        .then(() => {
          this.isCheckouting = false
        })
        .catch(() => {
          this.isCheckouting = false
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.list-container
  height 100%
  width 100%
  display flex
  flex-direction column // -reverse
  .header-bar
    flex-shrink 0
    height 50px
    border-bottom 1px solid #303841
    padding 10px 10px 10px 20px
    button
      float right
      display: inline-block;
      cursor: pointer;
      background #303841
      border: none
      color: #76828c;
      box-sizing: border-box;
      transition: .3s;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      margin: 0 10px 0 0
      padding 0
      width 30px
      height 30px
      line-height 34px
      font-size: 24px;
      text-align: center;
      white-space: nowrap;
      border-radius: 50%
      outline 0
      &:hover
        // background #5cadff
        // color #ffffff
        transform: rotate(360deg);
        color #5cadff
  .scroll-container
    overflow-y scroll
    flex 1
.bottom-circle-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.refresh {
  bottom: 70px;
}
</style>
