<template>
    <div id="App" :class="formClass ? 'content-form' : 'content-form hide'">
        <div class="left">
            <div class="bg-white">
                <div class="display-flex space-between" style="padding-bottom: 15px;">
                    <div>
                        <h1 class="fonts big black bold">Orders</h1>
                    </div>
                    <div class="display-flex">
                        <AppButtonMenu 
                            class="mobile-hidden"
                            :icon="'fa fa-lw fa-filter'"
                            :button="'btn btn-icon btn-white'"
                            :onChange="(data) => onChangeMenu(data)" 
                            :data="[{label: 'By ID'}, {label: 'By Total Price'}, {label: 'By Payment Status'}, {label: 'By Order Status'}]" />
                        <button class="btn btn-white btn-icon btn-radius" @click="onChangeTabs(selectedTabIndex)">
                            <i class="fa fa-lw fa-retweet" />
                        </button>
                        <SearchField :placeholder="'Search orders ..'" :enableResponsive="true" style="margin-left: 5px;" />
                    </div>
                </div>

                <div style="padding-bottom: 15px;">
                    <div class="width width-100 border-bottom">
                        <AppTabs 
                            :selectedIndex="selectedTabIndex" 
                            :path="'main-topic'"
                            :data="tabs" 
                            :isScrollable="false" 
                            :onChange="(data) => onChangeTabs(data)" 
                            class="width width-300-px width-mobile" />
                    </div>
                </div>
                
                <div>
                    <div>
                        <AppCardOrder 
                            :data.sync="datas" 
                            :type="'owner'" 
                            :onView="(id) => onShow('VIEW', id)"
                            :onEdit="(id) => onShow('EDIT', id)"
                            :onCheckOut="(id) => onShow('CHECKOUT', id)"
                            :onDelete="(id) => onShowHideDelete(id)"
                            :onChangeStatus="(data, id, status) => onChangeStatus(data, id, status)" 
                        />
                    </div>

                    <AppEmpty v-if="!visibleLoader && datas.length === 0" />

                    <AppLoader v-if="visibleLoader" />

                    <div v-if="!visibleLoader" class="display-flex center" style="margin-top: 20px; margin-bottom: 20px;">
                        <button v-if="visibleLoadMore" class="btn btn-sekunder" @click="onLoadMore">
                            Load More
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="right">
            <Form 
                v-if="!isCheckOut"
                :data.sync="selectedData"
                :message.sync="selectedMessage"
                :bizparOrder.sync="bizparOrder"
                :bizparStatus.sync="bizparStatus"
                :title="formTitle" 
                :onSave="(data) => onFormSave(data)"
                :onClose="onClose">
            </Form>

            <FormCheckout
                v-else
                :data.sync="selectedData"
                :message.sync="selectedMessage"
                :onSave="(data) => onFormSave(data)"
                :onClose="onClose">
            </FormCheckout>
        </div>

        <AppAlert 
            v-if="visibleAlertDelete" 
            :isLoader="visibleLoaderAction"
            :title="'This action will remove data permanently, delete this data ?'" 
            :onClose="onShowHideDelete" 
            :onSave="removeData" />
        
        <AppAlert 
            v-if="visibleAlertSave" 
            :isLoader="visibleLoaderAction"
            :title="'Proceed this data ?'" 
            :onClose="onShowHideSave" 
            :onSave="saveData" />
        
        <AppAlert 
            v-if="visibleAlertPayment" 
            :isLoader="visibleLoaderPayment"
            :title="'Change this payment status ?'" 
            :onClose="onShowHidePayment" 
            :onSave="changeStatusPayment" />
        
        <AppAlert 
            v-if="visibleAlertOrder" 
            :isLoader="visibleLoaderOrder"
            :title="'Change this order status ?'" 
            :onClose="onShowHideOrder" 
            :onSave="changeStatusOrder" />
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import AppTabs from '../../modules/AppTabs'
import AppLoader from '../../modules/AppLoader'
import AppAlert from '../../modules/AppAlert'
import SearchField from '../../modules/SearchField'
import AppButtonMenu from '../../modules/AppButtonMenu'
import AppCapsuleMenu from '../../modules/AppCapsuleMenu'
import AppCardOrder from '../../modules/AppCardOrder'
import AppEmpty from '../../modules/AppEmpty'
import Form from './Form'
import FormCheckout from './FormCheckout'

