<template>
    <div class="waibu">

        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in gallery" :key="index">
                <img class="swipeImg" :src="item.img_url" alt="">
            </van-swipe-item>
        </van-swipe>

        <!-- 顶部条 -->
        <van-row class="cartTopAll">
            <van-col span="8" class="cartTop">
                <van-icon name="checked" color="#8b0000" />
                <span>30天无忧退货</span>
            </van-col>
            <van-col span="8" class="cartTop">
                <van-icon name="checked" color="#8b0000" />
                <span>48小时快速退费</span>
            </van-col>
            <van-col span="8" class="cartTop">
                <van-icon name="checked" color="#8b0000" />
                <span>满88元免邮费</span>
            </van-col>
        </van-row>

        <!-- 商品信息 -->
        <div class="goodsDate">
            <h1 class="title1">{{ info.name }}</h1>
            <h2 class="title2">{{ info.goods_brief }}</h2>
            <h3 class="title3">¥{{ info.retail_price }}.00元</h3>
        </div>

        <!-- 展示弹出层 -->
        <van-cell is-link @click="showPopup">展示弹出层</van-cell>

        <van-popup v-model="show" position="bottom" :style="{ height: '40%' }" v-for="(item, index) in productList"
            :key="item.id">
            <div class="popupTop">
                <img class="popupTopImg" :src="info.list_pic_url" alt="">
                <!-- <div class="popupTopImg"></div> -->
                <div class="popupTopRight">
                    <p class="price">价格:&nbsp;&nbsp;¥ &nbsp;{{ productList[index].retail_price }}.00&nbsp;元</p>
                    <p class="inventory">库存:&nbsp;&nbsp;{{ productList[index].goods_number }}</p>
                </div>
            </div>

            <div class="popupStepper">
                <p class="inventoryNum">数量:</p>
                <van-stepper class="stepperNum" v-model="value" min="0" :max="productList[index].goods_number" />
            </div>
        </van-popup>

        <!-- 商品参数 -->
        <div class="goodsparams">
            <h1 class="params">商品参数</h1>
            <div class="paramsList">
                <div class="paramsUl">
                    <div class="paramsLi" v-for="(item, index) in attribute" :key="index">
                        <span class="paramsLiLeft">
                            {{ item.name }}
                        </span>
                        <span class="paramsLiRight">
                            {{ item.value }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="paramImg" v-html="info.goods_desc">
            </div>
        </div>

        <!-- 常见问题 相关产品 -->
        <div class="alwaysQue">
            <van-divider :style="{ color: '#000', borderColor: '#cccccc', padding: '0 .2rem' }">
                <h1 class="alwaysQueText">常见问题</h1>
            </van-divider>

            <div class="alwaysQueContents" v-for="(item, index) in issue" :key="index">
                <div class="alwaysQueTitle">
                    <div class="point">
                    </div>
                    <h2 class="title">{{ item.question }}</h2>
                </div>
                <div class="alwaysQueTitleContents">
                    <p>{{ item.answer }}</p>
                </div>
            </div>


            <!-- 相关产品 -->
            <van-divider :style="{ color: '#000', borderColor: '#cccccc', padding: '0 .2rem' }">
                <h1 class="alwaysQueText" id="correlation">相关产品</h1>
            </van-divider>

            <van-grid :border="false" :column-num="2">
                <van-grid-item v-for="(item, index) in goodsList" :key="index">
                    <van-image :src="item.list_pic_url" />
                    <p class="goodstitle">{{ item.name }}</p>
                    <p class="goodsprice">¥{{ item.retail_price }}.00元</p>
                </van-grid-item>

            </van-grid>

            <van-goods-action class="cartShop" v-for="item in productList">
                <van-goods-action-icon @click="clickStar()" :icon="star ? 'star' : 'star-o'" :text="star ? '已收藏' : '未收藏'"
                    color="#ff5000" />
                <van-goods-action-icon icon="cart-o" to="/cart" text="购物车" :badge="goodsCount" />
                <van-goods-action-button type="danger" @click="goon()" text="立即购买" />
                <van-goods-action-button type="warning" text="加入购物车" @click="addShopCart(item.id, item.goods_id)" />
            </van-goods-action>


        </div>

    </div>
</template>

<script>
import { Toast } from 'vant';
import { GoodsDetail, GoodsRelated, cartAdd, GetCartData, cartGoodscount } from '@/request/api.js'
export default {
    data() {
        return {
            id: '',
            info: [],
            attribute: [],
            issue: [],
            show: false,
            value: 1,
            productList: [],
            gallery: [],
            goodsList: [],
            cartList: [],
            goods_number: [],
            color: '',
            goodsCount: 0,
            star: true
        }
    },
    components: {},
    methods: {

        clickStar() {
            this.star = !this.star
        },

        // 展示弹出层
        showPopup() {
            this.show = true;
        },


        //立即购买
        goon() {
            Toast('该功能暂未开放');
        },

        // 加入购物车
        addShopCart(id, goods_id) {
            if (this.show == false) {
                this.show = true
                return
            }
            if (!localStorage.getItem("token")) {
                this.$toast("请先登录")
                this.$router.push({
                    path: '/person'
                })
            }
            cartAdd({
                goodsId: goods_id,
                productId: id,
                number: this.value
            })
                .then(res => {
                    console.log(res);
                    if (localStorage.getItem("token")) {
                        Toast.success('添加成功');
                    }
                })
        }
    },

    created() {
        this.id = this.$route.query.id
        GoodsDetail({
            id: this.id
        })
            .then(res => {
                // console.log(res);
                this.info = res.data.info
                this.gallery = res.data.gallery
                this.productList = res.data.productList
                this.attribute = res.data.attribute
                this.issue = res.data.issue
            }),

            GoodsRelated({
                id: this.id
            })
                .then(res => {
                    // console.log(res);
                    this.goodsList = res.data.goodsList
                }),

            GetCartData()
                .then(res => {
                    // console.log(res);
                    this.cartList = res.data.cartList
                    // console.log(res.data.cartTotal.goodsCount);
                    this.goodsCount = res.data.cartTotal.goodsCount

                    if (!localStorage.getItem("token")) {
                        this.goodsCount = 0
                    }
                    // console.log(res.data.cartList);
                    // console.log(this.goodsCount);
                }),

            cartGoodscount()
                .then(res => {
                    // console.log(res);
                })

    },
    mounted: function () {
        if (location.href.indexOf("#reloaded") == -1) {
            location.href = location.href + "#reloaded";
            location.reload();
        }
    }

}
</script>
 
<style lang = "less">
.cartTop {
    font-size: .13rem;
    text-align: center;
}

.cartTopAll {
    padding: .1rem 0;
}

.goodsDate {
    background-color: #fff;
    padding: .25rem;
}

.title1,
.title2,
.title3 {
    line-height: .4rem;
    text-align: center;
}

.title1 {
    font-size: .2rem;
}

.title2 {
    font-size: .14rem;
}

.title3 {
    font-size: .13rem;
    color: #8b0000;
}

.popupTop {
    display: flex;
}

.popupTopImg {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    padding: .08rem;
}

.popupTopRight {
    padding: .25rem 0;
    // margin-left: .2rem;
}

.inventory {
    margin-top: .35rem;
}

.inventory,
.price {
    font-size: .14rem;
}

.inventoryNum {
    font-size: .2rem;
}

.inventoryNum,
.stepperNum {
    margin-top: .2rem;
    padding-left: .1rem;
}

.swipeImg {
    width: 100%;
}

.params {
    font-size: .2rem;
    padding-top: .2rem;
    padding-left: .1rem;
}

.goodsparams {
    background-color: #fff;
    margin-top: .2rem;
}

.paramsLi {
    width: 95%;
    height: .3rem;
    border-radius: .05rem;
    background-color: #efefef;
    margin-left: 2.5%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.paramsLiLeft,
.paramsLiRight {
    line-height: .3rem;
    font-size: .14rem;


}

.paramsLiLeft {
    width: 25%;
    text-align: right;
    color: #999999;
    padding-left: .3rem;
}

.paramsLiRight {
    width: 75%;
    text-align: left;
    color: #333333;
}

.paramsList {
    padding-top: .1rem;
}

.paramsLi {
    margin-top: .05rem;
}

.paramImg {
    width: 100%;

    img {
        width: 100%;
        margin-top: -0.03rem;
    }
}

.alwaysQue {
    background-color: #fff;
    margin-top: .2rem;
}

.alwaysQueText {
    padding: .1rem 0;
    font-size: .18rem;
}

.alwaysQueTitle {
    display: flex;
    align-items: center;
    // margin: .02rem 0;

    .point {
        width: .04rem;
        height: .04rem;
        border-radius: 50%;
        background-color: #8b0000;
    }

    .title,
    .point {
        margin-left: .1rem;
    }

    .title {
        font-size: .16rem;
        color: #333;
    }

}

.alwaysQueTitleContents {
    p {
        padding-left: .23rem;
        margin: .1rem 0;
        font-size: .14rem;
        color: #666;
    }
}

#correlation {
    padding-bottom: .5rem;
}

.goodstitle,
.goodsprice {
    font-size: .14rem;
}

.goodsprice {
    color: #8b0000;
    margin-top: .05rem;
}

.cartShop {
    z-index: 9999999;
}

.waibu {
    padding-bottom: 2rem;
}
</style>