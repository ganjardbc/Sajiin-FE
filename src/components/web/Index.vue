<template>
    <div id="App" style="padding-top: 0;">
        <div class="banner">
            <div class="banner-container banner-flex">
                <div class="right">
                    <div class="image image-padding" style="background-color: #fff;">
                        <img :src="icon" alt="SAJI-IN" class="post-center post-none-mobile" style="width: 100%;">
                    </div>
                </div>
                <div class="left">
                    <div class="post-tops" style="padding-top: 60px;">
                        <div class="width width-100">
                            <div class="width width-85 width-mobile">
                                <h1 class="fonts fonts-34 bold black no-line-height">Saji-in, best all-in-one platform restaurant management</h1>
                            </div>
                            <div class="bottom-line"></div>
                            <div class="width width-90 width-mobile" style="margin-bottom: 40px;">
                                <p class="fonts fonts-12 grey">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi labore dolores dolorem beatae. Dolorum tempore nam temporibus!</p>
                            </div>
                        </div>
                        <div class="width width-100">
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
            </div>
        </div>

        <div class="main-screen" style="padding-top: 32px;">
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
            <div class="width width-100" style="margin-top: 32px;">
                <div class="image image-half-padding bg-white" style="padding-bottom: 65%;">
                    <img src="https://d33wubrfki0l68.cloudfront.net/2ca3fecc90f4d8b86181e2cf5fe9878f3a8608f1/d4fcf/assets/images/homepage/product-screen.jpg" alt="">
                </div>
            </div>
        </div>

        <div class="main-screen" style="padding-top: 0;">
            <div class="banner-benefit">
                <AppCardGrid :data.sync="benefit" />
            </div>
        </div>

        <div class="main-screen" style="padding-top: 32px;">
            <AppCardInfo :data.sync="articles" />
        </div>

        <div class="main-screen" style="padding-top: 32px;">
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
            <div class="width width-80 width-mobile width-center" style="margin-top: 32px;">
                <AppCardFeedback :data.sync="feedback" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import icon from '@/assets/img/cover2.png'
import AppWrapper from '../modules/AppWrapper'
import AppButton from '../modules/AppButton'
import AppText from '../modules/AppText'
import AppCardFeedback from '../modules/AppCardFeedback'
import AppCardInfo from '../modules/AppCardInfo'
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
            articles: [
                {
                    id: '1',
                    image: 'https://d33wubrfki0l68.cloudfront.net/0b69a56f367ce97960285508060881fcbbeb40d5/82911/assets/images/homepage/collab-maint-feature-1.png',
                    title: 'The backbone of fleet maintenance',
                    description: 'Whether you handle maintenance in-house or outsource service, Fleetio enables an efficient process from trigger to resolution, all while providing detailed data at every turn. Get notified of unexpected issues immediately and fully automate routine maintenance workflows like PMs, inspections and issue resolution, allowing you to increase uptime and ensure safety and compliance.'
                },
                {
                    id: '1',
                    image: 'https://d33wubrfki0l68.cloudfront.net/68c4f8092a64e98af437c775e7753cf754190c34/39792/assets/images/homepage/collab-maint-feature-2.png',
                    title: 'Your fleet runs on data',
                    description: 'Think of Fleetio as the brain behind your fleet operations. Centralize all your data, integrate third-party solutions (like fuel cards, GPS devices and maintenance shops) and gain insights backed by data science to make better decisions for your organization. Control costs with real-time metrics like total cost, cost-per-mile and asset utilization, and never question fleet profitability again.'
                }
            ],
            benefit: [
                {
                    id: '1',
                    image: 'https://d33wubrfki0l68.cloudfront.net/c11d85a79505d6e452099b10c99ffb2cea5a5a5b/81b57/assets/images/homepage/collaboration.svg',
                    title: 'Work as a team',
                    description: 'The entire team can actively collaborate on fleet operations with unlimited users, flexible permissions and features built around exception management.'
                },
                {
                    id: '1',
                    image: 'https://d33wubrfki0l68.cloudfront.net/8a86e9df5d48004c975a45d58c3f6d6d8226b80f/0aaa0/assets/images/homepage/mobile.svg',
                    title: 'Manage from anywhere',
                    description: 'Handle any fleet-related task or surface critical data anytime, anywhere with intuitive web and smartphone apps designed for busy, distributed fleets.'
                },
                {
                    id: '1',
                    image: 'https://d33wubrfki0l68.cloudfront.net/c63a595da3a9c3131f1c5cb2c5c23f6972f92e57/bfdab/assets/images/homepage/automation.svg',
                    title: 'Automate processes',
                    description: 'Automate your maintenance process from end to end through powerful operational workflows and data integrations. No more manual data entry.'
                }
            ],
            feedback: [
                {
                    id: 1,
                    image: 'https://d33wubrfki0l68.cloudfront.net/60aa99396980c20d906a8b539c175bd0c4598375/f5583/assets/images/video-thumbs/aaa-cover.png',
                    quote: 'So many potential issues or simple fixes are lost in communication and I feel the systems we’re putting in place with Fleetio are building an excellent communication platform.',
                    name: 'Ian Lomax',
                    job: 'AAA Oregon/Idaho'
                },
                {
                    id: 1,
                    image: 'https://d33wubrfki0l68.cloudfront.net/4843e950b8937885676fb5ecfdb6ba85ca4299b1/fcdae/assets/images/video-thumbs/cherrylake-cover.jpg',
                    quote: 'Fleet management impacts so many different levels of the organization. Bringing in a tool that brings all the data in one centralized location to make informed decisions and help guide our business was critical.',
                    name: 'Chloe Gentry, Co-owner',
                    job: 'Cherrylake'
                }
            ]
        }
    },
    components: {
        AppLoader,
        AppButtonQR,
        AppCardFeedback,
        AppCardInfo,
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
        // this.getBenefit()
        // this.getArticle()
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
