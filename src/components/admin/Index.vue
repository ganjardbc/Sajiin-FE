<template>
    <div id="App" style="padding: 5px 10px;">
        <div style="padding: 15px 0; padding-bottom: 0;">
            <div class="display-flex display-mobile space-between">
                <div class="width width-row-4">
                    <AppCardDashboard title="New Orders" height="250px">
                        <div class="post-top content-center">
                            <div class="fonts fonts-48 teal semibold">{{ (nowOrders.confirmed + nowOrders.unconfirmed) }}<span class="fonts fonts-28 grey semibold">/{{ nowOrders.allAdmin }}</span></div>
                            <div class="fonts fonts-10 grey">Orders Today</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-4">
                    <AppCardDashboard title="Cooking" height="250px">
                        <div class="post-top content-center">
                            <div class="fonts fonts-48 teal semibold">{{ nowOrders.cooking }}<span class="fonts fonts-28 grey semibold">/{{ nowOrders.allAdmin }}</span></div>
                            <div class="fonts fonts-10 grey">Orders Today</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-4">
                    <AppCardDashboard title="Done" height="250px">
                        <div class="post-top content-center">
                            <div class="fonts fonts-48 grey semibold">{{ nowOrders.done }}</div>
                            <div class="fonts fonts-10 grey">Orders Today</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-4">
                    <AppCardDashboard title="Canceled" height="250px">
                        <div class="post-top content-center">
                            <div class="fonts fonts-48 grey semibold">{{ nowOrders.canceled }}</div>
                            <div class="fonts fonts-10 grey">Orders Today</div>
                        </div>
                    </AppCardDashboard>
                </div>
            </div>
        </div>
        <div class="display-flex display-mobile space-between" style="padding: 15px 0; padding-bottom: 0;">
            <div class="width width-row-2">
                <AppCardDashboard title="Order Summary">
                    <div style="width: 100%;"></div>
                </AppCardDashboard>
            </div>
            <div class="width width-row-3">
                <AppCardDashboard title="TaskLists">
                    <div style="width: 100%;"></div>
                </AppCardDashboard>
            </div>
        </div>
        <!-- <div class="display-flex display-mobile space-between" style="padding: 15px 0; padding-bottom: 0;">
            <div class="width width-row-3">
                <AppCardDashboard>
                    <div style="width: 100%;">CARD DASHBOARD</div>
                </AppCardDashboard>
            </div>
            <div class="width width-row-3">
                <AppCardDashboard>
                    <div style="width: 100%;">CARD DASHBOARD</div>
                </AppCardDashboard>
            </div>
            <div class="width width-row-3">
                <AppCardDashboard>
                    <div style="width: 100%;">CARD DASHBOARD</div>
                </AppCardDashboard>
            </div>
        </div>
        <div class="display-flex display-mobile space-between" style="padding: 15px 0; padding-bottom: 0;">
            <div class="width width-row-3">
                <AppCardDashboard>
                    <div style="width: 100%;">CARD DASHBOARD</div>
                </AppCardDashboard>
            </div>
            <div class="width width-row-3">
                <AppCardDashboard>
                    <div style="width: 100%;">CARD DASHBOARD</div>
                </AppCardDashboard>
            </div>
            <div class="width width-row-3"></div>
        </div> -->
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppCardDashboard from '../modules/AppCardDashboard'

export default {
    name: 'App',
    data () {
        return {
            nowOrders: null
        }
    },
    mounted () {
        this.nowOrders = this.orders 
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
    }
}
</script>
