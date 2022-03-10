<template>
    <div id="App" style="position: relative;">
        <div style="padding-bottom: 5px;">
            <div v-for="(dt, i) in datas" :key="i" :class="'card small-padding ' + (dt.is_read === 0 ? 'border-full bg-white-grey' : 'border-full')" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                <div class="display-flex space-between" style="padding-top: 5px; padding-bottom: 5px;">
                    <div style="width: 40px; margin-right: 15px;">
                        <div class="image image-padding border border-full bg-white">
                            <img v-if="dt.image" :src="notificationImageThumbnailUrl + dt.image" alt="" class="post-center">
                            <i v-else class="post-middle-absolute icn fa fa-lw fa-bell"></i>
                        </div>
                    </div>
                    <div style="width: calc(100% - 55px);">
                        <div>
                            <div class="fonts fonts-11 semibold" style="margin-bottom: 3px;">{{ dt.title }}</div>
                            <div class="fonts fonts-10 grey">{{ dt.subtitle }}</div>
                            <div class="fonts fonts-10 grey">{{ dt.created_at | moment("from", "now") }}</div>
                        </div>
                    </div>
                    <div style="position: absolute; top: 15px; right: 10px;">
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

            <AppLoader v-if="visibleLoader" />

            <div v-if="!visibleLoader" class="display-flex center">
                <button v-if="visibleLoadMore" class="btn btn-sekunder" style="margin-top: 10px; margin-bottom: 20px;" @click="getData(limit, offset)">
                    Load More
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import AppLoader from './AppLoader'
import AppCapsuleMenu from './AppCapsuleMenu'

const payload = {
    id: '',
    notification_id: '',
    image: '',
    title: '',
    link: '',
    status: '',
    subtitle: '',
    is_read: 0
}

export default {
    name: 'App',
    data () {
        return {
            visiblePopup: false,
            visibleLoader: false,
            visibleLoadMore: false,
            visibleLoaderAction: false,
            selectedData: {...payload},
            datas: [],
            bizparCapsule: [
                {label: 'Read'}, 
                {label: 'Unread'}
            ],
            dataUser: null,
            limit: 10,
            offset: 0
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.getData(this.limit, this.offset)
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            token: 'auth/token'
        })
    },
    methods: {
        ...mapActions({
            getCountNotif: 'notification/getCount'
        }),
        opPopup () {
            this.visiblePopup = !this.visiblePopup
        },
        getLocalNotifCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountNotif(token)
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
        onRefresh () {
            this.datas = []
            this.offset = 0
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
    },
    props: {
        notif: {
            required: true 
        }
    },
    components: {
        AppLoader,
        AppCapsuleMenu
    }
}
</script>