<template>
  <!-- 首页页面 -->
  <div class="home">
    <!-- 搜索框 -->
    <van-search @click="searchPage()" shape="round" v-model="value" placeholder="请输入搜索关键词" />


    <div class="bigHidden" v-show="$route.path == '/home'">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in banner" :key="item.id">
          <img class="myimg" :src="item.image_url" alt="">
        </van-swipe-item>
      </van-swipe>

      <!-- 类型列表 -->
      <van-grid :column-num="5">
        <van-grid-item v-for="value in channel " :key="value.id" :icon="value.icon_url" @click="clickType(value.id)"
          :text="value.name" />
      </van-grid>


      <!-- 品牌制造商直供 -->
      <div class="brandList">
        <div class="title">
          <h1>品牌制造商直供</h1>
        </div>
        <van-grid :border="false" :column-num="2">
          <van-grid-item class="pos" v-for="item in brandList" :key="item.id" @click="brand(item.id)">
            <van-image :src="item.pic_url" />
            <p class="titlename">{{ item.name }}</p>
            <p class="floor_price">¥ {{ item.floor_price }} .00元</p>
          </van-grid-item>
        </van-grid>
      </div>


      <!-- 周一周四.新品首发 -->
      <div class="newGoodsList">
        <div class="title">
          <h1>周一周四.新品首发</h1>
        </div>
        <van-grid :border="false" :column-num="2">
          <van-grid-item class="pos" v-for="item in newGoodsList" :key="item.id" @click="newList(item.id)">
            <van-image :src="item.list_pic_url" />
            <p class="titlename1">{{ item.name }}</p>
            <p class="floor_price1">¥ {{ item.retail_price }} .00元</p>
          </van-grid-item>
        </van-grid>
      </div>


      <!-- 人气推荐 -->
      <div class="hotGoodsList">
        <div class="title">
          <h1>人气推荐</h1>
        </div>
        <van-card v-for="item in hotGoodsList" :key="item.id" :price="item.retail_price + '.00元'"
          :desc="item.goods_brief" :title="item.name" :thumb="item.list_pic_url" @click-thumb="reRender" />

      </div>


      <!-- 专题精选 -->
      <div class="topicList">
        <div class="title">
          <h1>专题精选</h1>
        </div>
        <van-swipe :loop="false" :width="300" :show-indicators='false'>
          <van-swipe-item class="myswiper" v-for="item in topicList" :key="item.id">
            <img :src="item.scene_pic_url" alt="">
            <p class="p2">
              <span>{{ item.title }}</span>
              <span class="price2">¥{{ item.price_info }}.00</span>
              <span>...</span>
            </p>

            <p class="p3">{{ item.subtitle }}</p>
          </van-swipe-item>
        </van-swipe>
      </div>



      <!-- 商品列表 -->
      <div class="categoryList" v-for="(item, index) in categoryList" :key="item.id">
        <div class="title">
          <h1>{{ item.name }}</h1>
        </div>
        <van-grid :border="false" :column-num="2">
          <van-grid-item class="pos" v-for="(item2, index2) in categoryList[index].goodsList" :key="item2.id">
            <van-image :src="item2.list_pic_url" @click="Jump()" />
            <p class="titlename1">{{ item2.name }}</p>
            <p class="floor_price1">¥ {{ item2.retail_price }} .00元</p>
          </van-grid-item>
        </van-grid>
      </div>

    </div>
    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>


  </div>
</template>

<script>
import { GetHomeList } from '@/request/api.js';
import { Toast } from 'vant';
export default {

  data() {
    return {
      value: '',
      banner: '',
      channel: '',
      brandList: '',
      newGoodsList: '',
      hotGoodsList: '',
      topicList: '',
      categoryList: '',
      goodsList: '',
      bool: true,
      id: ''
    }
  },
  components: {},
  methods: {
    searchPage() {
      this.$router.push('/home/searchPage');
    },
    clickType(id) {
      this.$router.push('/home/typeList?id=' + id);
    },
    brand(id) {
      this.$router.push('/home/brand/detail?id=' + id);
    },
    newList(id) {
      this.$router.push('/home/goods/detail?id=' + id);
    },
    Jump() {
      this.$router.push('/home/goods/list');
    },
    reRender() {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
      });
      this.$router.go();
    }
  },
  created() {
    GetHomeList()
      .then(res => {
        // console.log(res.data);
        this.banner = res.data.banner;
        this.channel = res.data.channel;
        this.brandList = res.data.brandList;
        this.newGoodsList = res.data.newGoodsList;
        this.hotGoodsList = res.data.hotGoodsList;
        this.topicList = res.data.topicList;
        this.categoryList = res.data.categoryList;
        this.id = res.data.brandList.id
        // console.log(this.id);
      })
      .catch(err => {
        console.log(err);
      })
  }
}
</script>
 
<style lang = "less" >
.myimg {
  width: 100%;
}

.title {
  // width: 100%;
  height: .5rem;
  background-color: #fff;
  margin-top: .2rem;
}

.title h1 {
  text-align: center;
  line-height: .3rem;
  font-size: .19rem;
  padding-top: .17rem;
}

.pos {
  position: relative;
}

.titlename {
  position: absolute;
  left: .2rem;
  top: .3rem
}

.floor_price {
  position: absolute;
  left: .3rem;
  top: .6rem;
  color: #8b0000;
  font-size: .14rem;
}

.floor_price1 {
  font-size: .14rem;
  color: #8b0000;
  margin-top: .1rem;
}

.myswiper {
  margin: .1rem;
}

.myswiper img {
  width: 100%;
  height: 2rem;
}

.price2 {
  padding: 0 .15rem;
  color: #8b0000;
}

.p3 {
  font-size: .14rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.p2,
.p3 {
  padding-top: .1rem;
}

.brandList,
.newGoodsList,
.hotGoodsList,
.topicList {
  background-color: #fff;
}

.van-card__title {
  font-size: .18rem;
  margin-top: .03rem;
  line-height: .2rem;
}

.van-ellipsis {
  margin-top: .16rem;
}

.van-card__price-integer {
  font-size: .12rem;
  color: #8d0000;
}

.titlename1 {
  text-align: center;
  width: 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.home {
  padding-bottom: .5rem;
}
</style>