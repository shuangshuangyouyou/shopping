<template>
    <!-- 搜索栏 -->
    <div class="searchPage">
        <form action="/">
            <van-search v-model="value" shape="round" show-action :placeholder="defaultKeyword.keyword"
                @search="onSearch" @cancel="onCancel" @input="onInput" />
        </form>

        <!-- 搜索组件 -->
        <history-hot @keyWords="keywords" :historyKeywordList="historyKeywordList" :hotKeywordList="hotKeywordList"
            v-show="isShow == 1">
        </history-hot>
        <search-list @keyWord="keyword" @inpVal="inpval" :searchList="searchList" v-show="isShow == 2"></search-list>
        <search-goods-list @sift="sift"  @siftValue="siftValue" :count="count" :filterCategory="filterCategory" :SearchGoodsList="SearchGoodsList" v-show="isShow == 3">
        </search-goods-list>

    </div>
</template>

<script>
import historyHot from '@/components/historyHot.vue';
import searchList from '@/components/searchList.vue';
import searchGoodsList from '@/components/searchGoodsList.vue';
import { SearchWindow, SearchList, SearchGoodsList } from '@/request/api.js';
export default {
    data() {
        return {
            value: '',
            isShow: 1,
            defaultKeyword: [],
            hotKeywordList: [],
            historyKeywordList: [],
            searchList: [],
            val: '',
            SearchGoodsList: [],
            filterCategory: [],
            count:0,
        };
    },
    components: {
        historyHot,
        searchList,
        searchGoodsList,
    },
    methods: {

        //点击回车触发加载商品详情
        onSearch(val) {
            this.isShow = 3
            // this.value = ''
            this.value = val;
            SearchGoodsList({
                keyword: val,
                page: 1,
                size: 20,
                order: 'desc',
                categoryId: 0,
                sort: 0
            })
                .then(res => {
                    // console.log(res);
                    this.filterCategory = res.data.filterCategory;

                    // console.log(this.filterCategory);
                    this.SearchGoodsList = res.data.data
                    this.count=res.data.count
                    // console.log(this.count);
                })

        },
        onCancel() {
            this.$router.go(-1)
        },


        //键盘输入触发展示商品列表
        onInput() {
            this.isShow = 2
            SearchList({
                keyword: this.value,
            })
                .then(res => {
                    // console.log(res);
                    this.searchList = res.data
                })

        },


        // 点击列表联想展示商品详情
        inpval(inpval) {
            // console.log(inpval);
            this.value = inpval;
            this.isShow = 3
            SearchGoodsList({
                keyword: inpval,
                page: 1,
                size: 20,
                order: 'desc',
                categoryId: 0,
            })
                .then(res => {
                    // console.log(res);
                    this.filterCategory = res.data.filterCategory;
                    // console.log(this.filterCategory);
                    this.SearchGoodsList = res.data.data
                    this.count=res.data.count
                })
        },


        // 点击历史记录展示商品详情
        keywords(keywords) {
            this.isShow = 3
            this.value = keywords;

            SearchGoodsList({
                keyword: keywords,
                page: 1,
                size: 20,
                order: 'desc',
                categoryId: 0,
            })
                .then(res => {
                    // console.log(res);
                    this.filterCategory = res.data.filterCategory;
                    // console.log(this.filterCategory);
                    this.SearchGoodsList = res.data.data;
                    this.count=res.data.count
                })
        },

        // 点击热门搜索展示商品详情
        keyword(keyword) {
            this.isShow = 3
            this.value = keyword;

            SearchGoodsList({
                keyword: keyword,
                page: 1,
                size: 20,
                order: 'desc',
                categoryId: 0,
            })
                .then(res => {
                    this.filterCategory = res.data.filterCategory;
                    // console.log(this.filterCategory);
                    // console.log(res);
                    this.SearchGoodsList = res.data.data;
                    this.count=res.data.count
                })
        },


        siftValue(siftValue){
            this.isShow=3
            SearchGoodsList({
                keyword: '',
                page: 1,
                size: 20,
                order: siftValue,
                categoryId: 0,
                sort: 'price'
            })
                .then(res => {
                    // console.log(res);
                    this.filterCategory = res.data.filterCategory;
                    // this.filterCategory = res.data.filterCategory;
                    // this.goodslist=res.data.goodslist
                    // console.log(this.filterCategory);
                    this.SearchGoodsList = res.data.data;
                    // this.count=res.data.count
                })
        },


        sift(values,texts){
            this.isShow=3
            SearchGoodsList({
                keyword: texts,
                page: 1,
                size: 20,
                order: 'desc',
                categoryId:values,
                sort: 'id'
            })
                .then(res => {
                    // console.log(4567876545);
                    // console.log(res);
                    this.filterCategory = res.data.filterCategory;
                    // console.log(count);
                    // this.filterCategory = res.data.filterCategory;
                    // this.goodslist=res.data.goodslist
                    // console.log(this.filterCategory);
                    this.SearchGoodsList = res.data.data;
                    // this.count=res.data.count
                })
        }


    },
    created() {
        // 加载搜索页
        SearchWindow()
            .then(res => {
                // console.log(res);
                this.defaultKeyword = res.data.defaultKeyword
                this.hotKeywordList = res.data.hotKeywordList
                this.historyKeywordList = res.data.historyKeywordList
            })
    }

};
</script>
 
<style lang = "less" scoped>
.searchPage {
    width: 100%;
    height: 100%;
    background-color: #efefef;
    position: absolute;
    top: 0;
}
</style>