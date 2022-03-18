<template>
    <div id="App">
        <div class="card-dashboard-container">
            <div style="padding-bottom: 15px;">
                <h1 class="fonts big black bold">Dashboard</h1>
            </div>
        </div>
        <div style="padding: 15px 0; padding-bottom: 0;">
            <div class="display-flex display-mobile space-between">
                <div class="width width-row-4">
                    <AppCardDashboard height="210px">
                        <div class="post-top content-center">
                            <div style="padding-top: 20px;"></div>
                            <div class="fonts fonts-48 teal semibold">{{ nowOrders ? (nowOrders.confirmed + nowOrders.unconfirmed) : 0 }}</div>
                            <div class="fonts fonts-10 grey">New Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-4">
                    <AppCardDashboard height="210px">
                        <div class="post-top content-center">
                            <div style="padding-top: 20px;"></div>
                            <div class="fonts fonts-48 teal semibold">{{ nowOrders ? nowOrders.cooking : 0 }}</div>
                            <div class="fonts fonts-10 grey">On Progress Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-4">
                    <AppCardDashboard height="210px">
                        <div class="post-top content-center">
                            <div style="padding-top: 20px;"></div>
                            <div class="fonts fonts-48 grey semibold">{{ nowOrders ? nowOrders.done : 0 }}</div>
                            <div class="fonts fonts-10 grey">Done Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-4">
                    <AppCardDashboard height="210px">
                        <div class="post-top content-center">
                            <div style="padding-top: 20px;"></div>
                            <div class="fonts fonts-48 grey semibold">{{ nowOrders ? nowOrders.canceled : 0 }}</div>
                            <div class="fonts fonts-10 grey">Canceled Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
            </div>
        </div>
        <div class="display-flex display-mobile space-between" style="padding: 15px 0; padding-bottom: 0;">
            <div class="display-flex display-mobile" style="width: 100%;">
                <AppCardDashboard title="Last 30 Day's Orders" height="600px">
                    <apexchart width="98%" height="98%" type="line" :options="options" :series="series"></apexchart>
                </AppCardDashboard>
                <!-- <AppCardDashboard :title="`Notifications (${ notif })`" height="600px">
                    <AppPopupNotif :notif.sync="countNotif" />
                </AppCardDashboard> -->
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import AppCardDashboard from '../modules/AppCardDashboard'
import AppPopupNotif from '../modules/AppPopupNotif'
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
            dataShop: null,
            countNotif: 0
        }
    },
    mounted () {
        this.dataShop = this.$cookies.get('shop')
        this.nowOrders = this.orders 

        this.getDataOrder()
    },
    components: {
        AppCardDashboard,
        AppPopupNotif
    },
    computed: {
        ...mapGetters({
            cart: 'cart/count',
            carts: 'cart/all',
            order: 'order/count',
            orders: 'order/all',
            notif: 'notification/count',
        })
    },
    watch: {
        orders: function (props) {
            if (props) {
                this.nowOrders = props 
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
            } else {
                this.visibleLoader = false 
            }
        }
    }
}
</script>
