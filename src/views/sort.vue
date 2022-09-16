<template>
    <div>
        <!-- 搜索 -->
        <van-search @click="searchPage()" shape="round" v-model="value" placeholder="请输入搜索关键词" />


        <!-- 分类页 -->

        <!-- 左侧标题 -->
        <van-tree-select height="100%" :items="items" :main-active-index.sync="active" @click-nav="typeDate">
            <template #content>
                <div v-for="(item, index) in categoryList" :key="index" class="TypeDate">
                    <img v-if="active === item.show_index - 1" :src="item.banner_url" width="100%" class="dateImg">
                    <p v-if="active === item.show_index - 1" class="centerText">{{ item.front_name }}</p>
                    <van-divider v-if="active === item.show_index - 1"
                        :style="{ color: '#cccccc', borderColor: '#cccccc', padding: '0 16px' }">
                        {{ item.name }}
                    </van-divider>

                    <van-grid :column-num="3" v-if="active === item.show_index - 1">
                        <van-grid-item v-for="(item, index) in subCategoryList" :key="index" :icon="item.wap_banner_url"
                            :text="item.name" />
                    </van-grid>
                </div>
            </template>
        </van-tree-select>

        <!-- 加载组件 -->
        <transition name="van-slide-right">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { Toast } from 'vant';
import { SortWindow, TypeDate } from '@/request/api.js'
export default {
    data() {
        return {
            value: '',
            active: 0,
            items: [],
            categoryList: [],
            subCategoryList: [],
            currentCategory: [],
            id: ''
        }
    },
    components: {

    },
    methods: {
        searchPage() {
            this.$router.push('/home/searchPage')
        },
        typeDate(index) {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                duration:100
            });
            TypeDate({
                id: this.categoryList[index].id
            })
                .then(res => {
                    // console.log(res);
                    this.subCategoryList = res.data.currentCategory.subCategoryList
                })
        }
    },
    created() {
        SortWindow()
            .then(res => {
                // console.log(res);
                for (let i = 0; i < res.data.categoryList.length; i++) {
                    this.items.push({
                        text: res.data.categoryList[i].name
                    })
                }
                this.categoryList = res.data.categoryList;
                this.typeDate(0)
                // console.log(res.data.currentCategory.subCategoryList);
            })





    }
}
</script>
 
<style lang = "less" scoped>
.TypeDate {
    width: 95%;
    padding-left: .05rem;

    .dateImg {
        border-radius: .05rem;
        height: 1.2rem;
        box-shadow: 1px 1px 6px #000;
        filter: brightness(.5);
        border-radius: .05rem;
    }

    .centerText {
        position: absolute;
        top: .5rem;
        left: 47%;
        color: #fff;
        text-align: center;
    }

}

.van-tree-select__nav {
    flex: 0.5;
}

.van-sidebar {
    height: 5.8rem;
}
</style>