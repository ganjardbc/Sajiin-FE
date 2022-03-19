<template>
    <div id="App" :class="formClass ? 'content-form' : 'content-form hide'">
        <div class="left">
            <div class="bg-white">
                <div class="display-flex space-between" style="padding-bottom: 15px;">
                    <div>
                        <h1 class="fonts big black bold">Notifications</h1>
                    </div>
                    <button class="btn btn-icon btn-white" @click="refresh">
                        <i class="fa fa-lw fa-retweet"></i>
                    </button>
                </div>

                <div 
                    v-for="(dt, i) in datas" 
                    :key="i" 
                    :class="`card box-shadow ${dt.is_read ? 'bg-white' : 'bg-white-grey'}`"
                    style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                    <div class="display-flex" style="padding-top: 5px; padding-bottom: 5px;">
                        <div style="width: 40px; margin-right: 10px;">
                            <div class="image image-padding border border-full">
                                <img v-if="dt.image" :src="notificationImageThumbnailUrl + dt.image" alt="" class="post-center">
                                <i v-else class="post-middle-absolute icn fa fa-lg fa-bell"></i>
                            </div>
                        </div>
                        <div style="width: calc(100% - 150px);">
                            <div class="display-flex" style="margin-bottom: 5px;">
                                <div class="fonts fonts-11 semibold" style="margin-top: 3px;">{{ dt.title }}</div>
                            </div>
                            <div>
                                <div class="fonts fonts-10 grey">{{ dt.subtitle }}</div>
                                <div class="fonts fonts-10 grey">{{ dt.created_at | moment("from", "now") }}</div>
                            </div>
                        </div>
                        <div class="display-flex row align-right" style="width: 100px;">
                            <AppCapsuleMenu 
                                :title="dt.is_read ? 'Read' : 'Unread'"
                                :status="(
                                    dt.is_read 
                                        ? 'active' 
                                        : ''
                                )"
                                :onChange="(data) => onChangeStatus(data, dt.id)" 
                                :data="bizparCapsule"
                                style="margin-left: 10px; capitalize;"
                            />
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
                :onSave="(data) => onFormSave(data)"
                :onClose="onClose">
            </Form>
        </div>
        
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
import { mapGetters, mapActions } from 'vuex'
import AppLoader from '../../modules/AppLoader'
import AppAlert from '../../modules/AppAlert'
import AppEmpty from '../../modules/AppEmpty'
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
            formTitle: 'UPDATE',
            formClass: false,
            datas: [],
            selectedIndex: null,
            selectedData: null,
            selectedMessage: null,
            bizparCapsule: [
                {label: 'Read'}, 
                {label: 'Unread'}
            ],
            filters: {
                name: { 
                    value: '', 
                    keys: ['name'] 
                }
            },
            limitPage: 10,
            currentPage: 1,
            totalPages: 0,
            dataUser: null,
            limit: 10,
            offset: 0
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.getData(this.limit, this.offset)
    },
    components: {
        AppEmpty,
        AppAlert,
        AppLoader,
        AppButtonMenu,
        AppCapsuleMenu,
        SearchField,
        Form
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            token: 'auth/token',
        })
    },
    methods: {
        ...mapActions({
            getCountNotif: 'notification/getCount'
        }),
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
        getLocalNotifCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountNotif(token)
        },
        onChangeStatus (index, id) {
            const data = index === 1 ? 0 : 1
            const result = this.onSearchData(id)
            this.selectedData = {
                ...this.selectedData,
                id: result.id,
                notification_id: result.notification_id,
                image: result.image,
                title: result.title,
                link: result.link,
                status: result.status,
                subtitle: result.subtitle,
                is_read: data 
            }

            this.saveData(id, data)
        },
        refresh() {
            this.getData(this.limit, 0)
        },
        async saveData (id, status) {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.selectedData
            const url = '/api/notification/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    const newPayload = this.datas && this.datas.map((dt) => {
                        const stt = dt.id === id ? status : dt.is_read
                        return {...dt, is_read: stt}
                    })
                    this.datas = newPayload
                    this.getLocalNotifCount()
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
                offset: offset
            }
            
            const rest = await axios.post('/api/notification/getAll', payload, { headers: { Authorization: token } })

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