<template>
    <div id="AppCardList">
        <div v-for="(dt, index) in datas" :key="index" class="display-flex" style="padding-top: 10px; padding-bottom: 10px;">
            <div style="width: 90px;">
                <div class="box-shadow" style="width: 60px; height: 60px; border-radius: 100%; background-color: #f5f5f5; overflow: hidden;">
                    <img :src="dt.image" alt="icon" class="post-center" style="width: 100%;">
                </div>
            </div>
            <div style="width: calc(100% - 90px);">
                <div style="width: 100%; padding-top: 5px;">
                    <AppText type="bold">{{ dt.title }}</AppText>
                    <AppText style="margin-top: 2px;">{{ dt.description }}</AppText>
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
    name: 'AppCardList',
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
        data: function (props, prevProps) {
            if (props) {
                this.datas = props
            } else {
                this.datas = []
            }
        }
    }
}
</script>