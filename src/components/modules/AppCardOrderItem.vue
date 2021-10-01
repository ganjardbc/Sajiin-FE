<template>
    <div id="AppCardOrderItem">
        <div 
            v-for="(detail, j) in data.slice(from ? from : 0, to ? to : data.length)" 
            :key="j" 
            class="display-flex" 
            style="padding-top: 10px; padding-bottom: 10px;">
            <div style="width: 80px; margin-right: 15px;">
                <div class="image image-padding">
                    <img :src="productImageThumbnailUrl + detail.product_image" alt="" class="post-center">
                </div>
            </div>
            <div style="width: calc(100% - 95px);">
                <div class="display-flex space-between" style="margin-bottom: 5px;">
                    <div class="fonts fonts-11 semibold">
                        {{ detail.product_name }}
                    </div>
                    <div class="fonts fonts-11 semibold orange">
                        Rp. {{ detail.subtotal }}
                    </div>
                </div>
                <div class="fonts fonts-10 grey">
                    {{ detail.quantity }} {{ detail.product_detail }} x Rp {{ detail.price }}
                </div>
                <div v-if="detail.product_toping" class="fonts fonts-10 grey">
                    {{ detail.quantity }} {{ detail.product_toping }} x Rp {{ detail.toping_price }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AppDote from './AppDote'

export default {
    name: 'AppCardOrderItem',
    data () {
        return {
            datas: []
        }
    },
    mounted () {
        this.datas = this.data ? this.data : []
    },
    components: {
        AppDote
    },
    props: {
        from: {
            required: false
        },
        to: {
            required: false
        },
        data: {
            required: true 
        }
    },
    watch: {
        data (props) {
            console.log('appcardorderitem', props)
            if (props) {
                this.datas = props
            } else {
                this.datas = []
            }
        }
    }
}
</script>