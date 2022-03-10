<template>
    <div id="App">
        <AppLoader v-if="visibleLoader" />
        <div v-else class="card-dashboard-container">
            <div class="display-flex display-mobile space-between">
                <div class="fonts bold big margin" style="margin-bottom: 15px;">{{ formTitle === 'CREATE' ? 'Create Shop' : 'Shop' }}</div>
            </div>
            <div class="display-flex display-mobile space-between" style="padding-top: 10px; padding-bottom: 10px;">
                <div class="width width-25 width-mobile" style="margin-bottom: 20px;">
                    <div class="card no-padding-mobile box-shadow bg-white">
                        <div class="width width-full">
                            <div class="image image-padding" style="margin: auto; text-align: center;">
                                <i v-if="!image" class="post-middle-absolute fa fa-lg fa-store" style="font-size: 58px; color: #999;" />
                                <img v-else :src="image ? image : ''" alt="">
                                <button v-if="formTitle !== 'CREATE' ? true : false" class="btn btn-sekunder btn-icon" style="position: absolute; bottom: 10px; right: 10px; border-radius: 100%;" @click="onButtonUpload">
                                    <i class="post-center fa fa-lg fa-pencil-alt" style="font-size: 16px;" />
                                </button>
                            </div>

                            <!-- <AppButtonQR 
                                v-if="dataUser && dataUser.role_name !== 'customer'"
                                style="margin-top: 15px;"
                                :buttonClass="'btn btn-sekunder btn-full'"
                                :code="formData.code"
                                title="Show QR Customer" 
                            /> -->

                            <AppButtonQR 
                                v-if="dataUser && dataUser.role_name !== 'customer'"
                                style="margin-top: 15px;"
                                :buttonClass="'btn btn-sekunder btn-full'"
                                :code="formData.codeVisitor"
                                title="Show QR Visitor" 
                            />
                        </div>
                    </div>
                </div>

                <div class="width width-73 width-mobile">
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
                            <div class="field-label">SHOP ID</div>
                            <input 
                                type="text" 
                                placeholder="" 
                                class="field field-sekunder" 
                                name="shop_id" 
                                id="shop_id" 
                                v-model="formData.shop_id"
                                readonly>
                            <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                {{ formMessage && formMessage.shop_id && formMessage.shop_id[0] }}
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
                        <div class="fonts fonts-10 black semibold" style="margin-bottom: 10px;">Opening Hours</div>
                        <div class="display-flex margin margin-bottom-15-px">
                            <div class="field-group" style="width: calc(100% - 10px); margin-right: 10px;">
                                <div class="field-label">OPEN DAY</div>
                                <input 
                                    type="text" 
                                    placeholder="" 
                                    class="field field-sekunder" 
                                    name="open_day" 
                                    id="open_day" 
                                    v-model="formData.open_day"
                                    :readonly="formTitle === 'VIEW' ? true : false">
                                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                    {{ formMessage && formMessage.open_day && formMessage.open_day[0] }}
                                </div>
                            </div>
                            <div class="field-group" style="width: calc(100% - 10px); margin-left: 10px;">
                                <div class="field-label">CLOSE DAY</div>
                                <input 
                                    type="text" 
                                    placeholder="" 
                                    class="field field-sekunder" 
                                    name="close_day" 
                                    id="close_day" 
                                    v-model="formData.close_day"
                                    :readonly="formTitle === 'VIEW' ? true : false">
                                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                    {{ formMessage && formMessage.close_day && formMessage.close_day[0] }}
                                </div>
                            </div>
                        </div>
                        <div class="display-flex margin margin-bottom-0-px">
                            <div class="field-group" style="width: calc(100% - 10px); margin-right: 10px;">
                                <div class="field-label">OPEN TIME</div>
                                <input 
                                    type="text" 
                                    placeholder="" 
                                    class="field field-sekunder" 
                                    name="open_time" 
                                    id="open_time" 
                                    v-model="formData.open_time"
                                    :readonly="formTitle === 'VIEW' ? true : false">
                                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                    {{ formMessage && formMessage.open_time && formMessage.open_time[0] }}
                                </div>
                            </div>
                            <div class="field-group" style="width: calc(100% - 10px); margin-left: 10px;">
                                <div class="field-label">CLOSE TIME</div>
                                <input 
                                    type="text" 
                                    placeholder="" 
                                    class="field field-sekunder" 
                                    name="close_time" 
                                    id="close_time" 
                                    v-model="formData.close_time"
                                    :readonly="formTitle === 'VIEW' ? true : false">
                                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                    {{ formMessage && formMessage.close_time && formMessage.close_time[0] }}
                                </div>
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
                                name="location" 
                                id="location" 
                                class="field field-sekunder field-textarea" 
                                v-model="formData.location"
                                :readonly="formTitle === 'VIEW' ? true : false"></textarea>
                            <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                {{ formMessage && formMessage.location && formMessage.location[0] }}
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
                        <div class="field-group">
                            <div class="field-label">AVAILABLE</div>
                            <div v-if="formTitle !== 'VIEW' ? true : false">
                                <div class="display-flex space-between">
                                    <div class="fonts micro black">Is this shop still available ?</div>
                                    <label class="switch green">
                                        <input 
                                            type="checkbox" 
                                            name="is_available" 
                                            id="is_available" 
                                            v-model="formData.is_available"
                                            :readonly="formTitle === 'VIEW' ? true : false" />
                                        <span class="slider round" />
                                    </label>
                                </div>
                            </div>
                            <div v-else>
                                <div style="width: 100%;">
                                    <input 
                                        type="text" 
                                        placeholder="" 
                                        class="field field-sekunder" 
                                        name="is_available" 
                                        id="is_available" 
                                        style="text-transform: capitalize;"
                                        :value="formData.is_available ? 'Available' : 'Unavailable'"
                                        readonly>
                                </div>
                            </div>
                            <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                {{ formMessage && formMessage.is_available && formMessage.is_available[0] }}
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
import { mapGetters, mapActions } from 'vuex'
import AppLoader from '../../modules/AppLoader'
import AppAlert from '../../modules/AppAlert'
import SearchField from '../../modules/SearchField'
import AppButtonMenu from '../../modules/AppButtonMenu'
import AppListDownMenu from '../../modules/AppListDownMenu'
import AppButtonQR from '../../modules/AppButtonQR'
import AppImage from '../../modules/AppImage'
import AppPopupForm from '../../modules/AppPopupForm'
import Form from './Form'

