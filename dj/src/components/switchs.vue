<template>
    <div class="switchs">
        <div class="line flex align-items">
            <div class="mr">速配厅匹配</div>
            <i-switch size="large" v-model="switch1" false-color="#BEBEBE" true-color="#5DE376" @on-change="change"/>
        </div>
        <div class="line flex align-items">
            <div class="mr">陪玩厅推荐</div>
            <i-switch size="large" v-model="switch2" false-color="#BEBEBE" true-color="#5DE376" />
        </div>
        <div class="line flex align-items">
            <div class="mr">新人专区</div>
            <i-switch size="large" v-model="switch3" false-color="#BEBEBE" true-color="#5DE376" />
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    name: "switchs",
    data() {
        return {
            switch1: true,
            switch2: true,
            switch3: true,
        };
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
      change(){
        
      }
    },
};
</script>
<style lang='scss' scoped>
.switchs {
    position: relative;
    width: 994px;
    height: auto;
    padding: 40px;
    padding-right: 0;
    overflow: hidden;
    .line{
      margin-bottom: 20px;
    }
    .mr {
        width: 100px;
        text-align: left;
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
    }
}
</style>