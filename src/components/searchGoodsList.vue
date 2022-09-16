<template>
    <div>

        <!-- 搜索商品数据 -->
        <van-dropdown-menu>
            <van-dropdown-item v-model="value1" disabled :options="option1" />
            <van-dropdown-item title="价格" v-model="value2" :options="option2" @change="changePrice" />
            <van-dropdown-item title="分类" v-model="value3" :options="option3"
                @change="changeCategory(option3[value3].value, option3[value3].text)" />
        </van-dropdown-menu>

        <!-- 点击进入商品详情 -->
        <div>
            <van-grid :border="false" :column-num="2">
                <van-grid-item v-for="(item, index) in SearchGoodsList" :key="index" @click="goodDetail(item.id)">
                    <van-image :src="item.list_pic_url" />
                    <p class="goodsTitle">{{ item.name }}</p>
                    <p class="goodsPrice">¥ {{ item.retail_price }} .00元</p>
                </van-grid-item>
            </van-grid>
        </div>

        <van-empty v-if="count == 0" image="search" description="暂无商品" />

    </div>
</template>

<script>
import { SearchGoodsList } from '@/request/api.js'
export default {
    props: {
        filterCategory: Array,
        SearchGoodsList: Array,
        count: Number,
    },
    data() {
        return {
            value1: 0,
            value2: '',
            value3: 0,
            option1: [
                { text: '综合', value: 0 },
            ],
            option2: [
                { text: '价格从高到低', value: 'desc' },
                { text: '价格从低到高', value: 'asc' },
            ],
            checked: '',
            option3: [

            ],
            goodslist: [],
        };
    },

    methods: {
        // 点击商品进入详情页
        goodDetail(id) {
            this.$router.push('/home/goods/detail?id=' + id);
        },


        // 点击筛选
        changePrice(siftValue) {
            // console.log(siftValue);

            // this.isShow = 3
            this.$emit('siftValue', siftValue)


        },
        changeCategory(siftValues, siftText) {
            // this.$emit('siftValues', siftValues)
            // console.log(siftValues, siftText);

            // SearchGoodsList({
            //     keyword: siftText,
            //     page: 1,
            //     size: 20,
            //     order: 'desc',
            //     categoryId: siftValues,
            // })
            //     .then(res => {
            //         console.log(res);
            //         // this.filterCategory = res.data.filterCategory;
            //         // console.log(this.filterCategory);
            //         // this.SearchGoodsList = res.data.data
            //         this.count=res.data.count
            //         console.log(this.count);
            //     })

            this.$emit('sift', siftText, siftValues)

        }
    },
    created() {
        
        SearchGoodsList({
            keyword:this.value3,
            page: 1,
            size: 20,
            order: 'desc',
            categoryId: 0,
        })
            .then(res => {
                // console.log(res);
                for (let i = 0; i < res.data.filterCategory.length; i++) {
                    this.option3.push({
                        text: res.data.filterCategory[i].name,
                        value: i
                    })
                }
                // console.log(this.option3);
                // this.filterCategory = res.data.filterCategory;
            })
    }



};
</script>
 
<style lang = "less" scoped>
.goodsTitle,
.goodsPrice {
    font-size: .12rem;
    text-align: center;
}

.goodsPrice {
    color: #8b0000;
    margin-top: .05rem;
}
</style>