<template>
    <div id="Profile" class="card-dashboard-container">
        <div style="padding-bottom: 15px;">
            <h1 class="fonts big black bold">Profile</h1>
        </div>

        <div class="display-flex display-mobile space-between" style="padding-top: 10px; padding-bottom: 10px;">
            <div class="width width-25 width-mobile" style="margin-bottom: 30px;">
                <div class="card no-padding-mobile box-shadow bg-white">
                    <div class="content-center" style="margin-bottom: 20px;">
                        <div class="image image-padding" style="margin: auto; text-align: center;">
                            <i v-if="!image" class="post-middle-absolute fa fa-lg fa-user-circle" style="font-size: 58px; color: #999;" />
                            <img v-else :src="image ? image : ''" alt="">
                            <button class="btn btn-sekunder btn-icon" style="position: absolute; bottom: 10px; right: 10px; border-radius: 100%;" @click="onButtonUpload">
                                <i class="post-center fa fa-lg fa-pencil-alt" style="font-size: 16px;" />
                            </button>
                        </div>
                    </div>

                    <!-- <AppButtonQR 
                        v-if="dataUser && dataUser.role_name !== 'customer'"
                        :buttonFull="true"
                        :code="code"
                        title="Show QR Restaurant" 
                    /> -->

                    <div class="border border-bottom margin margin-top-20-px"></div>

                    <button class="btn btn-primary btn-full" style="margin-top: 20px;" @click="onLogout">
                        LOGOUT 
                    </button>
                </div>
            </div>

            <div class="width width-73 width-mobile">
                <div class="card no-padding-mobile box-shadow bg-white" style="margin-bottom: 20px;">
                    <div class="width width-100">
                        <div class="margin margin-bottom-20-px">
                            <div class="fonts fonts-10 black semibold">General Info</div>
                        </div>
                        <div class="width width-100 display-flex display-mobile margin margin-bottom-20-px">
                            <div class="width width-30 width-mobile fonts fonts-11">ID</div>
                            <div class="width width-70 width-mobile">
                                <input 
                                    type="text" 
                                    placeholder="" 
                                    class="field field-sekunder" 
                                    name="id" 
                                    id="id" 
                                    v-model="formData.id"
                                    readonly>
                            </div>
                        </div>
                        <div class="width width-100 display-flex display-mobile margin margin-bottom-20-px">
                            <div class="width width-30 width-mobile fonts fonts-11">Nama</div>
                            <div class="width width-70 width-mobile">
                                <input 
                                    type="text" 
                                    placeholder="" 
                                    class="field field-sekunder" 
                                    name="name" 
                                    id="name" 
                                    v-model="formData.name">
                                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                    {{ formMessage && formMessage.name && formMessage.name[0] }}
                                </div>
                            </div>
                        </div>
                        <div class="width width-100 display-flex display-mobile margin margin-bottom-20-px">
                            <div class="width width-30 width-mobile">
                                <div class="fonts fonts-11">Enabled</div>
                                <div class="fonts micro black" style="margin-bottom: 10px;">Is this user enable ?</div>
                            </div>
                            <div class="width width-70 width-mobile">
                                <label class="switch green">
                                    <input 
                                        type="checkbox" 
                                        name="enabled" 
                                        id="enabled" 
                                        v-model="formData.enabled" />
                                    <span class="slider round" />
                                </label>
                            </div>
                        </div>
                        <div class="width width-100 display-flex display-mobile margin margin-bottom-20-px">
                            <div class="width width-30 width-mobile">
                                <div class="fonts fonts-11">Status</div>
                                <div class="fonts micro black" style="margin-bottom: 10px;">Is this user active ?</div>
                            </div>
                            <div class="width width-70 display-flex">
                                <label class="radio">
                                    <input 
                                        type="radio" 
                                        name="status"
                                        id="active"
                                        value="active"
                                        v-model="formData.status" />
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
                                        v-model="formData.status" />
                                    <span class="checkmark" />
                                    <span class="fonts micro">
                                        Inactive
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card no-padding-mobile box-shadow bg-white" style="margin-bottom: 20px;">
                    <div class="width width-100">
                        <div class="margin margin-bottom-20-px">
                            <div class="fonts fonts-10 black semibold">Private Info</div>
                        </div>
                        <div class="width width-100 display-flex display-mobile margin margin-bottom-20-px">
                            <div class="width width-30 width-mobile fonts fonts-11">Email</div>
                            <div class="width width-70 width-mobile">
                                <input 
                                    type="text" 
                                    placeholder="" 
                                    class="field field-sekunder" 
                                    name="email" 
                                    id="email" 
                                    v-model="formData.email"
                                    readonly>
                                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                    {{ formMessage && formMessage.email && formMessage.email[0] }}
                                </div>
                            </div>
                        </div>
                        <div class="width width-100 display-flex display-mobile margin margin-bottom-20-px">
                            <div class="width width-30 width-mobile fonts fonts-11">Role</div>
                            <div class="width width-70 width-mobile">
                                <input 
                                    type="text" 
                                    placeholder="" 
                                    class="field field-sekunder" 
                                    name="role_name" 
                                    id="role_name" 
                                    v-model="formData.role_name"
                                    readonly>
                                <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                                    {{ formMessage && formMessage.role_name && formMessage.role_name[0] }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="width width-100 width-mobile">
                    <div class="display-flex space-between">
                        <div></div>
                        <button class="btn btn-main" @click="onShowHideSave">
                            Save & Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <AppPopupForm 
            v-if="visiblePopup"
            :title="'Update Profile'"
            :onClose="onButtonUpload"
        >
            <div class="field-group" style="padding-top: 10px;">
                <AppImage 
                    :image.sync="image"
                    :isEnable="true"
                    :onUpload="(data) => uploadImage(data)"
                    :onRemove="removeImage"
                />
            </div>
        </AppPopupForm>

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
import AppWrapper from '../../modules/AppWrapper'
import AppButton from '../../modules/AppButton'
import AppText from '../../modules/AppText'
import AppForm from '../../modules/AppForm'
import AppCardCharts from '../../modules/AppCardCharts'
import AppButtonQR from '../../modules/AppButtonQR'
import AppImage from '../../modules/AppImage'
import AppPopupForm from '../../modules/AppPopupForm'
import AppAlert from '../../modules/AppAlert'

const payload = {
    id: '',
    image: '',
    name: '',
    username: '',
    email: '',
    password: '',
    email_verified_at: '',
    provider: '',
    enabled: '',
    status: '',
    role_id: '',
    role_name: ''
}

export default {
    name: 'Profile',
    data () {
        return {
            visibleAlertSave: false,
            visibleLoaderAction: false,
            visiblePopup: false,
            image: '',
            code: '',
            formData: {...payload},
            formMessage: null,
            dataUser: null,
            dataShop: null
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.dataShop = this.$cookies.get('shop')
        const token = this.$cookies.get('token')
        this.formData = {
            ...payload,
            id: this.dataUser.id,
            name: this.dataUser.name,
            role_id: this.dataUser.role_id,
            role_name: this.dataUser.role_name,
            enabled: this.dataUser.enabled,
            status: this.dataUser.status,
            email: this.dataUser.email,
            image: this.dataUser.image
        }
        this.image = this.dataUser.image ? this.adminImageThumbnailUrl + this.dataUser.image : ''
        this.code = this.deployUrl + (this.$router.mode === 'hash' ? '#' : '') + '/generate-customer/' + token
    },
    components: {
        AppPopupForm,
        AppImage,
        AppButtonQR,
        AppWrapper,
        AppButton,
        AppText,
        AppCardCharts,
        AppForm,
        AppAlert
    },
    methods: {
        ...mapActions({
            setToast: 'toast/setToast',
            removeCookieAuth: 'auth/removeCookieAuth',
            signOut: 'auth/signOut',
            setUser: 'auth/setUser'
        }),

        makeToast (title) {
            const payload = {
                visible: true,
                title: title
            }
            this.setToast(payload)
        },

        onChangeCustomer (data) {
            console.log('onChangecustomer', data)
        },

        onButtonUpload () {
            this.visiblePopup = !this.visiblePopup
        },

        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
        },

        onChangeImage (data) {
            this.formData = {
                ...this.formData,
                image: data
            }
            this.image = data ? this.adminImageThumbnailUrl + data : ''
            this.setUser({
                ...this.user,
                image: data
            })
        },

        async saveData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const newPayload = {
                ...this.formData
            }
            const url = '/api/user/update'

            const rest = await axios.post(url, newPayload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.$cookies.set('user', data)
                    this.makeToast('Profile Updated')
                } else {
                    this.formMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },

        async onLogout () {
            var a = confirm('logout your session ?')
            if (a) {
                const rest = await this.signOut(this.token)
                
                if (rest.data.status === 'ok') {
                    this.removeCookieAuth()
                    this.$router.push({ name: 'home' })
                    // window.location = this.initUrl
                }
            }
        },

        async uploadImage (data) {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.formData
            const url = '/api/user/uploadImage' 

            let formData = new FormData();
            formData.append('id', payload.id);
            formData.append('image', data);

            const rest = await axios.post(url, formData, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })

            if (rest && rest.status === 200) {
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data && data.image) {
                    this.onChangeImage(data && data.image)
                    this.onButtonUpload()
                    this.makeToast('Profile Picture Updated')
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
            const payload = this.formData
            const url = '/api/user/removeImage' 

            let formData = new FormData();
            formData.append('id', payload.id);

            var a = confirm('remove this image ?')
            if (a) {
                const rest = await axios.post(url, formData, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })

                if (rest && rest.status === 200) {
                    this.visibleLoaderAction = false

                    const data = rest.data.data
                    this.onChangeImage(data && data.image)
                    this.onButtonUpload()
                    this.makeToast('Profile Picture Removed')
                } else {
                    alert('Proceed failed')
                }
            }
        },

        onBuilded () {
            alert('still builded !')
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            token: 'auth/token'
        })
    },
}
</script>