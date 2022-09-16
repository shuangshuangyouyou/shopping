<template>
    <div>
        <div class="branddetail">
            <img class="brandImg" :src="brand.list_pic_url" alt="">
            <p class="brandName">{{ brand.name }}</p>
            <p class="brandSimple">{{ brand.simple_desc }}</p>
        </div>

    </div>
</template>

<script>
import { BrandDetail } from '@/request/api.js'
export default {
    data() {
        return {
            brand: [],
            id: ''
        }
    },
    components: {},
    methods: {},
    created() {
        this.id = this.$route.query.id
        BrandDetail({
            id: this.id
        })
            .then(res => {
                // console.log(res);
                this.brand = res.data.brand
                console.log(this.brand);
            })
    }
}
</script>
 
<style lang = "less" scoped>
.brandImg {
    width: 100%;
}

.brandName,
.brandSimple {
    text-align: center;
}

.brandName {
    position: absolute;
    top: 17%;
    left: 38%;
    font-size: .2rem;
    color: #fff;
    text-decoration: underline;
}

.brandSimple {
    padding: .2rem;
    font-size: .18rem;
    line-height: .3rem;
}

.branddetail {
    height: 40%;
    background-color: #fff;
}
</style>