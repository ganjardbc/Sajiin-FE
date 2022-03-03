<template>
    <div id="cart" class="main-screen">
        <AppMobileLayout :title="'Carts'">
            <div class="width width-100">
                <div style="width: 100%; margin-bottom: 100px;">
                    <div v-if="cartList && cartList.length > 0">
                        <div class="display-flex space-between border-bottom" style="padding-bottom: 5px; margin-bottom: 10px;">
                            <div class="display-flex" style="padding-top: 6px;">
                                <div style="margin-right: 10px;">
                                    <AppButtonChecklist :onChange="(status) => onChangeAll(status)" />
                                </div>
                                <div class="fonts fonts-11 black" style="padding-top: 2px;">Choose all</div>
                            </div>
                            <div style="height: 40px;"></div>
                        </div>
                        <AppCardCharts 
                            :data.sync="cartList" 
                            :onSave="(data) => onSave(data)" 
                            :onDelete="(data) => onShowHideDelete(data)" 
                            :onChange="(status, data) => onChangeList(status, data)"
                        />
                    </div>
                    <div v-else>
                        <AppEmpty />
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
        </AppMobileLayout>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AppMobileLayout from '../../modules/AppMobileLayout'
import AppCardCharts from '../../modules/AppCardChartsVisitor'
import AppEmpty from '../../modules/AppEmpty'
import AppShowHide from '../../modules/AppShowHide'
import AppButtonChecklist from '../../modules/AppButtonChecklist'

export default {
    data() {
        return {
            ppn: 0,
            totalPrice: 0,
            subtotalPrice: 0,
            totalProduct: 0,
            totalPPN: 0,
            dataShop: null,
            // cartList: [],
            datas: [],
            dataItems: [],
            visibleButton: false,
            limitOrders: 4,
        }
    },
    mounted() {
        this.dataShop = this.$session.get('visitorShop')
        this.setCartList(this.$session.get('cartList'))
    },
    components: {
        AppMobileLayout,
        AppCardCharts,
        AppEmpty,
        AppShowHide,
        AppButtonChecklist
    },
    computed: {
        ...mapGetters({
            cart: 'cart/cart',
            carts: 'cart/cartList',
            order: 'order/order',
            orderList: 'order/orderList'
        }),
        cartList() {
            // console.log('cartList', this.$session.get('cartList'))
            // return this.$session.get('cartList')
            return this.carts 
        }
    },
    methods: {
        ...mapActions({
            replaceCartList: 'cart/replaceCartList',
            setOrder: 'order/setOrder',
            setOrderList: 'order/setOrderList',
        }),
        setCartList(data) {
            this.$session.set('cartList', data)
            this.replaceCartList(data)
        },
        onTotal(data) {
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
        onChangeAll(status) {
            let newPayload = []
            let prevPayload = this.cartList && this.cartList.map((dt, i) => {
                let stt = status   
                if (status) {
                    const payload = {
                        ...this.cart,
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
                return {...dt, disableButton: stt}
            })
            this.dataItems = newPayload
            this.visibleDeleteButton = status
            this.setCartList(prevPayload)
            this.onTotal(this.dataItems)
        },
        onSave(data) {
            const prevPayload = this.cartList && this.cartList.map((dt) => {
                const qty = dt.cart_id === data.cart_id ? data.quantity : dt.quantity
                const totalPrice = dt.cart_id === data.cart_id ? (data.price * data.quantity) : dt.subtotal
                return {
                    ...dt,
                    quantity: qty,
                    subtotal: totalPrice,
                }
            })
            this.setCartList(prevPayload)
        },
        onShowHideDelete(data) {
            let payload = []
            this.cartList && this.cartList.map((dt) => {
                if (dt.cart_id !== data) {
                    payload.push({...dt})
                }
            })
            this.dataItems = payload
            this.setCartList(payload)
        },
        onChangeList (status, data) {
            if (status) {
                const payload = {
                    ...this.cart,
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
                this.dataItems.push(payload)
            } else {
                let payload = []
                this.dataItems && this.dataItems.map((dt) => {
                    if (dt.cart_id !== data.cart_id) {
                        payload.push({...dt})
                    }
                })
                this.dataItems = payload
            }

            this.visibleDeleteButton = this.dataItems && this.dataItems.length > 0 ? true : false  

            let prevPayload = this.cartList && this.cartList.map((dt) => {
                const stt = dt.cart_id === data.cart_id 
                            ? status 
                            : dt.disableButton 
                                ? true 
                                : false 
                return {...dt, disableButton: stt}
            })

            this.setCartList(prevPayload)
            this.onTotal(this.dataItems)
        },
        makeOrder() {
            this.setOrderList(this.dataItems)
            this.$session.set('orderItem', JSON.stringify(this.dataItems))
            this.$router.push({ name: 'visitor-create-order' })
        }
    }
}
</script>