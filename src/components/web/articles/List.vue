<template>
    <div class="main-screen" style="padding-top: 40px;">
        <AppCardArticleGrid :data="articles" />

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
import AppCardArticleGrid from '../../modules/AppCardArticleGrid'
import AppCardGrid from '../../modules/AppCardGrid'
import AppCardList from '../../modules/AppCardList'
import AppLoader from '../../modules/AppLoader'

export default {
    components: {
        AppLoader,
        AppCardArticleGrid,
        AppCardList,
        AppCardGrid,
        AppWrapper,
        AppButton,
        AppText
    },
    mounted () {
        this.getArticle(this.limit, this.offset)
    },
    methods: {
        async getArticle (limit, offset) {
            this.visibleLoader = true 

            let article = []

            if (offset > 0) {
                article = Object.assign([], this.articles)
            } else {
                article = []
            }

            const payload = {
                limit: limit,
                offset: offset
            }

            const rest = await axios.post('/api/public/article', payload)

            if (rest && rest.status === 200) {
                const data = rest.data.data
                data && data.map((dt) => {
                    return article.push({
                        ...dt,
                        id: dt.id,
                        image: this.articleImageThumbnailUrl + dt.image,
                        title: dt.title,
                        description: dt.description
                    })
                })
                this.articles = article
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
            this.getArticle(this.limit, this.offset)
        }
    },
    data () {
        return {
            visibleLoader: false,
            limit: 9,
            offset: 0,
            visibleLoadMore: false,
            articles: []
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
