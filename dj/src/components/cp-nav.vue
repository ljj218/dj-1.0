<template>
    <div class="pos">
        <div class="nav clearfix">
            <div class="page-title fl unselect">LOL速陪</div>
            <ul class="lf-list fl clearfix unselect">
                <li
                    class="item quick"
                    :class="{active:pathName=='Index'}"
                    @click="$router.openPage('/')"
                >速配厅</li>
                <li
                    class="item"
                    :class="{active:pathName=='PlayHall'}"
                    @click="$router.openPage('/playHall')"
                >陪玩厅</li>
                <li class="item">小程序</li>
                <li
                    class="item"
                    :class="{active:pathName=='orderList'}"
                    @click="$router.openPage('/orderList')"
                >我的订单</li>
            </ul>
            <div class="lf clearfix">
                <div class="input-wrap fl clearfix flex align-items">
                    <input type="text" class="search fl" placeholder="陪玩昵称 ID " />
                    <img src="../assets/img/public/icon-search.png" class="icon-search fl" />
                </div>
                <div class="center-wrap fr clearfix" v-if="userData">
                    <img
                        src="../assets/img/public/icon-main2.png"
                        class="head fl"
                        @mouseenter="emterUserInfo"
                        @mouseleave="leaveUserInfo"
                        @click="$router.openPage('/mine')"
                    />
                    <div
                        class="name fl one-text"
                        @mouseenter="emterUserInfo"
                        @mouseleave="leaveUserInfo"
                        @click="$router.openPage('/mine')"
                    >一起看流星雨</div>
                    <span class="login-out unslect" @click="loginOut">注销</span>
                </div>
                <div class="center-wrap fr clearfix" v-else>
                    <img
                        src="../assets/img/public/icon-main2.png"
                        class="head fl"
                    />
                    <!-- <div
                        class="name fl one-text"
                        @mouseenter="emterUserInfo"
                        @mouseleave="leaveUserInfo"
                        @click="$router.openPage('/mine')"
                    >一起看流星雨</div> -->
                    <span class="login-out unslect" @click="setLoginFlag(true)">登录</span>
                </div>

                <div
                    class="user-info-wrap animated"
                    @mouseenter="emterUserInfo"
                    @mouseleave="leaveUserInfo"
                    :class="[showUserInfo?'fadeIn':'fadeOut']"
                    v-if="showUserInfo"
                >
                    <div class="user-info clearfix">
                        <img src="../assets/img/public/wh.jpg" class="head fl" />
                        <div class="info">
                            <p class="name">一起看流星雨</p>
                            <p class="id">ID:111111</p>
                        </div>
                    </div>
                    <div class="quick-btn-wrap clearfix unselect">
                        <div class="btn-wrap mr fl" @click="$router.openPage('/mine')">
                            <img src="../assets/img/icon-zl.png" class="icon1" />
                            <span>资料</span>
                        </div>
                        <div class="btn-wrap fl" @click="$router.openPage('/orderList')">
                            <img src="../assets/img/icon-order.png" class="icon2" />
                            <span>订单</span>
                        </div>
                    </div>
                    <div class="level-wrap">
                        <p class="hint">距离下次升级还需20单</p>
                        <div class="slider-wrap clearfix">
                            <div class="progress">
                                <div class="bar" style="width:20%;"></div>
                            </div>
                            <span class="fl start">0</span>
                            <span class="fr end">25</span>
                        </div>
                    </div>
                    <div class="deposit-wrap clearfix">
                        <div class="money fl">余额：50.0</div>
                        <i class="fl"></i>
                        <div class="btn btnclick fl unselect" @click="$router.openPage('/recharge')">充值</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapMutations,mapGetters} from "vuex"
