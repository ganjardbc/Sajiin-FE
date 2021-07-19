<template>
    <div id="App" style="padding: 5px 10px;">
        <div style="padding: 15px 0; padding-bottom: 0;">
            <div class="display-flex display-mobile space-between">
                <div class="width width-row-4">
                    <AppCardDashboard title="New Orders" height="250px">
                        <div class="post-top content-center">
                            <div class="fonts fonts-48 teal semibold">{{ (nowOrders.confirmed + nowOrders.unconfirmed) }}</div>
                            <div class="fonts fonts-10 grey">Current Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-4">
                    <AppCardDashboard title="On Progress" height="250px">
                        <div class="post-top content-center">
                            <div class="fonts fonts-48 teal semibold">{{ nowOrders.cooking }}</div>
                            <div class="fonts fonts-10 grey">Current Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-4">
                    <AppCardDashboard title="Done" height="250px">
                        <div class="post-top content-center">
                            <div class="fonts fonts-48 grey semibold">{{ nowOrders.done }}</div>
                            <div class="fonts fonts-10 grey">Current Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-4">
                    <AppCardDashboard title="Canceled" height="250px">
                        <div class="post-top content-center">
                            <div class="fonts fonts-48 grey semibold">{{ nowOrders.canceled }}</div>
                            <div class="fonts fonts-10 grey">Current Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
            </div>
        </div>
        <div class="display-flex display-mobile space-between" style="padding: 15px 0; padding-bottom: 0;">
            <div style="width: 100%;">
                <AppCardDashboard title="Last 30 Days Order" height="500px">
                    <apexchart width="98%" height="95%" type="line" :options="options" :series="series"></apexchart>
                </AppCardDashboard>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import AppCardDashboard from '../modules/AppCardDashboard'
import moment from 'moment'

export default {
    name: 'App',
    data () {
        return {
            options: {
                chart: {
                    id: 'vuechart-example'
                },
                xaxis: {
                    categories: []
                }
            },
            series: [{
                name: 'orders',
                data: []
            }],
            nowOrders: null,
            dataShop: null
        }
    },
    mounted () {
        this.dataShop = this.$cookies.get('shop')
        this.nowOrders = this.orders 
        console.log('nowOrders', this.nowOrders)

        this.getDataOrder()
    },
    components: {
        AppCardDashboard
    },
    computed: {
        ...mapGetters({
            cart: 'cart/count',
            carts: 'cart/all',
            order: 'order/count',
            orders: 'order/all'
        })
    },
    watch: {
        orders: function (props) {
            if (props) {
                this.nowOrders = props 
                console.log('nowOrders', this.nowOrders)
            }
        }
    },
    methods: {
        ...mapActions({
            getCountCart: 'cart/getCount',
            getCountOrder: 'order/getCount'
        }),
        getLocalCartCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountCart(token)
        },
        getLocalOrderCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountOrder(token)
        },
        async getDataOrder () {
            this.visibleLoader = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                shop_id: this.dataShop ? this.dataShop.id : ''
            }

            const rest = await axios.post('/api/order/getDashboard', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                let yAxis = []
                let xAxis = []
                const data = rest.data.data
                data && data.map((dt) => {
                    yAxis.push(moment(dt.date).format("MMM, Do"))
                    xAxis.push(dt.count)
                    return null 
                })

                this.options = {
                    ...this.options,
                    xaxis: {
                        categories: yAxis
                    }
                }

                this.series = [{
                    ...this.series[0],
                    data: xAxis
                }]

                this.visibleLoader = false 
                console.log('dashboard order', xAxis)
            } else {
                this.visibleLoader = false 
            }
        }
    }
}
</script>
