<template>
    <!-- 专题页 -->
    <div class="label">
        <!-- 专题数据 -->
        <div class="labelModule" v-for="(item, index) in labelList" :key="index">
            <img class="labelImg" :src="item.scene_pic_url" alt="">
            <h4 class="text4">{{ item.title }}</h4>
            <h5 class="text5">{{ item.subtitle }}</h5>
            <h6 class="text6">¥ {{ item.price_info }} .00元起</h6>
        </div>
        <!-- 分页 -->
        <van-pagination v-model="currentPage" @change="change(currentPage)" :page-count="totalPages" mode="simple" />
    </div>
</template>

<script>
import { TopicPage } from '@/request/api'
export default {
    data() {
        return {
            labelList: [],
            currentPage: 1,
            totalPages: '',
        }
    },
    components: {},
    methods: {
        change(page) {
            document.body.scrollTop=document.documentElement.scrollTop=0
            TopicPage({
                page: page,
                size: 10
            })
                .then(res => {
                    // console.log(res);
                    this.labelList = res.data.data;
                    this.currentPage = res.data.currentPage;
                    this.totalPages = res.data.totalPages;
                })
        }

    },
    created() {
        TopicPage({
            page: 1,
            size: 10
        })
            .then(res => {
                // console.log(res);
                // console.log(res.data.data);
                this.labelList = res.data.data;
                this.currentPage = res.data.currentPage;
                this.totalPages = res.data.totalPages;
            })
    }
}
</script>
 
<style lang = "less" scoped>
.labelImg {
    width: 100%;
}

.text4,
.text5,
.text6 {
    text-align: center;
    background-color: #fff;
    padding: .1rem 0;
}

.labelModule {
    margin-top: .2rem;
}

.text4 {
    font-size: .18rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.text5 {
    font-size: .16rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.text6 {
    font-size: .14rem;
    color: #9b0000;
}

.label {
    padding-bottom: .5rem;
}
</style>