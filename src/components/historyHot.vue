<template>

    <!-- 点击搜索进入的页面 -->
    <div class="historyHot">
        <div class="history">
            <div class="historyTop">
                <p class="historyTitle">历史记录</p>
                <van-icon @click="del()" name="delete-o" />
            </div>
            <van-tag class="historyTag" @click="searcHistoryGoods(item)" plain type="default"
                v-for="(item, index) in historyKeywordList" :key="index">
                {{ item }}</van-tag>
        </div>
        <div class="hot">
            <p class="hotTitle">热门搜索</p>
            <van-tag class="hotTag" @click="searcHistoryGood(item.keyword)" plain
                v-for="(item, index) in hotKeywordList" :key="index" :type="item.is_hot ? 'danger' : 'default'">
                {{ item.keyword }}</van-tag>
        </div>
    </div>

</template>

<script>
import { ClearSearchWindow } from '@/request/api'
import { Toast } from 'vant';
export default {
    props: {
        historyKeywordList: Array,
        hotKeywordList: Array,
    },
    data() {
        return {
            error: '',
            filterCategory: [],
            SearchGoodsList: [],
            // isShow:''
        }
    },
    components: {},
    methods: {
        del() {
            ClearSearchWindow()
                .then(res => {
                    // console.log(res);
                    this.$router.go(0)
                    // this.historyKeywordList=res.data;
                    Toast.success('删除成功')
                })
        },
        searcHistoryGoods(keywords) {
            this.$emit('keyWords', keywords)
        },
        searcHistoryGood(keyword) {
            this.$emit('keyWords', keyword)
        }
    }
}
</script>
 
<style lang = "less" scoped>
.history,
.hot {
    width: 100%;
    background-color: #fff;
    padding-bottom: .2rem;
}

.hot {
    margin-top: .2rem;
}


.hotTitle {
    padding-top: .1rem;
    padding-left: .1rem;
    font-size: .18rem;
}

.hotTag {
    margin-left: .1rem;
    margin-top: .1rem;

}

.historyTag {
    margin-left: .1rem;
    margin-top: .1rem;
}

.historyTop {
    display: flex;
    padding: .1rem;
    padding-bottom: 0;
    font-size: .18rem;
    justify-content: space-between;
}
</style>