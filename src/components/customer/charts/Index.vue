<template>
    <div id="product">
        <AppMobileLayout :title="`Carts (${datas ? datas.length : '0'})`">
            <div style="padding: 10px 0; width: 100%; overflow: unset;">
                <div class="width width-100">
                    <div class="width width-100 width-mobile">
                        <div style="width: 100%; margin-bottom: 85px;">
                            <div class="display-flex space-between border-bottom" style="padding-bottom: 5px; margin-bottom: 10px;">
                                <div class="display-flex" style="padding-top: 6px;">
                                    <div style="margin-right: 10px;">
                                        <AppButtonChecklist :onChange="(status) => onChangeAll(status)" />
                                    </div>
                                    <div class="fonts fonts-11 black" style="padding-top: 2px;">Choose all</div>
                                </div>
                                <div style="height: 40px;">
                                    <!-- <button 
                                        v-if="visibleDeleteButton"
                                        class="btn btn-small btn-main-reverse with-hover" 
                                        @click="makeToast('Delete')">
                                        Delete
                                    </button> -->
                                </div>
                            </div>
                            
                            <div v-if="!visibleLoader">
                                <div v-if="datas.length > 0">
                                    <AppCardCharts 
                                        :data.sync="datas" :onSave="(data) => onSave(data)" 
                                        :onDelete="(data) => onShowHideDelete(data)" 
                                        :onChange="(status, data) => onChangeList(status, data)"
                                    />
                                </div>

                                <div v-else class="main-screen" style="padding-top: 10px;">
                                    <AppEmpty />
                                </div>
                            </div>

                            <AppLoader v-if="visibleLoader" style="margin-top: 10px;" />

                            <div v-if="!visibleLoader" class="display-flex center">
                                <button v-if="visibleLoadMore" class="btn btn-sekunder" style="margin-top: 10px;" @click="onMore">
                                    Load More
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="width width-100 width-mobile">
                        <div class="component-mobile">
                            <div class="component-mobile-content">
                                <AppShowHide :title="'Rp. ' + subtotalPrice" style="margin-bottom: 10px;">
                                    <div>
                                        <div class="display-flex space-between margin margin-bottom-5-px">
                                            <div class="fonts fonts-10 black">Total price ({{ totalProduct }} products)</div>
                                            <div class="fonts fonts-10 grey semibold">Rp {{ totalPrice }}</div>
                                        </div>
                                        <!-- <div class="display-flex space-between margin margin-bottom-20-px">
                                            <div class="fonts fonts-10 black">PPN ({{ ppn }}%)</div>
                                            <div class="fonts fonts-10 grey semibold">Rp {{ totalPPN }}</div>
                                        </div> -->

                                        <div class="display-flex space-between margin">
                                            <div class="fonts fonts-11 black semibold" style="margin-bottom: 5px;">Total Payment</div>
                                            <div class="fonts fonts-11 main semibold">Rp {{ subtotalPrice }}</div>
                                        </div>
                                    </div>
                                </AppShowHide>

                                <button v-if="visibleButton" class="btn btn-main btn-full" @click="makeOrder">
                                    Make Order
                                </button>
                                <button v-else class="btn btn-primary btn-full">
                                    Make Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppMobileLayout>

        <AppAlert 
            v-if="visibleAlertDelete" 
            :isLoader="visibleLoaderAction"
            :title="'This action will remove data permanently, delete this data ?'" 
            :onClose="onShowHideDelete" 
            :onSave="removeData" />
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
import AppAlert from '../../modules/AppAlert'
import AppWrapper from '../../modules/AppWrapper'
import AppButton from '../../modules/AppButton'
import AppText from '../../modules/AppText'
import AppCardCharts from '../../modules/AppCardCharts'
import AppButtonChecklist from '../../modules/AppButtonChecklist'
import AppEmpty from '../../modules/AppEmpty'
import AppLoader from '../../modules/AppLoader'
import AppShowHide from '../../modules/AppShowHide'
import AppMobileLayout from '../../modules/AppMobileLayout'

const payloadItem = {
    id: 0,
    toping_price: 0,
    price: 0,
    discount: 0,
    quantity: 0,
    subtotal: 0,
    product_image: "",
    product_name: "",
    product_detail: "",
    product_toping: "",
    promo_code: null,
    order_id: 0,
    product_id: 0,
    proddetail_id: 0,
    toping_id: 0,
    shop_id: 0,
    assigned_id: 0,
    status: "waiting"
}

