<template>
    <div class="orderList">
        <cpNav />
        <div class="container">
            <div class="page-title">
                <span>退款</span>
            </div>
            <div class="content">
                <ul class="list clearfix unselect">
                    <li
                        class="item fl"
                        v-for="n in 10"
                        :class="{active:keyList.indexOf(n)>-1}"
                        @click="select(n)"
                    >人皮话多</li>
                </ul>
                <div class="clear-wrap clearfix unselect">
                    <div class="btn lr" :class="{active:keyList.length>0}" @click="clearAll">全部清除</div>
                </div>
                <p class="other">其他</p>
                <textarea class="textarea" placeholder="0/99" v-model="text"></textarea>
                <div class="img-wrap flex">
                    <ul class="img-list flex">
                        <li class="item" v-for="(item,index) in imgList" :key="index">
                            <img :src="item" class="img" />

                            <img
                                src="../assets/img/close_red.png"
                                class="close"
                                @click="delectIg(index)"
                            />
                        </li>
                    </ul>
                    <div class="upLoad unselect" v-if="imgList.length<4">
                        <input
                            type="file"
                            class="filepath"
                            @change="uploadFile($event)"
                            accept="image/jpg, image/jpeg, image/png, image/PNG"
                        />
                        <div class="center">
                            <Icon type="md-add" size="40" color="#bbb" />
                            <p>上传图片</p>
                        </div>
                    </div>
                </div>
                <div class="btn-wrap clearfix unselect">
                    <div class="btn submit lr btnclick" @click="submitInfo">提交</div>
                </div>
            </div>
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
    name: "orderAbout",
    data() {
        return {
            keyList: [],
            text: "",
            imgList: [],
        };
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {
        select(n) {
            let index = this.keyList.indexOf(n);
            if (index > -1) {
                this.keyList.splice(index, 1);
            } else {
                this.keyList.push(n);
            }
        },
        clearAll() {
            this.keyList = [];
        },
        submitInfo() {},
        uploadFile(event) {
            let file = event.target.files[0];
            let that = this;
            if (this.imgList.length >= 4) {
                this.$Message.error("最多上传4张图片");
                return;
            }
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
                    this.imgList.push(reader.result);
                    // updata();
                };
            }
        },
        delectIg(idnex) {
            this.imgList.splice(idnex, 1);
        },
    },
    watch: {
        text(val) {
            if (val.length > 99) {
                this.$Message.warning("最多输入99字");
                this.text = val.slice(0, 99);
            }
        },
    },
};
</script>
<style lang='scss' scoped>
.orderList {
    position: relative;
    width: 100%;
    background-attachment: fixed;
    background-image: url("../assets/img/public/bj.jpg");
    background-size: 100% 100%;
    .container {
        width: 1200px;
        // height: 529px;
        margin: auto;
        padding-top: 40px;
        .page-title {
            width: 1200px;
            height: 60px;
            line-height: 60px;
            padding: 0 40px;
            font-size: 18px;
            color: rgba(51, 51, 51, 1);
            background: rgba(255, 255, 255, 1);
        }
        .content {
            width: 1200px;
            min-height: 529px;
            padding: 35px 20px;
            background: rgba(255, 255, 255, 1);
            margin: 15px auto 0;
            .list {
                .item {
                    cursor: pointer;
                    width: 130px;
                    height: 45px;
                    line-height: 45px;
                    text-align: center;
                    font-size: 18px;
                    color: rgba(251, 177, 201, 1);
                    border-radius: 6px;
                    margin-bottom: 20px;
                    border: 1px solid rgba(251, 177, 201, 1);
                    margin-right: 127px;
                }
                .item:nth-child(5n) {
                    margin-right: 0;
                }
            }
            .active {
                background: rgba(251, 177, 201, 1) !important;
                color: #fff !important;
            }
            .clear-wrap {
                width: 100%;
                height: 45px;
                .btn {
                    cursor: pointer;
                    width: 130px;
                    height: 45px;
                    line-height: 45px;
                    text-align: center;
                    font-size: 18px;
                    color: rgba(181, 181, 181, 1);
                    background: rgba(239, 239, 239, 1);
                    border-radius: 6px;
                }
            }
            .other {
                font-size: 18px;
                color: rgba(51, 51, 51, 1);
            }
            .textarea {
                width: 1160px;
                height: 191px;
                background: rgba(239, 239, 239, 1);
                border-radius: 10px;
                resize: none;
                margin-top: 20px;
                padding: 20px;
                border: 0;
                font-size: 16px;
                margin-bottom: 15px;
            }
            .img-wrap {
                width: 100%;
                height: 190px;
                margin-top: 15px;
                .upLoad {
                    cursor: pointer;
                    position: relative;
                    display: table;
                    width: 90px;
                    height: 90px;
                    height: 90px;
                    border: 1px solid #d8d8d8;
                    border-radius: 4px;
                    text-align: center;
                    .filepath {
                        cursor: pointer;
                        position: absolute;
                        left: 0;
                        top: 0;
                        z-index: 0;
                        width: 90px;
                        height: 90px;
                        opacity: 0;
                    }
                    .center {
                        cursor: pointer;
                        display: table-cell;
                        margin: auto;
                        vertical-align: middle;
                    }
                }
                .img-list {
                    width: auto;
                    height: 190px;
                    .item {
                        position: relative;
                        display: inline-block;
                        border: 1px solid #d8d8d8;
                        border-radius: 4px;
                        width: 190px;
                        height: 190px;
                        margin-right: 20px;
                        .img {
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: 0;
                            width: 190px;
                            height: 190px;
                        }
                        .close {
                            position: absolute;
                            top: -10px;
                            right: -10px;
                            z-index: 2;
                            width: 20px;
                            height: 20px;
                        }
                    }
                }
            }
            .btn-wrap {
                width: 100%;
                height: 45px;
                .btn {
                    cursor: pointer;
                    width: 130px;
                    height: 45px;
                    line-height: 45px;
                    text-align: center;
                    font-size: 18px;
                    color: rgba(254, 149, 4, 1);
                    border-radius: 6px;
                    border: 1px solid rgba(253, 149, 5, 1);
                }
                .submit {
                    background: linear-gradient(
                        180deg,
                        rgba(241, 181, 50, 1) 0%,
                        rgba(254, 148, 3, 1) 100%
                    );
                    color: #fff;
                    margin-left: 15px;
                }
            }
        }
    }
}
.modal-content {
    height: 330px;
    padding: 104px 0 0 126px;
    .title {
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 45px;
    }
    .wrap {
        overflow: hidden;
        .btn {
            cursor: pointer;
            width: 68px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            background: rgba(216, 216, 216, 1);
            border-radius: 16px;
            font-size: 14px;
            color: rgba(153, 153, 153, 1);
            margin-right: 20px;
            margin-top: 7px;
        }
    }
}
/dee/ .ivu-rate {
    font-size: 30px;
}
.fl {
    float: left;
}
.lr {
    float: right;
}
/deep/ .ivu-modal-header,
/deep/ .ivu-modal-footer {
    height: 0;
    padding: 0;
    border: 0;
}
/deep/ .ivu-modal-body {
    padding: 0;
}
</style>