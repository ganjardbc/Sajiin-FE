<template>
    <div id="App" style="position: relative;">
        <button :class="'btn btn-icon btn-radius btn-white'" :style="'background-color: ' + (visiblePopup ? '#f5f5f5' : '' )" title="Notifications" @click="opPopup">
            <i class="fa fa-lg fa-bell" />
            <span v-if="notif" class="notif">{{ notif }}</span>
        </button>

        <div v-if="visiblePopup" class="card-popup small no-padding bg-white box-shadow" style="position: absolute; top: 40px; right: 0; z-index: 1000;">
            <div class="card-popoup-header display-flex space-between">
                <div>
                    <div class="post-top display-flex align-center">
                        <div class="fonts fonts-10 black semibold" style="margin-right: 5px;">Notifications</div>
                        <div class="card-value">
                            <div class="label">{{ notif }}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="post-top fonts fonts-10 red pointer">Mark All As Read</div>
                </div>
            </div>
            <div class="card-popup-body">
                <div style="padding-left: 15px; padding-right: 15px;">
                    <div v-for="(dt, i) in datas" :key="i" class="card box-shadow" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                        <div class="display-flex space-between" style="padding-top: 5px; padding-bottom: 5px;">
                            <div style="width: 40px; margin-right: 15px;">
                                <div class="image image-padding border border-full">
                                    <img v-if="dt.image" :src="notificationImageThumbnailUrl + dt.image" alt="" class="post-center">
                                    <i v-else class="post-middle-absolute icn fa fa-lw fa-bell"></i>
                                </div>
                            </div>
                            <div style="width: calc(100% - 55px);">
                                <div class="display-flex" style="margin-bottom: 5px;">
                                    <div class="fonts fonts-11 semibold" style="margin-top: 3px;">{{ dt.title }}</div>
                                    <div 
                                        :class="'card-capsule ' + (
                                        dt.is_read 
                                            ? 'active' 
                                            : ''
                                        )" 
                                        style="margin-left: 10px; text-transform: capitalize;">
                                        {{ dt.is_read ? 'Read' : 'Unread' }}
                                    </div>
                                </div>
                                <div>
                                    <div class="fonts fonts-10 grey">{{ dt.subtitle }}</div>
                                    <div class="fonts fonts-10 grey">{{ dt.created_at | moment("from", "now") }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <AppLoader v-if="visibleLoader" />
                </div>
                <div v-if="!visibleLoader" class="display-flex center">
                    <button v-if="visibleLoadMore" class="btn btn-sekunder" style="margin-top: 10px; margin-bottom: 20px;" @click="getData(limit, offset)">
                        Load More
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import AppLoader from './AppLoader'

export default {
    name: 'App',
    data () {
        return {
            visiblePopup: false,
            visibleLoader: false,
            visibleLoadMore: false,
            datas: [],
            dataUser: null,
            limit: 4,
            offset: 0
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.getData(this.limit, this.offset)
    },
    methods: {
        opPopup () {
            this.visiblePopup = !this.visiblePopup
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

                console.log('newdata', newData)

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
        AppLoader
    }
}
</script>