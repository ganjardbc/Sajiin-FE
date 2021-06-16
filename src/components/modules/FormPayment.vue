<template>
    <div id="FormPayment">
        <AppPopupForm
            v-if="visiblePopup"
            :enableRadius="true"
            :title="'Choose Payment'"
            :onClose="onClose"
        >
            <div style="position: absolute; top: 15px; right: 60px;" @click="onRefresh">
                <button class="btn btn-icon btn-white">
                    <i class="fa fa-lg fa-retweet" />
                </button>
            </div>

            <div v-if="visibleLoader">
                <AppLoader />
            </div>

            <div v-else>
                <div v-if="datas.length > 0" style="padding-left: 10px; padding-right: 10px;">
                    <div v-for="(dt, i) in datas" :key="i" class="card box-shadow" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                        <div class="display-flex space-between" style="padding-top: 5px; padding-bottom: 5px;">
                            <div style="width: 60px; margin-right: 15px;">
                                <div class="image image-padding border border-full">
                                    <img :src="tableImageThumbnailUrl + dt.image" alt="" class="post-center">
                                </div>
                            </div>
                            <div style="width: calc(100% - 185px);">
                                <div class="display-flex" style="margin-bottom: 5px;">
                                    <div class="fonts fonts-11 semibold" style="margin-top: 3px;">{{ dt.name }}</div>
                                    <div 
                                        :class="'card-capsule ' + (
                                        dt.status === 'active' 
                                            ? 'active' 
                                            : ''
                                        )" 
                                        style="margin-left: 10px; text-transform: capitalize;">
                                        {{ dt.status }}
                                    </div>
                                </div>
                                <div>
                                    <div class="fonts fonts-10 grey">{{ dt.code }} | {{ dt.description }}</div>
                                </div>
                            </div>
                            <div class="display-flex column space-between" style="width: 110px;">
                                <div class="display-flex space-between">
                                    <div></div>
                                    <div v-if="data" class="display-flex">
                                        <button v-if="data.id !== dt.id" class="btn btn-small-icon btn-sekunder" @click="onShowHideChoose(dt)">
                                            <i class="fa fa-1x fa-plus"></i>
                                        </button>
                                    </div>
                                    <div v-else>
                                        <button class="btn btn-small-icon btn-sekunder" @click="onShowHideChoose(dt)">
                                            <i class="fa fa-1x fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppPopupForm> 

        <AppAlert 
            v-if="visibleAlertChoose" 
            :isLoader="visibleLoaderAction"
            :title="'Choose this payment ?'" 
            :onClose="onShowHideChoose" 
            :onSave="chooseData" />

    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import AppPopupForm from './AppPopupForm'
import AppAlert from './AppAlert'
import AppEmpty from './AppEmpty'
import AppLoader from './AppLoader'
import SearchField from './SearchField'

const payload = {}

export default {
    name: 'FormPayment',
    data () {
        return {
            visibleAlertChoose: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            visiblePopupCustomer: false,
            visiblePopup: false,
            selectedData: null,
            selectedMessage: null,
            selectedTable: null,
            selectedID: 0,
            formTitle: 'CREATE',
            formData: null,
            datas: [],
            formMessage: [],
            payload: {...payload},
            dataUser: null,
            datatable: null 
        }
    },
    mounted () {
        this.getData()
        this.dataUser = this.$cookies.get('user')
    },
    components: {
        SearchField,
        AppLoader,
        AppEmpty,
        AppPopupForm,
        AppAlert
    },
    props: {
        onChange: {
            type: Function,
            requred: true
        },
        enablePopup: {
            type: Boolean,
            requred: false
        },
        data: {
            requred: true
        }
    },
    computed: {
        ...mapGetters({
            table: 'table/data'
        })
    },
    methods: {
        ...mapActions({
            getDataTable: 'table/getData'
        }),
        onShowHideChoose (index = null) {
            this.visibleAlertChoose = !this.visibleAlertChoose
            this.selectedID = index
            this.formMessage = []
        },
        onChoose: function (index) {
            this.onChange(index)
            this.visiblePopup = false
        },
        onClose: function () {
            this.visiblePopup = false
            this.payload = {...payload}
            // this.datas = {}
        },
        chooseData: function () {
            const data = this.selectedID
            const table = this.datatable
            const payload = {
                prev_table_id: table ? table.id : 0,
                next_table_id: data ? data.id : 0
            }
            this.saveTable(payload)
        },
        onRefresh () {
            this.getData()
        },
        async saveTable (payload) {
            this.visibleLoaderAction = true 
            
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const rest = await axios.post('/api/table/saveTable', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data 

                this.getData()
                this.onChange(data)
                this.onShowHideChoose()
                this.visiblePopup = false
                this.visibleLoaderAction = false
            } else {
                this.onShowHideChoose()
                this.visiblePopup = false
                this.visibleLoaderAction = false
            }
        },
        async getData () {
            this.visibleLoader = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.dataUser.role_name === 'admin' ? {
                limit: 1000,
                offset: 0,
                status: 'active'
            } : {
                limit: 1000,
                offset: 0,
                user_id: this.dataUser.id,
                status: 'active'
            }
            const rest = await axios.post('/api/table/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
                this.visibleLoader = false
                // console.log('table', this.datas)
            } else {
                this.visibleLoader = false
            }

            console.log('rest', rest)
        }
    },
    watch: {
        data: function (props, prevProps) {
            if (props) {
                this.formData = props
            } else {
                this.formData = null
            }
        },
        enablePopup: function (props, prevProps) {
            if (!this.visiblePopup) {
                this.visiblePopup = true
            } else {
                this.visiblePopup = false
            }
        }
    }
}
</script>