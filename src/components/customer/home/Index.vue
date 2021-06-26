<template>
    <div id="App" class="main-screen">
        <div style="padding-top: 25px;">
            <div v-if="dataShop && dataShop.id" style="padding-bottom: 25px;">
                <div class="card box-shadow">
                    <div class="display-flex space-between">
                        <div>
                            <div class="fonts fonts-11 black semibold">
                                You're visiting {{ dataShop && dataShop.name }}
                            </div>
                            <div class="fonts fonts-10 grey">
                                you can create orders or view catalogs at this shop
                            </div>
                        </div>
                        <div>
                            <router-link :to="{name: 'customer-main'}">
                                <button class="btn btn-main">
                                    Visit Shop <i class="icn fa fa-lg fa-arrow-right"></i>
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else style="padding-bottom: 25px;">
                <div class="card box-shadow">
                    <div class="display-flex space-between">
                        <div>
                            <div class="fonts fonts-11 black semibold">
                                Make your orders
                            </div>
                            <div class="fonts fonts-10 grey">
                                by scan the QR restaurant that have join with us
                            </div>
                        </div>
                        <div>
                            <AppButtonScanQr 
                                :title="'Scan QR Code'"
                                :btnClass="'btn btn-main'"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="!visibleLoaderOrder">
                <div v-if="orders.length > 0">
                    <div style="padding-bottom: 25px;">
                        <div class="fonts fonts-10 black semibold" style="margin-bottom: 10px;">Last Order</div>
                        <AppCardOrder :data.sync="orders" />
                        <router-link :to="{name: 'customer-order'}" style="margin-top: 15px;">
                            <button class="btn btn-grey btn-full">
                                View your Order Histories
                            </button>
                        </router-link>
                    </div>
                    </div>
                </div>
            <AppLoader v-else />

            <div style="padding-bottom: 0">
                <div class="fonts fonts-10 black semibold" style="margin-bottom: 0;">Articles</div>
                <div v-if="!visibleLoaderArticle" style="white-space: nowrap; overflow-y: hidden; overflow-x: auto;">
                    <div v-for="(dt, i) in articles" :key="i" style="display: inline-block;">
                        <div style="position: relative; width: 300px; margin: 15px 10px; display: block; white-space: normal;">
                            <div class="card no-padding box-shadow">
                                <div style="margin-bottom: 20px;">
                                    <router-link :to="{name: 'article', params: {id: dt.article_id}}">
                                        <div style="width: 100%; height: 180px; background-color: #fff; border-radius: 0; overflow: hidden;">
                                            <img :src="dt.image" alt="product" class="post-center" style="width: 100%;">
                                        </div>
                                    </router-link>
                                </div>
                                <div style="padding: 0 20px; width: calc(100% - 40px);">
                                    <router-link :to="{name: 'article', params: {id: dt.article_id}}" class="fonts fonts-11 semibold black" style="margin-top: 0;">
                                        {{ dt.title }}
                                    </router-link>
                                    <div class="fonts fonts-9 grey" style="margin-top: 5px;">{{ dt.description.substring(0, 100) }} ..</div>
                                </div>
                                <div style="padding-bottom: 20px;"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <AppLoader v-else />
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import AppLoader from '../../modules/AppLoader'
import AppCardOrder from '../../modules/AppCardOrder'
import AppEmpty from '../../modules/AppEmpty'
import AppButtonScanQr from '../../modules/AppButtonScanQr'

export default {
    name: 'App',
    data () {
        return {
            visibleLoaderOrder: false,
            visibleLoaderArticle: false,
            articles: [],
            orders: [],
            dataUser: null,
            dataShop: null 
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.dataShop = this.$cookies.get('shop')
        this.getDataOrder()
        this.getArticle()
    },
    components: {
        AppButtonScanQr,
        AppEmpty,
        AppCardOrder,
        AppLoader
    },
    methods: {
        async getDataOrder () {
            this.visibleLoaderOrder = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1,
                offset: 0,
                owner_id: this.dataUser.id
            }
            
            const rest = await axios.post('/api/order/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.orders = data
                this.visibleLoaderOrder = false 
            } else {
                this.visibleLoaderOrder = false
            }
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
    }
}
</script>