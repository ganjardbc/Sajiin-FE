<template>
    <div id="product" class="main-screen">
        <AppMobileLayout :title="'Products'">
            <div style="padding-top: 0;">
                <AppLoader v-if="visibleLoader" style="padding-top: 40px;" />
                <div v-if="!visibleLoader" class="width width-100" style="padding-top: 10px;">
                    <div class="width width-100">
                        <div style="width: 100%; margin-bottom: 20px;">
                            <div style="padding: 0;">
                                <div class="image image-padding" style="background-color: #000;">
                                    <img alt="" :src="images && images[imageSelected] && images[imageSelected].cover" />
                                </div>
                            </div>
                            <div class="display-flex" style="margin-top: 5px;">
                                <div v-for="(dt, index) in images" :key="index" style="width: calc(100% / 6);">
                                    <div style="padding-top: 10px;">
                                        <div :class="index === imageSelected ? 'image image-padding image-selected' : 'image image-padding'" style="background-color: #000; cursor: pointer;" @click="changeImage(index)">
                                            <img alt="" :src="dt.thumbnail" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="width width-100">
                        <div style="width: 100%;">
                            <div class="display-flex space-between">
                                <div>
                                    <h2 class="fonts fonts-14 semibold black">{{ product && product.name }}</h2>
                                    <h2 class="fonts fonts-14 semibold main">Rp. {{ details[detailSelected] ? details[detailSelected].price : 0 }}</h2>
                                    <div class="display-flex" style="margin-top: 10px;">
                                        <div :class="product && product.is_available ? 'card-capsule active' : 'card-capsule'" style="margin-top: 4px; margin-right: 10px;">
                                            {{ product && product.is_available ? 'Available' : 'Unavailable' }}
                                        </div>
                                        <AppLikeButton :productID.sync="product.id" />
                                    </div>
                                </div>
                            </div>

                            <div style="padding-top: 15px; padding-bottom: 15px;">
                                <div class="fonts fonts-10 semibold black" style="margin-bottom: 5px;">Description</div>
                                <div class="fonts fonts-10 grey" style="margin-bottom: 15px;">{{ product && product.description }}</div>
                                <div class="display-flex">
                                    <router-link :to="{name: 'product-list'}">
                                        <button class="btn btn-small btn-primary">
                                            {{ product && product.ctr_name }}
                                        </button>
                                    </router-link>
                                </div>
                            </div>

                            <div v-if="details && details.length > 0 ? true : false" style="padding-top: 0; padding-bottom: 5px;">
                                <div class="fonts fonts-10 semibold black" style="margin-bottom: 5px;">Details</div>
                                <ul class="menu-capsule">
                                    <li v-for="(dt, index) in details" :key="index" :class="dt.is_available ? detailSelected === index ? 'enable' : '' : 'disable'" @click="changeDetail(index)">
                                        <div class="row">
                                            <div style="width: 25px;">
                                                <i class="icn fa fa-1x fa-utensils" />
                                            </div>
                                            <div>
                                                <div class="ttl">{{ dt.name }}</div>
                                                <div class="val">Rp. {{ dt.price }}</div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div v-if="topings && topings.length > 0 ? true : false" style="padding-top: 0; padding-bottom: 5px;">
                                <div class="fonts fonts-10 semibold black" style="margin-bottom: 5px;">Topings</div>
                                <ul class="menu-capsule">
                                    <li v-for="(dt, index) in topings" :key="index" :class="topingSelected === index ? 'enable' : ''" @click="changeToping(index)">
                                        <div class="row">
                                            <div style="width: 25px;">
                                                <i class="icn fa fa-1x fa-info-circle" />
                                            </div>
                                            <div>
                                                <div class="ttl">{{ dt.name }}</div>
                                                <div class="val">Rp. {{ dt.price }}</div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <!-- <div class="display-flexs space-between" style="padding-top: 0; padding-bottom: 15px;">
                                <AppShowHide :title="'Shipments (' + (shipment.length) + ')'" :disableSpaceBetween="true" style="padding-bottom: 10px;">
                                    <div class="display-flex" style="padding-bottom: 15px;" v-for="(dt, index) in shipment" :key="index">
                                        <div style="width: 45px; margin-right: 15px">
                                            <div class="image image-padding" style="background-color: rgba(0, 0, 0, 0);">
                                                <img alt="" :src="dt.thumbnail" />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="post-top">
                                                <div class="fonts fonts-10 semibold black">
                                                    {{ dt.name }} <i :class="dt.status === 'active' ? 'fa fa-1x fa-check-circle' : 'fa fa-1x fa-times-circle'" :style="dt.status === 'active' ? 'color: #38c172;' : 'color: #999;'" />
                                                </div>
                                                <div class="fonts fonts-10 grey">{{ dt.description }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </AppShowHide>
                                <AppShowHide :title="'Payments (' + (payment.length) + ')'" :disableSpaceBetween="true">
                                    <div class="display-flex" style="padding-bottom: 15px;" v-for="(dt, index) in payment" :key="index">
                                        <div style="width: 45px; margin-right: 15px">
                                            <div class="image image-padding" style="background-color: rgba(0, 0, 0, 0);">
                                                <img alt="" :src="dt.thumbnail" />
                                            </div>
                                        </div>
                                        <div>
                                            <div class="post-top">
                                                <div class="fonts fonts-10 semibold black">
                                                    {{ dt.name }} <i :class="dt.status === 'active' ? 'fa fa-1x fa-check-circle' : 'fa fa-1x fa-times-circle'" :style="dt.status === 'active' ? 'color: #38c172;' : 'color: #999;'" />
                                                </div>
                                                <div class="fonts fonts-10 grey">{{ dt.description }}</div>
                                            </div>
                                        </div>
                                    </div>
                                </AppShowHide>
                            </div> -->
                        </div>
                    </div>

                    <div>
                        <div class="fonts fonts-10 semibold black" style="margin-bottom: 5px;">Add to Chart</div>
                        <div class="left">
                            <div style="padding-bottom: 10px;">
                                <div class="fonts fonts-10 grey" style="padding-bottom: 5px;">Quantity</div>
                                <div>
                                    <AddQtyField :maximumValue="'10'" :onChange="(data) => this.changeQty(data)" />
                                </div>
                            </div>
                            <div class="display-flex space-between" style="padding-bottom: 10px;">
                                <div class="fonts fonts-10 grey">Product</div>
                                <div class="fonts fonts-10 black semibold">Rp. {{ details[detailSelected] ? details[detailSelected].price : 0 }}</div>
                            </div>
                            <div class="display-flex space-between border-bottom" style="padding-bottom: 10px;">
                                <div class="fonts fonts-10 grey">Toping</div>
                                <div class="fonts fonts-10 black semibold">Rp. {{ topings[topingSelected] ? topings[topingSelected].price : 0 }}</div>
                            </div>
                            <div class="display-flex space-between" style="padding-top: 10px; padding-bottom: 10px;">
                                <div class="fonts fonts-10 grey">Subtotal</div>
                                <div class="fonts fonts-10 black semibold">Rp. {{ subtotalSelected }}</div>
                            </div>
                        </div>

                        <div class="right">
                            <div v-if="customer ? true : true">
                                <button 
                                    v-if="!visibleLoaderAction" 
                                    :class="!visibleButton ? 'btn btn-primary btn-full' : 'btn btn-main btn-full'" 
                                    @click="addToCart">
                                    Add to Chart
                                </button>
                                <button v-else class="btn btn-primary btn-full">
                                    Please Wait..
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style="padding-bottom: 65px;"></div>

                    <!-- <div class="width width-100">
                        <div class="width width-100 width-mobile">
                            <div class="component-mobile">
                                <div class="component-mobile-content">
                                    <AppShowHide :title="'Rp. ' + subtotalSelected" style="margin-bottom: 10px;">
                                        <div class="left">
                                            <div style="padding-bottom: 10px;">
                                                <div class="fonts fonts-10 grey" style="padding-bottom: 5px;">Quantity</div>
                                                <div>
                                                    <AddQtyField :maximumValue="'10'" :onChange="(data) => this.changeQty(data)" />
                                                </div>
                                            </div>
                                            <div class="display-flex space-between" style="padding-bottom: 10px;">
                                                <div class="fonts fonts-10 grey">Product</div>
                                                <div class="fonts fonts-10 black semibold">Rp. {{ details[detailSelected] ? details[detailSelected].price : 0 }}</div>
                                            </div>
                                            <div class="display-flex space-between border-bottom" style="padding-bottom: 10px;">
                                                <div class="fonts fonts-10 grey">Toping</div>
                                                <div class="fonts fonts-10 black semibold">Rp. {{ topings[topingSelected] ? topings[topingSelected].price : 0 }}</div>
                                            </div>
                                            <div class="display-flex space-between" style="padding-top: 10px; padding-bottom: 10px;">
                                                <div class="fonts fonts-10 grey">Subtotal</div>
                                                <div class="fonts fonts-10 black semibold">Rp. {{ subtotalSelected }}</div>
                                            </div>
                                        </div>
                                    </AppShowHide>
                                    <div class="right">
                                        <div v-if="customer ? true : true">
                                            <button 
                                                v-if="!visibleLoaderAction" 
                                                :class="!visibleButton ? 'btn btn-primary btn-full' : 'btn btn-main btn-full'" 
                                                @click="addToCart">
                                                Add to Chart
                                            </button>
                                            <button v-else class="btn btn-primary btn-full">
                                                Please Wait..
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->

                </div>
            </div>
        </AppMobileLayout>

        <AppCardSmallCart />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import axios from 'axios'
import AppWrapper from '../../modules/AppWrapper'
import AppButton from '../../modules/AppButton'
import AppText from '../../modules/AppText'
import AppLoader from '../../modules/AppLoader'
import AddQtyField from '../../modules/AddQtyField'
import AppLikeButton from '../../modules/AppLikeButton'
import AppShowHide from '../../modules/AppShowHide'
import AppMobileLayout from '../../modules/AppMobileLayout'
import AppCardSmallCart from '../../modules/AppCardSmallCart'

const cartPayload = {
    id: '',
    cart_id: '',
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
    owner_id: null,
    product_id: null,
    proddetail_id: null,
    toping_id: null,
}

export default {
    name: 'product',
    data () {
        return {
            selectedMessage: null,
            visibleButton: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            rawData: null,
            product: null,
            details: null,
            topings: null,
            images: null,
            subtotalSelected: 0,
            quantitySelected: 0,
            imageSelected: 0,
            detailSelected: null,
            topingSelected: null,
            payment: null,
            shipment: null,
            selectedCustomer: null,
            selectedTable: null 
        }
    },
    components: {
        AppCardSmallCart,
        AppMobileLayout,
        AppShowHide,
        AppLikeButton,
        AddQtyField,
        AppWrapper,
        AppButton,
        AppText,
        AppLoader
    },
    mounted () {
        this.selectedCustomer = this.$cookies.get('customer')
        this.selectedTable = this.$cookies.get('table')
        this.getProduct()
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
            customer: 'customer/data',
            table: 'table/selected',
            status: 'wishelist/status'
        })
    },
    methods: {
        ...mapActions({
            setToast: 'toast/setToast',
            getCount: 'cart/getCountCustomer'
        }),
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
        changeQty (data) {
            this.quantitySelected = data
            this.onTotal()
        },
        changeImage (id) {
            this.imageSelected = id
        },
        changeDetail (id) {
            this.detailSelected = id
            this.onTotal()
        },
        changeToping (id) {
            if (id === this.topingSelected) {
                this.topingSelected = null 
                this.onTotal()
            } else {
                this.topingSelected = id
                this.onTotal()
            }
        },
        onTotal () {
            let topingPrice = this.topings[this.topingSelected] ? this.topings[this.topingSelected].price : 0
            let price = this.details[this.detailSelected] ? this.details[this.detailSelected].price : 0
            let ttl = (price + topingPrice) * this.quantitySelected
            this.subtotalSelected = ttl

            if (this.subtotalSelected > 0) {
                this.visibleButton = true
            } else {
                this.visibleButton = false 
            }
        },
        addToCart () {
            if (this.selectedCustomer) {
                const time = new Date().getTime()
                let topingPrice = this.topings[this.topingSelected] ? this.topings[this.topingSelected].price : 0
                let detailPrice = this.details[this.detailSelected] ? this.details[this.detailSelected].price : 0

                let topingName = this.topings[this.topingSelected] ? this.topings[this.topingSelected].name : ''
                let detailName = this.details[this.detailSelected] ? this.details[this.detailSelected].name : ''

                let topingID = this.topings[this.topingSelected] ? this.topings[this.topingSelected].id : ''
                let detailID = this.details[this.detailSelected] ? this.details[this.detailSelected].id : ''

                let payload = {
                    ...cartPayload,
                    cart_id: 'CR-' + time,
                    owner_id: this.selectedCustomer.id,
                    product_image: this.rawData.images[0].image,
                    product_name: this.product.name,
                    product_detail: detailName,
                    product_toping: topingName,
                    price: detailPrice,
                    toping_price: topingPrice,
                    quantity: this.quantitySelected,
                    subtotal: this.subtotalSelected,
                    product_id: this.product.id,
                    proddetail_id: detailID,
                    toping_id: topingID
                }

                console.log('payload', payload)

                if (this.visibleButton) this.saveData(payload)
            } else {
                this.makeToast('You have to login as customer')
            }
        },
        async saveData (payload) {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const url = '/api/cart/post'

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.makeToast('Product added to cart')
                    this.getLocalCartCount()
                } else {
                    this.selectedMessage = rest.data.message
                }
            } else {
                this.makeToast('Proceed failed')
                this.visibleLoaderAction = false
            }

            console.log('rest', rest)
        },
        async getProduct () {
            this.visibleLoader = true

            const id = this.$route.params.id
            const payload = {
                product_id: id
            }

            const rest = await axios.post('/api/public/productByID', payload)

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.rawData = data
                this.product = data.product
                this.topings = data && data.topings
                this.details = data && data.details
                this.detailSelected = 0
                this.imageSelected = 0
                this.images = data.images && data.images.map((dt) => {
                    return {
                        ...dt,
                        cover: this.productImageCoverUrl + dt.image,
                        thumbnail: this.productImageThumbnailUrl + dt.image
                    }
                })
                this.payment = data && data.payment && data.payment.map((dt) => {
                    return {
                        ...dt,
                        thumbnail: this.paymentImageThumbnailUrl + dt.image
                    }
                })
                this.shipment = data && data.shipment && data.shipment.map((dt) => {
                    return {
                        ...dt,
                        thumbnail: this.shipmentImageThumbnaiUrl + dt.image
                    }
                })
                this.visibleLoader = false
            } else {
                this.visibleLoader = false
            }
        }
    },
}
</script>