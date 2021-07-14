<template>
    <div class="main-screen" style="padding-top: 40px;">
        <div class="width width-50 width-mobile width-center content-center">
            <h2 class="fonts fonts-28 bold black no-line-height">Our news</h2>
            <h2 class="fonts fonts-28 bold black no-line-height">Find promos or events</h2>
            <div style="margin-top: 15px; margin-bottom: 15px;">
                <div class="bottom-line" style="margin: auto;"></div>
            </div>
            <p class="fonts fonts-12 grey center">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi labore dolores dolorem beatae. Dolorum tempore nam temporibus!
            </p>
        </div>
        
        <AppCardBenefitGrid :data="benefits" />

        <AppLoader v-if="visibleLoader" style="margin-top: 40px;" />

        <div v-if="!visibleLoader" class="display-flex center" style="margin-top: 40px;">
            <button v-if="visibleLoadMore" class="btn btn-sekunder" @click="onMore">
                Load More
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import AppWrapper from '../../modules/AppWrapper'
import AppButton from '../../modules/AppButton'
import AppText from '../../modules/AppText'
import AppCardBenefitGrid from '../../modules/AppCardBenefitGrid'
import AppCardGrid from '../../modules/AppCardGrid'
import AppCardList from '../../modules/AppCardList'
import AppLoader from '../../modules/AppLoader'

export default {
    components: {
        AppLoader,
        AppCardBenefitGrid,
        AppCardList,
        AppCardGrid,
        AppWrapper,
        AppButton,
        AppText
    },
    mounted () {
        this.getBenefit(this.limit, this.offset)
    },
    methods: {
        async getBenefit (limit, offset) {
            this.visibleLoader = true 

            let benefit = []

            if (offset > 0) {
                benefit = Object.assign([], this.benefits)
            } else {
                benefit = []
            }

            const payload = {
                limit: limit,
                offset: offset
            }

            const rest = await axios.post('/api/public/benefit', payload)

            if (rest && rest.status === 200) {
                const data = rest.data.data
                data && data.map((dt) => {
                    return benefit.push({
                        ...dt,
                        id: dt.id,
                        image: this.benefitImageThumbnailUrl + dt.image,
                        title: dt.title,
                        description: dt.description
                    })
                })
                this.benefits = benefit
                this.visibleLoader = false 

                if (data.length > 0) {
                    this.offset += this.limit
                }

                if (data.length < this.limit) {
                    this.visibleLoadMore = false
                } else {
                    this.visibleLoadMore = true
                }
            } else {
                this.visibleLoader = false 
            }
        },
        onMore () {
            this.getBenefit(this.limit, this.offset)
        }
    },
    data () {
        return {
            visibleLoader: false,
            limit: 9,
            offset: 0,
            visibleLoadMore: false,
            benefits: []
        }
    }
}
</script>

<style scoped>
.self-padding {
    padding-top: 50px;
    padding-bottom: 50px;
}
</style>
