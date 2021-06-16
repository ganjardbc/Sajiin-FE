<template>
    <div id="App">
        <div>
            <CardOrder :data.sync="datas" :onCheckOut="(data) => onCheckOut(data)" />
            <AppLoader v-if="visibleLoader" />
        </div>

        <div v-if="!visibleLoader" class="display-flex center">
            <button v-if="visibleLoadMore" class="btn btn-sekunder" style="margin-top: 20px; margin-bottom: 20px;" @click="getData">
                Load More
            </button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import AppLoader from '../../modules/AppLoader'
import CardOrder from './CardOrder'

export default {
    name: 'App',
    data () {
        return {
            visibleLoader: false,
            visibleLoadMore: false,
            dataUser: null,
            datas: [],
            limit: 3,
            offset: 0 
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.getData()
    },
    components: {
        CardOrder,
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
        async getData () {
            this.visibleLoader = true 

            let data = []

            if (this.offset > 0) {
                data = Object.assign([], this.datas)
            } else {
                data = []
            }

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.dataUser.role_name === 'admin' ? {
                limit: this.limit,
                offset: this.offset
            } : {
                limit: this.limit,
                offset: this.offset,
                user_id: this.dataUser.id
            }
            
            const rest = await axios.post('/api/order/getAll', payload, { headers: { Authorization: token } })

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

            // console.log('rest', rest)
        },
    }
}
</script>