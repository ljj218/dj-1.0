<template>
    <div class="detail">
        <cpNav />
        <div class="container clearfix">
            <div class="user-base-info clearfix">
                <img :src="src" class="head fl" />
                <div class="upload-wrap fl">
                    <div class="btn-wrap">
                        <input
                            type="file"
                            class="filepath"
                            @change="uploadFile($event)"
                            accept="image/jpg, image/jpeg, image/png, image/PNG"
                        />
                        <div class="text">上传头像</div>
                    </div>
                    <p>支持gpj，gif，png，或bmp格式的图片，文件必须小于1M</p>
                </div>
            </div>
            <div class="row flex align-items">
                <Icon type="md-star" class="star" color="#FF8383" />
                <div class="name flex align-items space-between">
                    <span>昵</span>
                    <span class="mr">称：</span>
                </div>
                <input type="text" placeholder="请输入昵称" v-model="nikename" class="nikename" />
            </div>
            <div class="row flex align-items">
                <Icon type="md-star" class="star" color="#FF8383" />
                <div class="name flex align-items space-between">
                    <span>性</span>
                    <span class="mr">别：</span>
                </div>
                <el-radio-group v-model="gender" fill="#000000">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="0">女</el-radio>
                </el-radio-group>
            </div>
            <div class="row flex align-items">
                <Icon type="md-star" class="star" color="#FF8383" />
                <div class="name date flex align-items space-between">出生日期：</div>
                <DatePicker type="date" placeholder="请选择生日" style="width: 200px" v-model="date"></DatePicker>
            </div>
            <div class="btn unselect btnclick">确认提交</div>
        </div>
        <quickBtn />
        <foot />
    </div>
</template>

<script>
import cpNav from "../components/cp-nav";
import quickBtn from "../components/quickBtn";
import foot from "../components/foot";

export default {
    components: { cpNav, quickBtn, foot },
    name: "modifyUserInfo",
    data() {
        return {
            src: "",
            nikename: "",
            gender: "",
            date: "",
        };
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        uploadFile(event) {
            let file = event.target.files[0];
            let that = this;
            if (file.size / 1024 > 1024) {
                this.$Message.error("请选择小于1M的图片");
                return;
            }
            if (file) {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                let formData = new FormData();
                formData.append("file", file);
                reader.onload = () => {
                    this.src = reader.result;
                    this.$forceUpdate();
                    // updata();
                };
            }
        },
    },
    watch: {},
};
</script>
<style lang='scss' scoped>
.detail {
    position: relative;
    width: 100%;
    background-attachment: fixed;
    background-image: url("../assets/img/public/bj.jpg");
    background-size: 100% 100%;
    .container {
        width: 1200px;
        min-height: 670px;
        margin: 50px auto 0;
        padding: 87px 80px;
        background-color: #fff;
        .user-base-info {
            padding-bottom: 40px;
            padding-left: 23px;
            margin-bottom: 30px;
            border-bottom: 1px solid #dbdbdb;
            .head {
                width: 66px;
                height: 66px;
                border-radius: 50%;
                margin-right: 20px;
            }
            .upload-wrap {
                position: relative;
                p {
                    font-size: 12px;
                    color: rgba(153, 153, 153, 1);
                }
            }
            .text {
                cursor: pointer;
                position: relative;
                z-index: 0;
            }
            .btn-wrap {
                cursor: pointer;
                position: relative;
                width: 101px;
                height: 38px;
                line-height: 38px;
                text-align: center;
                font-size: 14px;
                color: rgba(255, 152, 0, 1);
                border-radius: 6px;
                margin-bottom: 10px;
                border: 1px solid rgba(250, 157, 17, 1);
                .filepath {
                    cursor: pointer;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 101px;
                    height: 38px;
                    z-index: 9;
                    opacity: 0;
                }
            }
        }
        .row {
            margin-bottom: 20px;
            padding-left: 23px;
            .star {
                margin-right: 10px;
            }
            .name {
                width: 74px;
                margin-right: 20px;
                .mr {
                    margin-right: 4px;
                }
            }
            .nikename {
                width: 332px;
                height: 30px;
                line-height: 30px;
                padding: 0 10px;
                border-radius: 6px;
                border: 1px solid rgba(216, 216, 216, 1);
                font-size: 14px;
            }
        }
        .btn {
            width: 333px;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: 18px;
            color: rgba(255, 255, 255, 1);
            margin: 140px auto 0;
            background: linear-gradient(
                180deg,
                rgba(240, 182, 52, 1) 0%,
                rgba(254, 146, 1, 1) 100%
            );
            border-radius: 25px;
        }
    }
}
.fl {
    float: left;
}
.lr {
    float: right;
}
</style>