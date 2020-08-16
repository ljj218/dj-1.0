<template>
    <div class="getmoney" :class="{move:!showGet}">
        <div class="md-title flex align-items" @click="back">
            <Icon type="ios-arrow-back" size="25" />
            <span>提现金额</span>
        </div>
        <ul class="list flex flex-wrap space-between">
            <li class="item" v-for="(item,index) in 9">{{item*100}}</li>
            <li class="item space"></li>
            <li class="item space"></li>
            <li class="item space"></li>
            <li class="item space"></li>
            <li class="item space"></li>
        </ul>
        <input type="text" placeholder="输入金额" class="money" v-model="money" />
        <div class="btn btnclick unselect">提交</div>
    </div>
</template>

<script>
export default {
    props: {
        showGet: {
            type: Boolean,
            default: false,
        },
    },
    name: "getmoney",
    data() {
        return {
            num: 0,
            money: "",
        };
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        back() {
            this.$emit("close");
        },
    },
    watch: {
        show(val) {
            if (val) {
                this.num = 0;
            }
        },
    },
};
</script>
<style lang='scss' scoped>
.getmoney {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 994px;
    min-height: 626px;
    background-color: #fff;
    padding: 40px;
    transition: transform 0.5s ease;
    .md-title {
        cursor: pointer;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
    }
    .list {
        width: 80%;
        margin: 70px auto 0;
        .item {
            cursor: pointer;
            display: inline-block;
            width: 70px;
            height: 27px;
            line-height: 27px;
            text-align: center;
            font-size: 14px;
            margin: 0 15px 20px;
            color: rgba(153, 153, 153, 1);
            border-radius: 6px;
            border: 1px solid rgba(218, 218, 218, 1);
        }
        .space {
            opacity: 0;
            height: 0;
        }
    }
    .money {
        display: block;
        margin: auto;
        width: 170px;
        height: 27px;
        border-radius: 6px;
        border: 1px solid rgba(218, 218, 218, 1);
        font-size: 14px;
        color: #333;
        text-align: center;
    }
    .btn {
        cursor: pointer;
        width: 139px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        background: linear-gradient(
            180deg,
            rgba(240, 182, 52, 1) 0%,
            rgba(254, 146, 1, 1) 100%
        );
        margin: 50px auto 0;
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
        border-radius: 21px;
    }
}
</style>