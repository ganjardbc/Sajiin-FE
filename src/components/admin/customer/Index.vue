<template>
    <div id="App" :class="formClass ? 'content-form' : 'content-form hide'">
        <div class="left">
            <div class="bg-white">
                <div class="display-flex row space-between padding padding-10-px" style="height: 40px;">
                    <div>
                        <h1 class="fonts small black">CUSTOMERS</h1>
                        <p class="fonts micro grey no-line-height">controll your datas</p>
                    </div>
                    <div class="display-flex">
                        <AppButtonMenu 
                            :icon="'fa fa-lw fa-filter'"
                            :button="'btn btn-icon btn-white'"
                            :onChange="(data) => onChangeMenu(data)" 
                            :data="[{label: 'By ID'}, {label: 'By Name'}, {label: 'By Status'}]" />
                        <button class="btn btn-white btn-icon btn-radius" @click="onShow('CREATE')">
                            <i class="fa fa-lw fa-plus" />
                        </button>
                        <SearchField :placeholder="'Search customers ..'" :enableResponsive="true" style="margin-left: 5px;" />
                    </div>
                </div>
                
                <div class="content-body">
                    <div style="padding-left: 15px; padding-right: 15px;">
                        <div v-for="(dt, i) in datas" :key="i" class="card box-shadow" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                            <div class="display-flex space-between" style="padding-top: 5px; padding-bottom: 5px;">
                                <div style="width: 60px; margin-right: 15px;">
                                    <div class="image image-padding border border-full">
                                        <img v-if="dt.customer.image" :src="customerImageThumbnailUrl + dt.customer.image" alt="" class="post-center">
                                        <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                                    </div>
                                </div>
                                <div style="width: calc(100% - 185px);">
                                    <div class="display-flex" style="margin-bottom: 5px;">
                                        <div class="fonts fonts-11 semibold" style="margin-top: 3px;">{{ dt.customer.name }}</div>
                                        <div 
                                            :class="'card-capsule ' + (
                                            dt.customer.status === 'active' 
                                                ? 'active' 
                                                : ''
                                            )" 
                                            style="margin-left: 10px; text-transform: capitalize;">
                                            {{ dt.customer.status }}
                                        </div>
                                    </div>
                                    <div>
                                        <div class="fonts fonts-10 grey">{{ dt.customer.about }}</div>
                                        <div class="fonts fonts-10 grey">{{ dt.customer.created_at | moment("from", "now") }}</div>
                                    </div>
                                </div>
                                <div class="display-flex column space-between" style="width: 100px;">
                                    <div class="display-flex space-between">
                                        <button class="btn btn-small-icon btn-sekunder" @click="onShow('EDIT', dt.customer.id)">
                                            <i class="fa fa-1x fa-pencil-alt"></i>
                                        </button>
                                        <button class="btn btn-small-icon btn-sekunder" @click="onShowHideDelete(dt.customer.id)">
                                            <i class="fa fa-1x fa-trash-alt"></i>
                                        </button>
                                        <button class="btn btn-small-icon btn-sekunder" @click="onShow('VIEW', dt.customer.id)">
                                            <i class="fa fa-1x fa-ellipsis-v"></i>
                                        </button>
                                    </div>
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

        <div class="right">
            <Form 
                :data.sync="selectedData"
                :message.sync="selectedMessage"
                :title="formTitle" 
                :uploadImage="(data) => uploadImage(data)"
                :removeImage="removeImage"
                :onSave="(data) => onFormSave(data)"
                :onClose="onClose">
            </Form>
        </div>

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
            datas: [],
            selectedIndex: null,
            selectedForm: null,
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
            console.log('onChange', index)
        },
        nameLength (row) {
            return row.key.length
        },
        onSearchData (id) {
            let payload = null
            this.datas.map((dt) => {
                if (dt.customer.id === id) {
                    payload = {...dt}
                }
                return null 
            })
            console.log(payload)
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
            this.selectedForm = data ? data : null
            console.log('onFormSave', data)
        },
        onChangeImage (data) {
            this.selectedData = {
                ...this.selectedData,
                customer: {
                    ...this.selectedData.customer,
                    image: data
                }
            }
        },
        async uploadImage (data) {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.selectedData.customer
            const url = '/api/customer/uploadImage' 

            let formData = new FormData();
            formData.append('customer_id', payload.customer_id);
            formData.append('image', data);

            const rest = await axios.post(url, formData, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })

            if (rest && rest.status === 200) {
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data && data.image) {
                    this.onChangeImage(data && data.image)
                    this.getData(this.limit, 0)
                    this.selectedMessage = []
                } else {
                    this.selectedMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
            }
        },
        async removeImage () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.selectedData.customer
            const url = '/api/customer/removeImage' 

            let formData = new FormData();
            formData.append('customer_id', payload.customer_id);

            var a = confirm('remove this image ?')
            if (a) {
                const rest = await axios.post(url, formData, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })

                if (rest && rest.status === 200) {
                    this.visibleLoaderAction = false

                    const data = rest.data.data
                    this.onChangeImage(data && data.image)
                    this.getData(this.limit, 0)
                } else {
                    alert('Proceed failed')
                }
            }
        },
        async removeData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const id = this.onSearchData(this.selectedIndex).customer.customer_id
            const payload = {
                customer_id: id
            }

            const rest = await axios.post('/api/customer/delete', payload, { headers: { Authorization: token } })
            console.log('rest', rest)

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
            const payload = this.selectedForm
            const url = this.formTitle === 'CREATE' ? '/api/customer/post' : '/api/customer/update' 

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
                shop_id: this.dataShop ? this.dataShop.id : ''
            }

            const rest = await axios.post('/api/customer/getAll', payload, { headers: { Authorization: token } })

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
        }
    }
}
</script>