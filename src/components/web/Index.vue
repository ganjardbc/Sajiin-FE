<template>
    <div id="App" style="padding-top: 0;">
        <div class="banner">
            <div class="banner-container banner-flex">
                <div class="left">
                    <div class="post-tops" style="padding-top: 70px;">
                        <div style="width: 100%;">
                            <div style="width: 85%;">
                                <h1 class="fonts fonts-48px bold black no-line-height">Saji-in, best all-in-one platform restaurant management</h1>
                            </div>
                            <div class="bottom-line"></div>
                            <div style="width: 90%; margin-bottom: 40px;">
                                <p class="fonts fonts-16px grey">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi labore dolores dolorem beatae. Dolorum tempore nam temporibus!</p>
                            </div>
                        </div>
                        <div style="width: 100%;">
                            <div class="display-flex">
                                <router-link :to="{name: 'how-to-orders'}" class="btn btn-sekunder" style="margin-left: 0; margin-right: 10px;">
                                    How to Create Orders ?
                                </router-link>
                                <router-link :to="{name: 'how-to-join'}" class="btn btn-main" style="margin-left: 0; margin-right: 10px;">
                                    How to Join ?
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right wrapper wrapper-right">
                    <div class="image image-padding" style="background-color: #fff;">
                        <img :src="icon" alt="SAJI-IN" class="post-center" style="width: 100%;">
                    </div>
                </div>
            </div>
        </div>

        <div class="main-screen" style="padding-top: 32px;">
            <div v-if="!visibleLoaderBenefit" class="banner-benefit">
                <AppCardGrid :data.sync="benefit" />
            </div>
        </div>

        <div class="main-screen" style="padding-top: 52px;">
            <div class="space space-center">
                <h2 class="fonts fonts-32px bold black no-line-height">Our news</h2>
                <h2 class="fonts fonts-32px bold black no-line-height">Find promos or events</h2>
                <AppWrapper type="center">
                    <div class="bottom-line" style="margin-top: 15px; margin-bottom: 15px;"></div>
                </AppWrapper>
            </div>
            <div v-if="!visibleLoaderArticle">
                <div>
                    <AppCardArticleGrid :data.sync="articles" />
                </div>
                <div class="display-flex center" style="margin-top: 50px;">
                    <router-link :to="{name: 'articles'}" class="btn btn-main-reverse" style="padding-left: 0; padding-right: 0">
                        View more <i class="icn fa fa-1x fa-arrow-right" />
                    </router-link>
                </div>
            </div>
            <AppLoader v-else />
        </div>

        <div class="main-screen" style="margin-top: 0;">
            <div type="center" class="self-padding">
                <div class="space space-center">
                    <h2 class="fonts fonts-32px bold black no-line-height">Let's join with Us</h2>
                    <h2 class="fonts fonts-32px bold black no-line-height">and get better Products</h2>
                    <AppWrapper type="center">
                        <div class="bottom-line" style="margin-top: 15px; margin-bottom: 15px;"></div>
                    </AppWrapper>
                </div>
                <div class="display-flex center" style="margin-top: 20px;">
                    <button class="btn btn-main" style="margin-left: 10px; margin-right: 10px;">
                        Register Your Restaurant <i class="icn fa fa-lg fa-arrow-right" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import icon from '@/assets/img/icon.png'
import AppWrapper from '../modules/AppWrapper'
import AppButton from '../modules/AppButton'
import AppText from '../modules/AppText'
import AppCardCategoryGrid from '../modules/AppCardCategoryGrid'
import AppCardArticleGrid from '../modules/AppCardArticleGrid'
import AppCardPostGrid from '../modules/AppCardPostGrid'
import AppCardGrid from '../modules/AppCardGrid'
import AppCardList from '../modules/AppCardList'
import AppButtonQR from '../modules/AppButtonQR'
import AppLoader from '../modules/AppLoader'

export default {
    name: 'App',
    data () {
        return {
            visibleLoaderBenefit: false,
            visibleLoaderArticle: false,
            icon: icon,
            products: [],
            categories: [],
            benefit: [],
            articles: [],
            feedback: [
                {
                    id: 1,
                    name: 'Lorem Ipsum',
                    quote: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi labore dolores dolorem beatae. Dolorum tempore nam temporibus!',
                    job: 'ASSITANT MANAGER'
                }
            ]
        }
    },
    components: {
        AppLoader,
        AppButtonQR,
        AppCardCategoryGrid,
        AppCardArticleGrid,
        AppCardPostGrid,
        AppCardList,
        AppCardGrid,
        AppWrapper,
        AppButton,
        AppText
    },
    mounted () {
        // this.getCategory()
        // this.getProduct()
        this.getBenefit()
        this.getArticle()
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
            admin: 'auth/admin'
        })
    },
    methods: {
        onChangeCustomer (data) {
            console.log('onChangeCustomer', data)
        },
        async getCategory () {
            const payload = {
                limit: 3,
                offset: 0
            }

            const rest = await axios.post('/api/public/category', payload)

            if (rest && rest.status === 200) {
                const data = rest.data.data
                const payload = data && data.map((dt) => {
                    return {
                        id: dt.id,
                        image: this.categoryImageThumbnailUrl + dt.image,
                        title: dt.name,
                        description: dt.description
                    }
                })
                this.categories = payload
            }
        },
        async getProduct () {
            const payload = {
                limit: 3,
                offset: 0
            }

            const rest = await axios.post('/api/public/product', payload)

            if (rest && rest.status === 200) {
                const data = rest.data.data
                const payload = data && data.map((dt) => {
                    return {
                        id: dt.product.id,
                        product_id: dt.product.product_id,
                        image: dt.images[0] ? this.productImageThumbnailUrl + dt.images[0].image : '',
                        title: dt.product.name,
                        price: dt.details[0] ? dt.details[0].price : 0,
                        is_available: dt.product.is_available,
                        available: dt.product.is_available ? 'Available' : 'Unavailable',
                        category: dt.product.ctr_name,
                        description: dt.product.description
                    }
                })
                this.products = payload
            }
        },
        async getBenefit () {
            this.visibleLoaderBenefit = true 

            const payload = {
                limit: 3,
                offset: 0
            }

            const rest = await axios.post('/api/public/benefit', payload)

            if (rest && rest.status === 200) {
                const data = rest.data.data
                const payload = data && data.map((dt) => {
                    return {
                        id: dt.id,
                        image: this.benefitImageThumbnailUrl + dt.image,
                        title: dt.title,
                        description: dt.description
                    }
                })
                this.benefit = payload
                this.visibleLoaderBenefit = false
            } else {
                this.visibleLoaderBenefit = false
            }

            console.log('rest', rest)
        },
        async getArticle () {
            this.visibleLoaderArticle = true

            const payload = {
                limit: 3,
                offset: 0
            }

            const rest = await axios.post('/api/public/article', payload)

            if (rest && rest.status === 200) {
                const data = rest.data.data
                const payload = data && data.map((dt) => {
                    return {
                        ...dt,
                        id: dt.id,
                        image: this.articleImageThumbnailUrl + dt.image,
                        title: dt.title,
                        description: dt.description
                    }
                })
                this.articles = payload
                this.visibleLoaderArticle = false 
            } else {
                this.visibleLoaderArticle = false 
            }
        },
        onRegister () {
            console.log('REGISTER')
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
