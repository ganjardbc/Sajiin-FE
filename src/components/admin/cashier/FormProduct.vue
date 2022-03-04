<template>
    <div id="App">
        <div style="padding: 15px 0;">
            <!-- <AppLoader v-if="visibleLoaderCategory" /> -->
            <div class="display-flex overflow-y" style="padding-left: 10px; padding-right: 10px;">
                <div v-for="(dt, i) in dataCategories" :key="i">
                    <CardCategory :data="dt" :onClick="onClickCategory" />
                </div>
            </div>
        </div>

        <div>
            <div class="display-flex space-between" style="padding: 10px; padding-left: 15px; padding-right: 15px;">
                <div>
                    <AppTabs 
                        :selectedIndex="selectedTabIndex" 
                        :path="'main-topic'"
                        :data="tabs" 
                        :isScrollable="false" 
                        :onChange="(data) => onChangeTabs(data)" />
                </div>
                <button class="btn btn-icon btn-white" @click="refresh">
                    <i class="fa fa-lw fa-retweet"></i>
                </button>
            </div>

            <div v-if="selectedTabIndex === 0">
                <div class="display-flex wrap" style="padding-left: 5px; padding-right: 5px;">
                    <div v-for="(dt, i) in datas" :key="i" class="column-4 mobile-column-2">
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
    </div>
</template>
<script>
import axios from 'axios'
import AppLoader from '../../modules/AppLoader'
import CardProduct from './CardProduct'
import CardCategory from './CardCategory'
import AppTabs from '../../modules/AppTabs'

export default {
    name: 'App',
    data () {
        return {
            tabs: [
                {label: 'Available', status: 'active'},
                {label: 'Unavailable', status: ''},
            ],
            visibleLoaderCategory: false,
            visibleLoader: false,
            visibleLoadMore: false,
            dataUser: null,
            dataShop: null,
            datas: [],
            dataCategories: [],
            selectedTabIndex: 0,
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
        AppLoader,
        AppTabs
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
        onClickCategory (data) {
            const payload = this.dataCategories
            let newPayload = payload && payload.map((dt) => {
                const stt = dt.id === data.id ? true : false 
                return {...dt, statusTab: stt}
            })
            this.dataCategories = newPayload
            this.refresh()
        },
        onChangeTabs (index) {
            this.selectedTabIndex = index
        },
        refresh () {
            this.datas = []
            this.offset = 0
            this.getData(this.limit, this.offset)
        },
        async getDataCategory () {
            let newData = [{
                id: 0,
                name: 'All Products',
                image: '',
                statusTab: true
            }]
            this.dataCategories = newData
            this.visibleLoaderCategory = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 5,
                offset: 0
            }
            
            const rest = await axios.post('/api/category/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                rest.data.data && rest.data.data.map((dt) => {
                    return newData.push({...dt, statusTab: false})
                })
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
        },
    }
}
</script>