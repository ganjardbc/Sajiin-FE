<template>
    <div id="App">
        <div class="display-flex space-between align-center card-dashboard-container">
            <div>
                <h1 class="fonts fonts-14 black semibold">Tables</h1>
            </div>
            <button class="btn btn-icon btn-white" @click="onRefresh">
                <i class="fa fa-lw fa-retweet"></i>
            </button>
        </div>

        <AppLoader v-if="visibleLoader" />

        <div 
            v-if="!visibleLoader" 
            class="card-dashboard-container"
            style="padding-top: 5px; padding-bottom: 20px;">
            <AppHorizontalScrollable customHeight="120px">
                <div 
                    v-if="!visibleLoader && data.length === 0" 
                    style="width: 100%; height: 120px;" 
                    class="display-flex center align-center">
                    <div class="fonts fonts-11 center">No Data(s) Found</div>
                </div>
                <div v-for="(dt, i) in data" :key="i" style="min-width: 170px;">
                    <div style="padding: 10px;">
                        <div 
                            class="card bg-white border-full" 
                            :style="`
                                margin: 0; 
                                padding: 0; 
                                width: 100%; 
                                border-width: 1px;
                                border-color: ${dt.status === 'active' ? '#38c172' : '#999'};
                                background-color: ${dt.status === 'active' ? 'rgba(77, 192, 181, 0.1)' : '#fff'} !important;
                            `">
                            <div style="padding: 15px;">
                                <div class="fonts fonts-10 semibold align-center">{{ dt.name }}</div>
                                <div style="padding-top: 10px;">
                                    <button 
                                        :class="`btn btn-full ${ dt.status === 'active' ? 'btn-green' : 'btn-sekunder' }`" 
                                        @click="onChangeStatus(dt)">
                                        {{ dt.status === 'active' ? 'Inactive' : 'Active' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppHorizontalScrollable>
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
import AppAlert from '../../modules/AppAlert'
import AppEmpty from '../../modules/AppEmpty'
import AppHorizontalScrollable from '../../modules/AppHorizontalScrollable'

export default {
    name: 'App',
    data () {
        return {
            visibleLoaderAction: false,
            // visibleLoader: false,
            dataUser: null,
            dataShop: null,
        }
    },
    props: {
        visibleLoader: {
            default: null,
        },
        data: {
            default: null,
        },
        onRefresh: {
            default: null,
        },
        onChangeTable: {
            default: null,
        }
    },
    components: {
        AppEmpty,
        AppLoader,
        AppAlert,
        AppHorizontalScrollable
    },
    mounted() {
        this.dataUser = this.$cookies.get('user')
        this.dataShop = this.$cookies.get('shop')
        // this.getData()
    },
    methods: {
        async onChangeStatus(data) {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                ...data,
                status: data.status === 'active' ? 'inactive' : 'active'
            }
            const url = '/api/table/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.visibleLoaderAction = false
                this.onChangeTable(payload)
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        }
    }
}
</script>