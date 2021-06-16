<template>
    <div id="AppImageProduct">
        <div v-for="(detail, j) in data.slice(from ? from : 0, to ? to : data.length)" :key="j" class="display-flex" style="padding-top: 10px; padding-bottom: 10px;">
            <div style="width: 75px; margin-right: 15px;">
                <router-link :to="{name: 'product', params: {id: detail.prod_id}}">
                    <div class="image image-padding">
                        <img :src="productImageThumbnailUrl + detail.product_image" alt="" class="post-center">
                    </div>
                </router-link>
            </div>
            <div style="width: calc(100% - 90px);">
                <router-link :to="{name: 'product', params: {id: detail.prod_id}}" class="fonts fonts-11 semibold" style="margin-bottom: 5px;">
                    {{ detail.product_name }}
                </router-link>
                <div class="fonts fonts-9 grey">
                    {{ detail.quantity }} {{ detail.product_detail }} x Rp {{ detail.price }}
                </div>
                <div v-if="detail.product_toping" class="fonts fonts-9 grey">
                    {{ detail.quantity }} {{ detail.product_toping }} x Rp. {{ detail.toping_price }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AppDote from './AppDote'

export default {
    name: 'AppImageProduct',
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
            if (props) {
                this.datas = props
            } else {
                this.datas = []
            }
        }
    }
}
</script>