export default {
    name: 'product',
    data () {
        return {
            limit: 10,
            offset: 0,
            selectedIndex: null,
            selectedMessage: null,
            dataUser: null,
            visibleAlertDelete: false,
            visibleLoaderAction: false,
            visibleLoader: false,
            visibleLoadMore: false,
            visibleButton: false,
            visibleDeleteButton: false,
            totalPrice: 0,
            subtotalPrice: 0,
            totalProduct: 0,
            totalPPN: 0,
            ppn: 0,
            datas: [],
            dataItems: [],
            dataUser: null,
            dataShop: null,
            selectedCustomer: null,
            selectedTable: null,
            limitOrders: 4
        }
    },
    mounted () {
        this.selectedCustomer = this.$cookies.get('customer')
        this.selectedTable = this.$cookies.get('table')
        this.dataUser = this.$cookies.get('user')
        this.dataShop = this.$cookies.get('shop')
        this.getData(this.limit, this.offset)

        console.log('orderitem', this.$cookies.get('orderItem'))
    },
    components: {
        AppShowHide,
        AppMobileLayout,
        AppLoader,
        AppEmpty,
        AppAlert,
        AppWrapper,
        AppButton,
        AppText,
        AppCardCharts,
        AppButtonChecklist
    },
    methods: {
        ...mapActions({
            setToast: 'toast/setToast',
            getCount: 'cart/getCountCustomer',
            setCart: 'cart/setData',
        }),
        onTotal (data) {
            let qty = 0
            let price = 0
            let totalPrice = 0
            data && data.map((dt) => {
                qty += dt.quantity
                price += dt.subtotal
                totalPrice += dt.subtotal
            })
            this.totalPPN = (this.ppn * totalPrice) / 100
            this.totalProduct = qty
            this.totalPrice = price 
            this.subtotalPrice = this.totalPPN + totalPrice

            if (this.subtotalPrice) {
                this.visibleButton = true 
            } else {
                this.visibleButton = false 
            }
        },
        onChangeAll (status) {
            let newPayload = []
            this.datas = this.datas && this.datas.map((dt, i) => {
                let stt = false 
                if (status) {
                    const payload = {
                        ...payloadItem,
                        cart_id: dt.cart_id,
                        toping_price: dt.toping_price,
                        price: dt.price,
                        discount: dt.discount,
                        quantity: dt.quantity,
                        subtotal: dt.subtotal,
                        product_image: dt.product_image,
                        product_name: dt.product_name,
                        product_detail: dt.product_detail,
                        product_toping: dt.product_toping,
                        promo_code: null,
                        product_id: dt.product_id,
                        proddetail_id: dt.proddetail_id,
                        toping_id: dt.toping_id,
                        shop_id: this.dataShop.id
                    }
                    newPayload.push(payload)
                }
                if (i < this.limitOrders) {
                    stt = status
                }
                return {...dt, disableButton: stt}
            })
            this.dataItems = newPayload
            this.visibleDeleteButton = status
            this.onTotal(this.dataItems)
        },
        onChangeList (status, data) {
            if (status) {
                const payload = {
                    ...payloadItem,
                    cart_id: data.cart_id,
                    toping_price: data.toping_price,
                    price: data.price,
                    discount: data.discount,
                    quantity: data.quantity,
                    subtotal: data.subtotal,
                    product_image: data.product_image,
                    product_name: data.product_name,
                    product_detail: data.product_detail,
                    product_toping: data.product_toping,
                    promo_code: null,
                    product_id: data.product_id,
                    proddetail_id: data.proddetail_id,
                    toping_id: data.toping_id,
                    shop_id: this.dataShop.id
                }
                let newPayload = [
                    ...this.dataItems,
                    payload
                ]
                this.dataItems = newPayload
            } else {
                let payload = []
                this.dataItems && this.dataItems.map((dt) => {
                    if (dt.cart_id !== data.cart_id) {
                        payload.push({...dt})
                    }
                })
                this.dataItems = payload
            }

            this.visibleDeleteButton = this.dataItems.length > 0 ? true : false  

            this.datas = this.datas && this.datas.map((dt) => {
                const stt = dt.cart_id === data.cart_id 
                            ? status 
                            : dt.disableButton 
                                ? true 
                                : false 
                return {...dt, disableButton: stt}
            })

            this.onTotal(this.dataItems)
        },
        makeOrder () {
            const data = this.dataItems
            // const newPayload = {
            //     ...payloadOrder,
            //     details: data
            // }

            this.setCart(data)
            this.$cookies.set('orderItem', JSON.stringify(data))
            this.$router.replace({ name: 'order' })

            this.makeToast('Order Saved to Draft')
        },
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
        onShowHideDelete (index = null) {
            this.visibleAlertDelete = !this.visibleAlertDelete
            this.selectedIndex = index
        },
        onSearchData (id) {
            let payload = null
            this.datas.map((dt) => {
                if (dt.id === id) {
                    payload = {...dt}
                }
                return null 
            })
            return payload
        },
        onMore () {
            this.getData(this.limit, this.offset)
        },
        removeDataList (id) {
            const data = this.datas
            let payload = []
            data && data.map((dt) => {
                if (dt.cart_id !== id) {
                    payload.push({...dt})
                }
            })
            this.datas = payload

            this.makeToast('Product removed from cart')
        },
        async removeData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const id = this.onSearchData(this.selectedIndex).cart_id
            const payload = {
                cart_id: id
            }

            // this.removeDataList(id)
            // this.visibleLoaderAction = false

            const rest = await axios.post('/api/cart/delete', payload, { headers: { Authorization: token } })
            if (rest && rest.status === 200) {
                this.onShowHideDelete()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.removeDataList(id)
                    this.getLocalCartCount()
                } else {
                    this.makeToast('Proceed failed')
                }
            } else {
                this.makeToast('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async onSave (data) {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = data
            const url = '/api/cart/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    // this.onRefresh()
                    this.makeToast('Product updated')
                } else {
                    this.selectedMessage = rest.data.message
                }
            } else {
                this.makeToast('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async getData (limit, offset) {
            if (this.selectedCustomer) {
                this.visibleLoader = true 

                const token = 'Bearer '.concat(this.$cookies.get('token'))
                const payload = {
                    limit: limit,
                    offset: offset,
                    owner_id: this.selectedCustomer.id
                }
                let carts = []

                if (offset > 0) {
                    carts = Object.assign([], this.datas)
                } else {
                    carts = []
                }

                const rest = await axios.post('/api/cart/getAll', payload, { headers: { Authorization: token } })

                if (rest && rest.status === 200) {
                    const data = rest.data.data

                    console.log('getData', data)
                    
                    data && data.map((dt) => {
                        return carts.push({
                            ...dt,
                            disableButton: false,
                            disableSelect: false
                        })
                    })

                    this.datas = carts
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
        },
        onRegister () {
            console.log('REGISTER')
        }
    },
}
</script>