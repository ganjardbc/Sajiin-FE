<template>
    <div id="App" :class="formClass ? 'content-form' : 'content-form hide'">
        <div class="left">
            <div class="bg-white">
                <div class="display-flex space-between" style="padding-bottom: 15px;">
                    <div>
                        <h1 class="fonts big black bold">Tables</h1>
                    </div>
                    <div class="display-flex">
                        <AppButtonMenu 
                            :icon="'fa fa-lw fa-filter'"
                            :button="'btn btn-icon btn-white'"
                            :onChange="(data) => onChangeMenu(data)" 
                            :data="[{label: 'By ID'}, {label: 'By Name'}, {label: 'By Status'}]" />
                        <button class="btn btn-icon btn-white" @click="onRefresh">
                            <i class="fa fa-lw fa-retweet"></i>
                        </button>
                        <button class="btn btn-white btn-icon btn-radius" @click="onShow('CREATE')">
                            <i class="fa fa-lw fa-plus" />
                        </button>
                        <SearchField :placeholder="'Search tables ..'" :enableResponsive="true" style="margin-left: 5px;" />
                    </div>
                </div>
                
                <div v-for="(dt, i) in datas" :key="i" class="card box-shadow" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                    <div class="display-flex space-between" style="padding-top: 5px; padding-bottom: 5px;">
                        <div style="width: 60px; margin-right: 15px;">
                            <div class="image image-padding border border-full">
                                <VueLoadImage v-if="dt.table && dt.table.image">
                                    <img slot="image" :src="tableImageThumbnailUrl + dt.table.image" alt="" class="post-center">
                                    <div slot="preloader">
                                        <div class="post-middle-absolute icn">
                                            <i class="fa fa-lg fa-spin fa-spinner" style="color: #999;"></i>
                                        </div>
                                    </div>
                                </VueLoadImage>
                                <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                            </div>
                        </div>
                        <div style="width: calc(100% - 115px);">
                            <div class="display-flex" style="margin-bottom: 5px;">
                                <div class="fonts fonts-11 semibold" style="margin-top: 3px;">{{ dt.table ? dt.table.name : '-' }} | {{ dt.table ? dt.table.code : '-' }}</div>
                                <div 
                                    :class="'card-capsule ' + (
                                    dt.table && dt.table.status === 'active' 
                                        ? 'active' 
                                        : ''
                                    )" 
                                    style="margin-left: 10px; text-transform: capitalize;">
                                    {{ dt.table ? dt.table.status : '-' }}
                                </div>
                            </div>
                            <div>
                                <div class="fonts fonts-10 grey">{{ dt.shop ? dt.shop.name : '-' }}</div>
                                <div v-if="dt.table" class="fonts fonts-10 grey">{{ dt.table.created_at | moment("from", "now") }}</div>
                            </div>
                        </div>
                        <div class="display-flex row space-between" style="width: 40px;">
                            <AppButtonMenu 
                                :onChange="(data) => onChangeMenuOwner(data, dt.table.id)" 
                                :data="[
                                    {icon: 'fa fa-1x fa-pencil-alt', label: 'Edit'}, 
                                    {icon: 'fa fa-1x fa-trash-alt', label: 'Delete'}, 
                                    {icon: 'fa fa-1x fa-ellipsis-h', label: 'View'}
                                ]" />
                        </div>
                    </div>
                </div>

                <AppEmpty v-if="!visibleLoader && datas.length === 0" />

                <AppLoader v-if="visibleLoader" />

                <div v-if="!visibleLoader" class="display-flex center" style="margin-top: 20px; margin-bottom: 20px;">
                    <button v-if="visibleLoadMore" class="btn btn-sekunder" @click="getData(limit, offset)">
                        Load More
                    </button>
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
import VueLoadImage from 'vue-load-image'
import AppLoader from '../../modules/AppLoader'
import AppAlert from '../../modules/AppAlert'
import SearchField from '../../modules/SearchField'
import AppButtonMenu from '../../modules/AppButtonMenu'
import AppEmpty from '../../modules/AppEmpty'
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
            limit: 10,
            offset: 0
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.dataShop = this.$cookies.get('shop')
        this.getData(this.limit, this.offset)
    },
    components: {
        VueLoadImage,
        AppEmpty,
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
            // console.log('onChange', index)
        },
        onChangeMenuOwner (data, id) {
            switch (data) {
                case 0:
                    this.onShow('EDIT', id)
                    break
                case 1:
                    this.onShowHideDelete(id)
                    break
                case 2:
                    this.onShow('VIEW', id)
                    break
                default:
                    this.onShow('VIEW', id)
                    break
            }
        },
        nameLength (row) {
            return row.key.length
        },
        onSearchData (id) {
            let payload = null
            this.datas.map((dt) => {
                if (dt.table.id === id) {
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
        onChangeImage (data) {
            this.selectedData = {
                ...this.selectedData,
                table: {
                    ...this.selectedData.table,
                    image: data
                }
            }
        },
        onRefresh () {
            this.datas = []
            this.offset = 0
            this.getData(this.limit, 0)
        },
        async removeData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const id = this.onSearchData(this.selectedIndex).table.table_id
            const payload = {
                table_id: id
            }

            const rest = await axios.post('/api/table/delete', payload, { headers: { Authorization: token } })

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
        async uploadImage (data) {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.selectedData.table
            const url = '/api/table/uploadImage' 

            let formData = new FormData();
            formData.append('table_id', payload.table_id);
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
            const payload = this.selectedData.table
            const url = '/api/table/removeImage' 

            let formData = new FormData();
            formData.append('table_id', payload.table_id);

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

            const rest = await axios.post('/api/table/getAllWithShop', payload, { headers: { Authorization: token } })

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