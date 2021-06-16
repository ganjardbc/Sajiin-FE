<template>
    <div id="CardProfileProduct">
        <div v-for="(detail, j) in data.slice(from ? from : 0, to ? to : data.length)" :key="j" class="display-flex" style="padding-top: 10px; padding-bottom: 10px;">
            <div style="width: 100px; margin-right: 15px;">
                <router-link :to="{name: 'product', params: {id: detail.prod_id}}">
                    <div class="image image-padding">
                        <img :src="'/contents/products/thumbnails/' + detail.product_image" alt="" class="post-center">
                    </div>
                </router-link>
            </div>
            <div style="width: 100%;">
                <router-link :to="{name: 'product', params: {id: detail.prod_id}}" class="fonts fonts-12 semibold" style="margin-bottom: 5px;">
                    {{ detail.product_name }}<AppDote style="position: relative; top: -2px;" />{{ detail.product_detail }}<AppDote style="position: relative; top: -2px;" />{{ detail.product_toping }}
                </router-link>
                <div class="fonts fonts-10 grey">
                    {{ detail.quantity }} product x Rp {{ (detail.price + detail.toping_price) }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AppDote from '../../../modules/AppDote'

export default {
    name: 'CardProfileProduct',
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