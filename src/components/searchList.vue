<template>
    <div>
        <!-- 搜索联想列表 -->
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了">
            <van-cell v-for="(item, index) in searchList" :key="index" :title="item" @click="clickLoad(item)" />
        </van-list>
    </div>
</template>

<script>
export default {
    props: {
        searchList: Array
    },
    data() {
        return {
            loading: false,
            finished: false,
            // inpVal:''
        };
    },
    methods: {

        // 点击列表展示商品
        clickLoad(inpVal) {
            // console.log(inpVal);
            this.$emit('inpVal',inpVal)
        }
    },
};
</script>
 
<style lang = "less" scoped>
</style>