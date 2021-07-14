<template>
    <div class="display-flex wrap" id="AppCardGrid">
        <div 
            v-for="(dt, index) in datas" 
            :key="index" 
            :class="'column-3'"
            style="position: relative; padding: 0;"
        >
            <div class="column-margin">
                <div class="card no-padding box-shadow" style="margin-top: 30px;">
                    <div style="margin-bottom: 20px;">
                        <!-- <router-link :to="{name: 'benefit', params: {id: dt.benefit_id}}"> -->
                            <div style="width: 100%; height: 240px; background-color: #fff; border-radius: 0; overflow: hidden;">
                                <img :src="dt.image" alt="product" class="post-center" style="width: 100%;">
                            </div>
                        <!-- </router-link> -->
                    </div>
                    <div style="padding: 0 20px; width: calc(100% - 40px);">
                        <div class="fonts semibold black" style="margin-top: 0;">
                            {{ dt.title }}
                        </div>
                        <div class="fonts fonts-13px grey" style="margin-top: 5px;">{{ dt.description.substring(0, 150) }} ...</div>
                        <!-- <div class="display-flex space-between" style="margin-top: 10px;">
                            <router-link :to="{name: 'benefit', params: {id: dt.benefit_id}}" class="btn btn-main-reverse" style="padding-left: 0; padding-right: 0">
                                Read more <i class="icn fa fa-1x fa-arrow-right" />
                            </router-link>
                        </div> -->
                    </div>
                    <div style="padding-bottom: 20px;"></div>
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