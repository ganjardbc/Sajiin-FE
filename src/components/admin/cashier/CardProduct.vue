<template>
    <div 
        id="App" 
        class="card-dashboard-container" 
        style="padding-top: 10px; padding-bottom: 10px;">
        <div 
            class="card bg-white box-shadow" 
            :style="`
                margin: 0; 
                padding: 0; 
                width: 100%; 
                background-color: #fff;
            `">
            <div style="padding: 15px;">
                <div class="display-flex align-center" style="padding-bottom: 10px;">
                    <div style="width: 50px; margin-right: 10px;">
                        <div class="image image-padding">
                            <VueLoadImage v-if="data.images[0] && data.images[0].image">
                                <img slot="image" :src="productImageThumbnailUrl + data.images[0].image" alt="" class="post-center">
                                <div slot="preloader">
                                    <i class="post-middle-absolute fa fa-lg fa-spin fa-spinner" style="color: #999;"></i>
                                </div>
                            </VueLoadImage>
                            <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                        </div>
                    </div>
                    <div style="width: calc(100% - 60px);">
                        <div class="fonts fonts-11 semibold">{{ data.product.name }}</div>
                        <div v-if="data.details.length > 0" class="fonts fonts-10 grey">Rp. {{ data.details ? data.details[0].price : 0 }}</div>
                    </div>
                </div>

                <div style="height: 160px; overflow-y: auto;" class="change-scrollbar">
                    <div v-if="data.details.length > 0" style="margin-bottom: 5px;">
                        <div class="fonts fonts-9 normal">Details</div>
                        <div class="display-flex wrap" style="margin-top: 5px;">
                            <button 
                                v-for="(dt, i) in data.details" 
                                :key="i" 
                                :class="'card-capsule pointer no-height ' + (indexDetail === dt.id ? 'active' : 'normal')" 
                                style="margin-right: 5px; margin-bottom: 5px; padding-bottom: 4px; border-radius: 4px;"
                                :disabled="data.product.status === 'inactive'"
                                @click="selectDetail(dt.id)">
                                <div class="fonts fonts-9 semibold">{{ dt.name }}</div>
                                <div class="fonts fonts-8 grey">Rp. {{ dt.price ? dt.price : 0 }}</div>
                            </button>
                        </div>
                    </div>
                    <div v-if="data.topings.length > 0" style="margin-bottom: 10px;">
                        <div class="fonts fonts-9 normal">Topings</div>
                        <div class="display-flex wrap" style="margin-top: 5px;">
                            <button 
                                v-for="(dt, i) in data.topings" 
                                :key="i" 
                                :class="'card-capsule pointer no-height ' + (indexToping === dt.id ? 'active' : 'normal')" 
                                style="margin-right: 5px; margin-bottom: 5px; padding-bottom: 4px; border-radius: 4px;"
                                :disabled="data.product.status === 'inactive'"
                                @click="selectToping(dt.id)">
                                <div class="fonts fonts-9 semibold">{{ dt.name }}</div>
                                <div class="fonts fonts-8 grey">Rp. {{ dt.price ? dt.price : 0 }}</div>
                            </button>
                        </div>
                    </div>
                </div>

                <button 
                    :class="'btn btn-full btn-sekunder'" 
                    :style="`margin-bottom: 15px;`"
                    :disabled="!indexDetail || data.product.status === 'inactive'"
                    @click="addToCart(data)">
                    Add To Cart
                </button>
                <button 
                    :class="`btn btn-full ${data.product.status === 'active' ? 'btn-green' : 'btn-sekunder'}`" 
                    @click="onChangeStatus(data)">
                    {{ data.product.status === 'active' ? 'Inactive' : 'Active' }}
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import VueLoadImage from 'vue-load-image'

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
    name: 'App',
    data () {
        return {
            visiblePopup: false,
            visibleButton: false,
            indexDetail: null,
            indexToping: null,
            selectedDetail: null,
            selectedToping: null,
            dataShop: null 
        }
    },
    mounted () {
        this.dataShop = this.$cookies.get('shop')
    },
    components: {
        VueLoadImage,
    },
    props: {
        data: {
            required: true
        },
        onCheckOut: {
            type: Function,
            required: false
        },
        onChangeStatus: {
            type: Function,
            required: false
        }
    },
    methods: {
        ...mapActions({
            setToast: 'toast/setToast',
        }),
        makeToast (title) {
            const payload = {
                visible: true,
                title: title
            }
            this.setToast(payload)
        },
        selectToping (id) {
            if (id === this.indexToping) {
                this.indexToping = null 
                this.selectedToping = null 
            } else {
                this.indexToping = id
                this.data.topings.map((dt) => {
                    if (dt.id === id) {
                        this.selectedToping = {...dt}
                    }
                })
            }
        },
        selectDetail (id) {
            if (id === this.indexDetail) {
                this.indexDetail = null 
                this.selectedDetail = null 
            } else {
                this.indexDetail = id 
                this.data.details.map((dt) => {
                    if (dt.id === id) {
                        this.selectedDetail = {...dt}
                    }
                })
            }
        },
        openDetail () {
            this.visiblePopup = !this.visiblePopup
        },
        addToCart (data) {
            const toping = this.selectedToping
            const detail = this.selectedDetail
            const price = detail ? detail.price : 0
            const topingPrice = toping ? toping.price : 0
            const qty = 1
            const payload = {
                ...payloadItem,
                toping_price: topingPrice,
                price: price,
                quantity: qty,
                subtotal: qty * (price + topingPrice),
                product_image: data && data.images.length > 0 ? data.images[0].image : '',
                product_name: data && data.product.name,
                product_detail: detail && detail.name,
                product_toping: toping && toping.name,
                promo_code: null,
                order_id: 0,
                product_id: data && data.product.id,
                proddetail_id: detail && detail.id,
                toping_id: toping && toping.id,
                shop_id: this.dataShop.id
            }
            this.indexDetail = null 
            this.selectedDetail = null
            this.indexToping = null 
            this.selectedToping = null 
            this.onCheckOut(payload)
            this.makeToast('Product added to cart')
        }
    }
}
</script>