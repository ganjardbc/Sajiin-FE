<template>
    <div id="App">
        <AppMobileLayout :title="'Wiselists'">
            <div style="padding: 10px 0; padding-top: 5px; width: 100%; overflow: unset;">
                <div style="width: 100%;">
                    <AppLoader v-if="visibleLoader" style="margin-top: 10px;" />

                    <div v-else>
                        <div v-if="products.length > 0">
                            <AppCardPostGrid :data.sync="products" :isMobileCard="true" />
                        </div>
                        <div v-else>
                            <AppEmpty />
                        </div>
                    </div>

                    <div v-if="!visibleLoader" class="display-flex center">
                        <button v-if="visibleLoadMore" class="btn btn-sekunder" style="margin-top: 10px;" @click="onMore">
                            Load More
                        </button>
                    </div>
                </div>

                <div style="padding-bottom: 45px;"></div>
            </div>
        </AppMobileLayout>

        <!-- <AppCardSmallCart /> -->
    </div>
</template>
<script>
import axios from 'axios'
import AppCardPostGrid from '../../modules/AppCardPostGrid'
import AppLoader from '../../modules/AppLoader'
import SearchField from '../../modules/SearchField'
import AppButtonMenu from '../../modules/AppButtonMenu'
import AppEmpty from '../../modules/AppEmpty'
import AppMobileLayout from '../../modules/AppMobileLayout'
import AppCardSmallCart from '../../modules/AppCardSmallCart'

export default {
    name: 'App',
    data() {
        return {
            limit: 10,
            offset: 0,
            visibleLoader: false,
            visibleLoadMore: false,
            products: [],
            dataUser: null,
            selectedCustomer: null,
            selectedTable: null
        }
    },
    mounted() {
        this.selectedCustomer = this.$cookies.get('customer')
        this.selectedTable = this.$cookies.get('table')
        this.dataUser = this.$cookies.get('user')
        this.getProduct(this.limit, this.offset)
    },
    components: {
        AppCardSmallCart,
        SearchField,
        AppMobileLayout,
        AppEmpty,
        AppButtonMenu,
        AppLoader,
        AppCardPostGrid
    },
    methods: {
        onSingleMenu (data) {
            console.log('onSingleMenu', data)
        },
        onMore () {
            this.getProduct(this.limit, this.offset)
        },
        async getProduct (limit, offset) {
            if (this.dataUser) {
                this.visibleLoader = true 

                const token = 'Bearer '.concat(this.$cookies.get('token'))
                const payload = {
                    limit: limit,
                    offset: offset,
                    owner_id: this.dataUser.id
                }

                let product = []

                if (offset > 0) {
                    product = Object.assign([], this.products)
                } else {
                    product = []
                }

                const rest = await axios.post('/api/wishelist/getAll', payload, { headers: { Authorization: token } })

                if (rest && rest.status === 200) {
                    const data = rest.data.data
                    data && data.map((dt) => {
                        console.log('data', dt)
                        return product.push({
                            id: dt.product.prod_id,
                            product_id: dt.product.product_id,
                            image: dt.images[0] ? this.productImageThumbnailUrl + dt.images[0].image : '',
                            title: dt.product.name,
                            price: dt.details[0] ? dt.details[0].price : 0,
                            is_available: dt.product.is_available,
                            available: dt.product.is_available ? 'Available' : 'Unavailable',
                            category: dt.product.description ? dt.product.description.substring(0, 50) + ' ...' : '',
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
            } else {
                this.visibleLoader = false
            }
        }
    }
}
</script>