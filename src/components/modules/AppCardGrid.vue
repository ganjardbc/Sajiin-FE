<template>
    <div id="AppCardGrid" class="display-flex display-mobile nowrap space-bettween">
        <div v-for="(dt, index) in datas" :key="index" class="card">
            <div class="display-flex column center" style="padding-top: 20px; padding-bottom: 20px;">
                <div class="width width-70 width-center">
                    <div class="image image-padding bg-white">
                        <img :src="dt.image" alt="" class="post-center" style="width: 100%;">
                    </div>
                </div>
                <div style="width: calc(100% - 10px); padding-top: 0; text-align: center;">
                    <div class="fonts fonts-14 semibold black" style="margin-bottom: 8px;">{{ dt.title }}</div>
                    <div class="fonts fonts-12 grey">{{ dt.description }}</div>
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