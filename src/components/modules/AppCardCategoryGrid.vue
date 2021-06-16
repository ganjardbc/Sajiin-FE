<template>
    <div 
        id="AppCardCategoryGrid" 
        class="display-flex nowrap space-bettween"
        style="width: 100%; background-color: #fff;">
        <div 
            v-for="(dt, index) in datas" 
            :key="index" 
            style="position: relative; padding: 0; width: calc(100% / 3);"
        >
            <div class="card box-shadow" style="padding: 0; margin: 20px 20px; border-radius: 100px;">
                <div class="display-flex nowrap" style="padding: 15px;">
                    <div style="width: 95px;">
                        <div style="width: 80px; height: 80px; border-radius: 100%; background-color: #000; overflow: hidden;">
                            <img :src="dt.image" alt="SAJI-IN" class="post-center" style="width: 100%;">
                        </div>
                    </div>
                    <div style="width: calc(100% - 95px);">
                        <div class="fonts fonts-14px semibold black" style="margin-bottom: 5px;">{{ dt.title }}</div>
                        <div class="fonts fonts-13px grey">{{ dt.description.substring(0, 50) }} ...</div>
                        <div class="display-flex">
                            <router-link :to="'/product'" class="btn btn-main-reverse" style="padding-left: 0; padding-right: 0">
                                View more <i class="icn fa fa-1x fa-arrow-right" />
                            </router-link>
                        </div>
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

export default {
    name: 'AppCardCategoryGrid',
    components: {
        AppWrapper,
        AppButton,
        AppText
    },
    props: {
        data: {
            required: true
        }
    },
    // mounted() {
    //     console.log('data', this.data)
    // },
    data () {
        return {
            icon: '',
            datas: this.data
        }
    },
    watch: {
        data: function(props, prevProps) {
            if (props) {
                this.datas = props
            } else {
                this.datas = []
            }
        }
    }
}
</script>