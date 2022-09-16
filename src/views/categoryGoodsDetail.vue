<template>
    <div>
        <div class="GoodsList">
            <van-grid :border="false" :column-num="2">
                <van-grid-item v-for="(item, index) in goodsList">
                    <van-image :src="item.list_pic_url" />
                    <p class="goodsDetailTitle">{{ item.name }}</p>
                    <p class="goodsDetailPrice">¥ {{ item.retail_price }} .00元</p>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>

<script>
import { SearchGoodsList } from '@/request/api.js'
export default {
    data() {
        return {
            id: '',
            goodsList: []
        }
    },
    components: {},
    methods: {},
    created() {
        this.id = this.$route.query.id
        SearchGoodsList({
            categoryId: this.id,
            // page: 1,
            // size: 100
        })
            .then(res => {
                // console.log(res);
                this.goodsList = res.data.goodsList
            })
    }
}
</script>
 
<style lang = "less" scoped>
.GoodsList {
    background-color: #fff;
}

.goodsDetailTitle {
    font-size: .14rem;
    color: #333;
    text-align: center;
}

.goodsDetailPrice {
    font-size: .14rem;
    color: #8b0000;
    text-align: center;
}

.GoodsList{
    margin-top: .1rem;
    padding-top: .5rem;
}
</style>