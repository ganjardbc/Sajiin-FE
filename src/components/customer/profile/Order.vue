<template>
    <div id="App">
        <AppMobileLayout :title="'Orders'">
            <div style="padding: 10px 0; width: 100%; overflow: unset;">
                <div class="display-flex row space-between" style="height: 40px; margin-bottom: 10px;">
                    <div class="width width-35">
                        <SearchField :placeholder="'Search orders ..'" :enableResponsive="true" :onChange="(data) => onChangeMenu(data)" />
                    </div>
                    <div class="display-flex">
                        <AppButtonMenu 
                            icon="fa fa-lg fa-sort"
                            button="btn btn-white btn-icon btn-radius"
                            :onChange="(data) => onChangeMenu(data)" 
                            :data="[
                                {label: 'Current', icon: 'fa fa-lw fa-sort-numeric-down'}, 
                                {label: 'Old', icon: 'fa fa-lw fa-sort-numeric-up'}, 
                                {label: 'A to Z', icon: 'fa fa-lw fa-sort-alpha-down'}, 
                                {label: 'Z to A', icon: 'fa fa-lw fa-sort-alpha-up'}
                            ]" />
                        <AppButtonMenu 
                            icon="fa fa-lw fa-filter"
                            button="btn btn-white btn-icon btn-radius"
                            :onChange="(data) => onChangeMenu(data)" 
                            :data="[
                                {label: 'Name of product'}, 
                                {label: 'Price of product'}
                            ]" />
                        <button class="btn btn-white btn-icon btn-radius" @click="getRefresh()">
                            <i class="fa fa-lg fa-retweet"></i>
                        </button>
                    </div>
                </div>

                <div v-if="!visibleLoader">
                    <div v-if="formOrder.length > 0">
                        <AppCardOrder :data.sync="formOrder" />
                    </div>
                    <div v-else>
                        <AppEmpty />
                    </div>
                </div>

                <AppLoader v-if="visibleLoader" style="margin-top: 20px;" />
            </div>
        </AppMobileLayout>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import AppCardOrder from '../../modules/AppCardOrder'
import SearchField from '../../modules/SearchField'
import AppCardTable from '../../modules/AppCardTable'
import AppButtonMenu from '../../modules/AppButtonMenu'
import AppDote from '../../modules/AppDote'
import AppEmpty from '../../modules/AppEmpty'
import AppShowHide from '../../modules/AppShowHide'
import AppLoader from '../../modules/AppLoader'
import AppMobileLayout from '../../modules/AppMobileLayout'
import CardProfileProduct from './forms/Product'

export default {
    name: 'App',
    data () {
        return {
            visibleLoaderCheck: false,
            visibleLoader: false,
            selectedTable: null,
            selectedCustomer: null,
            selectedVisitor: null,
            formOrder: [],
            dataOrder: null,
            dataUser: null ,
            dataVisitor: null
        }
    },
    mounted () {
        this.selectedCustomer = this.$cookies.get('customer')
        this.selectedTable = this.$cookies.get('table')
        this.dataOrder = this.$cookies.get('orderItem')
        this.dataUser = this.$cookies.get('user')
        this.getDataOrder()
    },
    components: {
        SearchField,
        AppMobileLayout,
        AppLoader,
        AppCardOrder,
        AppButtonMenu,
        AppDote,
        AppEmpty,
        AppShowHide,
        AppCardTable,
        CardProfileProduct
    },
    methods: {
        ...mapActions({
            setToast: 'toast/setToast'
        }),
        makeToast (title) {
            const payload = {
                visible: true,
                title: title
            }
            this.setToast(payload)
        },
        onChangeMenu (index) {
            console.log('onChange', index)
        },
        getRefresh () {
            this.getDataOrder()
        },
        async changeStatusOrder (id, status) {
            var a = confirm('Change this order status ?')
            if (a) {
                this.visibleLoader = true 

                const token = 'Bearer '.concat(this.$cookies.get('token'))
                const payload = {
                    order_id: id,
                    status: status
                }
                
                const rest = await axios.post('/api/order/postOrderStatus', payload, { headers: { Authorization: token } })

                if (rest && rest.status === 200) {
                    this.getDataOrder()
                    this.visibleLoader = false 
                } else {
                    this.visibleLoader = false
                }
            }
        },
        async getDataOrder () {
            if (this.dataUser) {
                this.visibleLoader = true 

                const token = 'Bearer '.concat(this.$cookies.get('token'))
                const payload = {
                    limit: 1000,
                    offset: 0,
                    owner_id: this.dataUser.id
                }
                
                const rest = await axios.post('/api/order/getAll', payload, { headers: { Authorization: token } })

                console.log('getDataOrder', rest)

                if (rest && rest.status === 200) {
                    const data = rest.data.data
                    this.formOrder = data
                    this.visibleLoader = false 
                } else {
                    this.visibleLoader = false
                }
            } else {
                this.visibleLoader = false
            }
        },
    }
}
</script>