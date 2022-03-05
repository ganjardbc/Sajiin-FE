<template>
    <div id="App" class="card-full-popup bg-main">
        <div class="post-middle-absolute">
            <div class="display-flex center" style="padding-bottom: 20px;">
                <i class="fa fa-2x fa-spinner fa-spin" style="font-size: 48pt; color: #fff;" />
            </div>
            <div style="text-align: center;">
                <div class="fonts fonts-16 semibold white">
                    Entering Shop 
                </div>
                <div class="fonts fonts-11 white">
                    {{ visibleTitle }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'App',
    data () {
        return {
            visibleLoader: false,
            visibleTitle: 'connecting to server ..',
            idshop: ''
        }
    },
    mounted () {
        this.getData()
    },
    methods: {
        ...mapActions('visitor', ['getShop']),
        getData () {
            this.visibleLoader = true
            this.visibleTitle = 'wait a minute ..'
            const payload = {
                shop_id: this.shopId
            }
            this.getShop(payload)
            .then(() => {
                const data = this.dataShop
                if (data) {
                    this.$session.set('shop', data)
                    this.$session.set('visitorShop', data.shop)
                    this.$session.set('visitorTable', data.tables)
                    this.$session.set('visitorCatalog', data.catalogs)
                    this.$session.remove('orderItem')
                    this.$session.remove('orderTable')
                    this.$session.remove('orderPayment')
                    this.$session.remove('cartList')

                    this.visibleTitle = 'proceed success.'
                    this.$router.replace({ name: 'visitor-shop' })

                    console.log('getData', data)
                } else {
                    this.visibleTitle = 'there is an error, please try again.'
                }
            })
            .finally(() => {
                this.visibleLoader = false
            })
        }
    },
    computed: {
        ...mapGetters({
            dataShop: 'visitor/data'
        }),
        shopId() {
            return this.$route.params.idshop
        }
    }
}
</script>