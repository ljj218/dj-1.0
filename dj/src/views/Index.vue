<template>
    <div class="Index">
        <div class="container">
            <cpNav />
            <floatTip />

            <div class="main">
                <ul class="tab clearfix unselect">
                    <li class="tab-item active">英雄联盟</li>
                    <li class="tab-item">云顶之弈</li>
                </ul>
                <div class="content">
                    <div class="icon">
                        <img src class="img" />
                        <p>小熊电竞</p>
                    </div>
                    <ul class="list">
                        <li class="item">
                            <Select v-model="model1" style="width:103px" placeholder="陪玩音色">
                                <Option
                                    v-for="item in cityList"
                                    :value="item.value"
                                    :key="item.value"
                                >{{ item.label }}</Option>
                            </Select>
                        </li>
                        <li class="item">
                            <Select v-model="model1" style="width:103px" placeholder="陪玩段位">
                                <Option
                                    v-for="item in cityList"
                                    :value="item.value"
                                    :key="item.value"
                                >{{ item.label }}</Option>
                            </Select>
                        </li>
                        <li class="item">
                            <Select v-model="model1" style="width:103px" placeholder="位置选择">
                                <Option
                                    v-for="item in cityList"
                                    :value="item.value"
                                    :key="item.value"
                                >{{ item.label }}</Option>
                            </Select>
                        </li>
                        <li class="item">
                            <Select v-model="model1" style="width:103px" placeholder="陪玩价格">
                                <Option
                                    v-for="item in cityList"
                                    :value="item.value"
                                    :key="item.value"
                                >{{ item.label }}</Option>
                            </Select>
                        </li>
                    </ul>
                    <div class="start unselect" @click="start">开始陪玩</div>
                </div>
            </div>
        </div>
        <matching :showMatch="showMatch" @closed="closed"/>
    </div>
</template>

<script>
import cpNav from "../components/cp-nav";
import floatTip from "../components/floatTip";
import matching from "../components/matching";

export default {
    components: { cpNav, floatTip ,matching},
    name: "Index",
    data() {
        return {
            cityList: [
                {
                    value: "举个例子",
                    label: "举个例子",
                },
                {
                    value: "举个例子1",
                    label: "举个例子1",
                },
            ],
            model1: "",
            showMatch:false,
        };
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        start(){
            this.showMatch=true;
        },
        closed(){
            this.showMatch=false;
        }
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
    background-size: 100% 100%;
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
        width: 95px * 2;
        line-height: 28px;
        border: 1px solid rgba(254, 149, 4, 1);
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
        box-sizing: border-box;
        z-index: 2;
        .tab-item {
            width: 94px;
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
        .list {
            margin-top: 60px;
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
        }
        .start:hover {
            box-shadow: 0 0 10px rgba(254, 146, 1, 1);
        }
    }
}
</style>