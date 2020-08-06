<template>
    <div id="app">
        <router-view />
        <Login />
    </div>
</template>
<script >
import Login from "./components/login";
export default {
    components: { Login },
    name: "",
    data() {
        return {};
    },
    watch: {
        $route(to, from) {
            // console.log(to)
            // window.scrollTo(0, 0);
        },
    },
};
</script>
<style lang="scss">
// #app{
//   background: url("./assets/img/public/bj.jpg") center no-repeat;
//   background-size: cover;
// }
</style>
