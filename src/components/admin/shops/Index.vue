<template>
    <div id="App" :class="formClass ? 'content-form' : 'content-form hide'">
        <div class="left">
            <div class="bg-white">
                <div class="display-flex space-between" style="padding-bottom: 15px;">
                    <div>
                        <h1 class="fonts big black bold">Shops</h1>
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
                        <button v-if="isCanCreate" class="btn btn-white btn-icon btn-radius" @click="onShow('CREATE')">
                            <i class="fa fa-lw fa-plus" />
                        </button>
                        <SearchField :placeholder="'Search shops ..'" :enableResponsive="true" :onChange="(data) => onSearch(data)" style="margin-left: 5px;" />
                    </div>
                </div>

                <div v-for="(dt, i) in datas" :key="i" class="card box-shadow" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                    <div class="display-flex space-between" style="padding-top: 5px; padding-bottom: 5px;">
                        <div style="width: 80px; margin-right: 20px;">
                            <div class="image image-padding border border-full">
                                <img v-if="dt.shop.image" :src="shopImageThumbnailUrl + dt.shop.image" alt="" class="post-center">
                                <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                            </div>
                        </div>
                        <div class="display-flex column space-between" style="width: 180px;">
                            <div class="display-flex align-right">
                                <AppButtonQR 
                                    v-if="dataUser.role_name !== 'customer'"
                                    :buttonClass="'btn btn-sekunder'"
                                    :code="dt.code"
                                    title="Show QR" 
                                />
                                <AppButtonMenu :onChange="(data) => onChangeMenuShop(data, dt.shop.id)" :data="[{icon: 'fa fa-1x fa-pencil-alt', label: 'Edit'}, {icon: 'fa fa-1x fa-trash-alt', label: 'Delete'}, {icon: 'fa fa-1x fa-ellipsis-h', label: 'View'}]" />
                            </div>
                        </div>
                    </div>
                    <div style="padding-top: 5px; padding-bottom: 5px;">
                        <div class="display-flex" style="margin-bottom: 5px;">
                            <div class="fonts fonts-11 semibold" style="margin-top: 3px;">{{ dt.shop.name }}</div>
                            <div 
                                :class="'card-capsule ' + (
                                dt.shop.status === 'active' 
                                    ? 'active' 
                                    : ''
                                )" 
                                style="margin-left: 10px; text-transform: capitalize;">
                                {{ dt.shop.status }}
                            </div>
                        </div>
                        
                        <div style="margin-bottom: 5px;">
                            <div class="fonts fonts-10 grey">{{ dt.shop.about.substring(0, 50) }} ...</div>
                            <div class="fonts fonts-10 grey">{{ dt.shop.open_day + ' - ' + dt.shop.close_day }}</div>
                            <div class="fonts fonts-10 grey">{{ dt.shop.open_time + ' - ' + dt.shop.close_time }}</div>
                        </div>

                        <div class="width width-100">
                            <AppShowHide 
                                v-if="dt.tables.length > 0" 
                                style="margin-bottom: 10px;"
                                :title="`Tables (${dt.tables.length})`">
                                <div class="display-flex wrap">
                                    <div v-for="(tb, j) in dt.tables" :key="j" style="margin: 5px;" :title="tb.code">
                                        <div class="card border-full" style="width: auto; padding: 10px 15px;">
                                            <div class="fonts fonts-10 black">{{ tb.name }}</div>
                                            <div class="fonts fonts-8 grey">{{ tb.table_id }} - {{ tb.code }}</div>
                                        </div>
                                    </div>
                                </div>
                            </AppShowHide>
                            <AppShowHide 
                                v-if="dt.shifts.length > 0" 
                                style="margin-bottom: 10px;"
                                :title="`Shifts (${dt.shifts.length})`">
                                <div class="display-flex wrap">
                                    <div v-for="(tb, j) in dt.shifts" :key="j" :title="tb.title" style="margin: 5px;">
                                        <div class="card border-full" style="width: auto; padding: 10px 15px;">
                                            <div class="fonts fonts-10 black">{{ tb.title }}</div>
                                            <div class="fonts fonts-8 grey">{{ tb.start_time }} - {{ tb.end_time }}</div>
                                        </div>
                                    </div>
                                </div>
                            </AppShowHide>
                            <AppShowHide 
                                v-if="dt.employees.length > 0" 
                                :title="`Employees (${dt.employees.length})`">
                                <div class="display-flex wrap">
                                    <div v-for="(tb, j) in dt.employees" :key="j" :title="tb.title" style="margin: 5px;">
                                        <div class="card border-full" style="width: auto; padding: 10px 15px;">
                                            <div class="fonts fonts-10 black">{{ tb.name }}</div>
                                            <div class="fonts fonts-8 grey">{{ tb.employee_id }}</div>
                                        </div>
                                    </div>
                                </div>
                            </AppShowHide>
                        </div>
                    </div>
                </div>

                <AppEmpty v-if="!visibleLoader && datas.length === 0" />

                <AppLoader v-if="visibleLoader" />

                <div v-if="!visibleLoader" class="display-flex center">
                    <button v-if="visibleLoadMore" class="btn btn-sekunder" style="margin-top: 20px; margin-bottom: 20px;" @click="getData(limit, offset)">
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
import AppLoader from '../../modules/AppLoader'
import AppAlert from '../../modules/AppAlert'
import SearchField from '../../modules/SearchField'
import AppButtonMenu from '../../modules/AppButtonMenu'
import AppListDownMenu from '../../modules/AppListDownMenu'
import AppShowHide from '../../modules/AppShowHide'
import AppButtonQR from '../../modules/AppButtonQR'
import AppEmpty from '../../modules/AppEmpty'
import Form from './Form'

