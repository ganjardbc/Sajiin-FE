<template>
    <div id="FormCustomer">
        <AppPopupForm
            :enableRadius="true"
            :title="'Choose Customer'"
            :onClose="onClosePopup"
        >
            <div v-if="datas.length > 0">
                <div v-for="(dt, i) in datas" :key="i" class="card border-full" style="margin-top: 15px; margin-bottom: 15px;">
                    <div class="display-flex space-between" style="padding-top: 5px; padding-bottom: 5px;">
                        <div style="width: 60px; margin-right: 20px;">
                            <div class="image image-padding image-circle">
                                <img :src="customerImageThumbnailUrl + dt.customer.image" alt="" class="post-center">
                            </div>
                        </div>
                        <div style="width: calc(100% - 150px);">
                            <div class="fonts fonts-11 semibold" style="margin-bottom: 5px;">{{ dt.customer.name }}</div>
                            <div class="display-flex" style="margin-bottom: 5px;">
                                <div style="width: 25px;">
                                    <i class="fa fa-lw fa-envelope" style="font-size: 14px; color: #555;" />
                                </div>
                                <div class="fonts fonts-10 grey">{{ dt.customer.email }}</div>
                            </div>
                            <div class="display-flex" style="margin-bottom: 5px;">
                                <div style="width: 25px;">
                                    <i class="fa fa-lw fa-phone" style="font-size: 14px; color: #555;" />
                                </div>
                                <div class="fonts fonts-10 grey">{{ dt.customer.phone }}</div>
                            </div>
                            <div class="display-flex">
                                <div style="width: 25px;">
                                    <i class="fa fa-lw fa-info-circle" style="font-size: 14px; color: #555;" />
                                </div>
                                <div class="fonts fonts-10 grey">{{ dt.customer.about }}</div>
                            </div>
                        </div>
                        <div class="display-flex column space-between" style="width: 80px; height: 100px;">
                            <div class="card-capsule active" style="margin-left: 15px; text-transform: capitalize;">{{ dt.customer.status }}</div>
                            <div class="display-flex space-between">
                                <div></div>
                                <button v-if="selectedID === dt.customer.id ? false : true" class="btn btn-sekunder btn-icon" @click="onChangePopup(dt)">
                                    <i class="fa fa-lg fa-plus"></i>
                                </button>
                                <div v-else class="card-check">
                                    <i class="icn far fa-lg fa-check-circle"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppEmpty v-else />
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
            :title="'Choose this data ?'" 
            :onClose="onShowHideSave" 
            :onSave="saveData" />
    </div>
</template>

<script>
import AppPopupForm from '../../modules/AppPopupForm'
import AppAlert from '../../modules/AppAlert'
import AppEmpty from '../../modules/AppEmpty'

const payload = {}

export default {
    name: 'FormCustomer',
    data () {
        return {
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            visiblePopup: false,
            formData: null,
            datas: [],
            formMessage: [],
            selectedData: null,
            payload: {...payload},
            dataUser: null 
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.selectID = this.selectedID
        this.datas = this.data
    },
    components: {
        AppEmpty,
        AppPopupForm,
        AppAlert
    },
    props: {
        data: {
            requred: true
        },
        selectedID: {
            requred: false
        },
        onChange: {
            type: Function,
            requred: true
        },
        onClose: {
            type: Function,
            requred: false
        },
        enablePopup: {
            type: Boolean,
            requred: false
        }
    },
    methods: {
        onShowHideDelete (index = null) {
            this.visibleAlertDelete = !this.visibleAlertDelete
            this.payload = this.datas[index] ? this.datas[index] : payload
            this.formMessage = []
        },
        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
            this.formMessage = []
        },
        onChoose: function (index) {
            this.visibleAlertSave = !this.visibleAlertSave
            this.selectedID = index
            this.formMessage = []
        },
        onChangePopup: function (data) {
            this.selectedData = data
            this.onShowHideSave()
        },
        onClosePopup: function () {
            this.visiblePopup = false
            this.payload = {...payload}
            this.onClose()
        },
        saveData: function () {
            this.onChange(this.selectedData)
            this.onShowHideSave()
            this.visiblePopup = false
        }
    },
    watch: {
        data: function (props) {
            if (props) {
                this.datas = props 
            } else {
                this.datas = []
            }
        },
        enablePopup: function (props, prevProps) {
            if (!this.visiblePopup) {
                this.visiblePopup = true
            } else {
                this.visiblePopup = false
            }
        }
    }
}
</script>