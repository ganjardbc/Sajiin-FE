<template>
    <div id="App">
        <AppMobileLayout :title="'Feedbacks'">
            <div style="padding: 10px 0; width: 100%; overflow: unset;">
                <div class="display-flex row space-between" style="height: 40px; margin-bottom: 20px;">
                    <div class="width width-35">
                        <SearchField :enableResponsive="true" :placeholder="'Search feedbacks ..'" />
                    </div>
                    <div class="display-flex">
                        <AppButtonMenu 
                            icon="fa fa-lg fa-sort"
                            button="btn btn-white btn-icon btn-radius"
                            :onChange="(data) => onSingleMenu(data)" 
                            :data="[
                                {label: 'Current', icon: 'fa fa-lw fa-sort-numeric-down'}, 
                                {label: 'Old', icon: 'fa fa-lw fa-sort-numeric-up'}, 
                                {label: 'A to Z', icon: 'fa fa-lw fa-sort-alpha-down'}, 
                                {label: 'Z to A', icon: 'fa fa-lw fa-sort-alpha-up'}
                            ]" />
                        <AppButtonMenu 
                            icon="fa fa-lw fa-filter"
                            button="btn btn-white btn-icon btn-radius"
                            :onChange="(data) => onSingleMenu(data)" 
                            :data="[
                                {label: 'Active'}, 
                                {label: 'Inactive'}
                            ]" />
                        <button class="btn btn-white btn-icon btn-radius" @click="onShow('CREATE')">
                            <i class="fa fa-lg fa-plus" />
                        </button>
                    </div>
                </div>

                <AppLoader v-if="visibleLoader" style="margin-top: 10px;" />

                <div v-else>
                    <div v-if="datas.length > 0">
                        <div v-for="(dt, i) in datas" :key="i" class="card box-shadow" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                            <div>
                                <div class="display-flex space-between" style="padding-top: 5px;">
                                    <div class="width width-10" style="margin-bottom: 20px;">
                                        <div class="image image-50px image-circle">
                                            <i v-if="!dt.image" class="post-middle-absolute fa fa-lg fa-user-circle" style="font-size: 22px; color: #999;" />
                                            <img v-else :src="feedbackImageThumbnailUrl + dt.image" alt="" class="post-center">
                                        </div>
                                    </div>
                                    <div class="width width-90 width-mobile">
                                        <div style="padding-left: 10px;">
                                            <div class="fonts fonts-12 semibold">{{ dt.name }}</div>
                                            <div class="fonts fonts-12 grey">{{ dt.created_at | moment("from", "now") }}</div>
                                        </div>
                                    </div>
                                    <div style="position: absolute; top: 15px; right: 10px;">
                                        <!-- <div class="card-capsule active" style="margin-left: 15px; text-transform: capitalize;">{{ dt.status }}</div> -->
                                        <div class="display-flex space-between">
                                            <div></div>
                                            <div 
                                                :class="'card-capsule ' + (
                                                dt.status === 'active' 
                                                    ? 'active' 
                                                    : ''
                                                )" 
                                                style="margin-left: 15px; text-transform: capitalize;">
                                                {{ dt.status }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="fonts fonts-12 grey">"{{ dt.feedback }}"</div>
                            </div>
                            <!-- <div class="display-flex space-between" style="padding-top: 15px;">
                                <div></div>
                                <div class="display-flex">
                                    <button class="btn btn-white btn-icon btn-radius" @click="onShowEdit(dt.id)">
                                        <i class="fa fa-lw fa-pencil-alt" />
                                    </button>
                                    <button class="btn btn-white btn-icon btn-radius" @click="onShowHideDelete(dt.id)">
                                        <i class="fa fa-lw fa-trash-alt" />
                                    </button>
                                </div>
                            </div> -->
                        </div>
                    </div>
                    <div v-else>
                        <AppEmpty />
                    </div>
                </div>

            </div>
        </AppMobileLayout>

        <FormFeedback 
            v-if="visiblePopup"
            :data.sync="selectedData"
            :message.sync="selectedMessage"
            :title="formTitle" 
            :uploadImage="(data) => uploadImage(data)"
            :removeImage="removeImage"
            :onSave="(data) => onFormSave(data)"
            :onClose="onClose" />
        
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
import SearchField from '../../modules/SearchField'
import AppButtonMenu from '../../modules/AppButtonMenu'
import AppAlert from '../../modules/AppAlert'
import AppEmpty from '../../modules/AppEmpty'
import AppMobileLayout from '../../modules/AppMobileLayout'
import AppLoader from '../../modules/AppLoader'
import FormFeedback from './forms/Feedback'

export default {
    name: 'App',
    data () {
        return {
            formTitle: 'CREATE',
            selectedForm: null,
            selectedData: null,
            selectedMessage: null,
            selectedIndex: null,
            isActive: true,
            visibleLoader: false,
            visibleLoaderAction: false,
            visiblePopup: false,
            visibleAlertDelete: false,
            visibleAlertSave: false,
            dataUser: null,
            datas: [],
            selectedCustomer: null,
            selectedTable: null 
        }
    },
    mounted () {
        this.selectedCustomer = this.$cookies.get('customer')
        this.selectedTable = this.$cookies.get('table')
        this.dataUser = this.$cookies.get('user')
        this.getData()
    },
    components: {
        AppLoader,
        AppMobileLayout,
        AppEmpty,
        AppAlert,
        FormFeedback,
        AppButtonMenu,
        SearchField
    },
    methods: {
        onSingleMenu (data) {
            console.log('onSingleMenu', data)
        },
        onChangeMenu (data, index) {
            if (data == 0) {
                this.onShowEdit(index)
            } else {
                this.onShowHideDelete(index)
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
        onShow (title) {
            this.selectedData = null 
            this.visiblePopup = true
            this.formTitle = title
        },
        onShowEdit (index) {
            this.selectedData = this.onSearchData(index)
            this.visiblePopup = true 
            this.formTitle = 'EDIT'
        },
        onClose () {
            this.visiblePopup = false
            this.formTitle = 'CREATE'
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
            // console.log('onFormSave', data)
        },
        onChangeImage (data) {
            this.selectedData = {
                ...this.selectedData,
                image: data
            }
        },
        async removeData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const id = this.onSearchData(this.selectedIndex).feedback_id
            const payload = {
                feedback_id: id
            }

            const rest = await axios.post('/api/feedback/delete', payload, { headers: { Authorization: token } })
            // console.log('rest', rest)

            if (rest && rest.status === 200) {
                this.onShowHideDelete()
                this.onClose()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.getData()
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
            const url = this.formTitle === 'CREATE' ? '/api/feedback/post' : '/api/feedback/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.onClose()
                    this.getData()
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
            const payload = this.selectedData
            const url = '/api/feedback/uploadImage' 

            let formData = new FormData();
            formData.append('feedback_id', payload.feedback_id);
            formData.append('image', data);

            const rest = await axios.post(url, formData, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })

            if (rest && rest.status === 200) {
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data && data.image) {
                    this.onChangeImage(data && data.image)
                    this.getData()
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
            const payload = this.selectedData
            const url = '/api/feedback/removeImage' 

            let formData = new FormData();
            formData.append('feedback_id', payload.feedback_id);

            var a = confirm('remove this image ?')
            if (a) {
                const rest = await axios.post(url, formData, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })

                if (rest && rest.status === 200) {
                    this.visibleLoaderAction = false

                    const data = rest.data.data
                    this.onChangeImage(data && data.image)
                    this.getData()
                } else {
                    alert('Proceed failed')
                }
            }
        },
        async getData () {
            if (this.dataUser) {
                this.visibleLoader = true

                const token = 'Bearer '.concat(this.$cookies.get('token'))
                const payload = {
                    limit: 1000,
                    offset: 0,
                    owner_id: this.dataUser.id
                }
                
                const rest = await axios.post('/api/feedback/getAll', payload, { headers: { Authorization: token } })

                if (rest && rest.status === 200) {
                    const data = rest.data.data
                    this.datas = data
                    this.visibleLoader = false 
                } else {
                    this.visibleLoader = false 
                }
            } else {
                this.visibleLoader = false
            }
        }
    }
}
</script>