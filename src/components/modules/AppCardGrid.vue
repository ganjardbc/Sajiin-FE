<template>
    <div 
        id="AppCardGrid" 
        class="display-flex display-mobile nowrap space-bettween box-shadow border-radius"
        style="width: 100%; background-color: #fff;">
        <div 
            v-for="(dt, index) in datas" 
            :key="index" 
            class="card" 
            style="margin-left: 5px; margin-right: 5px;"
        >
            <div class="display-flex nowrap" style="padding-top: 20px; padding-bottom: 20px;">
                <div style="width: 80px; margin-right: 20px;">
                    <div style="width: 80px; height: 80px; border-radius: 100%; background-color: #000; margin: auto; overflow: hidden;">
                        <img :src="dt.image" alt="SAJI-IN" class="post-center" style="width: 100%;">
                    </div>
                </div>
                <div style="width: calc(100% - 10px); padding-top: 7px;">
                    <div class="fonts fonts-14px semibold black" style="margin-bottom: 5px;">{{ dt.title }}</div>
                    <div class="fonts fonts-13px grey">{{ dt.description.substring(0, 50) }} ...</div>
                    <!-- <div class="display-flex">
                        <router-link :to="'/product'" class="btn btn-main-reverse" style="padding-left: 0; padding-right: 0">
                            Read more <i class="icn fa fa-1x fa-arrow-right" />
                        </router-link>
                    </div> -->
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
    name: 'AppCardGrid',
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