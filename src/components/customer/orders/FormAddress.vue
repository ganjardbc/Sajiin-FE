<template>
    <div id="FormAddress">
        <AppPopupForm
            :enableRadius="true"
            :title="'Choose Address'"
            :onClose="onClosePopup"
        >
            <div v-if="datas.length > 0">
                <div v-for="(dt, index) in datas" :key="index" class="card border-full" style="margin-top: 15px; margin-bottom: 15px;">
                    <div class="display-flex space-between">
                        <div style="width: 40px;">
                            <i class="fa fa-lg fa-map-marker-alt fonts main" style="margin-top: 5px;"></i>
                        </div>
                        <div style="width: calc(100% - 80px);">
                            <div class="display-flex">
                                <div class="fonts fonts-10">{{ dt.name }}</div>
                                <AppDote style="margin-top: 8px;" />
                                <div class="fonts fonts-10 grey">{{ dt.type }}</div>
                                <div style="padding-left: 10px; padding-top: 2px; padding-bottom: 2px;">
                                    <i :class="dt.is_selected ? 'fa fa-lw fa-check-circle fonts green' : ''"></i>
                                </div>
                            </div>
                            <div class="fonts fonts-11 semibold">{{ dt.address }}</div>
                        </div>
                        <div class="display-flex" style="width: 40px; text-align: right;">
                            <button v-if="selectedID === dt.id ? false : true" class="btn btn-sekunder btn-icon" @click="onChangePopup(dt)">
                                <i class="fa fa-lg fa-plus"></i>
                            </button>
                            <div v-else class="card-check">
                                <i class="icn far fa-lg fa-check-circle"></i>
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
import AppDote from '../../modules/AppDote'
import AppEmpty from '../../modules/AppEmpty'

const payload = {}

export default {
    name: 'FormAddress',
    data () {
        return {
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            visiblePopup: false,
            formData: null,
            datas: [],
            selectedData: null,
            formMessage: [],
            payload: {...payload}
        }
    },
    mounted () {
        this.datas = this.data
    },
    components: {
        AppEmpty,
        AppDote,
        AppPopupForm,
        AppAlert
    },
    props: {
        onChange: {
            type: Function,
            requred: true
        },
        onClose: {
            type: Function,
            requred: true
        },
        selectedID: {
            required: true
        },
        enablePopup: {
            type: Boolean,
            requred: false
        },
        data: {
            requred: true
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
        onChangePopup (data) {
            this.selectedData = data
            this.onShowHideSave()
        },
        onChoose: function (index) {
            this.visibleAlertSave = !this.visibleAlertSave
            this.selectedID = index
            this.formMessage = []
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
        data: function (props, prevProps) {
            if (props) {
                this.datas = props
            } else {
                this.datas = null
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