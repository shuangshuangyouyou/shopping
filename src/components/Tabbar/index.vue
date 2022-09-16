<template>
    <div>
        <!-- Tabbar -->
        <van-tabbar v-model="active" class="mytabbar">
            <van-tabbar-item name="home" icon="home-o" to="/home">首页</van-tabbar-item>
            <van-tabbar-item name="lable" icon="label-o" to="/label">专题</van-tabbar-item>
            <van-tabbar-item name="apps" icon="apps-o" to="/sort">分类</van-tabbar-item>
            <van-tabbar-item @click="goCart()" name="shopping-cart" icon="shopping-cart-o" to="/cart">购物车
            </van-tabbar-item>
            <van-tabbar-item name="user" icon="user-o" to="/person">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    data() {
        return {
            token: localStorage.getItem('token')
        }
    },
    components: {},
    methods: {
        goCart() {
            // console.log(this.token);
            if (!this.token) {
                Toast.loading({
                    message: '请先登录...',
                    forbidClick: true
                });
            }
        }
    },
    computed: {
        active: {
            get() {
                return this.$route.meta.num
            },
            set() { }
        }
    }
}
</script>
 
<style lang = "less" >
</style>