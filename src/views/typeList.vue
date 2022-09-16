<template>
    <div>

        <!-- 渲染列表商品标题 -->
        <van-tabs v-model="activeName" @click="jumpGoodsDetail(activeName)" ellipsis @rendered="render(activeName)">
            <van-tab v-for="(item, index) in brotherCategory" :name="item.id" :title="item.name">
                <h2 class="categoryName">{{ item.name }}</h2>
                <p class="categoryIntroduce">{{ item.front_name }}</p>

                <!-- 显示商品详情 -->
                <div class="GoodsList">
                    <van-grid :border="false" :column-num="2">
                        <van-grid-item v-for="(item, index) in goodsList" :key="item.id"
                            @click="goGoodsDetail(item.id)">
                            <van-image :src="item.list_pic_url" />
                            <p class="goodsDetailTitle">{{ item.name }}</p>
                            <p class="goodsDetailPrice">¥ {{ item.retail_price }} .00元</p>
                        </van-grid-item>
                    </van-grid>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { SearchGoodsList, TypeList } from '@/request/api'

export default {
    data() {
        return {
            TypeList: [],
            id: '',
            brotherCategory: [],
            activeName: '',
            goodsList: [],
            name: '',
            

        }
    },
    components: {},
    methods: {
        jumpGoodsDetail(id) {
            // console.log(id);
            SearchGoodsList({
                categoryId: id,
                page: 1,
                size: 1000
            })
                .then(res => {
                    // console.log(res);
                    this.goodsList = res.data.goodsList

                })
        },

        render(id) {
            SearchGoodsList({
                categoryId: id,
                page: 1,
                size: 1000
            })
                .then(res => {
                    this.goodsList = res.data.goodsList
                })
        },

        goGoodsDetail(id) {
            this.$router.push('/home/goods/detail?id=' + id);
        },
    },
    created() {
        this.id = this.$route.query.id;
        // console.log(this.id);
        TypeList({
            id: this.id
        }).then(res => {
            // console.log(res);
            this.brotherCategory = res.data.brotherCategory;
            this.activeName = res.data.currentCategory.id;
        })

    }

}
</script>
 
<style lang = "less" scoped>
.categoryName,
.categoryIntroduce {
    text-align: center;
}

.categoryName {
    font-size: .18rem;
    color: #333;
    padding: .15rem 0;
}

.categoryIntroduce {
    font-size: .14rem;
    color: #666;
    margin-top: .1rem;
}




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
    margin-top: .1rem;
}

.GoodsList {
    margin-top: .08rem;
    padding-top: .5rem;
}
</style>