<template>
    <!-- 购物车 -->
    <div class="cart">
        <!-- 顶部小条 -->
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



        <!-- 商品标签 -->
        <div class="outGoodsLabel" v-for="(item, index) in cartList" :key="index">
            <!-- 多选框 -->
            <van-checkbox :disabled="disabled" class="moreCheck" v-model="item.checked"
                @change="clickCartChecked(index)">
            </van-checkbox>

            <!-- 商品标签 -->
            <van-swipe-cell class="goodCard">
                <div class="goodCards">
                    <van-card class="goods_card" :num="item.number" :price="item.retail_price + '.00元'"
                        :desc="item.goods_name" :thumb="item.list_pic_url">
                    </van-card>
                    <!-- 步进器 -->
                    <van-stepper @change="changeStepper(item.goods_id, item.id, item.number, item.product_id)"
                        v-show="stepperShow" v-model="item.number" min="1" class="cartStepper" />
                </div>


                <template #right>
                    <van-button square text="删除" @click="cartDel(item.product_id, index)" type="danger"
                        class="delete-button" />
                </template>
            </van-swipe-cell>
        </div>


        <!-- 全选全不选 -->
        <van-submit-bar class="bottomEdit" @click="goon()" :price="cartTotal.checkedGoodsAmount * 100"
            button-text="立即购买" @submit="onSubmit">
            <van-checkbox v-model="allchecked" @click="allSelect(allchecked)" :disabled="disabled">全选</van-checkbox>

            <!-- 购物车下部编辑提交 -->
            <template #tip>
                <div class="bottomEditTop">
                    <p class="bottomText">
                        累计共{{ cartTotal.checkedGoodsCount }}件商品,可点击
                    </p>
                    <van-button class="edit" @click="onClickEditData" v-show="isShow == true" type="primary">编辑
                    </van-button>
                    <van-button class="edit" @click="overClickEditData" v-show="isShow == false" type="danger">完成编辑
                    </van-button>
                    <p class="bottomText">
                        按钮进行商品数量修改
                    </p>
                </div>
            </template>
        </van-submit-bar>

        <van-empty v-show="goodsCount == 0" class="custom-image"
            image="https://img01.yzcdn.cn/vant/custom-empty-image.png" description="购物车为空" />

    </div>
</template>

<script>
import { Toast } from 'vant';
import { GetCartData, cartChecked, cartDelete, cartUpdate, GoodsDetail } from '@/request/api.js'
export default {
    data() {
        return {
            allchecked: '',
            checked: '',
            cartList: [],
            cartTotal: [],
            isShow: true,
            product_id: '',
            // cartTotal1: [],
            cartListSwitch: [],
            value: '',
            stepperShow: '',
            disabled: false,
            allChecked: [],
            shangpin: [],
            goodsCount: 0,
            id: '',
            productList: []
        }
    },
    components: {},
    computed: {
        changeStepper() {
            return function (goods_id, id, number, ids) {
                cartUpdate({
                    goodsId: goods_id,
                    id: id,
                    number: number,
                    productId: ids
                })
                    .then(res => {
                        // console.log(res);
                        this.cartTotal = res.data.cartTotal
                        return this.cartTotal
                    })
            }

        },
    },
    methods: {
        onSubmit() {

        },

        // 控制编辑和完成编辑
        onClickEditData() {
            this.isShow = false
            this.stepperShow = true
            this.disabled = true
        },
        overClickEditData() {
            this.isShow = true
            this.stepperShow = false
            this.disabled = false
        },

        //立即购买
        goon() {
            Toast('该功能暂未开放');
        },

        // 删除
        cartDel(product_id, index) {
            // console.log(String(product_id));

            cartDelete({
                productIds: String(product_id)
            })
                .then(res => {
                    // console.log(res);
                    this.$router.go()

                })
        },


        // 点击计算商品结果
        clickCartChecked(index) {
            // console.log(this.allChecked);
            this.allChecked[index] = !this.allChecked[index] ? 1 : 0
            // console.log(this.cartList[index]);
            this.cartList[index].product_id = String(this.cartList[index].product_id)
            // console.log(this.cartList[index].product_id);
            // this.allchecked=1
            cartChecked({
                isChecked: this.allChecked[index],
                productIds: this.cartList[index].product_id
            })
                .then(res => {
                    // console.log(res);
                    this.cartTotal = res.data.cartTotal;
                    for (let i = 0; i < this.allChecked.length; i++) {
                        if (this.allChecked[i] == 0) {
                            this.allchecked = 0
                            break
                        }
                        this.allchecked = 1
                    }


                })


        },



        // 全选
        allSelect(allchecked) {
            this.allchecked = allchecked == true ? 1 : 0
            // console.log(this.allchecked);
            // console.log(typeof this.allchecked);
            // console.log(this.allChecked.length);
            for (let i = 0; i < this.allChecked.length; i++) {
                this.cartList[i].checked = this.allchecked
            }
            cartChecked({
                isChecked: this.allchecked,
                productIds: this.shangpin
            })
                .then(res => {
                    // console.log(res);
                    this.cartTotal = res.data.cartTotal
                })
        }


    },
    created() {

        GetCartData()
            .then(res => {
                // console.log(res);
                this.cartList = res.data.cartList;
                for (let i = 0; i < res.data.cartList.length; i++) {
                    this.allChecked.push(res.data.cartList[i].checked)
                    this.shangpin.push(res.data.cartList[i].product_id)
                }
                this.shangpin = this.shangpin.join(',')
                // console.log(this.allChecked);
                // console.log(this.shangpin);

                // this.cartTotal=res.data.cartTotal
                this.goodsCount = res.data.cartList.goodsCount
                // console.log(res.data.cartTotal.goodsCount);

                for (let i = 0; i < this.allChecked.length; i++) {
                    if (this.allChecked[i] == 0) {
                        this.allchecked = 0
                        break
                    }
                    this.allchecked = 1
                }
            })

            ,


            this.id = this.$route.query.id
        GoodsDetail({
            id: this.id
        })
            .then(res => {
                console.log(res);
                // this.info = res.data.info
                // this.gallery = res.data.gallery
                this.productList = res.data.productList
                // this.attribute = res.data.attribute
                // this.issue = res.data.issue
            })


    }
}


</script>
 
<style lang = "less" scoped>
.cart {
    padding-bottom: .5rem;
}

.cartTop {
    font-size: .13rem;
    text-align: center;
}

.cartTopAll {
    padding: .1rem 0;
}

.outGoodsLabel {
    // width: 100%;
    // height: 100%;
    display: flex;
    padding-left: .1rem;
    background-color: #fff;
}

.goodCard {
    width: 90%;
    margin: .1rem;
}

.van-card__price-integer {
    font-size: .16rem;
}

.van-card__desc {
    font-size: .18rem;
    color: #000;
    margin-top: .2rem;
}

.bottomEdit {
    margin-bottom: .5rem;
}

.bottomEditTop {
    display: flex;
    align-items: center;
}

.edit {
    font-size: .1rem;
    height: .35rem;
    margin: 0 .05rem;
}

.goods-card {
    margin: 0;
    background-color: white;
}

.delete-button {
    height: 100%;
}

.goodCards {
    background-color: #fafafa;

}

.cartStepper {
    padding-bottom: .1rem;
    padding-left: 67%;
}

.cart {
    padding-bottom: 1.5rem;
}
</style>
</styl.goods-card>