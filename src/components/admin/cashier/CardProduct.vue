<template>
    <div id="App" style="padding: 10px;">
        <div class="card bg-white box-shadow" style="margin: 0; padding: 0; width: 100%;">
            <div style="padding: 15px;">
                <div style="width: 100%;">
                    <div class="image image-padding border border-full" style="cursor: pointer;" @click="openDetail">
                        <img v-if="data.images[0] && data.images[0].image" :src="productImageThumbnailUrl + data.images[0].image" alt="" class="post-center">
                        <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                    </div>
                </div>
                <div style="width: 100%; text-align: center; padding-top: 15px; padding-bottom: 15px;">
                    <div class="fonts fonts-10 semibold" style="margin-bottom: 3px;">{{ data.product.name }}</div>
                    <div v-if="data.details.length > 0" class="fonts fonts-10 grey">Rp. {{ data.details ? data.details[0].price : 0 }}</div>
                </div>
                <button class="btn btn-full btn-sekunder" style="margin-bottom: 5px;" @click="openDetail">
                    Choose Product
                </button>
            </div>
            <div v-if="visiblePopup" class="card-full">
                <div class="card-info bg-white border-top">
                    <div class="display-flex space-between" style="margin-bottom: 5px;">
                        <div class="fonts fonts-10 semibold" style="margin-top: 4px;">Choose</div>
                        <button class="btn btn-small-icon btn-white" @click="openDetail">
                            <i class="fa fa-lg fa-times"></i>
                        </button>
                    </div>
                    <div class="card-info-content">
                        <div v-if="data.details.length > 0" style="margin-bottom: 5px;">
                            <div class="fonts fonts-9 normal">Details</div>
                            <div class="display-flex wrap" style="margin-top: 5px;">
                                <div 
                                    v-for="(dt, i) in data.details" 
                                    :key="i" 
                                    :class="'card-capsule pointer no-height ' + (indexDetail === dt.id ? 'active' : 'normal')" 
                                    @click="selectDetail(dt.id)"
                                    style="margin-right: 5px; margin-bottom: 5px; padding-bottom: 4px; border-radius: 4px;">
                                    <div class="fonts fonts-9 semibold">{{ dt.name }}</div>
                                    <div class="fonts fonts-8 grey">Rp. {{ dt.price ? dt.price : 0 }}</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="data.topings.length > 0" style="margin-bottom: 10px;">
                            <div class="fonts fonts-9 normal">Topings</div>
                            <div class="display-flex wrap" style="margin-top: 5px;">
                                <div 
                                    v-for="(dt, i) in data.topings" 
                                    :key="i" 
                                    :class="'card-capsule pointer no-height ' + (indexToping === dt.id ? 'active' : 'normal')" 
                                    @click="selectToping(dt.id)"
                                    style="margin-right: 5px; margin-bottom: 5px; padding-bottom: 4px; border-radius: 4px;">
                                    <div class="fonts fonts-9 semibold">{{ dt.name }}</div>
                                    <div class="fonts fonts-8 grey">Rp. {{ dt.price ? dt.price : 0 }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button 
                        v-if="indexDetail"
                        :class="'btn btn-full btn-main'" 
                        @click="addCheckOut(data)">
                        Add To Cart
                    </button>
                    <button 
                        v-else
                        :class="'btn btn-full btn-primary'" 
                        :disabled="true">
                        Add To Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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
            selectedToping: null 
        }
    },
    mounted () {
        
    },
    props: {
        data: {
            required: true
        },
        onCheckOut: {
            type: Function,
            required: false
        }
    },
    methods: {
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
        addCheckOut (data) {
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
                toping_id: toping && toping.id 
            }
            this.indexDetail = null 
            this.selectedDetail = null
            this.indexToping = null 
            this.selectedToping = null 
            this.openDetail()
            this.onCheckOut(payload)
        }
    }
}
</script>