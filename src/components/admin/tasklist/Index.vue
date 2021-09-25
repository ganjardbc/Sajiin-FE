<template>
    <div id="App" :class="formClass ? 'content-form' : 'content-form hide'">
        <div class="left">
            <div class="bg-white">
                <div class="display-flex row space-between padding padding-10-px" style="height: 40px;">
                    <div>
                        <AppTabs 
                            :selectedIndex="selectedTabIndex" 
                            :path="'main-topic'"
                            :data.sync="tabs" 
                            :isScrollable="false" 
                            :onChange="(data) => onChangeTabs(data)" 
                            class="margins margin-bottom-15-px" />
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
                        <SearchField :placeholder="'Search taskslist ..'" :enableResponsive="true" style="margin-left: 5px;" />
                    </div>
                </div>
                
                <div class="content-body">
                    <div style="padding-left: 15px; padding-right: 15px;">
                        <div v-for="(dt, i) in datas" :key="i" class="card box-shadow" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                            <div style="width: 100%;">
                                <div class="display-flex space-between display-mobile" style="padding-top: 5px; padding-bottom: 10px;">
                                    <div class="width width-75 width-mobile display-flex" style="padding-bottom: 10px;">
                                        <div style="width: 60px; margin-right: 15px;">
                                            <div class="image image-padding border border-full">
                                                <VueLoadImage v-if="dt.product_image">
                                                    <img slot="image" :src="productImageThumbnailUrl + dt.product_image" alt="" class="post-center">
                                                    <div slot="preloader">
                                                        <div class="post-middle-absolute icn">
                                                            <i class="fa fa-lg fa-spin fa-spinner" style="color: #999;"></i>
                                                        </div>
                                                    </div>
                                                </VueLoadImage>
                                                <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                                            </div>
                                        </div>

                                        <div style="width: calc(100% - 195px);">
                                            <div class="fonts fonts-11 semibold" style="margin-bottom: 5px;">{{ dt.product_name }}</div>
                                            <div class="fonts fonts-10 grey" style="margin-bottom: 0;">{{ dt.quantity }} x {{ dt.product_detail }}</div>
                                            <div v-if="dt.product_toping" class="fonts fonts-10 grey" style="margin-bottom: 0;">{{ dt.quantity }} x {{ dt.product_toping }}</div>
                                            <div class="fonts fonts-10 grey">{{ dt.created_at | moment("from", "now") }}</div>
                                            <div class="fonts fonts-10 grey" style="margin-top: 5px;">{{ dt.order_uuid }}</div>
                                        </div>

                                        <div style="width: 120px;">
                                            <div style="padding-right: 20px;" class="display-flex align-right no-margin-padding">
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
                                                    style="text-transform: capitalize;"
                                                /> -->
                                                <div 
                                                    :class="'card-capsule ' + (
                                                    dt.status === 'cooking' 
                                                        ? 'inactive' 
                                                        : dt.status === 'done' 
                                                            ? 'active'
                                                            : ''
                                                    )" 
                                                    style="text-transform: capitalize;">
                                                    {{ dt.status }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="padding-left: 20px;" class="width width-25 width-mobile border-left border-mobile-none no-margin-padding">
                                        <div v-if="dt.employee">
                                            <div class="fonts fonts-10 black" style="margin-bottom: 5px;">Handled by</div>
                                            <div class="display-flex" style="margin-bottom: 15px;">
                                                <div class="card-small-profile" style="cursor: default;">
                                                    <div class="image" style="text-align: center; margin-right: 5px;">
                                                        <img v-if="dt.employee && dt.employee.image" :src="dt.employee ? (employeeImageThumbnailUrl + dt.employee.image) : ''" alt="">
                                                        <i v-else class="post-top fa fa-lw fa-store" style="color: #999;" />
                                                    </div>
                                                    <div class="label label-mobile">
                                                        <div class="post-center">
                                                            <div class="fonts fonts-10 semibold black" style="text-transform: capitalize;">{{ dt.employee ? dt.employee.name : '' }}</div>
                                                            <div class="fonts fonts-8 grey">{{ dt.employee ? dt.employee.employee_id : '' }} - {{ dt.employee ? dt.employee.position_name : '' }}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else></div>

                                         <div class="width width-100">
                                            <button v-if="!dt.status" class="btn btn-grey btn-full" @click="changeOrderItemStatus(dt.id, 'waiting')">
                                                Mark As Waiting
                                            </button>
                                            <button v-if="dt.status === 'waiting'" class="btn btn-orange btn-full" @click="changeOrderItemStatus(dt.id, 'cooking')">
                                                Mark As Cooking
                                            </button>
                                            <button v-if="dt.status === 'cooking'" class="btn btn-green btn-full" @click="changeOrderItemStatus(dt.id, 'done')">
                                                Mark As Done
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <AppLoader v-if="visibleLoader" />
                    </div>

                    <div v-if="!visibleLoader" class="display-flex center" style="margin-top: 20px; margin-bottom: 20px;">
                        <button v-if="visibleLoadMore" class="btn btn-sekunder" @click="onLoadMore()">
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
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
import VueLoadImage from 'vue-load-image'
import AppTabs from '../../modules/AppTabs'
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
            tabs: [
                {label: 'New Tasks', status: 'active', val: 0},
                {label: 'On Progress', status: '', val: 0},
                {label: 'History', status: '', val: 0}
            ],
            bizparCapsule: [
                {label: 'Waiting'}, 
                {label: 'Cooking'},
                {label: 'Done'}
            ],
            datas: [],
            selectedTabIndex: 0,
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
        VueLoadImage,
        AppTabs,
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
        onChangeTabs (index) {
            this.selectedTabIndex = index
            this.offset = 0
            this.datas = []
            switch (index) {
                case 0:
                    this.getData(this.limit, 0)
                    break;
                case 1:
                    this.getData(this.limit, 0, this.dataUser.id)
                    break;
                default:
                    this.getData(this.limit, 0, this.dataUser.id, 'history')
                    break;
            }
        },
        onLoadMore () {
            let index = this.selectedTabIndex
            switch (index) {
                case 0:
                    this.getData(this.limit, this.offset)
                    break;
                case 1:
                    this.getData(this.limit, this.offset, this.dataUser.id)
                    break;
                default:
                    this.getData(this.limit, this.offset, this.dataUser.id, 'history')
                    break;
            }
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
        onRefresh () {
            this.offset = 0
            this.datas = []
            if (this.selectedTabIndex === 0) {
                this.getData(this.limit, 0)
            }
            if (this.selectedTabIndex === 1) {
                this.getData(this.limit, 0, this.dataUser.id)
            }
            if (this.selectedTabIndex === 2) {
                this.getData(this.limit, 0, this.dataUser.id, 'history')
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
                    this.onRefresh()
                } else {
                    this.selectedMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleAlertSave = false 
                this.visibleLoaderAction = false
            }
        },
        async getData (limit, offset, owner_id = null, type = null) {
            this.visibleLoader = true 

            let data = []

            if (offset > 0) {
                data = Object.assign([], this.datas)
            } else {
                data = []
            }

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            let payload = {
                limit: limit,
                offset: offset
            }

            if (owner_id) {
                payload = {
                    ...payload,
                    user_id: owner_id ? owner_id : '',
                }
            } else {
                payload = {
                    ...payload,
                    shop_id: this.dataShop ? this.dataShop.id : '',
                }
            }

            const rest = await axios.post(
                type === 'history' ? '/api/orderItem/getAllHistory' : '/api/orderItem/getAllTasks', 
                payload, 
                { 
                    headers: { Authorization: token } 
                }
            )

            if (rest && rest.status === 200) {
                const newData = rest.data.data
                
                newData && newData.map((dt) => {
                    data.push({...dt.detail, order_uuid: dt.order.order_id, employee: dt.employee, created_at: dt.order.created_at})
                    return null 
                })

                this.datas = data
                this.visibleLoader = false 

                console.log('orderitem', this.datas)

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