<template>
    <Scroll class="playHall" :height="isHeight" :on-reach-bottom="handleReachBottom">
        <cpNav />
        <div class="main">
            <div class="nav-wrap">
                <div class="nav-item clearfix">
                    <div class="head fl">选择段位</div>
                    <ul class="right-box fl clearfix">
                        <li :class="{active:level==0}" @click="level=0">不限</li>
                        <li :class="{active:level==1}" @click="level=1">荣耀黄金</li>
                        <li :class="{active:level==2}" @click="level=2">华贵铂金</li>
                        <li :class="{active:level==3}" @click="level=3">璀璨钻石</li>
                        <li :class="{active:level==4}" @click="level=4">超凡大师</li>
                        <li :class="{active:level==5}" @click="level=5">傲世宗师</li>
                        <li :class="{active:level==6}" @click="level=6">最强王者</li>
                    </ul>
                    <div class="new unselect btnclick">新人专享</div>
                </div>
                <div class="nav-item clearfix">
                    <div class="head fl">陪玩性别</div>
                    <ul class="right-box fl clearfix">
                        <li :class="{active:gender==0}" @click="gender=0">不限</li>
                        <li :class="{active:gender==1}" @click="gender=1">小哥哥</li>
                        <li :class="{active:gender==2}" @click="gender=2">小姐姐</li>
                    </ul>
                </div>
                <div class="nav-item clearfix">
                    <div class="head end fl">选择价位</div>
                    <ul class="right-box fl clearfix">
                        <li :class="{active:rank==0}" @click="rank=0">不限</li>
                        <li :class="{active:rank==1}" @click="rank=1">从高到低</li>
                        <li :class="{active:rank==2}" @click="rank=2">从低到高</li>
                    </ul>
                </div>
            </div>

            <div class="list-boxs">
                <div class="frame_red" v-for="n in num" @click="toDeail">
                    <img src="../assets/img/public/wh.jpg" class="pic" />
                    <img src="../assets/img/icon-voice.png" class="voice" />
                    <div class="info">
                        <div class="user clearfix">
                            <div class="name one-text" title="乐乐✨接通宵单">乐乐✨接通宵单</div>
                            <div class="status">在线</div>
                        </div>
                        <div class="about clearfix">
                            <div class="price">
                                <span>¥</span>
                                <span class="num">35</span>
                                <span>/局</span>
                            </div>
                            <div class="count">
                                <img src="../assets/img/icon-list.png" class="icon-list" />
                                <span>接单数量：448次</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <quickBtn />
    </Scroll>
</template>

<script>
import cpNav from "../components/cp-nav";
import quickBtn from "../components/quickBtn";