export default {
    components: {},
    name: "cpNav",
    data() {
        return {
            pathName: "",
            showUserInfo: false,
            time: null,
        };
    },
    computed: {
        ...mapGetters(["userData"])
    },
    created() {},
    mounted() {
        this.pathName = this.$route.name;
    },
    methods: {
         ...mapMutations({
            setLoginFlag: "user/SET_LOGIN_FLAG",
            setUserData: "user/SET_USER_DATA",
        }),
        leaveUserInfo() {
            this.time = setTimeout(() => {
                this.showUserInfo = false;
            }, 1000);
        },
        emterUserInfo() {
            this.showUserInfo = true;
            clearTimeout(this.time);
        },
        loginOut() {
            this.$Modal.confirm({
                title: "提示",
                content: "<p>确定退出登录？</p>",
                onOk: () => {
                    this.cookies.remove('userData');
                    this.setUserData('');
                    window.location.href=location.href.split('?')[0];
                },
                onCancel: () => {
                    // this.$Message.info("Clicked cancel");
                },
            });
        },
    },
};
</script>
<style lang='scss' scoped>
.pos {
    position: relative;
    height: 94px;
    width: 100%;
    z-index: 3;
    .user-info-wrap {
        position: absolute;
        right: 30px;
        top: 94px;
        width: 208px;
        height: 165px;
        background: rgba(255, 255, 255, 1);
    }
}
.nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    min-width: 1200px;
    width: 100%;
    height: 94px;
    z-index: 2;
    background: rgba(0, 0, 0, 0.2);
    .page-title {
        // cursor: pointer;
        height: 94px;
        line-height: 94px;
        font-size: 30px;
        color: rgba(255, 255, 255, 1);
        margin-left: 50px;
    }
    .lf-list {
        width: 600px;
        height: 94px;
        line-height: 94px;
        margin-left: 104px;
        // margin-left: 9%;

        .item {
            cursor: pointer;
            display: inline-block;
            font-size: 16px;
            color: rgba(255, 255, 255, 1);
            margin-right: 102px;
        }
        .quick {
            margin-right: 84px;
        }
        .item:last-child {
            margin-right: 0 !important;
        }
        .active {
            color: #fd9707;
        }
        .item:hover {
            color: #fd9707;
        }
    }
    .isLogin:hover {
        + .user-info-wrap {
            display: block;
        }
    }
    .lf {
        position: absolute;
        right: 0;
        top: 0;
        height: 94px;
        padding-top: 33px;
        margin-right: 50px;
        .user-info-wrap {
            padding: 10px 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            .user-info {
                width: 100%;
                height: 30px;
                .head {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-right: 20px;
                    margin-left: 17px;
                }
                .info {
                    font-size: 12px;
                    color: rgba(153, 153, 153, 1);
                }
            }
            .quick-btn-wrap {
                margin-top: 10px;

                .mr {
                    // margin-right: 20px;
                }
                .btn-wrap {
                    width: 50%;
                    font-size: 14px;
                    color: rgba(51, 51, 51, 1);
                    height: 19px;
                    line-height: 19px;
                    cursor: pointer;
                    text-align: center;
                    margin-bottom: 10px;
                    span {
                        display: inline-block;
                        vertical-align: middle;
                    }
                    .icon1 {
                        width: 23px;
                        height: 19px;
                        vertical-align: middle;
                        margin-right: 10px;
                    }
                    .icon2 {
                        vertical-align: middle;
                        width: 16px;
                        height: 19px;
                        margin-right: 10px;
                    }
                }
            }
            .level-wrap {
                font-size: 8px;
                text-align: center;
                color: rgba(153, 153, 153, 1);
                .hint {
                    margin-bottom: 10px;
                }
                .slider-wrap{
                    .start{
                        margin-left: 3px;
                    }
                    .end{
                        margin-right: 1px;
                    }
                }
                .progress {
                    position: relative;
                    width: 162px;
                    height: 4px;
                    margin: auto;
                    background: rgba(242, 242, 242, 1);
                    margin-bottom: 3px;
                    .bar {
                        position: absolute;
                        left: 0;
                        top: 0;
                        height: 4px;
                        background-color: #ff7777;
                    }
                    span {
                        font-size: 8px;
                        color: rgba(153, 153, 153, 1);
                    }
                }
            }
            .deposit-wrap {
                margin-top: 5px;
                line-height: 17px;
                text-align: center;
                .money {
                    width: 88px;
                    display: inline-block;
                    vertical-align: middle;
                    font-size: 12px;
                    color: rgba(153, 153, 153, 1);
                }
                i {
                    display: inline-block;
                    vertical-align: middle;
                    width: 2px;
                    height: 14px;
                    background-color: #979797;
                    opacity: 0.5;
                }
                .btn {
                    cursor: pointer;
                    width: 47px;
                    height: 17px;
                    line-height: 17px;
                    text-align: center;
                    font-size: 12px;
                    margin-left: 15px;
                    color: rgba(255, 255, 255, 1);
                    background: linear-gradient(
                        180deg,
                        rgba(240, 182, 52, 1) 0%,
                        rgba(254, 146, 1, 1) 100%
                    );
                    border-radius: 5px;
                }
            }
        }
    }
    .input-wrap {
        width: 140px;
        height: 28px;
        background: rgba(255, 255, 255, 1);
        border-radius: 8px;
        // padding-top: 6px;
        padding-left: 12px;
        .search {
            width: 75%;
            display: inline-block;
            font-size: 12px;
            color: #333;
            border: 0;
        }
        .search::placeholder {
            color: rgba(153, 153, 153, 1);
        }
        .icon-search {
            cursor: pointer;
            display: inline-block;
            width: 17px;
            height: 16px;
            margin-right: 12px;
        }
    }
    .center-wrap {
        position: relative;
        width: 175px;
        height: 30px;
        z-index: 2;
        margin-left: 47px;
        .head {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 13px;
        }
        .name {
            cursor: pointer;
            width: 80px;
            font-size: 16px;
            font-weight: 500;
            line-height: 30px;
            color: rgba(255, 255, 255, 1);
        }
        .login-out {
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            line-height: 30px;
            margin-left: 15px;
            color: rgba(255, 255, 255, 1);
        }
    }
}
.fl {
    float: left;
}
.fr {
    float: right;
}
.lf {
    float: right;
    position: relative;
    z-index: 2;
}
</style>