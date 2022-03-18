<template>
    <div id="AppImageProduct">
        <div v-for="(detail, j) in data.slice(from ? from : 0, to ? to : data.length)" :key="j" class="display-flex" style="padding-top: 10px; padding-bottom: 10px;">
            <div style="width: 75px; margin-right: 15px;">
                <div class="image image-padding">
                    <VueLoadImage v-if="detail.product_image">
                        <img slot="image" :src="productImageThumbnailUrl + detail.product_image" alt="" class="post-center">
                        <div slot="preloader">
                            <div class="post-middle-absolute icn">
                                <i class="fa fa-lg fa-spin fa-spinner" style="color: #999;"></i>
                            </div>
                        </div>
                    </VueLoadImage>
                    <i v-else class="post-middle-absolute fa fa-lg fa-image" style="color: #999;" />
                </div>
            </div>
            <div style="width: calc(100% - 90px);">
                <div class="fonts fonts-11 semibold" style="margin-bottom: 5px;">
                    {{ detail.product_name }}
                </div>
                <div class="fonts fonts-9 grey">
                    {{ detail.quantity }} {{ detail.product_detail }} x Rp {{ detail.price }}
                </div>
                <div v-if="detail.product_toping" class="fonts fonts-9 grey">
                    {{ detail.quantity }} {{ detail.product_toping }} x Rp. {{ detail.toping_price }}
                </div>
            </div>
            <div style="width: 100px;" class="display-flex align-right">
                <div 
                    :class="'card-capsule ' + (
                    detail.status === 'waiting' 
                        ? '' 
                        : detail.status === 'done' 
                            ? 'active' 
                            : detail.status === 'cooking'
                                ? 'inactive' 
                                : 'active'
                    )"  
                    style="text-transform: capitalize;">
                    {{ 
                        detail.status === 'waiting' 
                            ? 'Waiting' 
                            : detail.status === 'cooking' 
                                ? 'Cooking'
                                : detail.status 
                    }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AppDote from './AppDote'
import VueLoadImage from 'vue-load-image'

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
        AppDote,
        VueLoadImage
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