export default {
    components: { cpNav, quickBtn },
    name: "playHall",
    data() {
        return {
            level: 0,
            gender: 0,
            rank: 0,
            isHeight: "",
            num: 20,
        };
    },
    computed: {},
    created() {
        window.addEventListener("resize", this.getHeight);
        this.getHeight();
    },
    destroyed() {
        window.removeEventListener("resize", this.getHeight);
    },
    mounted() {},
    methods: {
        handleReachBottom() {
            console.log(222);
            return new Promise((resolve) => {
                setTimeout(() => {
                    if (this.num > 60) return;
                    this.num += 20;
                    resolve();
                }, 1000);
            });
        },
        getHeight() {
            this.isHeight = window.innerHeight;
        },
        toDeail(e) {
            const news = this.$router.resolve({
                name: "/detail",
                // params: { id: e },
            });
            console.log(news)
            window.open(news.location.name, "_blank");
        },
    },
};
</script>
<style lang='scss' scoped>
.playHall {
    position: relative;
    width: 100%;
    // height: 100vh;
    // overflow-y: auto;
    background-attachment: fixed;
    background-image: url("../assets/img/public/bj-3.jpg");
    background-size: 100% 100%;
    // .bj {
    //     position: absolute;
    //     width: 100%;
    //     height: 100%;
    //     min-width: 1500px;
    //     z-index: 0;
    // }
}
.main {
    position: relative;
    width: 1200px;
    margin: auto;
    padding-top: 50px;
    z-index: 2;
    .nav-wrap {
        width: 1200px;
        height: 327px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid #e0e0e0;
        .nav-item {
            position: relative;
            width: 100%;
            height: 108px;
            line-height: 108px;
            font-size: 16px;
            .head {
                width: 172px;
                height: inherit;
                color: rgba(51, 51, 51, 1);
                background-color: #f6f6f6;
                box-sizing: border-box;
                text-align: center;
                border-bottom: 1px solid #e0e0e0;
            }
            .end {
                border: 0;
            }
            .right-box {
                width: 1025px;
                > li {
                    cursor: pointer;
                    width: 10%;
                    float: left;
                    text-align: center;
                }
                .active {
                    color: rgba(249, 108, 154, 1);
                }
            }
            .new {
                position: absolute;
                top: 30px;
                right: 40px;
                width: 130px;
                height: 45px;
                line-height: 45px;
                text-align: center;
                z-index: 3;
                cursor: pointer;
                background: linear-gradient(
                    180deg,
                    rgba(241, 181, 50, 1) 0%,
                    rgba(254, 148, 3, 1) 100%
                );
                border-radius: 6px;
                font-size: 18px;
                color: rgba(255, 255, 255, 1);
            }
        }
        .nav-item:not(:last-child) {
            border-bottom: 1px solid #e0e0e0;
        }
    }
    .list-boxs {
        width: 1200px;
        padding-top: 40px;
        .frame_red {
            display: inline-block;
            position: relative;
            cursor: pointer;
            width: 200px;
            height: 260px;
            padding-top: 200px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.5);
            margin-right: 50px;
            margin-bottom: 30px;
            .pic {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 0;
                width: 200px;
                height: 200px;
            }
            .voice {
                position: absolute;
                left: 10px;
                top: 170px;
                width: 65px;
                height: 20px;
                z-index: 1;
            }
            .info {
                width: 100%;
                height: 60px;
                padding: 6px 10px;
                .user {
                    height: 24px;
                    line-height: 24px;
                    .name {
                        float: left;
                        width: 76%;
                        font-size: 16px;
                        color: rgba(51, 51, 51, 1);
                    }
                    .status {
                        position: relative;
                        width: 24%;
                        float: right;
                        font-size: 14px;
                        color: rgba(153, 153, 153, 1);
                        padding-left: 10px;
                    }
                    .status::after {
                        position: absolute;
                        top: 50%;
                        left: 0;
                        margin-top: -2px;
                        content: "";
                        width: 4px;
                        height: 4px;
                        background: green;
                    }
                }
                .about {
                    height: 24px;
                    line-height: 24px;
                    font-size: 12px;
                    .price {
                        width: 30%;
                        float: left;
                        color: #999999;

                        span {
                            font-size: 12px;
                        }
                        .num {
                            color: #f96c9a;
                            font-size: 18px;
                        }
                    }
                    .count {
                        float: right;
                        width: 70%;
                        font-size: 12px;
                        color: rgba(153, 152, 153, 1);
                        padding-left: 20px;
                        // background: url("../assets/img/icon-list.png") center left no-repeat;
                        // background-size: 12px 14px;
                        text-align: right;
                        overflow: hidden;
                        .icon-list {
                            display: inline-block;
                            width: 12px;
                            height: 14px;
                            // margin:2px 7px 0 0 ;
                            margin-right: 7px;
                            transform: translateY(2px);
                        }
                    }
                }
            }
        }
        .frame_red:nth-child(5n) {
            margin-right: 0;
        }
        .frame_red:hover {
            animation: pulse 0.5s;
        }
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }
    }
}
.fl {
    float: left;
}
/deep/ .ivu-scroll-content-loading {
    opacity: 1 !important;
}
/deep/ .ivu-scroll-loader:first-child {
    height: 0;
    // display: none !important;
}
</style>