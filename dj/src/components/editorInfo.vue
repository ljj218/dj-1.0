<template>
    <div class="editorInfo">
        <div class="row clearfix zindex">
            <div class="name fl">上传照片:</div>
            <div class="img-list fl clearfix">
                <div class="img-box box1 br" :class="{zIndx:index==0}" @click="index=0">
                    <img :src="imgList[0]" class="img" v-show="imgList[0]" />
                    <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event)"></ImgCutter>
                </div>
                <div class="img-box box2 pos1 br bb"  :class="{zIndx:index==1}" @click="index=1">
                    <img :src="imgList[1]" class="img" v-show="imgList[1]" />
                    <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event)"></ImgCutter>
                </div>
                <div class="img-box box2 pos2 bb " :class="{zIndx:index==2}" @click="index=2">
                    <img :src="imgList[2]" class="img" v-show="imgList[2]" />
                    <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event)"></ImgCutter>
                </div>
                <div class="img-box box2 pos3 br "  :class="{zIndx:index==3}" @click="index=3">
                    <img :src="imgList[3]" class="img" v-show="imgList[3]" />
                    <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event)"></ImgCutter>
                </div>
                <div class="img-box box2 pos4  " :class="{zIndx:index==4}" @click="index=4">
                    <img :src="imgList[4]" class="img" v-show="imgList[4]" />
                    <ImgCutter rate="1:1" class="upImg" @cutDown="cutDown($event)"></ImgCutter>
                </div>
            </div>
        </div>
        <div class="row clearfix">
            <div class="name fl">选择音色:</div>
            <div class="voice-list fl">
                <p>女生：</p>
                <ul class="list flex">
                    <li class="item" :class="{active:index==1}" v-for="(item,index) in 3">
                        萝莉音
                        <img src="../assets/img/icon-close.png" class="close" />
                    </li>
                </ul>
                <p>男生:</p>
                <ul class="list flex">
                    <li class="item" :class="{active:index==1}" v-for="(item,index) in 3">大叔音</li>
                </ul>
            </div>
        </div>
        <div class="row clearfix" >
            <div class="name fl">段位:</div>
            <div class="level-list fl clearfix">
                <div class="item fl">
                    <p>峡谷段位</p>
                    <Select v-model="model1" style="width:173px" placeholder="选择历史最高段位">
                        <Option
                            v-for="item in cityList"
                            :value="item.value"
                            :key="item.value"
                        >{{ item.label }}</Option>
                    </Select>
                    <div class="upload">
                        <div class="text">点击上传</div>
                        <div class="text">点击更改</div>
                    </div>
                </div>
                <div class="item fl">
                    <p>云顶之弈段位</p>
                    <Select v-model="model1" style="width:173px" placeholder="选择历史最高段位">
                        <Option
                            v-for="item in cityList"
                            :value="item.value"
                            :key="item.value"
                        >{{ item.label }}</Option>
                    </Select>
                    <div class="upload">
                        <div class="text">点击上传</div>
                        <div class="text">点击更改</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row clearfix">
            <div class="name fl">主玩位置:</div>
            <div class="voice-list fl">
                <ul class="list flex">
                    <li class="item" :class="{active:index==1}" v-for="(item,index) in 3">
                        萝莉音
                        <img src="../assets/img/icon-close.png" class="close" />
                    </li>
                </ul>
            </div>
        </div>
        <div class="row clearfix">
            <div class="name fl">主玩英雄:</div>
            <textarea class="textarea fl"></textarea>
        </div>
        <div class="row clearfix">
            <div class="name fl">上传语音条:</div>
            <div class="upload-voice fl"></div>
        </div>
        <div class="btn btnclick unselect">确认提交</div>
    </div>
</template>

<script>
import ImgCutter from "vue-img-cutter";

export default {
    components: { ImgCutter },
    name: "editorInfo",
    data() {
        return {
            cityList: [
                {
                    value: "1",
                    label: "青铜",
                },
                {
                    value: "2",
                    label: "白银",
                },
                {
                    value: "3",
                    label: "黄金",
                },
                {
                    value: "4",
                    label: "钻石",
                },
                {
                    value: "5",
                    label: "大师",
                },
                {
                    value: "6",
                    label: "王者",
                },
            ],
            index: "",
            model1: "",
            imgList: ["", "", "", "", ""],
        };
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        cutDown: function (res) {
            console.log(res)
            this.imgList[this.index] = res.dataURL;
            this.$forceUpdate();
            this.index='';
        },
    },
};
</script>
<style lang='scss' scoped>
.zindex{
    position: relative;
    z-index: 99;
}
.editorInfo {
    position: relative;
    width: 994px;
    min-height: 500px;
    padding: 40px;
    padding-right: 0;
    overflow: hidden;
    .row {
        margin-bottom: 30px;
        .name {
            width: 85px;
            font-size: 16px;
            margin-right: 22px;
            text-align: right;
            color: rgba(51, 51, 51, 1);
        }
        .img-list {
            position: relative;
            width: 330px;
            height: 148px;
            background: rgba(247, 247, 247, 1);
            border: 1px solid rgba(216, 216, 216, 1);
            .zIndx{
                z-index: 99 !important;
            }
            .img-box {
                position: relative;
                img {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                }
            }
            .box1 {
                width: 170px;
                height: 148px;
            }
            .box2{
                position: absolute;
                width: 80px;
                height: 74px;
                z-index: 0;
            }
            .pos1{
                top: 0;
                left: 170px;
            }
            .pos2{
                top: 0;
                right: 0;
            }
            .pos3{
                top: 74px;
                left: 170px;
            }
            .pos4{
                top: 74px;
                right: 0;
            }
        }
        .level-list{
            .item{
                // position: relative;
                z-index: 0;
            }
        }
    }
}
.fl {
    float: left;
}
.br {
    border-right: 1px solid #d8d8d8;
}
.bb {
    border-bottom: 1px solid #d8d8d8;
}
/deep/ .upImg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    > .btn.btn-primary {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0);
        border: 0;
        padding: 0;
        text-align: center;
        color: #999;
        z-index: 0;
    }
}

</style>