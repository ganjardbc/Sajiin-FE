<template>
    <div id="App">
        <!-- <div style="padding: 15px 0;">
            <div class="display-flex overflow-y" style="padding-left: 10px; padding-right: 10px;">
                <div v-for="(dt, i) in dataCategories" :key="i">
                    <CardCategory :data="dt" :onClick="onClickCategory" />
                </div>
            </div>
        </div> -->

        <div class="card-dashboard-container">
            <div class="display-flex space-between align-center">
                <div>
                    <h1 class="fonts fonts-14 black semibold">Products</h1>
                </div>
                <button class="btn btn-icon btn-white" @click="refresh">
                    <i class="fa fa-lw fa-retweet"></i>
                </button>
            </div>
        </div>

        <div class="card-dashboard-container" style="padding-top: 15px;">
            <div class="display-flex left align-center border-bottom">
                <AppTabs 
                    :selectedIndex="selectedTabIndex" 
                    :path="'main-topic'"
                    :data="tabs" 
                    :isScrollable="false" 
                    :onChange="(data) => onChangeTabs(data)" 
                    class="width width-300-px width-mobile" />
            </div>
        </div>

        <div style="padding-top: 15px;">
            <div v-if="selectedTabIndex === 0" class="display-flex wrap">
                <div v-for="(dt, i) in dataAll" :key="i" class="column-4 mobile-column">
                    <CardProduct 
                        :data="dt" 
                        :onCheckOut="(data) => onCheckOut(data)"
                        :onChangeStatus="(data) => saveData(data)" />
                </div>
                <AppEmpty v-if="!visibleLoader && dataAll.length === 0" />
            </div>
            <div v-if="selectedTabIndex === 1" class="display-flex wrap">
                <div v-for="(dt, i) in dataActive" :key="i" class="column-4 mobile-column">
                    <CardProduct 
                        :data="dt" 
                        :onCheckOut="(data) => onCheckOut(data)"
                        :onChangeStatus="(data) => saveData(data)" />
                </div>
                <AppEmpty v-if="!visibleLoader && dataActive.length === 0" />
            </div>
            <div v-if="selectedTabIndex === 2" class="display-flex wrap">
                <div v-for="(dt, i) in dataInactive" :key="i" class="column-4 mobile-column">
                    <CardProduct 
                        :data="dt" 
                        :onCheckOut="(data) => onCheckOut(data)"
                        :onChangeStatus="(data) => saveData(data)" />
                </div>
                <AppEmpty v-if="!visibleLoader && dataInactive.length === 0" />
            </div>

            <AppLoader v-if="visibleLoader" />

            <div v-if="!visibleLoader" class="display-flex center">
                <button v-if="visibleLoadMore" class="btn btn-sekunder" style="margin-top: 20px; margin-bottom: 20px;" @click="getData(limit, offset)">
                    Load More
                </button>
            </div>
        </div>

        <AppAlert 
            v-if="visibleLoaderAction" 
            :isLoader="visibleLoaderAction"
            :title="'Proceed this data ?'" />
    </div>
</template>
<script>
import axios from 'axios'
import AppLoader from '../../modules/AppLoader'
import CardProduct from './CardProduct'
import CardCategory from './CardCategory'
import AppTabs from '../../modules/AppTabs'
import AppAlert from '../../modules/AppAlert'
import AppEmpty from '../../modules/AppEmpty'

export default {
    name: 'App',
    data () {
        return {
            tabs: [
                {label: 'All', status: 'active'},
                {label: 'Active', status: ''},
                {label: 'Inactive', status: ''},
            ],
            visibleLoaderAction: false,
            visibleLoaderCategory: false,
            visibleLoader: false,
            visibleLoadMore: false,
            dataUser: null,
            dataShop: null,
            datas: [],
            dataCategories: [],
            selectedTabIndex: 0,
            limit: 10,
            offset: 0 
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.dataShop = this.$cookies.get('shop')
        // this.getDataCategory()
        this.getData(this.limit, this.offset)
    },
    components: {
        CardCategory,
        CardProduct,
        AppLoader,
        AppTabs,
        AppAlert,
        AppEmpty
    },
    props: {
        onChange: {
            type: Function,
            required: false 
        }
    },
    computed: {
        dataAll () {
            return this.datas
        },
        dataActive () {
            return this.datas.filter((dt) => dt.product.status === 'active')
        },
        dataInactive () {
            return this.datas.filter((dt) => dt.product.status === 'inactive')
        },
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
        changeData(newData) {
            const oldData = this.datas
            let payload = oldData.map((dt, i) => {
                if (dt.product.id === newData.id) {
                    return {
                        ...dt, 
                        product: {
                            ...newData
                        }
                    }
                } else {
                    return {...dt}
                }
            })
            this.datas = payload
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
                shop_id: this.dataShop.id
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
        async saveData (data) {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                ...data.product,
                status: data.product.status === 'active' ? 'inactive' : 'active',
                type: ""
            }
            const url = '/api/product/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.visibleLoaderAction = false

                // this.getData(this.limit, 0)
                this.changeData(payload)
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
    }
}
</script>