const menus = [
    {label: 'Products', icon: 'fa fa-lg fa-box', link: 'listing'},
    {label: 'Job Positions', icon: 'fa fa-lg fa-flag', link: 'position'},
    {label: 'Shipments', icon: 'fa fa-lg fa-truck', link: 'shipment'},
    {label: 'Payments', icon: 'fa fa-lg fa-calculator', link: 'payment'},
]

export default {
    name: 'App',
    data () {
        return {
            isCanCreate: false,
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            visibleLoadMore: false,
            isSidebarSmall: false,
            formTitle: 'CREATE',
            formClass: false,
            datas: [],
            menus: menus,
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
            limit: 4,
            offset: 0
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.getData(this.limit, this.offset)
    },
    components: {
        AppEmpty,
        AppButtonQR,
        AppListDownMenu,
        AppShowHide,
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
        }),
        // isCanCreate() {
        //     return this.$cookies.get('shop')
        // }
    },
    methods: {
        onSearch (data) {
            console.log('search', data)
        },
        onChangeMenu (index) {
            console.log('onChange', index)
        },
        onChangeMenuShop (index, id) {
            switch (index) {
                case 1:
                    this.onShowHideDelete(id)
                    break
                case 2:
                    this.onShow('VIEW', id)
                    break
                default:
                    this.onShow('EDIT', id)
                    break
            }
        },
        nameLength (row) {
            return row.key.length
        },
        onSearchData (id) {
            let payload = null
            this.datas.map((dt) => {
                if (dt.shop.id === id) {
                    payload = {...dt}
                }
                return null 
            })
            return payload
        },
        onRefresh () {
            this.datas = []
            this.offset = 0
            this.getData(this.limit, 0)
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
                shop: {
                    ...this.selectedData.shop,
                    image: data
                }
            }
        },
        async removeData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const id = this.onSearchData(this.selectedIndex).shop.shop_id
            const payload = {
                shop_id: id
            }
            const rest = await axios.post('/api/shop/delete', payload, { headers: { Authorization: token } })

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
            const url = this.formTitle === 'CREATE' ? '/api/shop/post' : '/api/shop/update' 

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
            const payload = this.selectedData.shop
            const url = '/api/shop/uploadImage' 

            let formData = new FormData();
            formData.append('shop_id', payload.shop_id);
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
            const payload = this.selectedData.shop
            const url = '/api/shop/removeImage' 

            let formData = new FormData();
            formData.append('shop_id', payload.shop_id);

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
                offset: offset
            }

            const rest = await axios.post('/api/shop/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const newData = rest.data.data
                
                newData && newData.map((dt) => {
                    const code = this.deployUrl + (this.$router.mode === 'hash' ? '#' : '') + '/visit-shop/' + (dt.shop ? dt.shop.shop_id : '')
                    return data.push({...dt, code: code})
                })

                this.datas = data 
                this.visibleLoader = false 

                if (newData.length > 0) {
                    this.offset += this.limit
                }

                if (this.$cookies.get('role_name') === 'admin') {
                    this.isCanCreate = true 
                } else {
                    if (newData.length > 0) {
                        this.isCanCreate = false 
                    } else {
                        this.isCanCreate = true 
                    }
                    const shop = this.datas ? this.datas[0].shop : null
                    this.$cookies.set('shop', shop)
                }

                if (newData.length < this.limit) {
                    this.visibleLoadMore = false
                } else {
                    this.visibleLoadMore = true
                }
            } else {
                this.visibleLoader = false 
                this.isCanCreate = false
            }
        }
    }
}
</script>