<template>
    <div id="app">
        <router-view />
        <Login />
    </div>
</template>
<script >
import Login from "./components/login";
import {mapMutations} from "vuex"
export default {
    components: { Login },
    name: "",
    data() {
        return {};
    },
    created(){
        let userData =this.cookies.get('userData')?JSON.parse(this.cookies.get('userData')):'';
        this.setUserData(userData);
    },
    watch: {
        $route(to, from) {
            // console.log(to)
            // window.scrollTo(0, 0);
        },
    },
    methods:{
          ...mapMutations({
            setUserData: "user/SET_USER_DATA",
        }),
    }
};
</script>
<style lang="scss">
// #app{
//   background: url("./assets/img/public/bj.jpg") center no-repeat;
//   background-size: cover;
// }
</style>
