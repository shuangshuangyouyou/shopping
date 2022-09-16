<template>
    <!-- 我的页 -->
    <div class="person">

        <div class="personInformation">
            <div class="headImg">
                <!-- 头像 -->
                <img class="myimg" v-show="isShow == true && !token" src="../../node_modules/images/touxiang.webp"
                    alt="">
                <img class="myimg" v-show="isShow == false && token" :src="avatar" alt="">

                <div class="loginText">
                    <p class="doLogin" @click="show = true" v-show="isShow == true && !token">点击登录</p>
                    <p class="doLogin" v-show="isShow == false && token">{{ username }}</p>

                    <van-icon class="loginIcon" name="arrow" v-show="isShow == true && !token" @click="show = true" />
                    <van-icon class="loginIcon" name="cross" v-show="isShow == false && token" @click="outLogin()" />
                    <van-overlay :show="show">

                        <!-- 点击登录弹框 -->
                        <div class="wrapper" @click="show = false">
                            <div class="block" @click="show = true" @click.stop>
                                <!-- 登录表单 -->
                                <van-form @submit="onSubmit" class="loginWindow">
                                    <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                                        :rules="[{ required: true, message: '请填写用户名' }]" />
                                    <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                                        :rules="[{ required: true, message: '请填写密码' }]" />
                                    <div style="margin: 16px;">
                                        <van-button round block type="danger" native-type="submit">登录/注册</van-button>
                                    </div>
                                </van-form>
                            </div>
                        </div>
                    </van-overlay>
                </div>
            </div>
        </div>


        <!-- 下面图标 -->
        <van-grid :column-num="3">
            <van-grid-item @click="prompt" class="personIcon" icon="label-o" text="我的订单" />
            <van-grid-item @click="prompt" class="personIcon" icon="bill-o" text="优惠券" />
            <van-grid-item @click="prompt" class="personIcon" icon="goods-collect-o" text="礼品卡" />
            <van-grid-item @click="prompt" class="personIcon" icon="location-o" text="我的收藏" />
            <van-grid-item @click="prompt" class="personIcon" icon="flag-o" text="我的足迹" />
            <van-grid-item @click="prompt" class="personIcon" icon="contact-o" text="会员福利" />
            <van-grid-item @click="prompt" class="personIcon" icon="aim" text="地址管理" />
            <van-grid-item @click="prompt" class="personIcon" icon="warn-o" text="账号安全" />
            <van-grid-item @click="prompt" class="personIcon" icon="service-o" text="联系客服" />
            <van-grid-item @click="prompt" class="personIcon" icon="question-o" text="帮助中心" />
            <van-grid-item @click="prompt" class="personIcon" icon="smile-o" text="意见反馈" />

        </van-grid>
    </div>
</template>

<script>
import { DoLogin } from '@/request/api.js'
import store from '@/store';
import { Dialog } from 'vant';
import { Toast } from 'vant';
export default {
    data() {
        return {
            isShow: true,
            show: false,
            username: '',
            password: '',
            userInfo: '',
            data: '',
            token: '',
            avatar: '',

        }
    },
    components: {
    },
    methods: {

        // 点击登录
        onSubmit() {
            DoLogin({
                username: this.username,
                pwd: this.password
            })
                .then(res => {
                    // console.log(res);
                    this.data = res.data;
                    this.show = false;
                    this.isShow = !this.isShow;
                    this.token = res.data.token;
                    this.userInfo = res.data.userInfo;
                    this.username = res.data.userInfo.username;
                    this.avatar = res.data.userInfo.avatar;


                    // 使用vuex中的store将token保存到localStorage中
                    this.$store.commit('setToken', this.token)
                    this.$store.commit('User_Info', this.userInfo)
                    this.$store.commit('setusername', this.username)
                    this.$store.commit('setuavatar', this.avatar)


                    if (store.state.token) {
                        this.$router.push('/person')
                        // console.log(store.state.token);
                    } else {
                        this.$router.replace('/person')
                    }
                })
                .catch(err => {
                    // console.log(err);
                })
        },

        // 退出登录
        outLogin() {

            Dialog.confirm({
                title: '登出账号确认',
                message: '您是否想要退出当前账号',
            })
                .then(() => {
                    this.$store.commit("delToken");
                    this.token = localStorage.removeItem('token')
                    // console.log(this.token);
                    this.isShow = true;
                    this.show = false;
                })
                .catch(() => {
                    // on cancel
                });
        },



        // 提示
        prompt() {
            Toast('该功能暂未开放');
        }


    },
    created() {
        this.token = localStorage.getItem('token')

        if (this.token) {
            this.isShow = false
            this.userInfo = localStorage.getItem('userInfo')
            this.username = localStorage.getItem('username')
            this.avatar = localStorage.getItem('avatar')

        } else {
            this.isShow = true

        }
    },


    // 页面重新加载
    mounted: function () {
        if (location.href.indexOf("#reloaded") == -1) {
            location.href = location.href + "#reloaded";
            location.reload();
        }
    }


}
</script>
 
<style lang = "less" >
.person {
    padding-bottom: .5rem;
}

.personInformation {
    width: 100%;
    height: 1.5rem;
    background-color: #333333;
}

.myimg {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-top: .25rem;
    margin-left: .2rem;
}

.headImg {
    display: flex;
}

.loginText {
    display: flex;
    margin-top: .65rem;
    color: #fff;
}

.doLogin {
    margin-left: .13rem;
}

.loginIcon {
    position: absolute;
    right: .2rem;
}

.personIcon {
    width: 1.53rem;
    height: 1.17rem;
}

.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.block {
    width: 90%;
    height: 35%;
    background-color: #fff;
    color: black;
}

.loginWindow {
    margin-top: 10%;
}
</style>