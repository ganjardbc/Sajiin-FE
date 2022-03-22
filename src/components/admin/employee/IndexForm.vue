<template>
    <div id="App">
        <AppLoader v-if="visibleLoader" />
        
        <AppEmpty v-if="!visibleLoader && !formData.employee_id" />

        <div v-if="!visibleLoader && formData.employee_id" class="card-dashboard-container">
            <div class="display-flex display-mobile space-between">
                <div class="fonts bold big margin" style="margin-top: 15px; margin-bottom: 15px;">Employee Profile</div>
            </div>

            <div class="display-flex display-mobile space-between" style="padding-top: 10px; padding-bottom: 10px;">
                <div class="width width-25 width-mobile" style="margin-bottom: 20px;">
                    <div class="card no-padding-mobile box-shadow bg-white">
                        <div class="width width-full">
                            <div class="image image-padding" style="margin: auto; text-align: center;">
                                <i v-if="!image" class="post-middle-absolute fa fa-lg fa-id-card" style="font-size: 58px; color: #999;" />
                                <img v-else :src="image ? image : ''" alt="">
                                <button class="btn btn-sekunder btn-icon" style="position: absolute; bottom: 10px; right: 10px; border-radius: 100%;" @click="onButtonUpload">
                                    <i class="post-center fa fa-lg fa-pencil-alt" style="font-size: 16px;" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="width width-73 width-mobile">
                    <div class="card box-shadow" style="margin-bottom: 20px;">
                        <div class="fonts fonts-10 black semibold" style="margin-bottom: 10px;">Working Place</div>
                        <div class="display-flex space-between">
                            <div class="width width-20">
                                <div class="image image-padding" style="margin: auto; text-align: center;">
                                    <i v-if="!dataShop" class="post-middle-absolute fa fa-lg fa-id-card" style="font-size: 58px; color: #999;" />
                                    <img v-else :src="dataShop ? (shopImageThumbnailUrl + dataShop.image) : ''" alt="">
                                </div>
                            </div>
                            <div class="width width-78">
                                <div class="field-group margin margin-bottom-15-px">
                                    <div class="field-label">SHOP</div>
                                    <input 
                                        type="text" 
                                        placeholder="" 
                                        class="field field-sekunder" 
                                        name="shop" 
                                        id="shop" 
                                        v-model="dataShop.name"
                                        readonly>
                                </div>
                                <div class="field-group margin margin-bottom-15-px">
                                    <div class="field-label">ADDRESS</div>
                                    <input 
                                        type="text" 
                                        placeholder="" 
                                        class="field field-sekunder" 
                                        name="shop_address" 
                                        id="shop_address" 
                                        v-model="dataShop.location"
                                        readonly>
                                </div>
                                <div class="field-group margin margin-bottom-15-px">
                                    <div class="field-label">POSITION</div>
                                    <input 
                                        type="text" 
                                        placeholder="" 
                                        class="field field-sekunder" 
                                        name="position" 
                                        id="position" 
                                        v-model="dataPosition.title"
                                        readonly>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                    <div class="card box-shadow" style="margin-bottom: 20px;">
                        <div class="fonts fonts-10 black semibold" style="margin-bottom: 10px;">General Info</div>
                        <div class="field-group margin margin-bottom-15-px">
                            <div class="field-label">ID</div>
                            <input 
                                type="text" 
                                placeholder="" 
                                class="field field-sekunder" 
                                name="id" 
                                id="id" 
                                v-model="formData.id"
                                readonly>
                        </div>
                        <div class="field-group margin margin-bottom-15-px">
                            <div class="field-label">EMPLOYEE ID</div>
                            <input 
                                type="text" 
                                placeholder="" 
                                class="field field-sekunder" 
                                name="employee_id" 
                                id="employee_id" 
                                v-model="formData.employee_id"
                                readonly>
                            <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                {{ formMessage && formMessage.employee_id && formMessage.employee_id[0] }}
                            </div>
                        </div>
                        <div class="field-group margin margin-bottom-15-px">
                            <div class="field-label">NAME</div>
                            <input 
                                type="text" 
                                placeholder="" 
                                class="field field-sekunder" 
                                name="name" 
                                id="name" 
                                v-model="formData.name"
                                :readonly="formTitle === 'VIEW' ? true : false">
                            <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                {{ formMessage && formMessage.name && formMessage.name[0] }}
                            </div>
                        </div>
                        <div class="field-group margin margin-bottom-0-px">
                            <div class="field-label">ABOUT</div>
                            <textarea 
                                name="about" 
                                id="about" 
                                class="field field-sekunder field-textarea" 
                                v-model="formData.about"
                                :readonly="formTitle === 'VIEW' ? true : false"></textarea>
                            <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                {{ formMessage && formMessage.about && formMessage.about[0] }}
                            </div>
                        </div>
                    </div>

                    <div class="card box-shadow" style="margin-bottom: 20px;">
                        <div class="fonts fonts-10 black semibold" style="margin-bottom: 10px;">Contact</div>
                        <div class="field-group margin margin-bottom-15-px">
                            <div class="field-label">EMAIL</div>
                            <input 
                                type="email" 
                                placeholder="" 
                                class="field field-sekunder" 
                                name="email" 
                                id="email" 
                                v-model="formData.email"
                                :readonly="formTitle === 'VIEW' ? true : false">
                            <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                {{ formMessage && formMessage.email && formMessage.email[0] }}
                            </div>
                        </div>
                        <div class="field-group margin margin-bottom-0-px">
                            <div class="field-label">PHONE</div>
                            <input 
                                type="text" 
                                placeholder="" 
                                class="field field-sekunder" 
                                name="phone" 
                                id="phone" 
                                v-model="formData.phone"
                                :readonly="formTitle === 'VIEW' ? true : false">
                            <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                {{ formMessage && formMessage.phone && formMessage.phone[0] }}
                            </div>
                        </div>
                    </div>

                    <div class="card box-shadow" style="margin-bottom: 20px;">
                        <div class="fonts fonts-10 black semibold" style="margin-bottom: 10px;">Location</div>
                        <div class="field-group margin margin-bottom-0-px">
                            <div class="field-label">ADDRESS</div>
                            <textarea 
                                name="address" 
                                id="address" 
                                class="field field-sekunder field-textarea" 
                                v-model="formData.address"
                                :readonly="formTitle === 'VIEW' ? true : false"></textarea>
                            <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                {{ formMessage && formMessage.address && formMessage.address[0] }}
                            </div>
                        </div>
                    </div>

                    <div class="card box-shadow" style="margin-bottom: 20px;">
                        <div class="fonts fonts-10 black semibold" style="margin-bottom: 10px;">Configuration</div>
                        <div class="field-group margin margin-bottom-15-px">
                            <div class="field-label">STATUS</div>
                            <div v-if="formTitle !== 'VIEW' ? true : false">
                                <div class="display-flex" style="padding-bottom: 10px;">
                                    <label class="radio">
                                        <input 
                                            type="radio" 
                                            name="status"
                                            id="active"
                                            value="active"
                                            v-model="formData.status"
                                            :readonly="formTitle === 'VIEW' ? true : false" />
                                        <span class="checkmark" />
                                        <span class="fonts micro">
                                            Active
                                        </span>
                                    </label>

                                    <label class="radio">
                                        <input 
                                            type="radio" 
                                            name="status"
                                            id="inactive"
                                            value="inactive"
                                            v-model="formData.status"
                                            :readonly="formTitle === 'VIEW' ? true : false" />
                                        <span class="checkmark" />
                                        <span class="fonts micro">
                                            Inactive
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div v-else>
                                <div style="width: 100%;">
                                    <input 
                                        type="text" 
                                        placeholder="" 
                                        class="field field-sekunder" 
                                        name="status" 
                                        id="status" 
                                        style="text-transform: capitalize;"
                                        :value="formData.status"
                                        readonly>
                                </div>
                            </div>
                            <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                {{ formMessage && formMessage.status && formMessage.status[0] }}
                            </div>
                        </div>
                    </div>

                    <div class="display-flex space-between">
                        <div></div>
                        <button class="btn btn-main" @click="onSave">
                            Save & Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <AppPopupForm 
            v-if="visiblePopup"
            :title="'Update Cover'"
            :onClose="onButtonUpload"
        >
            <div class="field-group" style="padding-top: 10px;">
                <div class="fonts fonts-10 black semibold" style="margin-bottom: 10px;">Cover</div>
                <AppImage 
                    :image.sync="image"
                    :isEnable="formTitle !== 'VIEW' ? true : false"
                    :onUpload="(data) => uploadImage(data)"
                    :onRemove="removeImage"
                />
                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                    {{ formMessage && formMessage.image && formMessage.image[0] }}
                </div>
            </div>
        </AppPopupForm>

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
import AppButtonQR from '../../modules/AppButtonQR'
import AppImage from '../../modules/AppImage'
import AppPopupForm from '../../modules/AppPopupForm'
import AppEmpty from '../../modules/AppEmpty'
import Form from './Form'

