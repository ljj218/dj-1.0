<template>
    <div class="editorInfo">
        <div class="row clearfix">
            <div class="name fl">上传照片:</div>
            <div class="img-list fl clearfix">
                <div class="img-box">
                    
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
        <div class="row clearfix">
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
export default {
    components: {},
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
            model1: "",
        };
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style lang='scss' scoped>
.editorInfo {
    position: relative;
    width: 994px;
    min-height: 500px;
    padding: 40px;
    padding-right: 0;
    overflow: hidden;
    .row {
        .name {
            width: 85px;
            font-size: 16px;
            margin-right: 22px;
            text-align: right;
            color: rgba(51, 51, 51, 1);
        }
        .img-list {
            width:230px;
            height: 148px;
            background: rgba(247, 247, 247, 1);
            border: 1px solid rgba(216, 216, 216, 1);
        }
    }
}
.fl {
    float: left;
}
</style>