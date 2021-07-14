<template>
    <div id="App" :class="formClass ? 'content-form' : 'content-form hide'">
        <div class="left">
            <div class="bg-white box-shadow">
                <div class="display-flex row space-between padding padding-10-px" style="height: 40px;">
                    <div>
                        <h1 class="fonts small black">TASKLISTS</h1>
                        <p class="fonts micro grey no-line-height">controll your datas</p>
                    </div>
                    <div class="display-flex">
                        <AppButtonMenu 
                            :icon="'fa fa-lw fa-filter'"
                            :button="'btn btn-icon btn-white'"
                            :onChange="(data) => onChangeMenu(data)" 
                            :data="[{label: 'By ID'}, {label: 'By Name'}, {label: 'By Status'}]" />
                        <SearchField :placeholder="'Search taskslist ..'" :enableResponsive="true" style="margin-left: 5px;" />
                    </div>
                </div>
                
                <div class="content-body">
                    <div style="padding-left: 15px; padding-right: 15px;">
                        <div v-for="(dt, i) in datas" :key="i" class="card box-shadow" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                            <div style="width: 100%;">
                                <div class="display-flex space-between" style="padding-top: 5px; padding-bottom: 5px;">
                                    <div style="width: 60px; margin-right: 15px;">
                                        <div class="image image-padding border border-full">
                                            <img v-if="dt.product_image" :src="productImageThumbnailUrl + dt.product_image" alt="" class="post-center">
                                            <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                                        </div>
                                    </div>
                                    <div style="width: calc(100% - 185px);">
                                        <div class="fonts fonts-11 semibold" style="margin-bottom: 3px;">{{ dt.product_name }}</div>
                                        <div class="fonts fonts-10 grey" style="margin-bottom: 0;">{{ dt.quantity }} x {{ dt.product_detail }}</div>
                                        <div v-if="dt.product_toping" class="fonts fonts-10 grey" style="margin-bottom: 0;">{{ dt.quantity }} x {{ dt.product_toping }}</div>
                                        <div class="fonts fonts-10 grey">{{ dt.created_at | moment("from", "now") }}</div>
                                    </div>
                                    <div class="display-flex column space-between" style="width: 100px;">
                                        <div class="display-flex align-right">
                                            <!-- <AppCapsuleMenu 
                                                :title="dt.status"
                                                :status="(
                                                    dt.status === 'cooking' 
                                                        ? 'inactive' 
                                                        : dt.status === 'done' 
                                                            ? 'active' 
                                                            : ''
                                                )"
                                                :onChange="(data) => onChangeStatus(data, dt.id)" 
                                                :data="bizparCapsule"
                                                style="margin-left: 5px; text-transform: capitalize;"
                                            /> -->
                                            <div 
                                                :class="'card-capsule ' + (
                                                dt.status === 'cooking' 
                                                    ? 'inactive' 
                                                    : dt.status === 'done' 
                                                        ? 'active'
                                                        : ''
                                                )" 
                                                style="margin-left: 10px; text-transform: capitalize;">
                                                {{ dt.status }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="display-flex align-right">
                                    <button v-if="!dt.status" class="btn btn-grey" style="margin-left: 5px;" @click="changeOrderItemStatus(dt.id, 'waiting')">
                                        Mark As Waiting
                                    </button>
                                    <button v-if="dt.status === 'waiting'" class="btn btn-orange" style="margin-left: 5px;" @click="changeOrderItemStatus(dt.id, 'cooking')">
                                        Mark As Cooking
                                    </button>
                                    <button v-if="dt.status === 'cooking'" class="btn btn-green" style="margin-left: 5px;" @click="changeOrderItemStatus(dt.id, 'done')">
                                        Mark As Done
                                    </button>
                                </div>
                            </div>
                        </div>
                        <AppLoader v-if="visibleLoader" />
                    </div>

                    <div v-if="!visibleLoader" class="display-flex center" style="margin-top: 20px; margin-bottom: 20px;">
                        <button v-if="visibleLoadMore" class="btn btn-sekunder" @click="getData(limit, offset)">
                            Load More
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="right"></div>

        <AppAlert 
            v-if="visibleAlertDelete" 
            :isLoader="visibleLoaderAction"
            :title="'This action will remove data permanently, delete this data ?'" 
            :onClose="onShowHideDelete" 
            :onSave="removeData" />
        
        <AppAlert 
            v-if="visibleAlertSave" 
            :isLoader="visibleLoaderAction"
            :title="'Proceed this data ?'" 
            :onClose="onShowHideSave" 
            :onSave="saveData" />
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import AppLoader from '../../modules/AppLoader'
import AppAlert from '../../modules/AppAlert'
import SearchField from '../../modules/SearchField'
import AppButtonMenu from '../../modules/AppButtonMenu'
import AppCapsuleMenu from '../../modules/AppCapsuleMenu'
import Form from './Form'

export default {
    name: 'App',
    data () {
        return {
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            visibleLoadMore: false,
            formTitle: 'CREATE',
            formClass: false,
            bizparCapsule: [
                {label: 'Waiting'}, 
                {label: 'Cooking'},
                {label: 'Done'}
            ],
            datas: [],
            selectedIndex: null,
            selectedData: null,
            selectedMessage: null,
            filters: {
                name: { value: '', keys: ['name'] }
            },
            limitPage: 10,
            currentPage: 1,
            totalPages: 0,
            dataUser: null,
            dataShop: null,
            limit: 4,
            offset: 0
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.dataShop = this.$cookies.get('shop')
        this.getData(this.limit, this.offset)
    },
    components: {
        AppAlert,
        AppLoader,
        AppCapsuleMenu,
        AppButtonMenu,
        SearchField,
        Form
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            token: 'auth/token'
        })
    },
    methods: {
        onChangeMenu (index) {
            // console.log('onChange', index)
        },
        nameLength (row) {
            return row.key.length
        },
        onSearchData (id) {
            let payload = null
            this.datas.map((dt) => {
                if (dt.id === id) {
                    payload = {...dt}
                }
                return null 
            })
            return payload
        },
        onSave () {
            this.visibleAlertDelete = false
            this.visibleAlertSave = false
            this.formClass = false
        },
        onClose () {
            this.formClass = false
        },
        onShow (title, index = null) {
            this.formClass = true
            this.formTitle = title
            this.selectedData = index >= 0 ? this.onSearchData(index) : null
            this.selectedMessage = null 
        },
        onShowHideDelete (index = null) {
            this.visibleAlertDelete = !this.visibleAlertDelete
            this.selectedIndex = index
        },
        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
        },
        onFormSave (data = null) {
            this.onShowHideSave()
            this.selectedData = data ? data : null
        },
        onChangeStatus (index, id) {
            const data = this.bizparCapsule[index].label.toLowerCase()
            this.changeOrderItemStatus(id, data)
        },
        async removeData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const id = this.onSearchData(this.selectedIndex).table_id
            const payload = {
                table_id: id
            }

            const rest = await axios.post('/api/table/delete', payload, { headers: { Authorization: token } })
            // console.log('rest', rest)

            if (rest && rest.status === 200) {
                this.onShowHideDelete()
                this.onClose()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.getData(this.limit, 0)
                } else {
                    alert('Proceed failed')
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async saveData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.selectedData
            const url = this.formTitle === 'CREATE' ? '/api/table/post' : '/api/table/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.onClose()
                    this.getData(this.limit, 0)
                } else {
                    this.selectedMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async changeOrderItemStatus (id, status) {
            this.visibleAlertSave = true 
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const newData = this.onSearchData(id)
            const payload = {
                ...newData,
                status: status
            }
            const url = '/api/orderItem/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.visibleAlertSave = false 
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.getData(this.limit, 0)
                } else {
                    this.selectedMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleAlertSave = false 
                this.visibleLoaderAction = false
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
                shop_id: this.dataShop ? this.dataShop.id : '',
                status: 'cooking'
            }

            const rest = await axios.post('/api/order/getByStatus', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const newData = rest.data.data
                
                newData && newData.map((dt) => {
                    dt.details && dt.details.map((sb) => {
                        return data.push({...sb})
                    })
                    return null 
                })

                this.datas = data 
                this.visibleLoader = false 

                console.log('newData', data)

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
        }
    }
}
</script>