const payload = {
    id: '',
    employee_id: '',
    image: '',
    name: '',
    phone: '',
    email: '',
    status: '',
    is_available: 0,
    about: '',
    address: '',
    position_id: 0,
    shop_id: 0
}

const shop = {
    id: '',
    shop_id: '',
    image: '',
    name: '',
    about: '',
    email: '',
    phone: '',
    location: '',
    open_day: '',
    close_day: '',
    open_time: '',
    close_time: '',
    status: '',
    is_available: 0
}

const position = {
    id: '',
    position_id: '',
    image: '',
    title: '',
    description: '',
    status: 'active'
}

export default {
    name: 'App',
    data () {
        return {
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            visibleLoadMore: false,
            isSidebarSmall: false,
            visiblePopup: false,
            formTitle: 'CREATE',
            formClass: false,
            image: '',
            datas: [],
            menus: [],
            selectedIndex: null,
            formData: {...payload},
            formMessage: null,
            dataShop: {...shop},
            dataPosition: {...position},
            filters: {
                name: { value: '', keys: ['name'] }
            },
            limitPage: 10,
            currentPage: 1,
            totalPages: 0,
            dataUser: null,
            dataEmployee: null,
            limit: 1,
            offset: 0
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.dataEmployee = this.$cookies.get('employee')
        this.getData()
    },
    components: {
        AppEmpty,
        AppPopupForm,
        AppImage,
        AppButtonQR,
        AppListDownMenu,
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
        onButtonUpload () {
            this.visiblePopup = !this.visiblePopup
        },
        onSearch (data) {
            console.log('search', data)
        },
        onChangeMenu (index) {
            console.log('onChange', index)
        },
        onChangeMenuShop (index, id) {
            console.log('onChange', index)
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
                if (dt.id === id) {
                    payload = {...dt}
                }
                return null 
            })
            return payload
        },
        onSave () {
            this.onFormSave(this.formData)
        },
        onClose () {
            this.formClass = false
            this.visiblePopup = false 
        },
        onShow (title, index = null) {
            this.formClass = true
            this.formTitle = title
            this.formData = index >= 0 ? this.onSearchData(index) : null
            this.formMessage = null 
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
            this.formData = data ? data : null
        },
        onChangeImage (data) {
            this.formData = {
                ...this.formData,
                image: data
            }
            this.image = this.formData.image ? this.shopImageThumbnailUrl + this.formData.image : ''
            this.$cookies.set('employee', this.formData)
        },
        async removeData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const id = this.onSearchData(this.selectedIndex).employee_id
            const payload = {
                employee_id: id
            }

            console.log('payload', id)

            const rest = await axios.post('/api/employee/delete', payload, { headers: { Authorization: token } })
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
            const time = new Date().getTime()
            const newPayload = {
                ...this.formData
            }
            const url = '/api/employee/update' 

            const rest = await axios.post(url, newPayload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.$cookies.set('employee', this.formData)
                    this.onClose()
                    this.getData(this.limit, 0)
                } else {
                    this.formMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async uploadImage (data) {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.formData
            const url = '/api/employee/uploadImage' 

            let formData = new FormData();
            formData.append('employee_id', payload.employee_id);
            formData.append('image', data);

            const rest = await axios.post(url, formData, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })

            if (rest && rest.status === 200) {
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data && data.image) {
                    this.onChangeImage(data && data.image)
                    this.onButtonUpload()
                    this.formMessage = []
                } else {
                    this.formMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
            }
        },
        async removeImage () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.formData
            const url = '/api/employee/removeImage'

            let formData = new FormData();
            formData.append('employee_id', payload.employee_id);

            var a = confirm('remove this image ?')
            if (a) {
                const rest = await axios.post(url, formData, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })

                if (rest && rest.status === 200) {
                    this.visibleLoaderAction = false

                    const data = rest.data.data
                    this.onChangeImage(data && data.image)
                    this.onButtonUpload()
                } else {
                    alert('Proceed failed')
                }
            }
        },
        async getData () {
            this.visibleLoader = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                employee_id: this.dataEmployee.employee_id
            }

            const rest = await axios.post('/api/employee/getByID', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.formData = data 
                this.dataShop = this.formData.shop 
                this.dataPosition = this.formData.position
                this.image = this.formData.image ? this.employeeImageThumbnailUrl + this.formData.image : ''
                this.visibleLoader = false 
            } else {
                this.visibleLoader = false 
            }
        }
    }
}
</script>