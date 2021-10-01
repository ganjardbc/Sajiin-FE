<template>
    <div id="AppCardCharts">
        <div v-for="(dt, index) in datas" :key="index" class="display-flex border-bottom" style="padding-top: 10px; padding-bottom: 10px;">
            <div style="margin-right: 10px;">
                <AppButtonChecklist 
                    :disabled="dt.disableSelect"
                    :checked="dt.disableButton"
                    :onChange="(status) => onChangeList(status, dt)" 
                />
            </div>
            <div style="width: calc(100% - 45px); position: relative;">
                <div class="display-flex">
                    <div style="width: 60px; margin-right: 10px;">
                        <router-link :to="{name: 'product', params: {id: dt.prod_id}}">
                            <div class="image image-padding" style="background-color: #000;">
                                <img 
                                    :src="productImageThumbnailUrl + dt.product_image" 
                                    alt=""
                                    class="post-center" 
                                    style="width: 100%;">
                            </div>
                        </router-link>
                    </div>
                    <div style="width: calc(100% - 70px);">
                        <div class="width width-100">
                            <router-link :to="{name: 'product', params: {id: dt.prod_id}}" class="fonts fonts-11 semibold black" style="margin-bottom: 5px;">
                                {{ dt.product_name }}
                            </router-link>
                            <div class="display-flex">
                                <div class="fonts fonts-9 black">{{ dt.product_detail }} (Rp. {{ dt.price }})</div>
                            </div>
                            <div v-if="dt.toping_id" class="display-flex">
                                <div class="fonts fonts-9 black">{{ dt.product_toping }} (Rp. {{ dt.toping_price }})</div>
                            </div>
                            <div class="fonts fonts-10 semibold black" style="margin-top: 5px;">Rp. {{ dt.subtotal }}</div>
                        </div>
                    </div>
                    <div style="position: absolute; top: 0; right: 0;">
                        
                    </div>
                </div>
                <div class="display-flex space-between margin margin-top-15-px">
                    <div style="padding-top: 5px;">
                        <div 
                            :class="'card-capsule ' + (dt.available === 'available' ? 'active' : '')" 
                            style="display: inline-block; margin-left: 0; text-transform: capitalize;">
                            {{ dt.available }}
                        </div>
                    </div>
                    <div class="display-flex">
                        <!-- <AppLikeButton :productID.sync="dt.product_id" :isBigButton="true" /> -->
                        <button 
                            :class="dt.disableButton ? 'btn btn-icon btn-grey' : 'btn btn-icon btn-white'" 
                            style="margin-right: 10px;" 
                            @click="!dt.disableButton && onDelete(dt.id)">
                            <i class="far fa-lg fa-trash-alt"></i>
                        </button>
                        <AddQtyField 
                            :maximumValue="'10'" 
                            :value="dt.quantity" 
                            :id="dt.id" 
                            :onChange="(data) => onTotal(data, index)" 
                            :disable="dt.disableButton"
                            style="width: 120px;" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppWrapper from './AppWrapper'
import AppButton from './AppButton'
import AppText from './AppText'
import AppButtonChecklist from './AppButtonChecklist'
import AddQtyField from './AddQtyField'
import AppLikeButton from './AppLikeButton'

export default {
    name: 'AppCardCharts',
    data () {
        return {
            icon: '',
            datas: this.data,
        }
    },
    mounted() {
        this.datas = this.data && this.data.map((dt) => {
            return {
                ...dt,
                available: 'available'
            }
        })
    },
    components: {
        AppLikeButton,
        AppWrapper,
        AppButton,
        AppText,
        AddQtyField,
        AppButtonChecklist
    },
    props: {
        data: {
            required: true
        },
        onSave: {
            type: Function,
            required: false
        },
        onDelete: {
            type: Function,
            required: false
        },
        onChange: {
            type: Function,
            required: false
        }
    },
    methods: {
        onChangeList: function (status, data) {
            this.onChange(status, data)
        },
        onTotal: function (data, index) {
            let qty = data
            let price = this.datas[index].price
            let tpPrice = this.datas[index].toping_price
            let ttl = (tpPrice + price) * qty
            let payload = this.datas && this.datas.map((dt, idx) => {
                return {
                    ...dt,
                    quantity: (idx === index) ? qty : dt.quantity, 
                    subtotal: (idx === index) ? ttl : dt.subtotal
                }
            })
            this.datas = payload
            this.onSave(this.datas[index])
        }
    },
    watch: {
        data (props) {
            if (props) {
                this.datas = props && props.map((dt) => {
                    return {
                        ...dt,
                        available: 'available'
                    }
                })
            }
        }
    }
}
</script>