<template>
    <div id="App">
        <AppMobileLayout :title="'Shop'">
            <div style="padding-top: 10px; padding-bottom: 20px;"> 
                <div v-if="!selectedShop" style="width: 100%; padding-top: 0; padding-bottom: 15px;">
                    <div class="card box-shadow" style="padding-top: 5px; padding-bottom: 5px;">
                        <div class="display-flex space-between display-mobile">
                            <div style="margin-top: 10px; margin-bottom: 10px;">
                                <div class="fonts fonts-11 black semibold">
                                    Make your orders
                                </div>
                                <div class="fonts fonts-10 grey">
                                    by scan the QR restaurant that have join with us
                                </div>
                            </div>
                            <div style="margin-top: 10px; margin-bottom: 10px;">
                                <router-link :to="{name: 'customer-qr'}">
                                    <button class="btn btn-main">
                                        <i class="icn icn-left fa fa-lw fa-qrcode"></i> Scan QR Code 
                                    </button>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div style="width: 100%; margin-bottom: 20px;">
                        <div style="padding-top: 0; padding-bottom: 15px;">
                            <div class="display-flex space-between">
                                <div style="width: 70px; margin-right: 15px;">
                                    <div class="image image-padding image-center border border-full" style="text-align: center; overflow: hidden;">
                                        <i v-if="selectedShop && !selectedShop.image" class="post-middle-absolute fa fa-lg fa-store" style="font-size: 32px; color: #999;" />
                                        <img v-else :src="selectedShop && selectedShop.image ? (shopImageThumbnailUrl + selectedShop.image) : ''" alt="">
                                    </div>
                                </div>
                                <div style="position: relative; width: calc(100% - 85px;">
                                    <div class="display-flex space-between" style="margin-bottom: 5px;">
                                        <div class="display-flex">
                                            <div class="fonts fonts-11 semibold" style="margin-right: 10px;">{{ selectedShop && selectedShop.name }}</div>
                                            <div class="card-verified not" style="margin-right: 6px;" :title="selectedShop && selectedShop.about">
                                                <i class="icn fa fa-lw fa-info"></i>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="card-capsule active">Open</div>
                                        </div>
                                    </div>
                                    <div style="padding-bottom: 15px;">
                                        <ul class="menu-info">
                                            <li>
                                                <div class="icn">
                                                    <i class="icn-left far fa-lg fa-clock" />
                                                </div>
                                                <div class="label">
                                                    {{ selectedShop && selectedShop.open_time }} - {{ selectedShop && selectedShop.close_time }}
                                                </div>
                                            </li>
                                            <li>
                                                <div class="icn">
                                                    <i class="icn-left fa fa-lg fa-map-marker-alt" />
                                                </div>
                                                <div class="label">
                                                    {{ selectedShop && selectedShop.location }}
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style="padding-bottom: 0;">
                            <button class="btn btn-sekunder btn-full" @click="onShowHideExit" title="Exit Shop">
                                Exit Shop <i class="icn fa fa-1x fa-sign-out-alt"></i>
                            </button>
                        </div>
                    </div>

                    <div v-if="dataOrder" class="border border-bottoms" style="padding-top: 0; padding-bottom: 15px;">
                        <div class="fonts fonts-10 semibold" style="margin-bottom: 5px;">
                            You have an order
                        </div>
                        <div class="display-flex">
                            <router-link :to="{name: 'order'}" class="card-capsule active" style="width: 100%; text-align: center; padding-top: 10px; padding-bottom: 8px;">
                                Continue to check out ?
                            </router-link>
                        </div>
                    </div>

                    <div style="margin-bottom: 20px;">
                        <div style="margin-bottom: 0;">
                            <div class="fonts fonts-10 black semibold">Categories</div>
                        </div>
                        <div class="display-flex wrap">
                            <div v-for="(dt, i) in categories" :key="i" style="width: calc(100% / 3);">
                                <div style="padding-right: 7.5px; padding-left: 7.5px; padding-top: 15px;">
                                    <router-link :to="{name: 'product-list'}">
                                        <div class="card no-padding box-shadow">
                                            <div class="image image-half-padding" style="padding-bottom: 60%; border-radius: 0;">
                                                <i v-if="!dt.image" class="post-middle-absolute fa fa-lg fa-image" style="font-size: 32px; color: #999;"></i>
                                                <img v-else :src="dt.image" alt="">
                                            </div>
                                            <div class="padding padding-10-px" style="text-align: center;">
                                                <div class="fonts fonts-10 black">
                                                    {{ dt.name }}
                                                </div>
                                            </div>
                                        </div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <AppLoader v-if="visibleLoaderCategory" style="margin-top: 10px;" />
                    </div>

                    <div>
                        <div class="display-flex space-between">
                            <div class="fonts fonts-10 black semibold">Products</div>
                            <router-link :to="{name: 'product-list'}" class="fonts fonts-10 semibold link">View All</router-link>
                        </div>
                        <AppCardPostGrid :data="products" :isMobileCard="true" />
                        <AppLoader v-if="visibleLoader" style="margin-top: 10px;" />
                    </div>

                    <div style="padding-bottom: 45px;"></div>
                </div>
            </div>
        </AppMobileLayout>

        <AppAlert 
            v-if="visibleAlertExit" 
            :isLoader="visibleLoaderExit"
            :title="'Exit Shop ?'" 
            :subtitle="'It will remove your Carts and Wishelists.'"
            :onClose="onShowHideExit" 
            :onSave="exitShop" />
        
        <AppCardSmallCart />
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import AppWrapper from '../../modules/AppWrapper'
import AppButton from '../../modules/AppButton'
import AppText from '../../modules/AppText'
import AppCardPostGrid from '../../modules/AppCardPostGrid'
import AppCardGrid from '../../modules/AppCardGrid'
import AppCardList from '../../modules/AppCardList'
import AppLoader from '../../modules/AppLoader'
import AppButtonTable from '../../modules/AppButtonTable'
import AppAlert from '../../modules/AppAlert'
import AppMobileLayout from '../../modules/AppMobileLayout'
import AppCardSmallCart from '../../modules/AppCardSmallCart'

