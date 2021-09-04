<template>
    <div id="App">
        <div class="card-check-out no-padding">
            <div class="check-out-body">
                <div v-if="datas.length > 0">
                    <div v-for="(dt, i) in datas" :key="i" class="card bg-white border-full" style="margin-bottom: 15px;">
                        <div class="display-flex">
                            <div style="width: 60px; margin-right: 10px;">
                                <div class="image image-padding">
                                    <img 
                                        :src="productImageThumbnailUrl + dt.product_image" 
                                        alt=""
                                        class="post-center" 
                                        style="width: 100%;">
                                </div>
                            </div>
                            <div style="width: calc(100% - 70px);">
                                <div class="width width-100">
                                    <div class="fonts fonts-10 semibold black" style="margin-bottom: 3px;">
                                        {{ dt.product_name }}
                                    </div>
                                    <div class="display-flex">
                                        <div class="fonts fonts-9 black">{{ dt.quantity }} {{ dt.product_detail }} x Rp. {{ dt.price }}</div>
                                    </div>
                                    <div v-if="dt.toping_id" class="display-flex">
                                        <div class="fonts fonts-9 black">{{ dt.quantity }} {{ dt.product_toping }} x Rp. {{ dt.toping_price }}</div>
                                    </div>
                                    <div class="fonts fonts-10 semibold black" style="margin-top: 3px;">Rp. {{ dt.subtotal }}</div>
                                </div>
                            </div>
                            <div style="position: absolute; top: 0; right: 0;">
                                
                            </div>
                        </div>
                        <div class="display-flex space-between margin margin-top-10-px">
                            <button 
                                :class="dt.disableButton ? 'btn btn-icon btn-grey' : 'btn btn-icon btn-white'" 
                                style="margin-right: 10px;" 
                                @click="!dt.disableButton && onDelete(i)">
                                <i class="far fa-lg fa-trash-alt"></i>
                            </button>

                            <AddQtyField 
                                :maximumValue="'10'" 
                                :value="dt.quantity" 
                                :id="i" 
                                :onChange="(data) => onTotal(data, i)" 
                                :disable="dt.disableButton"
                                style="width: 120px;" />
                        </div>
                    </div>
                </div>
                <div v-else>
                    <AppEmpty />
                </div>
            </div>

            <div class="check-out-footer display-flex column space-between">
                <div>
                    <div class="display-flex space-between" style="margin-bottom: 3px;">
                        <div class="fonts fonts-10 grey">Subtotal</div>
                        <div class="fonts fonts-10 semibold orange">Rp. {{ subTotal }}</div>
                    </div>
                    <div class="display-flex space-between" style="margin-bottom: 3px;">
                        <div class="fonts fonts-10 grey">Quantity</div>
                        <div class="fonts fonts-10 semibold">{{ quantity }} products</div>
                    </div>
                </div>
                <div class="display-flex">
                    <button v-if="datas.length > 0" class="btn btn-full btn-main" @click="onButtonSave">Check Out</button>
                    <button v-else class="btn btn-full btn-primary" style="cursor: not-allowed;">Check Out</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import AddQtyField from '../../modules/AddQtyField'
import AppEmpty from '../../modules/AppEmpty'

export default {
    name: 'App',
    data () {
        return {
            datas: [],
            subTotal: 0,
            quantity: 0
        }
    },
    mounted () {
        this.datas = this.data ? this.data : [] 
        let subTotal = 0
        let quantity = 0
        this.datas && this.datas.map((dt) => {
            subTotal += dt.subtotal
            quantity += dt.quantity
        })
        this.subTotal = subTotal
        this.quantity = quantity
    },
    computed: {
        ...mapGetters({
            cartItems: 'cart/data'
        })
    },
    components: {
        AddQtyField,
        AppEmpty
    },
    props: {
        onClickClose: {
            type: Function,
            required: false
        },
        onSave: {
            type: Function,
            required: false
        },
        onDelete: {
            type: Function,
            required: false
        },
        onCheckOut: {
            type: Function,
            required: false
        },
        data: {
            required: false 
        }
    },
    methods: {
        onTotal (data, index) {
            let qty = data
            let price = this.datas[index].price
            let tpPrice = this.datas[index].toping_price
            let ttl = (tpPrice + price) * qty
            let subTotal = 0
            let payload = this.datas && this.datas.map((dt, idx) => {
                subTotal += ttl
                return {
                    ...dt,
                    quantity: (idx === index) ? qty : dt.quantity, 
                    subtotal: (idx === index) ? ttl : dt.subtotal
                }
            })
            this.datas = payload
            this.quantity = qty 
            this.subTotal = subTotal
            this.onSave(this.datas)
        },
        onButtonSave () {
            this.onCheckOut(this.datas)
        }
    },
    watch: {
        data (props) {
            if (props) {
                this.datas = props 
                let subTotal = 0
                let quantity = 0
                this.datas && this.datas.map((dt) => {
                    subTotal += dt.subtotal
                    quantity += dt.quantity
                })
                this.subTotal = subTotal
                this.quantity = quantity
            } else {
                this.datas = null 
            }
        }
    }
}
</script>