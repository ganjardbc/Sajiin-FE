<template>
    <div id="App">
        <div style="margin-bottom: 5px;">
            <div class="display-flex space-between" style="padding: 10px; padding-top: 0; padding-left: 15px; padding-right: 15px;">
                <div class="fonts fonts-14 bold" style="margin-top: 5px;">Categories</div>
                <!-- <button class="btn btn-icon btn-white" @click="refresh">
                    <i class="fa fa-lg fa-retweet"></i>
                </button> -->
            </div>
            <div class="display-flex wrap" style="padding-left: 5px; padding-right: 5px;">
                <div v-for="(dt, i) in dataCategories" :key="i" class="column-5">
                    <CardCategory :data="dt" />
                </div>
                <AppLoader v-if="visibleLoaderCategory" />
            </div>
        </div>
        <div>
            <div class="display-flex space-between" style="padding: 10px; padding-left: 15px; padding-right: 15px;">
                <div class="fonts fonts-14 bold" style="margin-top: 5px;">Products</div>
                <button class="btn btn-icon btn-white" @click="refresh">
                    <i class="fa fa-lg fa-retweet"></i>
                </button>
            </div>

            <div class="display-flex wrap" style="padding-left: 5px; padding-right: 5px;">
                <div v-for="(dt, i) in datas" :key="i" class="column-3">
                    <CardProduct :data="dt" :onCheckOut="(data) => onCheckOut(data)" />
                </div>
                <AppLoader v-if="visibleLoader" />
            </div>

            <div v-if="!visibleLoader" class="display-flex center">
                <button v-if="visibleLoadMore" class="btn btn-sekunder" style="margin-top: 20px; margin-bottom: 20px;" @click="getData(limit, offset)">
                    Load More
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import AppLoader from '../../modules/AppLoader'
import CardProduct from './CardProduct'
import CardCategory from './CardCategory'

export default {
    name: 'App',
    data () {
        return {
            visibleLoaderCategory: false,
            visibleLoader: false,
            visibleLoadMore: false,
            dataUser: null,
            dataShop: null,
            datas: [],
            dataCategories: [],
            limit: 6,
            offset: 0 
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.dataShop = this.$cookies.get('shop')
        this.getDataCategory()
        this.getData(this.limit, this.offset)
    },
    components: {
        CardCategory,
        CardProduct,
        AppLoader
    },
    props: {
        onChange: {
            type: Function,
            required: false 
        }
    },
    methods: {
        onCheckOut (data) {
            this.onChange(data)
        },
        refresh () {
            this.datas = []
            this.offset = 0
            this.getData(this.limit, this.offset)
        },
        async getDataCategory () {
            this.visibleLoaderCategory = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.dataUser.role_name === 'admin' ? {
                limit: 5,
                offset: 0
            } : {
                limit: 5,
                offset: 0,
                user_id: this.dataUser.id
            }
            
            const rest = await axios.post('/api/category/getAll', payload, { headers: { Authorization: token } })

            // console.log('getDataCategory', rest)

            if (rest && rest.status === 200) {
                const newData = rest.data.data
                this.dataCategories = newData 
                this.visibleLoaderCategory = false
            } else {
                this.visibleLoaderCategory = false 
            }
        },
        async getData (limit, offset) {
            this.visibleLoader = true 

            let data = []

            if (offset > 0) {
                data = Object.assign([], this.datas)
            } else {
                data = []
            }

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: limit,
                offset: offset,
                status: 'active'
            }
            const rest = await axios.post('/api/product/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const newData = rest.data.data
                
                newData && newData.map((dt) => {
                    return data.push({...dt})
                })

                this.datas = data 
                this.visibleLoader = false 

                // console.log('newData', newData)

                if (newData.length > 0) {
                    this.offset += this.limit
                }

                if (newData.length < this.limit) {
                    this.visibleLoadMore = false
                } else {
                    this.visibleLoadMore = true
                }
            } else {
                this.visibleLoader = false 
            }

            // console.log('getData', rest)
        },
    }
}
</script>