export default {
    name: 'App',
    data () {
        return {
            isCheckOut: false,
            visibleAlertPayment: false,
            visibleLoaderPayment: false,
            visibleAlertOrder: false,
            visibleLoaderOrder: false,
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            visibleLoadMore: false,
            formTitle: 'CREATE',
            formClass: false,
            datas: [],
            tabs: [
                {label: 'Active', status: 'active'},
                {label: 'Done', status: ''},
                {label: 'Canceled', status: ''},
            ],
            bizparCapsule: [],
            bizparOrder: [],
            bizparStatus: [],
            selectedTabIndex: null,
            selectedIndex: null,
            selectedForm: null,
            selectedData: null,
            selectedMessage: null,
            selectedIDPayment: null,
            selectedIDOrder: null,
            statusIDPayment: null,
            filters: {
                name: { value: '', keys: ['name'] }
            },
            limitPage: 10,
            currentPage: 1,
            totalPages: 0,
            dataUser: null,
            dataShop: null,
            limit: 10,
            offset: 0
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.dataShop = this.$cookies.get('shop')
        this.getData()
        this.getBizpar()
    },
    components: {
        AppEmpty,
        AppCardOrder,
        AppTabs,
        AppAlert,
        AppLoader,
        AppCapsuleMenu,
        AppButtonMenu,
        SearchField,
        FormCheckout,
        Form
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            token: 'auth/token'
        })
    },
    methods: {
        ...mapActions({
            getCountOrder: 'order/getCount'
        }),
        getLocalOrderCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountOrder(token)
        },
        onChangeTabs (index) {
            this.selectedTabIndex = index
            this.offset = 0
            this.datas = []
            switch (index) {
                case 1:
                    this.getDataByStatus('done')
                    break;
                case 2:
                    this.getDataByStatus('canceled')
                    break;
                default:
                    this.getData()
                    break;
            }
        },
        onLoadMore () {
            const index = this.selectedTabIndex
            switch (index) {
                case 1:
                    this.getDataByStatus('done')
                    break;
                case 2:
                    this.getDataByStatus('canceled')
                    break;
                default:
                    this.getData()
                    break;
            }
        },
        onChangeMenu (index) {
            console.log('onChange', index)
        },
        nameLength (row) {
            return row.key.length
        },
        onSearchData (id) {
            let payload = null
            this.datas.map((dt) => {
                if (dt.order.id === id) {
                    payload = {...dt}
                }
                return null 
            })
            return payload
        },
        onSave () {
            this.visibleAlertDelete = false
            this.visibleAlertSave = false
            this.formClass = false
        },
        onClose () {
            this.formClass = false
            this.isCheckOut = false
        },
        onShow (title, index = null) {
            this.formClass = true
            this.formTitle = title
            this.isCheckOut = title === 'CHECKOUT' ? true : false
            this.selectedData = index >= 0 ? this.onSearchData(index) : null
            this.selectedMessage = null 
        },
        onShowHideDelete (index = null) {
            this.visibleAlertDelete = !this.visibleAlertDelete
            this.selectedIndex = index
        },
        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
        },
        onShowHidePayment () {
            this.visibleAlertPayment = !this.visibleAlertPayment
        },
        onShowHideOrder () {
            this.visibleAlertOrder = !this.visibleAlertOrder
        },
        onFormSave (data = null) {
            this.onShowHideSave()
            this.selectedForm = data && data.order ? data.order : null
        },
        onChangeStatus (index, id, type) {
            let data = null
            switch (type) {
                case 'status':
                    data = this.bizparCapsule[index].label
                    this.selectedIDOrder = id 
                    this.statusIDOrder = data 
                    this.onShowHideOrder()
                    break;
                default:
                    data = index === 0 ? true : false 
                    this.selectedIDPayment = id 
                    this.statusIDPayment = data 
                    this.onShowHidePayment()
                    break;
            }
        },
        async changeStatusPayment () {
            this.visibleLoaderPayment = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                order_id: this.selectedIDPayment,
                payment_status: this.statusIDPayment
            }
            
            const rest = await axios.post('/api/order/postOrderPaymentStatus', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onChangeTabs(this.selectedTabIndex)
                this.onShowHidePayment()
                this.visibleLoaderPayment = false 
            } else {
                this.onShowHidePayment()
                this.visibleLoaderPayment = false
            }
        },
        async changeStatusOrder () {
            this.visibleLoaderOrder = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                order_id: this.selectedIDOrder,
                status: this.statusIDOrder
            }
            
            const rest = await axios.post('/api/order/postOrderStatus', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onChangeTabs(this.selectedTabIndex)
                this.onShowHideOrder()
                this.getLocalOrderCount()
                this.visibleLoaderOrder = false 
            } else {
                this.onShowHideOrder()
                this.visibleLoaderOrder = false
            }
        },
        async removeData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const id = this.onSearchData(this.selectedIndex).order.order_id
            const payload = {
                order_id: id
            }

            const rest = await axios.post('/api/order/delete', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideDelete()
                this.onClose()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.onChangeTabs(this.selectedTabIndex)
                    this.getLocalOrderCount()
                } else {
                    alert('Proceed failed')
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async saveData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.selectedForm
            const url = this.formTitle === 'CREATE' ? '/api/order/post' : '/api/order/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.onClose()
                    this.onChangeTabs(this.selectedTabIndex)
                    this.getLocalOrderCount()
                } else {
                    this.selectedMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async getDataByStatus (type) {
            this.visibleLoader = true 

            let data = []

            if (this.offset > 0) {
                data = Object.assign([], this.datas)
            } else {
                data = []
            }

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: this.limit,
                offset: this.offset,
                status: type,
                shop_id: this.dataShop ? this.dataShop.id : ''
            }
            
            const rest = await axios.post('/api/order/getByStatus', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const newData = rest.data.data
                
                newData && newData.map((dt) => {
                    return data.push({...dt})
                })

                this.datas = data 
                this.visibleLoader = false 

                if (newData.length > 0) {
                    this.offset += this.limit
                }

                if (newData.length < this.limit) {
                    this.visibleLoadMore = false
                } else {
                    this.visibleLoadMore = true
                }
            } else {
                this.visibleLoader = false
            }
        },
        async getData () {
            this.visibleLoader = true 

            let data = []

            if (this.offset > 0) {
                data = Object.assign([], this.datas)
            } else {
                data = []
            }

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: this.limit,
                offset: this.offset,
                shop_id: this.dataShop ? this.dataShop.id : ''
            }
            
            const rest = await axios.post('/api/order/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const newData = rest.data.data
                
                newData && newData.map((dt) => {
                    return data.push({...dt})
                })

                this.datas = data 
                this.visibleLoader = false 

                if (newData.length > 0) {
                    this.offset += this.limit
                }

                if (newData.length < this.limit) {
                    this.visibleLoadMore = false
                } else {
                    this.visibleLoadMore = true
                }
            } else {
                this.visibleLoader = false
            }
        },
        async getBizpar () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                type: ''
            }

            const rest = await axios.post('/api/bizpar/getByType', {...payload, type: 'order'}, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.bizparOrder = data
            }

            const response = await axios.post('/api/bizpar/getByType', {...payload, type: 'orderstatus'}, { headers: { Authorization: token } })

            if (response && response.status === 200) {
                const data = response.data.data
                this.bizparStatus = data
                this.bizparCapsule = data && data.map((dt) => {
                    return {
                        label: dt.value
                    }
                })
            }
        }
    }
}
</script>