<template>
    <div id="App">
        <AppLoader v-if="visibleLoader" style="padding-top: 80px;" />

        <div v-if="!visibleLoader" class="main-screen" style="padding-top: 10px;">
            <div class="small-screen box-shadow" style="background-color: #fff; position: relative;">
                <div class="padding padding-30-px">
                    <div class="image image-half-padding" style="padding-bottom: 50%; margin-bottom: 15px; margin-top: 15px;">
                        <img :src="data && data.cover" alt="product" class="post-center" style="width: 100%;">
                    </div>
                    <div class="fonts fonts-38px semibold black" style="padding-top: 20px; padding-bottom: 20px;">{{ data && data.title }}</div>
                    <div class="fonts fonts-16px grey" style="padding-top: 0;">{{ data && data.subtitle }}</div>
                    <div class="fonts fonts-18px black" style="padding-top: 20px; padding-bottom: 30px;">{{ data && data.description }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import AppWrapper from '../../modules/AppWrapper'
import AppButton from '../../modules/AppButton'
import AppText from '../../modules/AppText'
import AppLoader from '../../modules/AppLoader'

export default {
    name: 'App',
    data () {
        return {
            visibleLoader: false,
            data: null 
        }
    },
    components: {
        AppLoader,
        AppWrapper,
        AppButton,
        AppText
    },
    mounted () {
        this.getBenefit()
    },
    methods: {
        async getBenefit () {
            this.visibleLoader = true 

            const id = this.$route.params.id
            const payload = {
                benefit_id: id
            }

            const rest = await axios.post('/api/public/benefitByID', payload)

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.data = {
                    ...data,
                    cover: this.benefitImageCoverUrl + data.image,
                    thumbnail: this.benefitImageThumbnailUrl + data.image
                }
                this.visibleLoader = false 
            } else {
                this.visibleLoader = false 
            }
        },
        onRegister () {
            console.log('REGISTER')
        }
    },
}
</script>