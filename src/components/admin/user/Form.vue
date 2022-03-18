<template>
    <div id="form">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="this.title !== 'VIEW' ? true : false"
            :onSave="onButtonSave"
            :onClose="onClose">

            <AppTabs 
                :selectedIndex="selectedIndex" 
                :data="tabs" 
                :onChange="(data) => onChangeTabs(data)" 
                class="margin margin-bottom-15-px" />

            <div v-if="selectedIndex === 0">
                <div v-if="this.title !== 'CREATE' ? true : false" class="field-group margin margin-bottom-15-px">
                    <div class="field-label">IMAGE</div>
                    <AppImage 
                        :image.sync="image"
                        :isEnable="this.title !== 'VIEW' ? true : false"
                        :onUpload="(data) => uploadImage(data)"
                        :onRemove="removeImage"
                    />
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.image && formMessage.image[0] }}
                    </div>
                </div>
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
                    <div class="field-label">ROLE</div>
                    <select 
                        class="cf-input slc slc-sekunder"
                        name="category_id" 
                        id="category_id" 
                        v-model="formData.role_id"
                        :disabled="this.title === 'VIEW' ? true : false">
                        <option v-for="(ctr, index) in formRoles" :value="ctr.id" :key="index">
                            {{ ctr.role_name }}
                        </option>
                    </select>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.role_id && formMessage.role_id[0] }}
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
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.name && formMessage.name[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">EMAIL</div>
                    <input 
                        type="email" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="email" 
                        id="email" 
                        v-model="formData.email"
                        :readonly="this.title === 'CREATE' ? false : true">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.email && formMessage.email[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">USERNAME</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="username" 
                        id="username" 
                        v-model="formData.username"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.username && formMessage.username[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PASSWORD</div>
                    <input 
                        type="password" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="password" 
                        id="password" 
                        v-model="formData.password"
                        :readonly="this.title === 'CREATE' ? false : true">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.password && formMessage.password[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ENABLED</div>
                    <div class="display-flex space-between">
                        <div class="fonts micro black">Is this user enable ?</div>
                        <label class="switch green">
                            <input 
                                type="checkbox" 
                                name="enabled" 
                                id="enabled" 
                                v-model="formData.enabled"
                                :disabled="this.title === 'VIEW' ? true : false" />
                            <span class="slider round" />
                        </label>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.enabled && formMessage.enabled[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-25-px">
                    <div class="field-label">STATUS</div>
                    <div class="display-flex">
                        <label class="radio">
                            <input 
                                type="radio" 
                                name="status"
                                id="active"
                                value="active"
                                v-model="formData.status"
                                :disabled="this.title === 'VIEW' ? true : false" />
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
                                :disabled="this.title === 'VIEW' ? true : false" />
                            <span class="checkmark" />
                            <span class="fonts micro">
                                Inactive
                            </span>
                        </label>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.status && formMessage.status[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">EMAIL VERIFIED AT</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="email_verified_at" 
                        id="email_verified_at" 
                        v-model="formData.email_verified_at"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.email_verified_at && formMessage.email_verified_at[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PROVIDER</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="provider" 
                        id="provider" 
                        v-model="formData.provider"
                        :readonly="this.title === 'VIEW' ? true : false">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.provider && formMessage.provider[0] }}
                    </div>
                </div>
            </div>

            <div v-if="selectedIndex === 1">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ID</div>
                    <div v-if="this.title !== 'VIEW'" class="card-search full">
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field"
                            name="owner_id" 
                            id="owner_id" 
                            v-model="formData.owner_id"
                            readonly>
                        <button class="btn btn-icon btn-white" @click="onButtonEmployee">
                            <i class="fa fa-1x fa-search" />
                        </button>
                    </div>
                    <div v-else>
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field field-sekunder"
                            style="width: 100%;"
                            name="owner_id" 
                            id="owner_id" 
                            v-model="formData.owner_id"
                            readonly>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.owner_id && formMessage.owner_id[0] }}
                    </div>
                </div>
                <FormEmployee
                    :data.sync="dataEmployee"
                    :enablePopup="openCreateEmployee"
                    :onChange="(data) => onChangeEmployee(data)"
                />
            </div>

            <!-- <div v-if="selectedIndex === 2">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">EMAIL</div>
                    <input 
                        type="email" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="email" 
                        id="email" 
                        v-model="formEmail.oldEmail"
                        :readonly="this.title === 'EDIT' ? false : true">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.email && formMessage.email[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-30-px">
                    <div class="field-label">PASSWORD</div>
                    <input 
                        type="password" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="password" 
                        id="password" 
                        v-model="formEmail.password"
                        :readonly="this.title === 'EDIT' ? false : true">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.email && formMessage.email[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">NEW EMAIL</div>
                    <input 
                        type="email" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="email" 
                        id="email" 
                        v-model="formEmail.newEmail"
                        :readonly="this.title === 'EDIT' ? false : true">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.email && formMessage.email[0] }}
                    </div>
                </div>
            </div> -->

            <!-- <div v-if="selectedIndex === 3">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">EMAIL</div>
                    <input 
                        type="email" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="email" 
                        id="email" 
                        v-model="formPassword.email"
                        :readonly="this.title === 'EDIT' ? false : true">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.email && formMessage.email[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-30-px">
                    <div class="field-label">PASSWORD</div>
                    <input 
                        type="password" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="oldPassword" 
                        id="oldPassword" 
                        v-model="formPassword.oldPassword"
                        :readonly="this.title === 'EDIT' ? false : true">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.email && formMessage.email[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">NEW PASSWORD</div>
                    <input 
                        type="password" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="newPassword" 
                        id="newPassword" 
                        v-model="formPassword.newPassword"
                        :readonly="this.title === 'EDIT' ? false : true">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.email && formMessage.email[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">CONFIRM PASSWORD</div>
                    <input 
                        type="password" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="confirmPassword" 
                        id="confirmPassword" 
                        v-model="formPassword.confirmPassword"
                        :readonly="this.title === 'EDIT' ? false : true">
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.email && formMessage.email[0] }}
                    </div>
                </div>
            </div> -->
        </AppSideForm>
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'
import AppTabs from '../../modules/AppTabs'
import AppImage from '../../modules/AppImage'
import FormEmployee from '../employee/FormEmployee'

const tabs = [
    {id: 1, label: 'Detail', status: 'active'},
    {id: 2, label: 'Employee', status: ''},
    // {id: 3, label: 'Change Email', status: ''},
    // {id: 4, label: 'Change Password', status: ''}
]

const employee = {
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

const payload = {
    id: '',
    image: '',
    name: '',
    username: '',
    email: '',
    password: '',
    email_verified_at: '',
    provider: '',
    enabled: 0,
    status: 'inactive',
    role_id: '',
    owner_id: ''
}

const payloadEmail = {
    email: '',
    oldEmail: '',
    password: '',
    newEmail: ''
}

const payloadPassword = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
}

export default {
    name: 'form',
    data () {
        return {
            openCreateEmployee: false,
            image: '',
            tabs: tabs,
            isView: false,
            dataEmployee: {...employee},
            formData: {...payload},
            formEmail: {...payloadEmail},
            formPassword: {...payloadPassword},
            formMessage: [],
            formRoles: [],
            selectedIndex: 0
        }
    },
    mounted () {
        this.formData = {...payload}
    },
    components: {
        FormEmployee,
        AppImage,
        AppSideForm,
        AppTabs
    },
    props: {
        data: {
            required: true
        },
        role: {
            required: true
        },
        message: {
            required: false
        },
        title: {
            type: String,
            required: true
        },
        uploadImage: {
            type: Function,
            required: false,
        },
        removeImage: {
            type: Function,
            required: false,
        },
        onSave: {
            type: Function,
            required: true
        },
        onClose: {
            type: Function,
            required: true
        }
    },
    methods: {
        onButtonEmployee () {
            this.openCreateEmployee = !this.openCreateEmployee
        },
        onChangeEmployee (data) {
            this.formData = {
                ...this.formData,
                owner_id: data.id
            }
            this.dataEmployee = data 
        },
        onButtonSave () {
            const newPayload = this.formData
            this.onSave(newPayload)
        },
        onChangeTabs (data) {
            this.selectedIndex = data
        }
    },
    watch: {
        data: function (props, prevProps) {
            if (props) {
                this.formData = {
                    ...this.formData,
                    id: props.id,
                    image: props.image,
                    name: props.name,
                    username: props.username,
                    email: props.email,
                    email_verified_at: props.email_verified_at,
                    provider: props.provider,
                    enabled: props.enabled,
                    status: props.status,
                    role_id: props.role_id,
                    owner_id: props.owner_id
                }
                this.image = props.image ? this.adminImageThumbnailUrl + props.image : ''
                this.dataEmployee = props.employee ? props.employee : {...employee}
            } else {
                this.formData = {...payload}
                this.image = ''
                this.dataEmployee = {...employee}
            }
            this.onChangeTabs(0)
        },
        message: function (props, prevProps) {
            if (props) {
                this.formMessage = props
            } else {
                this.formMessage = []
            }
        },
        role: function (props, prevProps) {
            if (props) {
                this.formRoles = props
            } else {
                this.formRoles = []
            }
        }
    }
}
</script>