export default {
    name: 'App',
    data () {
        return {
            visibleAlertExit: false,
            visibleLoaderExit: false,
            visibleLoader: false,
            visibleLoaderCategory: false,
            limit: 4,
            offset: 0,
            visibleLoadMore: false,
            products: [],
            categories: [],
            articles: [],
            dataUser: null,
            dataOrder: null,
            selectedCustomer: null,
            selectedShop: null
        }
    },
    mounted () {
        this.selectedShop = this.$cookies.get('shop')
        this.selectedCustomer = this.$cookies.get('customer')
        this.dataOrder = this.$cookies.get('orderItem')
        this.dataUser = this.$cookies.get('user')
        // this.getArticle()
        this.getCategory(5, 0)
        this.getProduct(this.limit, this.offset)
    },
    components: {
        AppCardSmallCart,
        AppAlert,
        AppButtonTable,
        AppLoader,
        AppCardPostGrid,
        AppCardList,
        AppCardGrid,
        AppWrapper,
        AppButton,
        AppText,
        AppMobileLayout
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/admin',
            token: 'auth/token',
            order: 'order/count'
        })
    },
    methods: {
        ...mapActions({
            setShop: 'store/setData',
            setToast: 'toast/setToast',
            getCount: 'cart/getCountCustomer',
        }),
        makeToast (title) {
            const payload = {
                visible: true,
                title: title
            }
            this.setToast(payload)
        },
        getLocalCartCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCount(token)
        },
        onShowHideExit () {
            this.visibleAlertExit = !this.visibleAlertExit
        },
        async getArticle () {
            this.visibleLoaderArticle = true

            const payload = {
                limit: 5,
                offset: 0
            }

            const rest = await axios.post('/api/public/article', payload)

            if (rest && rest.status === 200) {
                const data = rest.data.data
                const payload = data && data.map((dt) => {
                    return {
                        ...dt,
                        id: dt.id,
                        image: this.articleImageThumbnailUrl + dt.image,
                        title: dt.title,
                        description: dt.description
                    }
                })
                this.articles = payload
                this.visibleLoaderArticle = false 
            } else {
                this.visibleLoaderArticle = false 
            }
        },
        async exitShop () {
            this.visibleLoaderExit = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                owner_id: this.dataUser.id
            }

            const rest = await axios.post('/api/shop/exit', payload, { headers: { Authorization: token } })
            if (rest && rest.status === 200) {
                this.visibleLoaderExit = false
                this.onShowHideExit()
                this.getLocalCartCount()
                this.setShop(null)
                this.$cookies.remove('shop')
                this.$cookies.remove('orderItem')
                this.$cookies.remove('orderTable')
                this.$cookies.remove('orderPayment')
                // this.$router.go()
                this.$router.replace({ name: 'customer-main' })
            } else {
                this.onShowHideExit()
                this.makeToast('Proceed failed')
                this.visibleLoaderExit = false
            }
        },
        async getCategory (limit, offset) {
            this.visibleLoaderCategory = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            let category = []

            if (offset > 0) {
                category = Object.assign([], this.categories)
            } else {
                category = []
            }

            const payload = {
                limit: limit,
                offset: offset,
                status: 'active',
                shop_id: this.selectedShop ? this.selectedShop.id : null 
            }

            const rest = await axios.post('/api/category/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                data && data.map((dt) => {
                    return category.push({
                        ...dt,
                        id: dt.id,
                        category: dt.category,
                        image: dt.image ? this.categoryImageThumbnailUrl + dt.image : '',
                        name: dt.name,
                        available: dt.is_available ? 'Available' : 'Unavailable',
                        description: dt.description
                    })
                })
                this.categories = category
                this.visibleLoaderCategory = false 

                if (data.length > 0) {
                    this.offset += this.limit
                }

                if (data.length < this.limit) {
                    this.visibleLoadMore = false
                } else {
                    this.visibleLoadMore = true
                }
            } else {
                this.visibleLoaderCategory = false 
            }
        },
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
                shop_id: this.selectedShop ? this.selectedShop.id : null 
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