const payload = {
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
            filters: {
                name: { value: '', keys: ['name'] }
            },
            limitPage: 10,
            currentPage: 1,
            totalPages: 0,
            dataUser: null,
            limit: 1,
            offset: 0
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.getData(this.limit, this.offset)
    },
    components: {
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
        ...mapActions({
            setToast: 'toast/setToast'
        }),
        makeToast (title) {
            const payload = {
                visible: true,
                title: title
            }
            this.setToast(payload)
        },
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
            this.$cookies.set('shop', this.formData)
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
            const time = new Date().getTime()
            const newPayload = this.formTitle === 'CREATE' ? {
                ...this.formData,
                shop_id: 'SH-' + time.toString()
            } : {
                ...this.formData
            }
            const url = this.formTitle === 'CREATE' ? '/api/shop/post' : '/api/shop/update' 

            const rest = await axios.post(url, newPayload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.$cookies.set('shop', this.formData)
                    this.onClose()
                    this.getData(this.limit, 0)
                    this.makeToast('Shop Updated')
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
                    this.onButtonUpload()
                    this.makeToast('Shop Cover Updated')
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
                    this.onButtonUpload()
                    this.makeToast('Shop Cover Removed')
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
                    const code = dt.shop ? dt.shop.shop_id : ''
                    return data.push({...dt, code: code})
                })

                this.datas = data 
                const selectShop = this.datas[0]

                if (selectShop) {
                    this.formData = this.datas ? {
                        ...this.formData,
                        id: selectShop.shop.id,
                        shop_id: selectShop.shop.shop_id,
                        image: selectShop.shop.image,
                        name: selectShop.shop.name,
                        about: selectShop.shop.about,
                        email: selectShop.shop.email,
                        phone: selectShop.shop.phone,
                        location: selectShop.shop.location,
                        open_day: selectShop.shop.open_day,
                        close_day: selectShop.shop.close_day,
                        open_time: selectShop.shop.open_time,
                        close_time: selectShop.shop.close_time,
                        status: selectShop.shop.status,
                        is_available: selectShop.shop.is_available,
                        code: selectShop.code,
                        codeVisitor: this.deployUrl + (this.$router.mode === 'hash' ? '#' : '') + '/visit-shop/' + (selectShop.shop ? selectShop.shop.shop_id : ''),
                    } : {
                        ...payload
                    }
                    this.image = this.formData.image ? this.shopImageThumbnailUrl + this.formData.image : ''
                }

                this.formTitle = selectShop ? 'EDIT' : 'CREATE'
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