<template>
    <div class="modifyInfo" :class="{move:!showInfo}">

        
    </div>
</template>

<script>
export default {
    props: {
        showInfo: {
            type: Boolean,
            default: false,
        },
    },
    name: "modifyInfo",
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>
<style lang='scss' scoped>
.modifyInfo {
}
</style>