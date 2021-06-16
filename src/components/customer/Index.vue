<template>
    <div id="App" class="main-screen">
        <div style="width: 100%; margin-bottom: 15px;">
            <div style="padding-top: 15px; padding-bottom: 10px;">
                <div class="display-flex space-between">
                    <div style="width: 70px; margin-right: 12px;">
                        <div class="image image-padding image-center border border-full" style="text-align: center; overflow: hidden;">
                            <i v-if="!user.image" class="post-middle-absolute fa fa-lg fa-user-circle" style="font-size: 32px; color: #999;" />
                            <img v-else :src="user && user.image ? (adminImageThumbnailUrl + user.image) : ''" alt="">
                        </div>
                    </div>
                    <div style="position: relative; width: calc(100% - 82px;">
                        <div class="display-flex space-between" style="margin-bottom: 5px;">
                            <div class="display-flex">
                                <div class="fonts fonts-11 semibold" style="margin-right: 10px;">{{ user && user.name }}</div>
                                <div class="card-verified not" style="margin-right: 6px;">
                                    <i class="icn fa fa-lw fa-info"></i>
                                </div>
                            </div>
                            <div style="position: absolute; top: 0; right: 0;" class="card-capsule active">Open</div>
                        </div>
                        <div style="padding-bottom: 10px;">
                            <ul class="menu-info">
                                <li>
                                    <div class="icn">
                                        <i class="icn-left far fa-lg fa-clock" />
                                    </div>
                                    <div class="label">
                                        7:00 - 22:00 WIB
                                    </div>
                                </li>
                                <li>
                                    <div class="icn">
                                        <i class="icn-left fa fa-lg fa-map-marker-alt" />
                                    </div>
                                    <div class="label">
                                        Jl. mana we lah
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="display-flex space-between">
                <div v-for="(dt, index) in infos" :key="index" style="width: 100%; text-align: center;">
                    <div class="display-flex column">
                        <div class="fonts fonts-8 grey">{{ dt.title }}</div>
                        <div class="fonts fonts-16 semibold">{{ dt.qty }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div style="margin-bottom: 15px; padding-top: 0;">
            <div class="fonts fonts-10 black semibold" style="margin-bottom: 10px;">Table</div>
            <AppButtonTable 
                :enableDetail="true"
                :isFull="true" 
                :onChange="(data) => onChangeSelectedTable(data)" 
                style="width: 100%;" />
        </div> -->

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
            <div style="margin-bottom: 10px;">
                <div class="fonts fonts-10 black semibold">Categories</div>
            </div>
            <div class="display-flex space-between">
                <div style="width: 31%;">
                    <router-link :to="{name: 'product-list'}">
                        <div class="image image-padding box-shadow">
                            <img src="https://kebunbegonialembang.com/sajiin-v2/public//contents/products/thumbnails/PI-16214114183701621412013dobeldough1067901232049356907930866164640464645857646n.jpeg" alt="">
                        </div>
                    </router-link>
                </div>
                <div style="width: 31%;">
                    <router-link :to="{name: 'product-list'}">
                        <div class="image image-padding box-shadow">
                            <img src="https://kebunbegonialembang.com/sajiin-v2/public//contents/products/thumbnails/PI-16214114183701621412013dobeldough1067901232049356907930866164640464645857646n.jpeg" alt="">
                        </div>
                    </router-link>
                </div>
                <div style="width: 31%;">
                    <router-link :to="{name: 'product-list'}">
                        <div class="image image-padding box-shadow">
                            <img src="https://kebunbegonialembang.com/sajiin-v2/public//contents/products/thumbnails/PI-16214114183701621412013dobeldough1067901232049356907930866164640464645857646n.jpeg" alt="">
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <div>
            <div class="display-flex space-between">
                <div class="fonts fonts-10 black semibold">Products</div>
                <router-link :to="{name: 'product-list'}" class="fonts fonts-10 semibold link">View All</router-link>
            </div>
            <AppCardPostGrid :data="products" :isMobileCard="true" />
            <AppLoader v-if="visibleLoader" style="margin-top: 10px;" />
        </div>

        <!-- <div v-if="!visibleLoader" class="display-flex center">
            <button v-if="visibleLoadMore" class="btn btn-sekunder" style="margin-top: 10px;" @click="onMore">
                Load More
            </button>
        </div> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import AppWrapper from '../modules/AppWrapper'
import AppButton from '../modules/AppButton'
import AppText from '../modules/AppText'
import AppCardPostGrid from '../modules/AppCardPostGrid'
import AppCardGrid from '../modules/AppCardGrid'
import AppCardList from '../modules/AppCardList'
import AppLoader from '../modules/AppLoader'
import AppButtonTable from '../modules/AppButtonTable'

const infos = [
    {title: 'Orders', qty: '120'},
    {title: 'Visitors', qty: '34'},
    {title: 'Visble Table', qty: '2'}
]

const notes = [
    {icon: 'fa fa-lg fa-info-circle', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit '},
    {icon: 'fa fa-lg fa-info-circle', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '},
    {icon: 'fa fa-lg fa-info-circle', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolore magna aliqua. '}
]

export default {
    name: 'App',
    data () {
        return {
            visibleLoader: false,
            limit: 4,
            offset: 0,
            visibleLoadMore: false,
            products: [],
            dataUser: null,
            dataOrder: null,
            selectedCustomer: null,
            notes: notes,
            infos: infos
        }
    },
    mounted () {
        this.selectedCustomer = this.$cookies.get('customer')
        this.dataOrder = this.$cookies.get('orderItem')
        this.dataUser = this.$cookies.get('admin')
        this.getProduct(this.limit, this.offset)

        console.log('dataUser', this.dataUser)
    },
    components: {
        AppButtonTable,
        AppLoader,
        AppCardPostGrid,
        AppCardList,
        AppCardGrid,
        AppWrapper,
        AppButton,
        AppText
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
        onChangeSelectedTable (data) {
            // this.getLocalCartCount()
            // this.getLocalOrderCount()
            console.log('onChangeSelectedTable', data)
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
                user_id: this.dataUser.id
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
