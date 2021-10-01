<template>
    <div id="ProductList">
        <AppMobileLayout :title="'Products'">
            <div style="padding: 10px 0; width: 100%; overflow: unset;">
                <div style="position: fixed; top: 50px; left: 0; width: 100%; background-color: #fff; z-index: 100;">
                    <div class="main-screen" style="padding-top: 10px;">
                        <div class="display-flex space-between" style="margin-bottom: 15px;">
                            <div class="display-flex">
                                <button class="btn btn-sekunder" style="margin-right: 10px;">
                                    Category <i class="icn fa fa-lg fa-list"></i>
                                </button>
                                <button class="btn btn-sekunder">
                                    Higher Price <i class="icn fa fa-lg fa-arrow-up"></i>
                                </button>
                            </div>
                            <div>
                                <button class="btn btn-sekunder">
                                    Sort By <i class="icn fa fa-lg fa-sort"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="padding-top: 50px;">
                    <AppCardPostGrid :data="products" :isMobileCard="true" />
                    <AppLoader v-if="visibleLoader" style="margin-top: 10px;" />
                </div>

                <div v-if="!visibleLoader" class="display-flex center" style="margin-top: 10px;">
                    <button v-if="visibleLoadMore" class="btn btn-sekunder" @click="onMore">
                        Load More
                    </button>
                </div>

                <div style="padding-bottom: 45px;"></div>
            </div>
        </AppMobileLayout>

        <AppCardSmallCart />
    </div>
</template>

<script>
import axios from 'axios'
import AppWrapper from '../../modules/AppWrapper'
import AppButton from '../../modules/AppButton'
import AppText from '../../modules/AppText'
import AppCardPostGrid from '../../modules/AppCardPostGrid'
import AppCardGrid from '../../modules/AppCardGrid'
import AppCardList from '../../modules/AppCardList'
import AppLoader from '../../modules/AppLoader'
import AppMobileLayout from '../../modules/AppMobileLayout'
import AppCardSmallCart from '../../modules/AppCardSmallCart'

export default {
    name: 'ProductList',
    data () {
        return {
            visibleLoader: false,
            icon: '',
            limit: 9,
            offset: 0,
            visibleLoadMore: false,
            products: [],
            dataUser: null,
            dataShop: null
        }
    },
    components: {
        AppCardSmallCart,
        AppMobileLayout,
        AppLoader,
        AppCardPostGrid,
        AppCardList,
        AppCardGrid,
        AppWrapper,
        AppButton,
        AppText
    },
    mounted () {
        this.dataShop = this.$cookies.get('shop')
        this.dataUser = this.$cookies.get('admin')
        this.getProduct(this.limit, this.offset)
    },
    methods: {
        async getProduct (limit, offset) {
            this.visibleLoader = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            let product = []

            if (offset > 0) {
                product = Object.assign([], this.products)
            } else {
                product = []
            }

            const payload = {
                limit: limit,
                offset: offset,
                status: 'active',
                shop_id: this.dataShop.id
            }

            const rest = await axios.post('/api/product/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                data && data.map((dt) => {
                    return product.push({
                        ...dt,
                        id: dt.product.id,
                        product_id: dt.product.product_id,
                        image: dt.images[0] ? this.productImageThumbnailUrl + dt.images[0].image : '',
                        title: dt.product.name,
                        price: dt.details[0] ? dt.details[0].price : 0,
                        is_available: dt.product.is_available,
                        available: dt.product.is_available ? 'Available' : 'Unavailable',
                        category: dt.product.ctr_name,
                        description: dt.product.description
                    })
                })
                this.products = product
                this.visibleLoader = false 

                if (data.length > 0) {
                    this.offset += this.limit
                }

                if (data.length < this.limit) {
                    this.visibleLoadMore = false
                } else {
                    this.visibleLoadMore = true
                }
            } else {
                this.visibleLoader = false 
            }
        },
        onMore () {
            this.getProduct(this.limit, this.offset)
        }
    }
}
</script>

<style scoped>
.self-padding {
    padding-top: 50px;
    padding-bottom: 50px;
}
</style>
